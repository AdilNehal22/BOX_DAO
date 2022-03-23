import "@nomiclabs/hardhat-ethers"
import "hardhat-deploy"
import "@typechain/hardhat"
import { HardhatUserConfig } from "hardhat/config"
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//   solidity: "0.8.8",
// };

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: '0.8.8',
  networks:{
    hardhat:{
      chainId: 31337
    },
    localhost:{
      allowUnlimitedContractSize: true,
      blockGasLimit: 0x1fffffffffffff,
      chainId: 31337
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
    }
  }
}

export default config;
