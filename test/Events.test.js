const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EncryptedRallyChampionship - Events", function () {
  let contract;
  let owner;
  let driver1;
  let driver2;

  beforeEach(async function () {
    [owner, driver1, driver2] = await ethers.getSigners();

    const EncryptedRallyChampionship = await ethers.getContractFactory("EncryptedRallyChampionship");
    contract = await EncryptedRallyChampionship.deploy();
    await contract.waitForDeployment();
  });

  describe("DriverRegistered Event", function () {
    it("Should emit DriverRegistered with correct parameters", async function () {
      await expect(contract.connect(driver1).registerDriver())
        .to.emit(contract, "DriverRegistered")
        .withArgs(driver1.address, 0); // tier = Rookie (0)
    });

    it("Should emit event with correct driver address", async function () {
      const tx = await contract.connect(driver1).registerDriver();
      const receipt = await tx.wait();

      const event = receipt.logs.find(log => {
        try {
          const parsed = contract.interface.parseLog(log);
          return parsed.name === "DriverRegistered";
        } catch {
          return false;
        }
      });

      expect(event).to.not.be.undefined;
      const parsedEvent = contract.interface.parseLog(event);
      expect(parsedEvent.args.driver).to.equal(driver1.address);
    });

    it("Should emit separate events for multiple registrations", async function () {
      const tx1 = await contract.connect(driver1).registerDriver();
      const tx2 = await contract.connect(driver2).registerDriver();

      const receipt1 = await tx1.wait();
      const receipt2 = await tx2.wait();

      expect(receipt1.logs.length).to.be.gt(0);
      expect(receipt2.logs.length).to.be.gt(0);
    });

    it("Should not emit event when registration fails", async function () {
      await contract.connect(driver1).registerDriver();

      // Second registration should fail and not emit event
      await expect(contract.connect(driver1).registerDriver())
        .to.be.revertedWithCustomError(contract, "DriverAlreadyRegistered");
    });
  });

  describe("CarSetupUpdated Event", function () {
    beforeEach(async function () {
      await contract.connect(driver1).registerDriver();
    });

    it.skip("Should emit CarSetupUpdated with correct parameters (FHE - Sepolia only)", async function () {
      // This test requires actual FHE encryption
      // Test on Sepolia:
      // 1. Register driver
      // 2. Update car setup via frontend
      // 3. Verify event emission on Etherscan:
      //    - driver address
      //    - car model
      //    - timestamp
    });

    it.skip("Should emit event with updated timestamp (FHE - Sepolia only)", async function () {
      // Test on Sepolia:
      // 1. Update car setup first time
      // 2. Wait and update again
      // 3. Verify second event has later timestamp
    });
  });

  describe("Event Indexing", function () {
    it("Should index driver address for efficient filtering", async function () {
      // Register multiple drivers
      await contract.connect(driver1).registerDriver();
      await contract.connect(driver2).registerDriver();

      // In a real scenario, you could filter events by driver address
      // This test verifies the event structure supports indexing
      const filter = contract.filters.DriverRegistered(driver1.address);
      expect(filter.topics).to.not.be.undefined;
    });
  });

  describe("Event Data Integrity", function () {
    it("Should preserve all event parameters", async function () {
      const tx = await contract.connect(driver1).registerDriver();
      const receipt = await tx.wait();

      const event = receipt.logs.find(log => {
        try {
          const parsed = contract.interface.parseLog(log);
          return parsed.name === "DriverRegistered";
        } catch {
          return false;
        }
      });

      const parsedEvent = contract.interface.parseLog(event);

      // Verify all parameters are present
      expect(parsedEvent.args).to.have.property('driver');
      expect(parsedEvent.args).to.have.property('tier');

      // Verify parameter values
      expect(parsedEvent.args.driver).to.equal(driver1.address);
      expect(parsedEvent.args.tier).to.equal(0);
    });
  });

  describe("Event Emission Order", function () {
    it("Should emit events in correct order for sequential operations", async function () {
      const tx1 = await contract.connect(driver1).registerDriver();
      const tx2 = await contract.connect(driver2).registerDriver();

      const receipt1 = await tx1.wait();
      const receipt2 = await tx2.wait();

      expect(receipt1.blockNumber).to.be.lte(receipt2.blockNumber);
    });
  });
});
