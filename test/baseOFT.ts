import { expect } from "chai";
import { ethers } from "hardhat";
import { LayerZeroWTAOBase__factory } from "../typechain-types";

// LayerZero ETH endpoint
const lzEndpoint = "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7";


describe("WTAO OFT v2 on Base", async function () {

    async function deployLayerZeroWTAOBase() {
        const [deployer] = await ethers.getSigners();


        const LayerZeroWTAO = await new LayerZeroWTAOBase__factory(deployer).deploy(
            "Wrapped TAO",
            "wTAO",
            8,
            lzEndpoint
        )

        return LayerZeroWTAO;

    }
    it("Should deploy WTAO on Base", async function () {

        const LayerZeroWTAO = await deployLayerZeroWTAOBase();

        expect(await LayerZeroWTAO.name()).to.equal("Wrapped TAO");
        expect(await LayerZeroWTAO.symbol()).to.equal("wTAO");
        expect(await LayerZeroWTAO.lzEndpoint()).to.equal(lzEndpoint);

    });

    it("Should set correct Bridge parameters", async function () {

        const LayerZeroWTAO = await deployLayerZeroWTAOBase();
        await LayerZeroWTAO.setTrustedRemoteAddress(101, "0x4D9B7203BcF5B226A6f4Dc89DA68E7922bfE1322");
        await LayerZeroWTAO.setTrustedRemoteAddress(110, "0xa14a26bb46e236da394da6B09a5b4CF737ce707b");
        await LayerZeroWTAO.setMinDstGas(101, 0, 200000);
        await LayerZeroWTAO.setMinDstGas(110, 0, 2000000);

    });

});
