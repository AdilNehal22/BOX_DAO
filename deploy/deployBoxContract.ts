import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types"
// @ts-ignore
import { ethers } from "hardhat";

const deployBox: DeployFunction = async function(hre: HardhatRuntimeEnvironment){
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    log("deploying box>>>>>>>>>>>>>>>>>>>>");

    const box = await deploy("Box", {
        from: deployer,
        args: [],
        log: true,
    });

    //our deployer deployed the contract and so we will give the ownership to governance process
    //transfer ownership to timelock
    const timelock = await ethers.getContractAt("Timelock","0x5FC8d32690cc91D4c39d9d3abcBD16989F875707");
    const boxContract = await ethers.getContractAt("Box", box.address);
    const transferOwnerTx = await boxContract.transferOwnership(timelock.address);
    await transferOwnerTx.wait(1);
    
    log("ownership transfered>>>>>>>>>>>>>>>>");
};

export default deployBox;