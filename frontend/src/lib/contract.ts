export const CONTRACT_ADDRESS = "0x92F2dBC25D02F080079a4FC0557eF14274104C5f";

export const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "registerDriver",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "carModel", "type": "string" },
      { "internalType": "externalEuint16", "name": "engineTuningInput", "type": "bytes32" },
      { "internalType": "externalEuint16", "name": "suspensionBalanceInput", "type": "bytes32" },
      { "internalType": "externalEuint16", "name": "aeroPackageInput", "type": "bytes32" },
      { "internalType": "externalEuint16", "name": "tireCompoundInput", "type": "bytes32" },
      { "internalType": "externalEuint8", "name": "boostResponseInput", "type": "bytes32" },
      { "internalType": "externalEuint8", "name": "brakeBiasInput", "type": "bytes32" },
      { "internalType": "externalEuint8", "name": "tractionControlInput", "type": "bytes32" },
      { "internalType": "bytes", "name": "inputProof", "type": "bytes" }
    ],
    "name": "updateCarSetup",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "driver", "type": "address" }],
    "name": "isRegistered",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "driver", "type": "address" }],
    "name": "getDriverProfile",
    "outputs": [
      { "internalType": "string", "name": "carModel", "type": "string" },
      { "internalType": "enum EncryptedRallyChampionship.DriverTier", "name": "tier", "type": "uint8" },
      { "internalType": "uint256", "name": "joinedAt", "type": "uint256" },
      { "internalType": "uint256", "name": "carSetupUpdatedAt", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
