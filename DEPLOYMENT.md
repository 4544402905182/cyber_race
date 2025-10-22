# EncryptedRally Championship - Deployment Guide

## 📋 Prerequisites

1. **Sepolia Testnet ETH**
   - Get test ETH from faucets:
     - https://sepoliafaucet.com/
     - https://www.alchemy.com/faucets/ethereum-sepolia
   - Recommended balance: >0.5 ETH (for deployment and testing)

2. **Wallet Private Key**
   - Export from MetaMask (without 0x prefix)
   - ⚠️ Warning: For testnet only, do not use mainnet wallets

3. **Etherscan API Key** (Optional, for contract verification)
   - Visit: https://etherscan.io/apis
   - Register and create free API Key

## 🔧 Configuration Steps

### 1. Configure Environment Variables

Edit `.env` file:

```bash
# Your Sepolia testnet wallet private key (without 0x)
PRIVATE_KEY=your_private_key_here

# Sepolia RPC URL (default is fine)
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com

# Etherscan API Key (optional)
ETHERSCAN_API_KEY=your_api_key_here
```

### 2. Compile Contracts

```bash
npm run compile
```

Expected output:
```
Compiled 1 Solidity file successfully
```

### 3. Deploy to Sepolia

```bash
npm run deploy
```

The deployment script will:
- ✅ Display deployer account and balance
- ✅ Deploy EncryptedRallyChampionship contract
- ✅ Display contract address
- ✅ Auto-verify contract (if ETHERSCAN_API_KEY is configured)

## 📝 Post-Deployment Steps

### 1. Update Frontend Configuration

Copy the contract address from deployment output, then update:

```typescript
// frontend/src/lib/contract.ts
export const CONTRACT_ADDRESS = "0xYourContractAddress";
```

### 2. Testing Flow

1. **Connect Wallet**
   - Open http://localhost:8082
   - Connect MetaMask (ensure on Sepolia network)

2. **Select Car Model**
   - Choose a performance car (BMW M3, Mercedes-AMG, Honda, Porsche, etc.)
   - Car model is stored in plaintext

3. **Select Parts**
   - Engine
   - Suspension
   - Body
   - Wheels
   - Transmission
   - Exhaust

4. **Purchase Upgrades**
   - Click "PURCHASE UPGRADES" button
   - FHE encrypts part parameters (client-side)
   - Confirm transaction (MetaMask popup)
   - Wait for transaction confirmation

## 🔒 FHE Encryption Flow

### Parts Parameter Mapping:

| Frontend Part Category | Maps to Contract Parameter | Encryption Type |
|------------|---------------|---------|
| Engine (speed + acceleration) | engineTuning | euint16 |
| Suspension (handling + durability) | suspensionBalance | euint16 |
| Body (speed + handling) | aeroPackage | euint16 |
| Wheels (handling + speed) | tireCompound | euint16 |
| Transmission (acceleration) | boostResponse | euint8 |
| Wheels (durability) | brakeBias | euint8 |
| Transmission (handling) | tractionControl | euint8 |

### Encryption Process:

```
User selects parts → Calculate boost values → FHE encrypt → Generate 7 handles + proof
                                       ↓
                         Submit to contract updateCarSetup()
                                       ↓
                          Part parameters stored as ciphertext on-chain
```

## 🎯 Contract Functions

### Main Functions:

1. **updateCarSetup** - Update vehicle configuration (FHE encrypted)
   ```solidity
   function updateCarSetup(
       string calldata carModel,              // Car model (plaintext)
       externalEuint16 engineTuningInput,     // Engine (encrypted)
       externalEuint16 suspensionBalanceInput,// Suspension (encrypted)
       externalEuint16 aeroPackageInput,      // Aerodynamics (encrypted)
       externalEuint16 tireCompoundInput,     // Tires (encrypted)
       externalEuint8 boostResponseInput,     // Boost (encrypted)
       externalEuint8 brakeBiasInput,         // Brakes (encrypted)
       externalEuint8 tractionControlInput,   // Traction (encrypted)
       bytes calldata inputProof              // FHE proof
   )
   ```

2. **registerDriver** - Register as a driver

3. **createChampionship** - Create championship (admin only)

4. **submitRally** - Submit race results (FHE encrypted)

## 🔍 Verify Deployment

### Check Contract State:

```bash
# In Hardhat console
npx hardhat console --network sepolia
```

```javascript
const contract = await ethers.getContractAt("EncryptedRallyChampionship", "YOUR_CONTRACT_ADDRESS");

// Check contract owner
await contract.owner();

// Check current championship
await contract.currentChampionshipId();
```

## 🐛 Troubleshooting

### Issue 1: Deployment Failed - Insufficient Gas
**Solution**: Ensure Sepolia account has enough ETH (recommended >0.5 ETH)

### Issue 2: Verification Failed
**Solution**: Verify manually
```bash
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS
```

### Issue 3: RPC Connection Failed
**Solution**: Switch RPC node
```bash
# In .env file
SEPOLIA_RPC_URL=https://rpc.ankr.com/eth_sepolia
```

## 📚 Related Links

- Sepolia Etherscan: https://sepolia.etherscan.io/
- Zama FHE Documentation: https://docs.zama.ai/
- Hardhat Documentation: https://hardhat.org/docs
