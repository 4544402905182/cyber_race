# EncryptedRally-Championship 简报

EncryptedRally-Championship 是一款链上赛车联赛，车辆调校与成绩保持机密。

## 特点
- `RaceManager` 合约使用 `FHE.randEuint32` 生成赛道条件。
- 车辆属性由 `euint16` 表示，`FHE.mul` 结合装备加成。
- 车手可上链记录车型（明文）与调校参数（密文），打造专属赛车。
- 排名通过 `FHE.lt` 比较，结果在联赛结束后由 Gateway 解密。

## 下一步
- 增加赛季制与积分累计。
- 构建观赛回放，只输出模糊统计。
