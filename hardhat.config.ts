require('dotenv').config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter"
import "hardhat-deploy";

require('@openzeppelin/hardhat-upgrades');

const config: HardhatUserConfig = {
  namedAccounts: {
    deployer: 0,
  },
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.RPC_URL as string,
      }
    },
    mainnet: {
      url: process.env.RPC_URL as string,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    goerli: {
      url: process.env.RPC_URL as string,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
};

export default config;