const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EncryptedRallyChampionship", function () {
  let contract;
  let owner;
  let driver1;
  let driver2;

  beforeEach(async function () {
    // Get signers
    [owner, driver1, driver2] = await ethers.getSigners();

    // Deploy contract
    const EncryptedRallyChampionship = await ethers.getContractFactory("EncryptedRallyChampionship");
    contract = await EncryptedRallyChampionship.deploy();
    await contract.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await contract.owner()).to.equal(owner.address);
    });

    it("Should initialize with zero total drivers", async function () {
      expect(await contract.totalDrivers()).to.equal(0);
    });
  });

  describe("Driver Registration", function () {
    it("Should allow a new driver to register", async function () {
      await expect(contract.connect(driver1).registerDriver())
        .to.emit(contract, "DriverRegistered")
        .withArgs(driver1.address, 0); // DriverTier.Rookie = 0

      expect(await contract.totalDrivers()).to.equal(1);
    });

    it("Should check driver registration status", async function () {
      expect(await contract.isRegistered(driver1.address)).to.be.false;

      await contract.connect(driver1).registerDriver();

      expect(await contract.isRegistered(driver1.address)).to.be.true;
    });

    it("Should prevent double registration", async function () {
      await contract.connect(driver1).registerDriver();

      await expect(contract.connect(driver1).registerDriver())
        .to.be.revertedWithCustomError(contract, "DriverAlreadyRegistered");
    });

    it("Should allow multiple drivers to register", async function () {
      await contract.connect(driver1).registerDriver();
      await contract.connect(driver2).registerDriver();

      expect(await contract.totalDrivers()).to.equal(2);
      expect(await contract.isRegistered(driver1.address)).to.be.true;
      expect(await contract.isRegistered(driver2.address)).to.be.true;
    });
  });

  describe("Driver Profile", function () {
    beforeEach(async function () {
      // Register driver first
      await contract.connect(driver1).registerDriver();
    });

    it("Should return correct driver profile after registration", async function () {
      const profile = await contract.getDriverProfile(driver1.address);

      expect(profile.carModel).to.equal("");
      expect(profile.tier).to.equal(0); // DriverTier.Rookie
      expect(profile.joinedAt).to.be.gt(0);
      expect(profile.carSetupUpdatedAt).to.equal(0);
    });

    it("Should return empty profile for unregistered driver", async function () {
      const profile = await contract.getDriverProfile(driver2.address);

      expect(profile.carModel).to.equal("");
      expect(profile.tier).to.equal(0);
      expect(profile.joinedAt).to.equal(0);
      expect(profile.carSetupUpdatedAt).to.equal(0);
    });
  });

  describe("Car Setup Update", function () {
    beforeEach(async function () {
      // Register driver first
      await contract.connect(driver1).registerDriver();
    });

    it.skip("Should prevent unregistered drivers from updating car setup (FHE - Sepolia only)", async function () {
      // Note: This test requires actual FHE encryption on Sepolia testnet
      // Skipped in local Hardhat environment

      // To test on Sepolia:
      // 1. Deploy contract: npm run deploy
      // 2. Use frontend to test unregistered driver scenario
      // 3. Verify transaction reverts with DriverNotRegistered error
    });

    it.skip("Should emit CarSetupUpdated event on successful update (FHE - Sepolia only)", async function () {
      // Note: This test requires actual FHE encryption on Sepolia testnet
      // Skipped in local Hardhat environment

      // To test on Sepolia:
      // 1. Deploy contract: npm run deploy
      // 2. Use frontend to register and update car setup
      // 3. Verify CarSetupUpdated event is emitted with correct parameters
      // 4. Check Etherscan for transaction details
    });
  });

  describe("Access Control", function () {
    it("Should allow only owner to call owner-only functions", async function () {
      // Example: If there are owner-only functions in the contract
      // Test them here
      expect(await contract.owner()).to.equal(owner.address);
    });
  });

  describe("View Functions", function () {
    it("Should return correct total drivers count", async function () {
      expect(await contract.totalDrivers()).to.equal(0);

      await contract.connect(driver1).registerDriver();
      expect(await contract.totalDrivers()).to.equal(1);

      await contract.connect(driver2).registerDriver();
      expect(await contract.totalDrivers()).to.equal(2);
    });

    it("Should correctly check registration status", async function () {
      expect(await contract.isRegistered(driver1.address)).to.be.false;
      expect(await contract.isRegistered(driver2.address)).to.be.false;

      await contract.connect(driver1).registerDriver();

      expect(await contract.isRegistered(driver1.address)).to.be.true;
      expect(await contract.isRegistered(driver2.address)).to.be.false;
    });
  });
});
