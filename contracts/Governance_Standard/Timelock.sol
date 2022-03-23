//we want to wait for new vote to be executed
//everyone who holds the governance token "has to pay 7 tokens", let's assume.
//give time to users to back off, if they don't wan to govern. 

//Timelock will own the Box contract

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract Timelock is TimelockController {

    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors
    ) TimelockController(minDelay, proposers, executors) {}
}