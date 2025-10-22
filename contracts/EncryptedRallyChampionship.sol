// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint8, euint16, euint32, euint64, ebool, externalEuint8, externalEuint16, externalEuint32, externalEuint64} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title EncryptedRallyChampionship - FHE-Powered Rally Racing
/// @notice Privacy-preserving rally racing with encrypted car setups
contract EncryptedRallyChampionship is SepoliaConfig {

    // ============ Enums ============

    enum DriverTier {
        Rookie,
        Amateur,
        Professional,
        Elite,
        Legend
    }

    // ============ Structs ============

    struct DriverProfile {
        string carModel;                    // Car model (plaintext)
        euint16 engineTuningCipher;         // Engine tuning (encrypted)
        euint16 suspensionBalanceCipher;    // Suspension balance (encrypted)
        euint16 aeroPackageCipher;          // Aero package (encrypted)
        euint16 tireCompoundCipher;         // Tire compound (encrypted)
        euint8 boostResponseCipher;         // Boost response (encrypted)
        euint8 brakeBiasCipher;             // Brake bias (encrypted)
        euint8 tractionControlCipher;       // Traction control (encrypted)
        DriverTier tier;
        uint256 joinedAt;
        uint256 carSetupUpdatedAt;
    }

    // ============ State Variables ============

    address public owner;
    mapping(address => DriverProfile) public drivers;
    uint256 public totalDrivers;

    // ============ Events ============

    event DriverRegistered(address indexed driver, DriverTier tier);
    event CarSetupUpdated(address indexed driver, string carModel, uint256 timestamp);

    // ============ Errors ============

    error Unauthorized();
    error DriverNotRegistered();
    error DriverAlreadyRegistered();

    // ============ Constructor ============

    constructor() {
        owner = msg.sender;
    }

    // ============ Modifiers ============

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    modifier onlyRegistered() {
        if (drivers[msg.sender].joinedAt == 0) revert DriverNotRegistered();
        _;
    }

    // ============ Core Functions ============

    /// @notice Register as a rally driver
    function registerDriver() external {
        if (drivers[msg.sender].joinedAt != 0) revert DriverAlreadyRegistered();

        DriverProfile storage profile = drivers[msg.sender];
        profile.tier = DriverTier.Rookie;
        profile.joinedAt = block.timestamp;

        totalDrivers++;

        emit DriverRegistered(msg.sender, DriverTier.Rookie);
    }

    /// @notice Update car setup with FHE-encrypted parameters
    /// @param carModel Car model name (plaintext, e.g. "BMW M3 Competition")
    /// @param engineTuningInput Encrypted engine tuning value
    /// @param suspensionBalanceInput Encrypted suspension balance value
    /// @param aeroPackageInput Encrypted aero package value
    /// @param tireCompoundInput Encrypted tire compound value
    /// @param boostResponseInput Encrypted boost response value
    /// @param brakeBiasInput Encrypted brake bias value
    /// @param tractionControlInput Encrypted traction control value
    /// @param inputProof FHE encryption proof for all encrypted inputs
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
    ) external onlyRegistered {
        DriverProfile storage profile = drivers[msg.sender];

        // Convert external encrypted inputs to internal encrypted types
        euint16 engineTuning = FHE.fromExternal(engineTuningInput, inputProof);
        euint16 suspensionBalance = FHE.fromExternal(suspensionBalanceInput, inputProof);
        euint16 aeroPackage = FHE.fromExternal(aeroPackageInput, inputProof);
        euint16 tireCompound = FHE.fromExternal(tireCompoundInput, inputProof);
        euint8 boostResponse = FHE.fromExternal(boostResponseInput, inputProof);
        euint8 brakeBias = FHE.fromExternal(brakeBiasInput, inputProof);
        euint8 tractionControl = FHE.fromExternal(tractionControlInput, inputProof);

        // Allow contract to use these encrypted values
        FHE.allowThis(engineTuning);
        FHE.allowThis(suspensionBalance);
        FHE.allowThis(aeroPackage);
        FHE.allowThis(tireCompound);
        FHE.allowThis(boostResponse);
        FHE.allowThis(brakeBias);
        FHE.allowThis(tractionControl);

        // Store car setup (model in plaintext, parameters encrypted)
        profile.carModel = carModel;
        profile.engineTuningCipher = engineTuning;
        profile.suspensionBalanceCipher = suspensionBalance;
        profile.aeroPackageCipher = aeroPackage;
        profile.tireCompoundCipher = tireCompound;
        profile.boostResponseCipher = boostResponse;
        profile.brakeBiasCipher = brakeBias;
        profile.tractionControlCipher = tractionControl;
        profile.carSetupUpdatedAt = block.timestamp;

        emit CarSetupUpdated(msg.sender, carModel, block.timestamp);
    }

    // ============ View Functions ============

    /// @notice Get driver profile (plaintext data only)
    function getDriverProfile(address driver) external view returns (
        string memory carModel,
        DriverTier tier,
        uint256 joinedAt,
        uint256 carSetupUpdatedAt
    ) {
        DriverProfile storage profile = drivers[driver];
        return (
            profile.carModel,
            profile.tier,
            profile.joinedAt,
            profile.carSetupUpdatedAt
        );
    }

    /// @notice Check if address is registered driver
    function isRegistered(address driver) external view returns (bool) {
        return drivers[driver].joinedAt != 0;
    }
}
