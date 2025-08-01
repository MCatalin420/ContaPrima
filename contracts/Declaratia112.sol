// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Declaratia112 {

    mapping(address => uint256) public firmaAmount; //firma x => amount

    function payForDeclaratia112(address firma, uint256 amount) public {
        firmaAmount[firma] += amount;   
    }

}
