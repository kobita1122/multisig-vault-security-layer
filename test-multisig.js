const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiSigWallet", function () {
  it("Should require multiple confirmations to execute", async function () {
    const [owner1, owner2, owner3, receiver] = await ethers.getSigners();
    const MultiSig = await ethers.getContractFactory("MultiSigWallet");
    
    // Deploy with 2-of-3 requirement
    const multisig = await MultiSig.deploy([owner1.address, owner2.address, owner3.address], 2);
    
    // Fund the wallet
    await owner1.sendTransaction({ to: await multisig.getAddress(), value: ethers.parseEther("1.0") });

    // Submit Tx
    await multisig.connect(owner1).submitTransaction(receiver.address, ethers.parseEther("0.5"), "0x");
    
    // Try to execute (should fail with 0 confirmations)
    await expect(multisig.connect(owner1).executeTransaction(0)).to.be.revertedWith("Not enough confirmations");

    // Confirm once
    await multisig.connect(owner1).confirmTransaction(0);
    
    // Confirm second time and execute
    await multisig.connect(owner2).confirmTransaction(0);
    await multisig.connect(owner2).executeTransaction(0);

    const balance = await ethers.provider.getBalance(receiver.address);
    expect(balance).to.be.above(ethers.parseEther("10000.4")); // Assuming 10k start
  });
});
