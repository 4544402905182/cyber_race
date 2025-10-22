# EncryptedRally Championship

> Privacy-preserving racing championship powered by Zama's Fully Homomorphic Encryption (FHE)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/solidity-%5E0.8.24-363636)
![Hardhat](https://img.shields.io/badge/hardhat-2.22.0-yellow)
![React](https://img.shields.io/badge/react-18.3.1-61dafb)
![Zama FHE](https://img.shields.io/badge/Zama-FHE-blueviolet)

## 🏎️ Overview

EncryptedRally Championship is a decentralized racing application where drivers can customize their vehicles and compete while keeping their car setups completely private using Fully Homomorphic Encryption (FHE). Your tuning choices remain encrypted on-chain, creating strategic depth and fair competition.

**Live Demo**: [Coming Soon]

**Contract Address (Sepolia)**: `0x92F2dBC25D02F080079a4FC0557eF14274104C5f`

## ✨ Features

### Current (Alpha v0.1)
- 🔒 **FHE Encryption** - Car setups encrypted with Zama's FHE technology
- 🏁 **9 Performance Cars** - BMW M3, Mercedes-AMG GT, Porsche 911, Honda NSX, and more
- 🔧 **Customizable Parts** - 6 component categories: Engine, Transmission, Suspension, Wheels, Body, Exhaust
- 💰 **Web3 Integration** - RainbowKit wallet connection, Sepolia testnet deployment
- 📊 **Real-time Stats** - View car performance metrics based on selected parts

### Planned Development

#### Phase 2: Massive Expansion
- **100+ Cars** across multiple categories:
  - Rally legends (Subaru WRX, Lancia Delta, Ford Focus RS)
  - GT supercars (Ferrari, Lamborghini, McLaren)
  - Drift machines (Nissan GT-R, Toyota Supra, Mazda RX-7)
  - Electric hypercars (Rimac, Lucid, Porsche Taycan)
  - Classic muscle cars and vintage racers

- **Thousands of Parts** with realistic tuning:
  - Authentic manufacturer parts (Brembo, Öhlins, Recaro)
  - 5 performance tiers (Street, Sport, Race, Pro, Elite)
  - Aerodynamic components (spoilers, diffusers, splitters)
  - Interior upgrades (seats, steering wheels, roll cages)
  - Livery customization and wrap designs

#### Phase 3: Competitive Racing
- 🏆 **FHE-Encrypted Racing** - Compete with encrypted car setups
- 🎲 **Chainlink VRF** - Verifiable random race conditions (weather, tire wear, mechanical failures)
- 💎 **Rewards System** - Win cryptocurrency and exclusive NFT parts
- 🏅 **Tournament Structure**:
  - Daily races with instant rewards
  - Multi-stage tournaments
  - Seasonal championships with leaderboards

## 🛠️ Technology Stack

### Smart Contracts
- **Solidity 0.8.24** - Smart contract language
- **Zama fhEVM** - Fully Homomorphic Encryption library
- **Hardhat** - Development environment
- **Ethers.js** - Ethereum library

### Frontend
- **React 18.3** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **RainbowKit** - Wallet connection
- **Wagmi v2** - React hooks for Ethereum
- **TailwindCSS** - Styling
- **Shadcn/ui** - Component library

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MetaMask wallet with Sepolia ETH
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/4544402905182/cyber_race.git
cd cyber_race

# Install dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

### Configuration

Create `.env` file in project root:

```bash
# Deployment wallet private key (testnet only!)
PRIVATE_KEY=your_private_key_without_0x

# Sepolia RPC URL
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com

# Etherscan API key (optional, for verification)
ETHERSCAN_API_KEY=your_api_key
```

### Development

```bash
# Compile contracts
npm run compile

# Run tests
npm test

# Start frontend (from root directory)
cd frontend
npm run dev

# Open browser at http://localhost:8080
```

### Deployment

```bash
# Deploy to Sepolia testnet
npm run deploy

# Update contract address in frontend/src/lib/contract.ts
# Then rebuild frontend
cd frontend
npm run build
```

## 📁 Project Structure

```
EncryptedRally-Championship/
├── contracts/
│   └── EncryptedRallyChampionship.sol    # Main FHE contract
├── scripts/
│   └── deploy.js                          # Deployment script
├── test/
│   ├── EncryptedRallyChampionship.test.js # Contract tests
│   ├── DriverManagement.test.js           # Driver tests
│   └── Events.test.js                     # Event tests
├── frontend/
│   ├── src/
│   │   ├── components/                    # React components
│   │   ├── pages/                         # Page components
│   │   ├── lib/                           # Utilities
│   │   │   ├── contract.ts                # Contract config
│   │   │   └── fhe.ts                     # FHE encryption
│   │   └── data/                          # Car & parts data
│   └── TESTING.md                         # Frontend test guide
├── hardhat.config.js                      # Hardhat configuration
└── package.json
```

## 🔒 FHE Encryption Flow

### Car Setup Encryption

```typescript
// 1. Initialize FHE SDK
const fheInstance = await initializeFHE();

// 2. Encrypt part parameters
const encrypted = await encryptCarSetup(fheInstance, {
  engine: { speed: 85, acceleration: 90 },
  suspension: { handling: 88, durability: 75 },
  // ... other parts
});

// 3. Submit to contract
await contract.updateCarSetup(
  carModel,           // Plaintext
  ...encrypted.handles, // 7 encrypted handles
  encrypted.proof      // Zero-knowledge proof
);
```

### Parameter Mapping

| Frontend Part | Contract Parameter | Type | Description |
|--------------|-------------------|------|-------------|
| Engine | engineTuning | euint16 | Speed + Acceleration |
| Suspension | suspensionBalance | euint16 | Handling + Durability |
| Body Kit | aeroPackage | euint16 | Speed + Handling |
| Wheels | tireCompound | euint16 | Handling + Speed |
| Transmission | boostResponse | euint8 | Acceleration boost |
| Brakes | brakeBias | euint8 | Durability factor |
| Traction | tractionControl | euint8 | Handling control |

## 🧪 Testing

### Contract Tests
```bash
# Run all contract tests (11 tests)
npm test

# Run specific test suite
npx hardhat test test/DriverManagement.test.js
```

### Frontend Tests
```bash
cd frontend

# Install test dependencies (after fixing npm permissions)
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom

# Run tests
npm test
```

See [frontend/TESTING.md](frontend/TESTING.md) for detailed testing guide.

## 📚 Smart Contract API

### Key Functions

#### `registerDriver()`
Register as a driver in the championship.

```solidity
function registerDriver() external
```

#### `updateCarSetup()`
Update your encrypted car configuration.

```solidity
function updateCarSetup(
    string calldata carModel,
    externalEuint16 engineTuningInput,
    externalEuint16 suspensionBalanceInput,
    externalEuint16 aeroPackageInput,
    externalEuint16 tireCompoundInput,
    externalEuint8 boostResponseInput,
    externalEuint8 brakeBiasInput,
    externalEuint8 tractionControlInput,
    bytes calldata inputProof
) external onlyRegistered
```

#### `getDriverProfile(address driver)`
View public driver information.

```solidity
function getDriverProfile(address driver) external view returns (
    string memory carModel,
    uint8 tier,
    uint256 joinedAt,
    uint256 carSetupUpdatedAt
)
```

#### `isRegistered(address driver)`
Check if an address is registered.

```solidity
function isRegistered(address driver) external view returns (bool)
```

## 🗺️ Roadmap

### ✅ Phase 1: Core Customization (Current - Alpha v0.1)
- FHE encryption integration
- Wallet connection (RainbowKit)
- Basic car customization (9 cars, 6 parts)
- Sepolia testnet deployment

### 🔄 Phase 2: Content Expansion (Q2 2025)
- 100+ car models
- 1000+ parts with realistic physics
- Advanced tuning mechanics
- Performance simulation engine

### 🔜 Phase 3: Competitive Launch (Q3 2025)
- Racing system with FHE-encrypted competition
- Chainlink VRF integration for randomness
- Tournament and championship system
- NFT rewards and rare parts marketplace

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Documentation**: Visit `/docs` in the live app
- **Sepolia Etherscan**: https://sepolia.etherscan.io/address/0x92F2dBC25D02F080079a4FC0557eF14274104C5f
- **Zama FHE Docs**: https://docs.zama.ai/
- **Hardhat**: https://hardhat.org/

## 💬 Support

For questions, issues, or feature requests, please open an issue on GitHub.

---

**Built with ❤️ using Zama FHE technology**
