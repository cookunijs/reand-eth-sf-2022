import * as dotenv from "dotenv";

import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import "hardhat-dependency-compiler";
import "hardhat-deploy";
import "solidity-coverage";
import network from "./configs/network.json";

import type { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const privateKey =
  process.env.PRIVATE_KEY ||
  "0x0000000000000000000000000000000000000000000000000000000000000000"; // this is to avoid hardhat error
const enableGasReport = process.env.ENABLE_GAS_REPORT !== undefined;

const settings = {
  optimizer: {
    enabled: true,
    runs: 200,
  },
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.10", settings }],
  },
  networks: {
    mainnet: {
      url: `${network.mainnet.rpc}${process.env.ALCHEMY_API_KEY}`,
      accounts: [privateKey],
    },
    goerli: {
      url: `${network.goerli.rpc}${process.env.ALCHEMY_API_KEY}`,
      accounts: [privateKey],
    },
    matic: {
      url: `${network.matic.rpc}${process.env.ALCHEMY_API_KEY}`,
      accounts: [privateKey],
    },
    matic_test: {
      url: `${network.matic_test.rpc}${process.env.ALCHEMY_API_KEY}`,
      accounts: [privateKey],
    },
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  gasReporter: {
    enabled: enableGasReport,
    currency: "USD",
    outputFile: process.env.CI ? "gas-report.txt" : undefined,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  dependencyCompiler: {
    paths: [
      "@appliedzkp/semaphore-contracts/base/Verifier.sol",
      "@worldcoin/world-id-contracts/src/Semaphore.sol",
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};

export default config;
