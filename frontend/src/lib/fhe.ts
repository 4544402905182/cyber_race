import { getAddress, hexlify } from 'ethers';

declare global {
  interface Window {
    relayerSDK?: {
      initSDK: () => Promise<void>;
      createInstance: (config: Record<string, unknown>) => Promise<any>;
      SepoliaConfig: Record<string, unknown>;
    };
  }
}

let fheInstance: any = null;
let sdkPromise: Promise<any> | null = null;

const SDK_URL = 'https://cdn.zama.ai/relayer-sdk-js/0.2.0/relayer-sdk-js.js';

const loadSdk = async (): Promise<any> => {
  if (typeof window === 'undefined') {
    throw new Error('FHE SDK requires browser environment');
  }

  if (window.relayerSDK) {
    return window.relayerSDK;
  }

  if (!sdkPromise) {
    sdkPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${SDK_URL}"]`) as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener('load', () => resolve(window.relayerSDK));
        existing.addEventListener('error', () => reject(new Error('Failed to load FHE SDK')));
        return;
      }

      const script = document.createElement('script');
      script.src = SDK_URL;
      script.async = true;
      script.onload = () => {
        if (window.relayerSDK) {
          resolve(window.relayerSDK);
        } else {
          reject(new Error('relayerSDK unavailable after load'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load FHE SDK'));
      document.body.appendChild(script);
    });
  }

  return sdkPromise;
};

export const initializeFHE = async (): Promise<any> => {
  if (fheInstance) {
    return fheInstance;
  }

  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Ethereum provider not found');
  }

  const sdk = await loadSdk();
  if (!sdk) {
    throw new Error('FHE SDK not available');
  }

  await sdk.initSDK();

  const config = {
    ...sdk.SepoliaConfig,
    network: window.ethereum,
  };

  fheInstance = await sdk.createInstance(config);
  return fheInstance;
};

export const getFHEInstance = (): any => fheInstance;

const ensureFHE = async (): Promise<any> => {
  return fheInstance ?? (await initializeFHE());
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
  const fhe = await ensureFHE();
  const contractAddressChecksum = getAddress(contractAddress);
  const ciphertext = await fhe.createEncryptedInput(contractAddressChecksum, userAddress);

  // Add all values in correct order matching contract parameters
  ciphertext.add16(engineTuning);        // euint16
  ciphertext.add16(suspensionBalance);   // euint16
  ciphertext.add16(aeroPackage);         // euint16
  ciphertext.add16(tireCompound);        // euint16
  ciphertext.add8(boostResponse);        // euint8
  ciphertext.add8(brakeBias);            // euint8
  ciphertext.add8(tractionControl);      // euint8

  const { handles, inputProof } = await ciphertext.encrypt();

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
