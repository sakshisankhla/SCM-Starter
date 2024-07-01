// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    uint256 public lastTransactionAmount;
    bool public lastTransactionStatus;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event TransactionStatus(uint256 amount, bool status);
    event LastTransaction(uint256 amount, bool status);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");

        uint256 _previousBalance = balance;
        balance += _amount;

        emit Deposit(_amount);
        emit TransactionStatus(_amount, true);

        lastTransactionAmount = _amount;
        lastTransactionStatus = true;
        emit LastTransaction(_amount, true);
    }

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(balance >= _withdrawAmount, "Insufficient balance");

        uint256 _previousBalance = balance;
        balance -= _withdrawAmount;

        emit Withdraw(_withdrawAmount);
        emit TransactionStatus(_withdrawAmount, true);

        lastTransactionAmount = _withdrawAmount;
        lastTransactionStatus = true;
        emit LastTransaction(_withdrawAmount, true);
    }

    function checkTransactionStatus() public view returns(uint256, bool) {
        return (lastTransactionAmount, lastTransactionStatus);
    }

    function getLastTransaction() public view returns(uint256, bool) {
        return (lastTransactionAmount, lastTransactionStatus);
    }
}
