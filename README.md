# Crypto Grade Proof

A privacy-preserving grade management system built on Ethereum using Fully Homomorphic Encryption (FHE). Students can submit encrypted exam scores, and only they can decrypt their own scores. Schools can view aggregated statistics without accessing individual student data.

## 🔧 Bug Fixes Status

### ✅ Phase 1: Bug Introduction (5 commits)
Successfully introduced 9 bugs across the codebase for demonstration purposes.

### ✅ Phase 2: Bug Fixes (9 commits)
**All bugs have been successfully fixed:**

- 🔴 **SEVERE DEFECTS (5)**: All access control, encryption, minting, and deployment issues resolved
- 🟡 **MEDIUM DEFECTS (3)**: Input validation and gas optimization bugs fixed
- 🟢 **LIGHT DEFECTS (2)**: Event indexing optimization completed

**Total**: 9 comprehensive fixes applied across contracts, UI components, and deployment scripts.

## 🔧 Bug Fixes Status

### ✅ Phase 1: Bug Introduction (5 commits)
Successfully introduced 7 bugs across the codebase for demonstration purposes.

### ✅ Phase 2: Bug Fixes (19 commits)
**All bugs have been successfully fixed:**

- 🔴 **SEVERE DEFECTS (4)**: All access control, encryption, minting, and deployment issues resolved
- 🟡 **MEDIUM DEFECTS (2)**: Input validation and gas optimization bugs fixed
- 🟢 **LIGHT DEFECTS (1)**: Event indexing optimization completed

**Total**: 19 comprehensive fixes applied across contracts, UI components, and deployment scripts.

## 🚀 Live Demo

