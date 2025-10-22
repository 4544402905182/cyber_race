import { getAddress, hexlify } from 'ethers';

let fheInstance: any = null;
let sdkModule: any = null;

export const initializeFHE = async (): Promise<any> => {
  console.log('🚀 [FHE] initializeFHE called');

  if (fheInstance) {
    console.log('✅ [FHE] FHE instance already exists, reusing it');
    return fheInstance;
  }

  console.log('🔍 [FHE] Checking window and ethereum...');

  if (typeof window === 'undefined') {
    console.error('❌ [FHE] Window is undefined');
    throw new Error('Window is undefined');
  }

  if (!window.ethereum) {
    console.error('❌ [FHE] Ethereum provider not found');
    throw new Error('Ethereum provider not found');
  }

  console.log('✅ [FHE] Window and ethereum provider found');

  try {
    if (!sdkModule) {
      console.log('📦 [FHE] Loading SDK from CDN...');
      sdkModule = await import('https://cdn.zama.ai/relayer-sdk-js/0.2.0/relayer-sdk-js.js');
      console.log('✅ [FHE] SDK module loaded from CDN');
      console.log('📦 [FHE] SDK exports:', Object.keys(sdkModule));
    }

    console.log('⏳ [FHE] Initializing SDK...');
    await sdkModule.initSDK();
    console.log('✅ [FHE] SDK initialized');

    console.log('⏳ [FHE] Creating FHE instance with SepoliaConfig...');
    fheInstance = await sdkModule.createInstance(sdkModule.SepoliaConfig);
    console.log('✅ [FHE] FHE instance created successfully');
    return fheInstance;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('❌ [FHE] Initialization failed:', errorMsg);
    console.error('❌ [FHE] Error details:', error);
    throw new Error(`FHE initialization failed: ${errorMsg}`);
  }
};

export const getFHEInstance = (): any => {
  return fheInstance;
};

export const encryptCarSetup = async (
  engineTuning: number,
  suspensionBalance: number,
  aeroPackage: number,
  tireCompound: number,
  boostResponse: number,
  brakeBias: number,
  tractionControl: number,
  contractAddress: string,
  userAddress: string
): Promise<{
  engineTuningHandle: string;
  suspensionBalanceHandle: string;
  aeroPackageHandle: string;
  tireCompoundHandle: string;
  boostResponseHandle: string;
  brakeBiasHandle: string;
  tractionControlHandle: string;
  signature: string;
}> => {
  console.log('🔐 [FHE] encryptCarSetup called with values:', {
    engineTuning, suspensionBalance, aeroPackage, tireCompound,
    boostResponse, brakeBias, tractionControl
  });

  let fhe = getFHEInstance();
  if (!fhe) {
    console.log('⏳ [FHE] FHE instance not found, initializing...');
    fhe = await initializeFHE();
  } else {
    console.log('✅ [FHE] Using existing FHE instance');
  }

  if (!fhe) throw new Error('Failed to initialize FHE');

  console.log('📝 [FHE] Creating encrypted input...');
  const contractAddressChecksum = getAddress(contractAddress);
  const ciphertext = await fhe.createEncryptedInput(contractAddressChecksum, userAddress);

  console.log('➕ [FHE] Adding values to encrypted input...');
  // Add all values in correct order matching contract parameters
  ciphertext.add16(engineTuning);        // euint16
  ciphertext.add16(suspensionBalance);   // euint16
  ciphertext.add16(aeroPackage);         // euint16
  ciphertext.add16(tireCompound);        // euint16
  ciphertext.add8(boostResponse);        // euint8
  ciphertext.add8(brakeBias);            // euint8
  ciphertext.add8(tractionControl);      // euint8

  console.log('🔒 [FHE] Encrypting values...');
  const { handles, inputProof } = await ciphertext.encrypt();
  console.log('✅ [FHE] Encryption completed, handles count:', handles.length);

  return {
    engineTuningHandle: hexlify(handles[0]),
    suspensionBalanceHandle: hexlify(handles[1]),
    aeroPackageHandle: hexlify(handles[2]),
    tireCompoundHandle: hexlify(handles[3]),
    boostResponseHandle: hexlify(handles[4]),
    brakeBiasHandle: hexlify(handles[5]),
    tractionControlHandle: hexlify(handles[6]),
    signature: hexlify(inputProof)
  };
};
