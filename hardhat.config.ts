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
  etherscan: {
    apiKey: {
      Base: process.env.ETHERSCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "Base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org/",
        }
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.RPC_URL as string,
      }
    },
    Arbitrum: {
      url: process.env.RPC_URL as string,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    Base: {
      url: process.env.RPC_URL as string,
      accounts: [process.env.PRIVATE_KEY as string],
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
