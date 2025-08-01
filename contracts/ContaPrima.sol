// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Declaratia112.sol";
import "./Declartia100.sol";
import "./Declaratia300.sol";
import "./Declaratia394.sol";
import "./ERC20RON.sol";

contract ContaPrima {
    Declaratia112 public declaratia112;
    Declartia100 public declartia100;
    Declaratia300 public declaratia300;
    Declaratia394 public declaratia394;
    ERC20RON public erc20ron;

    enum Declaratia {
        Declaratia112, //0
        Declartia100, //1
        Declaratia300, //2
        Declaratia394 //3
    }

    constructor() {
        declaratia112 = new Declaratia112();
        declartia100 = new Declartia100();
        declaratia300 = new Declaratia300();
        declaratia394 = new Declaratia394();
        erc20ron = new ERC20RON();
    }

    //address => declaratia => amount  
    mapping(address => mapping(Declaratia => uint256)) public declaratiaAmount;

    function payForDeclaratia112(uint256 amount) public {   
        //approve the contract to spend the tokens
        require(amount > 0, "Amount must be greater than 0");
        erc20ron.approve(address(this), amount);
        erc20ron.transferFrom(msg.sender, address(this), amount);
        declaratia112.payForDeclaratia112(msg.sender, amount);
        declaratiaAmount[msg.sender][Declaratia.Declaratia112] += amount;
    }


    function payForDeclaratia300(uint256 amount) public {
        //approve the contract to spend the tokens
        require(amount > 0, "Amount must be greater than 0");
        erc20ron.approve(address(this), amount);
        erc20ron.transferFrom(msg.sender, address(this), amount);
        declaratia300.payForDeclaratia300(msg.sender, amount);
        declaratiaAmount[msg.sender][Declaratia.Declaratia300] += amount;
    }

    function payForDeclaratia394(uint256 amount) public {
        //approve the contract to spend the tokens
        require(amount > 0, "Amount must be greater than 0");
        erc20ron.approve(address(this), amount);
        erc20ron.transferFrom(msg.sender, address(this), amount);
        declaratia394.payForDeclaratia394(msg.sender, amount);
        declaratiaAmount[msg.sender][Declaratia.Declaratia394] += amount;
    }

    function payForDeclartia100(uint256 amount) public {
        //approve the contract to spend the tokens
        require(amount > 0, "Amount must be greater than 0");
        erc20ron.approve(address(this), amount);
        erc20ron.transferFrom(msg.sender, address(this), amount);
        declartia100.payForDeclartia100(msg.sender, amount);
        declaratiaAmount[msg.sender][Declaratia.Declartia100] += amount;
    }
}
