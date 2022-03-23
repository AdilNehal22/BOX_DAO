# BOX_DAO

I created a Decentralized Autonomous Organization (DAO) on my most simple BOX contract. 
I used the Openzeppelin guide of maintaining on-chain governance. Moreover, Openzeppelin's secure smartcontracts are integrated for making the work easy. 

# Explaination of Contracts

Make your any contract, it can be even on supply chain management or more complex contract. Then you will make a Token contract, it can be both NFT or ERC20,
I prefered ERC20 for voting. I called the function _afterTokenTransfer() on my tokens because whenever the token will be minted it will take the snapshots 
along with the address. omeone buys tokens, millions, let say to vote on a proposal
    and then they dump it, so to avoid this, we will have a snapshot of tokens
    people have at a certain blocks, for this we imported and used Governance from openzeppelin */

    // The functions below are overrides required by Solidity.

    //anytime we do "afterTokenTransfer, anytime we transfer token, we make sure, we call 
    //afterTokenTransfer on ERC20Votes", we do this to be sure that snapshots are updated. 
    //we want to know how many people have how many tokens at each block. 
    
    
It is an important factor of a DAO that we transfer the main functionaity under the governorship of a timelock controller. After this, we will make a main 
governor contract with functionalities of quorum, getVotes, state, propose, execute, queue, cancel, I've added these functionalities using openzeppelin
contracts, after going through all of them, and not just copying from them. 

# Explaination of deployments and setup

Here after deploying the box contract, I transfered its functionalities to timelock controller. governor contract will be deployed along with its
parameter. After deploying the token contract we will delegate the voting power to the deployer. Finally, we will make and assign the proposer, admin,
and executor role to the entities. 


# Explaination of scripts.
 The scripts are very simple, you will first propose a function from Box contract, then everyone will vote if it should be executed or not, then finally,
 we put the proposal on queue and execute it. 




