const hre = require("hardhat");

async function main() {
  console.log("🏁 Deploying EncryptedRallyChampionship contract to Sepolia...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("📋 Deploying with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH\n");

  // Deploy contract
  console.log("🚀 Deploying contract...");
  const EncryptedRallyChampionship = await hre.ethers.getContractFactory("EncryptedRallyChampionship");
  const contract = await EncryptedRallyChampionship.deploy();

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log("✅ EncryptedRallyChampionship deployed to:", contractAddress);
  console.log("\n📝 Deployment Summary:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Contract Address:", contractAddress);
  console.log("Deployer:", deployer.address);
  console.log("Network: Sepolia");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  console.log("🔗 Etherscan:", `https://sepolia.etherscan.io/address/${contractAddress}`);
  console.log("\n⏳ Waiting 30 seconds before verification...");
  await new Promise(resolve => setTimeout(resolve, 30000));

  // Verify contract
  try {
    console.log("\n🔍 Verifying contract on Etherscan...");
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
    });
    console.log("✅ Contract verified successfully!");
  } catch (error) {
    console.log("⚠️  Verification failed:", error.message);
    console.log("You can verify manually later using:");
    console.log(`npx hardhat verify --network sepolia ${contractAddress}`);
  }

  console.log("\n🎯 Next Steps:");
  console.log("1. Update frontend/src/lib/contract.ts with the contract address:");
  console.log(`   CONTRACT_ADDRESS = "${contractAddress}"`);
  console.log("2. Test the updateCarSetup function from the frontend");
  console.log("3. Register as a driver and customize your rally car!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
