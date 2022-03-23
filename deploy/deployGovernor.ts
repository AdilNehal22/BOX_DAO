import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types"
// @ts-ignore
import { ethers } from "hardhat";
import { VOTING_DELAY, QUORUM_PERCENTAGE, VOTING_PERIOD } from "../helperHardhatConfig";


const deployGovernorContract: DeployFunction = async function(hre: HardhatRuntimeEnvironment){
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log, getDeploymentsFromAddress } = deployments;
    //grabbing from config
    const { deployer } = await getNamedAccounts();
    // const governanceToken = await getDeploymentsFromAddress("0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9");
    // const timeLock = await getDeploymentsFromAddress("0x5FC8d32690cc91D4c39d9d3abcBD16989F875707");
    log("deploying governor>>>>>>>>>>");
    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        args: [
            '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9', //governanceToken
            '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707', //timelock
            VOTING_DELAY,
            VOTING_PERIOD,
            QUORUM_PERCENTAGE
        ],
        log: true,
    });
}

export default deployGovernorContract;