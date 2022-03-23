// @ts-ignore
import { ethers, network } from "hardhat";
import {
  FUNC,
  NEW_STORE_VALUE,
  PROPOSAL_DESCRIPTION,
  MIN_DELAY,
  developmentChains,
} from "../helperHardhatConfig"
import { moveBlocks } from "../utils/moveBlocks";
import { moveTime } from "../utils/moveTime";

export async function queueAndExecute(){

  const args = [NEW_STORE_VALUE];
  const functionToCall = FUNC;
  const box = await ethers.getContract("Box");
  const governor = await ethers.getContract("GovernorContract");
  const encodedFunctionCall = box.interface.encodeFunctionData(functionToCall, args);
  const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION));

  console.log("calling the queue function>>>>>>>>>");
  const queueTx = await governor.queue([box.address], [0], [encodedFunctionCall], descriptionHash);
  await queueTx.wait(1);

  if(developmentChains.includes(network.name)){
      await moveTime(MIN_DELAY + 1);
      await moveBlocks(1);
  }

  console.log("calling the execute function>>>>>>>");
  const executeTx = await governor.execute(
      [box.address],
      [0],
      [encodedFunctionCall],
      descriptionHash
  );
  await executeTx.wait(1);

  const boxStoreNewValue = await box.retrieve();
  console.log(boxStoreNewValue.toString());

}

queueAndExecute()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
});
