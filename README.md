# MultiSig Vault Security Layer 🔐

An expert-grade smart contract vault designed to eliminate single points of failure. This implementation requires a predefined threshold of owners to confirm a transaction before execution.

## Core Features
- **M-of-N Authorization**: Custom thresholds (e.g., 2-of-3, 3-of-5 signatures).
- **Transaction Queue**: Proposals are submitted, stored, and await confirmation.
- **Revocable Votes**: Owners can revoke their confirmation before execution.
- **ETH & ERC20 Compatibility**: Securely manage any asset on the EVM.

## How It Works
1. **Submit**: An owner proposes a transaction (destination, value, data).
2. **Confirm**: Other owners call `confirmTransaction`.
3. **Execute**: Once the threshold is met, anyone can trigger `executeTransaction`.

## Tech Stack
- Solidity ^0.8.24
- Hardhat / Foundry
- OpenZeppelin (for ReentrancyGuard)
