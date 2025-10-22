# EncryptedRally Championship - 部署指南

## 📋 前置要求

1. **Sepolia测试网ETH**
   - 从水龙头获取测试ETH：
     - https://sepoliafaucet.com/
     - https://www.alchemy.com/faucets/ethereum-sepolia
   - 建议余额：>0.5 ETH (用于部署和测试)

2. **钱包私钥**
   - 从MetaMask导出私钥（不要包含0x前缀）
   - ⚠️ 警告：仅用于测试网，不要使用主网钱包

3. **Etherscan API Key** (可选，用于合约验证)
   - 访问：https://etherscan.io/apis
   - 注册并创建免费API Key

## 🔧 配置步骤

### 1. 配置环境变量

编辑 `.env` 文件：

\`\`\`bash
# 你的Sepolia测试网钱包私钥（不要包含0x）
PRIVATE_KEY=your_private_key_here

# Sepolia RPC URL（默认即可）
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com

# Etherscan API Key（可选）
ETHERSCAN_API_KEY=your_api_key_here
\`\`\`

### 2. 编译合约

\`\`\`bash
npm run compile
\`\`\`

预期输出：
\`\`\`
Compiled 1 Solidity file successfully
\`\`\`

### 3. 部署到Sepolia

\`\`\`bash
npm run deploy
\`\`\`

部署脚本会：
- ✅ 显示部署账户和余额
- ✅ 部署EncryptedRallyChampionship合约
- ✅ 显示合约地址
- ✅ 自动验证合约（如果配置了ETHERSCAN_API_KEY）

## 📝 部署后步骤

### 1. 更新前端配置

复制部署脚本输出的合约地址，然后更新：

\`\`\`typescript
// frontend/src/lib/contract.ts
export const CONTRACT_ADDRESS = "0x您的合约地址";
\`\`\`

### 2. 测试流程

1. **连接钱包**
   - 打开 http://localhost:8082
   - 连接MetaMask（确保在Sepolia网络）

2. **选择车型**
   - 选择一款性能车（BMW M3, Mercedes-AMG, Honda, Porsche等）
   - 车型以明文形式存储

3. **选择配件**
   - Engine（引擎）
   - Suspension（悬挂）
   - Body（车身）
   - Wheels（轮胎）
   - Transmission（变速箱）
   - Exhaust（排气）

4. **购买升级**
   - 点击"PURCHASE UPGRADES"按钮
   - FHE加密配件参数（客户端完成）
   - 确认交易（MetaMask弹窗）
   - 等待交易确认

## 🔒 FHE加密流程

### 配件参数映射：

| 前端配件类别 | 映射到合约参数 | 加密类型 |
|------------|---------------|---------|
| Engine (speed + acceleration) | engineTuning | euint16 |
| Suspension (handling + durability) | suspensionBalance | euint16 |
| Body (speed + handling) | aeroPackage | euint16 |
| Wheels (handling + speed) | tireCompound | euint16 |
| Transmission (acceleration) | boostResponse | euint8 |
| Wheels (durability) | brakeBias | euint8 |
| Transmission (handling) | tractionControl | euint8 |

### 加密过程：

\`\`\`
用户选择配件 → 计算boost值 → FHE加密 → 生成7个handles + proof
                                       ↓
                         提交到合约updateCarSetup()
                                       ↓
                          配件参数以密文存储在链上
\`\`\`

## 🎯 合约功能

### 主要函数：

1. **updateCarSetup** - 更新车辆配置（FHE加密）
   \`\`\`solidity
   function updateCarSetup(
       string calldata carModel,              // 车型（明文）
       externalEuint16 engineTuningInput,     // 引擎（加密）
       externalEuint16 suspensionBalanceInput,// 悬挂（加密）
       externalEuint16 aeroPackageInput,      // 空气动力（加密）
       externalEuint16 tireCompoundInput,     // 轮胎（加密）
       externalEuint8 boostResponseInput,     // 增压（加密）
       externalEuint8 brakeBiasInput,         // 刹车（加密）
       externalEuint8 tractionControlInput,   // 牵引（加密）
       bytes calldata inputProof              // FHE证明
   )
   \`\`\`

2. **registerDriver** - 注册为车手

3. **createChampionship** - 创建锦标赛（仅管理员）

4. **submitRally** - 提交比赛结果（FHE加密）

## 🔍 验证部署

### 检查合约状态：

\`\`\`bash
# 在Hardhat console中
npx hardhat console --network sepolia
\`\`\`

\`\`\`javascript
const contract = await ethers.getContractAt("EncryptedRallyChampionship", "YOUR_CONTRACT_ADDRESS");

// 检查合约所有者
await contract.owner();

// 检查当前锦标赛
await contract.currentChampionshipId();
\`\`\`

## 🐛 故障排查

### 问题1: 部署失败 - Gas不足
**解决**：确保Sepolia账户有足够ETH（建议>0.5 ETH）

### 问题2: 验证失败
**解决**：手动验证
\`\`\`bash
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS
\`\`\`

### 问题3: RPC连接失败
**解决**：切换RPC节点
\`\`\`bash
# 在.env中更换
SEPOLIA_RPC_URL=https://rpc.ankr.com/eth_sepolia
\`\`\`

## 📚 相关链接

- Sepolia Etherscan: https://sepolia.etherscan.io/
- Zama FHE文档: https://docs.zama.ai/
- Hardhat文档: https://hardhat.org/docs
