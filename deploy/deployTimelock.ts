import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types"
// @ts-ignore
import { ethers } from "hardhat";
import { MIN_DELAY } from "../helperHardhatConfig";

const deployTimelock: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    //grabbing from config
    const { deployer } = await getNamedAccounts();
    log("deploying timelock>>>>>>>>>>>>>>>");
    
    const timelock = await deploy("Timelock", {
        from: deployer,
        args: [MIN_DELAY, [], []],
        log: true
    });
};

export default deployTimelock;

