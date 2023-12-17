import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const wTAO = "0x77E06c9eCCf2E797fd462A92B6D7642EF85b0A44";
    const sharedDecimals = 8;
    // LayerZero ETH endpoint
    const lzEndpoint = "0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675";
  

    const { deployer } = await getNamedAccounts();

    let deployResult = await deploy("LayerZeroWTAO", {
        from: deployer,
        log: true,
        waitConfirmations: (hre.network.name === "hardhat") ? 1 : 2,
        args: [
            wTAO,
            sharedDecimals,
            lzEndpoint
        ], 
    });

    if (deployResult.newlyDeployed || 1==1) {
        try {
            if (hre.network.name !== "hardhat" || 1==1) {
                console.log("[!] Verifying...");
                await hre.run('etherscan-verify', { contractName: `LayerZeroWTAO` })
            }
        } catch (e) {
            console.log(e);
        }
    }
};
export default func;
func.tags = ["oft-proxy"];