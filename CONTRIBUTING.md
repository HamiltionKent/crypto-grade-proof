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

## 🐛 Bug Reports

Please use the GitHub issue tracker to report bugs. Include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/console logs
- Environment details

## 💡 Feature Requests

Feature requests are welcome! Please:
- Check existing issues first
- Clearly describe the proposed feature
- Explain the use case and benefits
- Consider implementation complexity

## 📝 Pull Request Process

1. Ensure your code follows the project's style guidelines
2. Update documentation if needed
3. Add tests for new functionality
4. Ensure CI checks pass
5. Request review from maintainers

## 🎯 Areas for Contribution

- Smart contract optimizations
- UI/UX improvements
- Documentation enhancements
- Test coverage expansion
- Performance optimizations
- Security audits

## 📞 Contact

For questions or discussions:
- GitHub Issues: [Report bugs or request features](https://github.com/yourusername/crypto-grade-proof/issues)
- Community: [Zama Discord](https://discord.gg/zama)

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same BSD-3-Clause-Clear license as the project.
