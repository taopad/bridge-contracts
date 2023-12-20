import { expect } from "chai";
import { ethers } from "hardhat";
import { LayerZeroWTAOArbitrum__factory } from "../typechain-types";

  // LayerZero ETH endpoint
  const lzEndpoint = "0x3c2269811836af69497E5F486A85D7316753cf62";
  

describe("WTAO OFT v2 on Arbitrum", async function () {
      
  async function deployLayerZeroWTAOArbitrum() {
    const [deployer] = await ethers.getSigners();

  
    const LayerZeroWTAO = await new LayerZeroWTAOArbitrum__factory(deployer).deploy(
      "Wrapped TAO",
      "wTAO",
      8,
      lzEndpoint
    )

    return LayerZeroWTAO;

  }
  it("Should deploy WTAO on Arbitrum", async function () {

    const LayerZeroWTAO = await deployLayerZeroWTAOArbitrum();

    expect(await LayerZeroWTAO.name()).to.equal("Wrapped TAO");
    expect(await LayerZeroWTAO.symbol()).to.equal("wTAO");
    expect(await LayerZeroWTAO.lzEndpoint()).to.equal(lzEndpoint);

  });

  it("Should set correct Bridge parameters", async function () {

    const LayerZeroWTAO = await deployLayerZeroWTAOArbitrum();
    await LayerZeroWTAO.setTrustedRemoteAddress(101, "0x4D9B7203BcF5B226A6f4Dc89DA68E7922bfE1322");
    await LayerZeroWTAO.setMinDstGas(101, 0, 2000000);

  });

});
