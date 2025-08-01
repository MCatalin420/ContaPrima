// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Declartia100 {
    mapping(address => uint256) public firmaAmount; //firma x => amount

    function payForDeclartia100(address firma, uint256 amount) public {
        firmaAmount[firma] += amount;   
    }
}
