import { expect } from "chai";
import { ethers } from "hardhat";
import { LayerZeroWTAO__factory } from "../typechain-types";

describe("Proxy WTAO OFT v2 on ETH", async function () {
      
  it("Should deploy LayerZeroWTAO", async function () {
    const [deployer] = await ethers.getSigners();
    const wTAO = "0x77E06c9eCCf2E797fd462A92B6D7642EF85b0A44";
    const sharedDecimals = 8;
  
    // LayerZero ETH endpoint
    const lzEndpoint = "0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675";
  
    const LayerZeroWTAO = await new LayerZeroWTAO__factory(deployer).deploy(
      wTAO,
      sharedDecimals,
      lzEndpoint
    );

    expect(await LayerZeroWTAO.token()).to.equal(wTAO);
    expect(await LayerZeroWTAO.sharedDecimals()).to.equal(sharedDecimals);
    expect(await LayerZeroWTAO.lzEndpoint()).to.equal(lzEndpoint);

  });

});
