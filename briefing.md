# EncryptedRally-Championship Briefing

EncryptedRally-Championship is an on-chain racing league where vehicle tuning and performance remain confidential.

## Features
- `RaceManager` contract uses `FHE.randEuint32` to generate track conditions.
- Vehicle attributes are represented by `euint16`, combined with equipment bonuses via `FHE.mul`.
- Drivers can record car models (plaintext) and tuning parameters (ciphertext) on-chain to build custom race cars.
- Rankings are compared using `FHE.lt`, with results decrypted by Gateway after the league ends.

## Next Steps
- Add seasonal system and points accumulation.
- Build race replays with only aggregated statistics output.
