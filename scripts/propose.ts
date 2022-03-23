// @ts-ignore
import { ethers, network } from "hardhat"
import { 
    NEW_STORE_VALUE, 
    FUNC, 
    PROPOSAL_DESCRIPTION, 
    developmentChains, 
    VOTING_DELAY,
    proposalsFile } from "../helperHardhatConfig";
import { moveBlocks } from "../utils/moveBlocks";
import * as fs from "fs"

export async function Propose(args: any[], 
    functionToCall: string, 
    proposalDescription: string) 
    {

    const governor = await ethers.getContractAt("GovernorContract", '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0');
    const box = await ethers.getContractAt("Box", '0x5FbDB2315678afecb367f032d93F642f64180aa3');

    //because in the propose function, it takes bytes calldata that what function to call in bytes. 
    const encodedFunctionCall = box.interface.encodeFunctionData(functionToCall, args);
    
    console.log(`proposing ${functionToCall} on ${box.address} with args ${args}`);
    console.log(`proposal description: \n ${proposalDescription}`);

    console.log("proposing>>>>>>>>>");

    const proposeTx = await governor.propose(
        [box.address],
        [0],
        [encodedFunctionCall],
        proposalDescription,
        {
            gasLimit: 30000000,
            gasPrice: 908478342
        }
    );

    //we will also get the proposalId from the event and we will use it to vote later
    const proposeReceipt = await proposeTx.wait(1);

    //speeding time for testing purposes
    
    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_DELAY + 2)
    }

    const proposalId = proposeReceipt.events[0].args.proposalId;
    console.log(`Proposed with proposal ID:\n  ${proposalId}`)

    const proposalState = await governor.state(proposalId);
    const proposalSnapShot = await governor.proposalSnapshot(proposalId);
    const proposalDeadline = await governor.proposalDeadline(proposalId);

    let proposals = JSON.parse(fs.readFileSync('proposals.json', "utf-8"));
    //storing proposals by their chainId
    proposals[network.config.chainId!.toString()].push(proposalId.toString());
    fs.writeFileSync('proposals.json', JSON.stringify(proposals));

    // The state of the proposal. 1 is not passed. 0 is passed.
    console.log(`Current Proposal State: ${proposalState}`);
    // What block # the proposal was snapshot
    console.log(`Current Proposal Snapshot: ${proposalSnapShot}`);
    // The block number the proposal voting expires
    console.log(`Current Proposal Deadline: ${proposalDeadline}`);
};

Propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
});

