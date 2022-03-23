import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types"
// @ts-ignore
import { ethers } from "hardhat";

const deployGovernorToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    //grabbing from config
    const { deployer } = await getNamedAccounts();
    log('deploying governance token');
    const governanceToken = await deploy('GovernanceToken', {
        from: deployer,
        args: [],
        log: true
    });
    log(`deployed governance token to address ${governanceToken.address}`);
    await delegate(governanceToken.address, deployer);
    log("delegated>>>>>>>>>")
    //the address should have one checkpoint because it is just deployed and one delegated address
    //0 means no delegated account
};

//delegating our votes
const delegate = async (governanceTokenAddress: string, delegatedAccount: string) => {
    const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress);
    const tx = await governanceToken.delegate(delegatedAccount);
    await tx.wait(1);
    console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`);
}


export default deployGovernorToken;