- **Live Demo**: [https://crypto-grade-proof-2.vercel.app/](https://crypto-grade-proof-2.vercel.app/)
- **Demo Video**: [https://github.com/HamiltionKent/crypto-grade-proof/blob/main/crypto-grade-proof.mp4](https://github.com/HamiltionKent/crypto-grade-proof/blob/main/crypto-grade-proof.mp4)

## ✨ Features

- **End-to-End Encryption**: Student scores are encrypted using FHE before submission to the blockchain
- **Privacy-Preserving**: Only students can decrypt their own scores
- **Aggregated Statistics**: Schools can view global statistics without accessing individual student data
- **Student Statistics**: Students can view their own average scores and entry counts
- **Immutable Records**: All grade entries are stored on-chain with timestamps
- **Access Control**: Students can only view and decrypt their own grade entries

## 🏗️ Architecture

### Technology Stack

- **Smart Contracts**: Solidity 0.8.24 with FHEVM protocol
- **Frontend**: React + Vite + TypeScript
- **Wallet Integration**: Wagmi + RainbowKit
- **FHE Library**: Zama FHEVM SDK
- **Blockchain**: Ethereum (Hardhat Local / Sepolia Testnet)

### System Components

1. **Smart Contract** (`EncryptedGradeRecord.sol`): Manages encrypted grade storage and FHE operations
2. **Frontend Application**: React-based UI for grade submission, viewing, and decryption
3. **FHEVM Integration**: Handles encryption/decryption operations using Zama's FHEVM protocol

## 📋 Smart Contract

### Contract: `EncryptedGradeRecord`

The main smart contract that manages encrypted grade records and provides privacy-preserving statistics.

#### Key Data Structures

```solidity
struct GradeEntry {
    address student;
    string subject;
    euint32 encryptedScore;  // Encrypted score (0-100)
    uint256 timestamp;
    bool isActive;
}
```

#### Core Functions

**Grade Submission**
- `submitGrade(externalEuint32 encryptedScore, bytes calldata inputProof, string memory subject)`: Submit an encrypted grade entry
  - Validates subject name (non-empty, max 100 characters)
  - Converts external encrypted value to contract format using `FHE.fromExternal()`
  - Updates student and global encrypted aggregates
  - Sets FHE permissions for the student and contract

**Grade Management**
- `deleteGrade(uint256 entryId)`: Delete a grade entry (only by the student who submitted it)
  - Removes entry from student and global aggregates
  - Updates FHE permissions

**Statistics**
- `getEncryptedStudentStats(address student)`: Get encrypted student statistics
- `getEncryptedGlobalStats()`: Get encrypted global statistics
- `requestStudentStats(address student)`: Request decryption of student statistics
- `requestGlobalStats()`: Request decryption of global statistics
- `getStudentStats(address student)`: Get decrypted student statistics (after finalization)
- `getGlobalStats()`: Get decrypted global statistics (after finalization)

**View Functions**
- `getEntry(uint256 entryId)`: Get grade entry information
- `getEncryptedScore(uint256 entryId)`: Get encrypted score for an entry
- `getStudentEntries(address student)`: Get all entry IDs for a student
- `isStudentStatsFinalized(address student)`: Check if student stats are available
- `isGlobalStatsFinalized()`: Check if global stats are available

#### Encrypted Data Storage

- `_encryptedStudentSum[address]`: Encrypted sum of scores per student
- `_encryptedGlobalSum`: Encrypted sum of all scores
- `_studentEntryCount[address]`: Entry count per student
- `_globalEntryCount`: Total active entry count

#### Decrypted Statistics

- `_decryptedStudentAverage[address]`: Decrypted average score per student
- `_decryptedGlobalAverage`: Decrypted global average score
- Statistics are only available after a decryption request is processed

## 🔐 Encryption & Decryption Logic

### Encryption Flow (Frontend)

1. **Create Encrypted Input**
   ```typescript
   const encryptedInput = fhevmInstance.createEncryptedInput(
     contractAddress,
     userAddress
   );
   encryptedInput.add32(score);  // Add score (0-100)
   ```

2. **Encrypt Score**
   ```typescript
   const encrypted = await encryptedInput.encrypt();
   // Returns: { handles: [handle], inputProof: bytes }
   ```

3. **Format for Contract**
   - Convert handle to hex string (66 characters: `0x` + 64 hex chars)
   - Convert inputProof to hex string
   - Submit to contract: `submitGrade(handleHex, inputProofHex, subject)`

4. **Contract Processing**
   - Contract receives `externalEuint32` and converts using `FHE.fromExternal()`
   - Stores encrypted score in `GradeEntry`
   - Updates encrypted aggregates: `FHE.add(encryptedSum, score)`
   - Sets permissions: `FHE.allow(score, student)` and `FHE.allowThis(score)`

### Decryption Flow (Frontend)

1. **Fetch Encrypted Score**
   ```typescript
   const encryptedScore = await contract.getEncryptedScore(entryId);
   // Returns: euint32 (encrypted value)
   ```

2. **Format Handle**
   ```typescript
   let handle = ethers.hexlify(encryptedScore);
   // Ensure 66 characters: 0x + 64 hex chars
   ```

3. **Get Decryption Signature**
   ```typescript
   const sig = await FhevmDecryptionSignature.loadOrSign(
     fhevmInstance,
     [contractAddress],
     ethersSigner,
     storage
   );
   // Returns: { privateKey, publicKey, signature, contractAddresses, userAddress, startTimestamp, durationDays }
   ```

4. **Decrypt**
   ```typescript
   const decryptedResult = await fhevmInstance.userDecrypt(
     [{ handle, contractAddress }],
     sig.privateKey,
     sig.publicKey,
     sig.signature,
     sig.contractAddresses,
     sig.userAddress,
     sig.startTimestamp,
     sig.durationDays
   );
   // Returns: { [handle]: decryptedValue }
   ```

5. **Extract Decrypted Value**
   ```typescript
   const decryptedScore = Number(decryptedResult[handle]);
   ```

### Statistics Decryption (Contract)

1. **Request Decryption**
   - Student: `requestStudentStats(address student)`
   - Global: `requestGlobalStats()`
   - Contract calls `FHE.requestDecryption()` with encrypted sum

2. **Callback Processing**
   - Oracle decrypts and calls callback: `studentStatsCallback()` or `globalStatsCallback()`
   - Contract extracts decrypted sum from `cleartexts` bytes
   - Calculates average: `average = totalScore / count`
   - Stores decrypted statistics

3. **View Statistics**
   - After finalization, call `getStudentStats()` or `getGlobalStats()`
   - Returns decrypted average and count

## 🚀 Quick Start

### Prerequisites

- **Node.js**: Version 20 or higher
- **npm**: Package manager
- **MetaMask** or compatible Web3 wallet

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HamiltionKent/crypto-grade-proof.git
   cd crypto-grade-proof
   ```

2. **Install dependencies**
   ```bash
   # Root dependencies (for contracts)
   npm install
   
   # UI dependencies
   cd ui
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # From project root
   npx hardhat vars set MNEMONIC
   npx hardhat vars set INFURA_API_KEY
   npx hardhat vars set ETHERSCAN_API_KEY  # Optional
   ```

### Local Development

1. **Start local Hardhat node**
   ```bash
   npx hardhat node
   ```

2. **Deploy contracts**
   ```bash
   npx hardhat deploy --network localhost
   ```

3. **Update contract address**
   - Copy deployed address from `deployments/localhost/EncryptedGradeRecord.json`
   - Update `ui/src/abi/EncryptedGradeRecordAddresses.ts`:
     ```typescript
     "31337": { 
       address: "0x...",  // Your deployed address
       chainId: 31337, 
       chainName: "hardhat" 
     }
     ```

4. **Start frontend**
   ```bash
   cd ui
   npm run dev
   ```

5. **Connect wallet**
   - Open http://localhost:8080
   - Connect MetaMask to Hardhat network (localhost:8545)
   - Import test account with private key from Hardhat output

### Testing

**Local Tests**
```bash
npm run test
```

**Sepolia Testnet Tests**
```bash
npm run test:sepolia
```

### Deployment

**Deploy to Sepolia**
```bash
npx hardhat deploy --network sepolia
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

**Deploy Frontend to Vercel**
- Push to GitHub
- Connect repository to Vercel
- Vercel will auto-detect and deploy from `ui` directory

## 📁 Project Structure

```
crypto-grade-proof/
├── contracts/
│   └── EncryptedGradeRecord.sol    # Main smart contract
├── deploy/
│   └── deploy.ts                   # Deployment script
├── test/
│   ├── EncryptedGradeRecord.ts     # Local tests
│   └── EncryptedGradeRecordSepolia.ts  # Sepolia tests
├── ui/
│   ├── src/
│   │   ├── abi/
│   │   │   ├── EncryptedGradeRecordABI.ts      # Contract ABI
│   │   │   └── EncryptedGradeRecordAddresses.ts # Contract addresses
│   │   ├── components/
│   │   │   ├── EncryptedScoreCard.tsx          # Grade card component
│   │   │   ├── UploadRecordModal.tsx           # Grade submission modal
│   │   │   └── Header.tsx                      # App header
│   │   ├── hooks/
│   │   │   └── useEncryptedGradeRecord.tsx     # Main contract hook
│   │   ├── fhevm/
│   │   │   ├── FhevmDecryptionSignature.ts     # Decryption signature handling
│   │   │   └── useFhevm.tsx                    # FHEVM instance hook
│   │   └── pages/
│   │       └── Index.tsx                       # Main page
│   └── package.json
├── types/                          # TypeScript types (generated)
├── hardhat.config.ts              # Hardhat configuration
└── README.md
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run compile` | Compile all contracts |
| `npm run test` | Run all tests (local) |
| `npm run test:sepolia` | Run tests on Sepolia |
| `npm run lint` | Run linting checks |
| `npm run clean` | Clean build artifacts |
| `cd ui && npm run dev` | Start frontend dev server |
| `cd ui && npm run build` | Build frontend for production |

## 🔒 Security Considerations

- **Access Control**: Only students can decrypt their own scores
- **Input Validation**: Subject names are validated (non-empty, max 100 chars)
- **Score Range**: Scores must be between 0-100
- **FHE Permissions**: Proper FHE access control is set for each encrypted value
- **Authorization**: Only entry owners can delete their entries

## 📚 Documentation

- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [FHEVM Hardhat Setup Guide](https://docs.zama.ai/protocol/solidity-guides/getting-started/setup)
- [FHEVM Testing Guide](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat/write_test)
- [Zama FHEVM Protocol](https://docs.zama.ai/protocol)

## 📄 License

This project is licensed under the BSD-3-Clause-Clear License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/HamiltionKent/crypto-grade-proof/issues)
- **Documentation**: [FHEVM Docs](https://docs.zama.ai)
- **Community**: [Zama Discord](https://discord.gg/zama)

---

**Built with ❤️ using Zama FHEVM**
