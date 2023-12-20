import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy, execute } = deployments;

    // LayerZero ARB endpoint
    const lzEndpoint = "0x3c2269811836af69497E5F486A85D7316753cf62";
  

    const { deployer } = await getNamedAccounts();

    let deployResult = await deploy("LayerZeroWTAOArbitrum", {
        from: deployer,
        log: true,
        waitConfirmations: (hre.network.name === "hardhat") ? 1 : 2,
        args: [
            "Wrapped TAO",
            "wTAO",
            8,
            lzEndpoint
        ], 
    });

    if (deployResult.newlyDeployed || 1==1) {
        try {
            if (hre.network.name !== "hardhat") {
                console.log("[!] Verifying...");
                await hre.run('etherscan-verify', { contractName: `LayerZeroWTAOArbitrum` })
            }
        } catch (e) {
            console.log(e);
        }
    }

    await execute("LayerZeroWTAOArbitrum", {from: deployer, log: true}, "setTrustedRemoteAddress", 101, "0x4D9B7203BcF5B226A6f4Dc89DA68E7922bfE1322");
    await execute("LayerZeroWTAOArbitrum", {from: deployer, log: true}, "setMinDstGas", 101, 0, 2000000);

};
export default func;
func.tags = ["arb-oft"];