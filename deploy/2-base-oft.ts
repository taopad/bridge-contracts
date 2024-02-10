import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy, execute } = deployments;

    // LayerZero Base endpoint
    const lzEndpoint = "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7";

    console.log(`🚀 Deploying LayerZero $WTAO on Base with endpoint: ${lzEndpoint} `)

    const { deployer } = await getNamedAccounts();

    let deployResult = await deploy("LayerZeroWTAOBase", {
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

    if (deployResult.newlyDeployed || 1 == 1) {
        try {
            if (hre.network.name !== "hardhat") {
                console.log("[!] Verifying...");
                await hre.run('etherscan-verify', { contractName: `LayerZeroWTAOBase` })
            }
        } catch (e) {
            console.log(e);
        }
    }

    await execute("LayerZeroWTAOBase", { from: deployer, log: true }, "setTrustedRemoteAddress", 101, "0x4D9B7203BcF5B226A6f4Dc89DA68E7922bfE1322");
    await execute("LayerZeroWTAOBase", { from: deployer, log: true }, "setTrustedRemoteAddress", 110, "0xa14a26bb46e236da394da6B09a5b4CF737ce707b");
    await execute("LayerZeroWTAOBase", { from: deployer, log: true }, "setMinDstGas", 101, 0, 200000);
    await execute("LayerZeroWTAOBase", { from: deployer, log: true }, "setMinDstGas", 110, 0, 2000000);

    console.log("✅ $WTAO on Base setup complete");

};
export default func;
func.tags = ["base-oft"];
