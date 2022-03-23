import { network } from "hardhat"

export async function moveTime(amount: number){
    console.log("moving blocks and time>>>>>>>");
    await network.provider.send('evm_increaseTime', [amount]);
    console.log(`Moved forward in time ${amount} seconds>>>>>>>>>>>>>>>>>`);
}