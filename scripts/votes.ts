import { developmentChains, VOTING_PERIOD } from "../helperHardhatConfig";
import * as fs from "fs";
import { moveBlocks } from "../utils/moveBlocks";
import { network } from "hardhat";
// @ts-ignore
import {ethers} from "hardhat";

const index = 0

// async function vote(proposalIndex: number) {
//     const proposals = JSON.parse(fs.readFileSync('proposals.json', "utf-8"));
//     const proposalId = proposals[network.config.chainId!][proposalIndex];
//     //0=against 1=for 2=abstain
//     const voteWay = 1;
//     const governor = await ethers.getContract("GovernorContract");
//     const reason = "We are voting for the store function";
//     console.log(proposalId)
//     const voteTxResponse = await governor.castVoteWithReason(proposalId, voteWay, reason);
//     await voteTxResponse.wait(1);
//     console.log('here2')
//     console.log(voteTxResponse.events[0].args.reason);

//     const proposalState = await governor.state(proposalId);
//     console.log(`Current Proposal State: ${proposalState}`);

//     //speeding time for testing purposes
//     if (developmentChains.includes(network.name)) {
//         await moveBlocks(VOTING_PERIOD + 1)
//     }

//     console.log("voted, ready to go >>>>>>>>>");
// }

// vote(index)
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error)
//     process.exit(1)
// });

async function main(proposalIndex: number) {
    const proposals = JSON.parse(fs.readFileSync('proposals.json', "utf8"));
    const proposalId = proposals[network.config.chainId!][proposalIndex];
    //0 = Against, 
    //1 = For, 
    //2 = Abstain.
    const voteWay = 1;
    const reason = "We are voting for the store function";
    await vote(proposalId, voteWay, reason);
}
  
export async function vote(proposalId: string, voteWay: number, reason: string) {
  const governor = await ethers.getContract("GovernorContract");
    console.log("calling vote >>>>>>>>>>");
    const proposalState = await governor.state(proposalId);
    console.log(`Current Proposal State: ${proposalState}`);
    const voteTx = await governor.castVoteWithReason(proposalId, voteWay, reason);
    const voteTxReceipt = await voteTx.wait(1);
    if (developmentChains.includes(network.name)) {
      await moveBlocks(VOTING_PERIOD + 2);
    }
    console.log(voteTxReceipt.events[0].args.reason);
}
  
main(index)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
});