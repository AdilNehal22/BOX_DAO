//will ask the timelock that only the governor contract will be the proposer, and then anyone can execute.
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types"
// @ts-ignore
import { ethers } from "hardhat";
import { ZERO_ADDRESS } from "../helperHardhatConfig"

const setUpContract: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    //grabbing from config
    const { deployer } = await getNamedAccounts();
    const timelock = await ethers.getContract("Timelock", deployer);
    const governor = await ethers.getContract("GovernorContract", deployer);

    log("setting up roles>>>>>>>>>>>>>>>>>>");

    //only governor can send to timelock, governor is proposer(representative), and timelock in president
    const proposerRole = await timelock.PROPOSER_ROLE();
    const executorRole = await timelock.EXECUTOR_ROLE();
    const adminRole = await timelock.TIMELOCK_ADMIN_ROLE();

    const proposerTx = await timelock.grantRole(proposerRole, governor.address);
    await proposerTx.wait(1);
    //giving executor role to no one, means everyone can be executor
    const executorTx = await timelock.grantRole(executorRole, ZERO_ADDRESS);
    await executorTx.wait(1);
    const revokeTx = await timelock.revokeRole(adminRole, deployer);
    await revokeTx.wait(1);
};

export default setUpContract;