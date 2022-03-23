// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20Votes {

    uint256 public storage_maxSupply = 1000000000000000000000000;

    constructor() ERC20("GovernanceToken", "GT") ERC20Permit("GovernanceToken") {
        _mint(msg.sender, storage_maxSupply);
    }

    /**
    someone buys tokens, millions, let say to vote on a proposal
    and then they dump it, so to avoid this, we will have a snapshot of tokens
    people have at a certain blocks, for this we imported and used Governance from openzeppelin */

    // The functions below are overrides required by Solidity.

    //anytime we do "afterTokenTransfer, anytime we transfer token, we make sure, we call 
    //afterTokenTransfer on ERC20Votes", we do this to be sure that snapshots are updated. 
    //we want to know how many people have how many tokens at each block. 
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20Votes) {
        super._burn(account, amount);
    }
}



