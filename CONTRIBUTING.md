# Contributing to Crypto Grade Proof

Thank you for your interest in contributing to Crypto Grade Proof! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/crypto-grade-proof.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`
5. Make your changes and test thoroughly
6. Submit a pull request

## 📋 Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write comprehensive tests for new features
- Maintain clear commit messages

### Testing
- Write unit tests for smart contracts using Hardhat
- Test UI components with React Testing Library
- Ensure all tests pass before submitting PR
- Test FHE functionality with proper test vectors

### Security
- Never commit private keys or sensitive data
- Follow secure coding practices for blockchain applications
- Validate all inputs and handle edge cases
- Use established cryptographic libraries

## 🔧 Development Setup

### Prerequisites
- Node.js 20+
- npm or yarn
- MetaMask or compatible Web3 wallet

### Local Development
```bash
# Install dependencies
npm install

# Start local blockchain
npm run node

# Deploy contracts
npm run deploy:localhost

# Start UI development server
cd ui && npm run dev
```

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same BSD-3-Clause-Clear license as the project.
