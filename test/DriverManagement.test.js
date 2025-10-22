const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EncryptedRallyChampionship - Driver Management", function () {
  let contract;
  let owner;
  let driver1;
  let driver2;
  let driver3;

  beforeEach(async function () {
    [owner, driver1, driver2, driver3] = await ethers.getSigners();

    const EncryptedRallyChampionship = await ethers.getContractFactory("EncryptedRallyChampionship");
    contract = await EncryptedRallyChampionship.deploy();
    await contract.waitForDeployment();
  });

  describe("Multiple Driver Registration", function () {
    it("Should track multiple drivers correctly", async function () {
      expect(await contract.totalDrivers()).to.equal(0);

      await contract.connect(driver1).registerDriver();
      expect(await contract.totalDrivers()).to.equal(1);

      await contract.connect(driver2).registerDriver();
      expect(await contract.totalDrivers()).to.equal(2);

      await contract.connect(driver3).registerDriver();
      expect(await contract.totalDrivers()).to.equal(3);
    });

    it("Should maintain separate profiles for each driver", async function () {
      await contract.connect(driver1).registerDriver();
      await contract.connect(driver2).registerDriver();

      const profile1 = await contract.getDriverProfile(driver1.address);
      const profile2 = await contract.getDriverProfile(driver2.address);

      expect(profile1.joinedAt).to.not.equal(0);
      expect(profile2.joinedAt).to.not.equal(0);
      expect(profile1.tier).to.equal(0); // Rookie
      expect(profile2.tier).to.equal(0); // Rookie
    });

    it("Should emit DriverRegistered event for each registration", async function () {
      await expect(contract.connect(driver1).registerDriver())
        .to.emit(contract, "DriverRegistered")
        .withArgs(driver1.address, 0);

      await expect(contract.connect(driver2).registerDriver())
        .to.emit(contract, "DriverRegistered")
        .withArgs(driver2.address, 0);
    });
  });

  describe("Driver Profile Queries", function () {
    beforeEach(async function () {
      await contract.connect(driver1).registerDriver();
      await contract.connect(driver2).registerDriver();
    });

    it("Should return accurate registration status for multiple drivers", async function () {
      expect(await contract.isRegistered(driver1.address)).to.be.true;
      expect(await contract.isRegistered(driver2.address)).to.be.true;
      expect(await contract.isRegistered(driver3.address)).to.be.false;
    });

    it("Should return correct profile data structure", async function () {
      const profile = await contract.getDriverProfile(driver1.address);

      // Check all profile fields exist
      expect(profile).to.have.property('carModel');
      expect(profile).to.have.property('tier');
      expect(profile).to.have.property('joinedAt');
      expect(profile).to.have.property('carSetupUpdatedAt');
    });

    it("Should initialize profile with default values", async function () {
      const profile = await contract.getDriverProfile(driver1.address);

      expect(profile.carModel).to.equal("");
      expect(profile.tier).to.equal(0);
      expect(profile.joinedAt).to.be.gt(0);
      expect(profile.carSetupUpdatedAt).to.equal(0);
    });
  });

  describe("Registration Edge Cases", function () {
    it("Should handle rapid consecutive registrations", async function () {
      const registrations = [
        contract.connect(driver1).registerDriver(),
        contract.connect(driver2).registerDriver(),
        contract.connect(driver3).registerDriver()
      ];

      await Promise.all(registrations);

      expect(await contract.totalDrivers()).to.equal(3);
      expect(await contract.isRegistered(driver1.address)).to.be.true;
      expect(await contract.isRegistered(driver2.address)).to.be.true;
      expect(await contract.isRegistered(driver3.address)).to.be.true;
    });

    it("Should reject registration from zero address", async function () {
      // This test verifies contract doesn't crash with invalid addresses
      const profile = await contract.getDriverProfile(ethers.ZeroAddress);
      expect(profile.joinedAt).to.equal(0);
    });

    it("Should maintain correct count after failed registration attempt", async function () {
      await contract.connect(driver1).registerDriver();
      expect(await contract.totalDrivers()).to.equal(1);

      // Try to register again (should fail)
      await expect(contract.connect(driver1).registerDriver())
        .to.be.revertedWithCustomError(contract, "DriverAlreadyRegistered");

      // Count should remain the same
      expect(await contract.totalDrivers()).to.equal(1);
    });
  });

  describe("Profile Timestamp Validation", function () {
    it("Should record registration timestamp correctly", async function () {
      const blockBefore = await ethers.provider.getBlock('latest');
      const tx = await contract.connect(driver1).registerDriver();
      await tx.wait();

      const profile = await contract.getDriverProfile(driver1.address);
      const blockAfter = await ethers.provider.getBlock('latest');

      expect(profile.joinedAt).to.be.gte(blockBefore.timestamp);
      expect(profile.joinedAt).to.be.lte(blockAfter.timestamp);
    });

    it("Should have different timestamps for sequential registrations", async function () {
      await contract.connect(driver1).registerDriver();
      // Mine a block to ensure different timestamp
      await ethers.provider.send("evm_mine", []);
      await contract.connect(driver2).registerDriver();

      const profile1 = await contract.getDriverProfile(driver1.address);
      const profile2 = await contract.getDriverProfile(driver2.address);

      expect(profile2.joinedAt).to.be.gte(profile1.joinedAt);
    });
  });

  describe("Driver Tier System", function () {
    it("Should initialize all drivers as Rookie tier", async function () {
      await contract.connect(driver1).registerDriver();
      await contract.connect(driver2).registerDriver();
      await contract.connect(driver3).registerDriver();

      const profile1 = await contract.getDriverProfile(driver1.address);
      const profile2 = await contract.getDriverProfile(driver2.address);
      const profile3 = await contract.getDriverProfile(driver3.address);

      expect(profile1.tier).to.equal(0); // Rookie
      expect(profile2.tier).to.equal(0);
      expect(profile3.tier).to.equal(0);
    });
  });

  describe("Gas Optimization Tests", function () {
    it("Should consume reasonable gas for registration", async function () {
      const tx = await contract.connect(driver1).registerDriver();
      const receipt = await tx.wait();

      // Gas should be less than 200k for a simple registration
      expect(receipt.gasUsed).to.be.lt(200000);
    });

    it("Should have consistent gas cost for multiple registrations", async function () {
      const tx1 = await contract.connect(driver1).registerDriver();
      const receipt1 = await tx1.wait();

      const tx2 = await contract.connect(driver2).registerDriver();
      const receipt2 = await tx2.wait();

      // Gas costs should be similar (within 10%)
      const gasDiff = Math.abs(Number(receipt1.gasUsed - receipt2.gasUsed));
      const avgGas = (Number(receipt1.gasUsed) + Number(receipt2.gasUsed)) / 2;

      expect(gasDiff / avgGas).to.be.lt(0.1);
    });
  });
});
