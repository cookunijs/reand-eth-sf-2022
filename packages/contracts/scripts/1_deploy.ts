import hre, { ethers } from "hardhat";

const hexToBytes = (hex: string) => {
  // eslint-disable-next-line no-var
  for (var bytes = [], c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
};

const fromLittleEndian = (bytes: number[]) => {
  const n256 = BigInt(256);
  let result = BigInt(0);
  let base = BigInt(1);
  bytes.forEach((byte) => {
    result += base * BigInt(byte);
    base = base * n256;
  });
  return result;
};

const main = async () => {
  // NOTE: world id
  const worldIDAddress = "0xABB70f7F39035586Da57B3c8136035f87AC0d2Aa";
  const actionId = "wid_staging_8d57f55812cb5d995ef5f1321cf5bc0d";

  // NOTE: deploy contract
  const name = "Reand";
  const Reand = await ethers.getContractFactory(name);
  const contract = await Reand.deploy(worldIDAddress, actionId);
  console.log(`${name} deployed to:`, contract.address);

  // NOTE: polygon id
  const circuitId = "credentialAtomicQuerySig";
  const validatorAddress = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB";
  // Grab the schema hash from Polygon ID Platform
  const schemaHash = "0ed4688869557c33513fc497b7ef3bf6";
  const schemaEnd = fromLittleEndian(hexToBytes(schemaHash));
  const query = {
    schema: ethers.BigNumber.from(schemaEnd),
    slotIndex: 2,
    operator: 1,
    value: [1, ...new Array(63).fill(0).map((i) => 0)],
    circuitId,
  };
  try {
    const requestId = await contract.TRANSFER_REQUEST_ID();
    const tx = await contract.setZKPRequest(requestId, validatorAddress, query);
    await tx.wait();
    console.log(`Set at:\nhttps://mumbai.polygonscan.com/tx/${tx.hash}`);
  } catch (e) {
    console.error("Error: ", e);
  }

  await hre.run("verify:verify", {
    contract: "contracts/Reand.sol:Reand",
    address: contract.address,
    constructorArguments: [worldIDAddress, actionId],
  });
  console.log(`${name} verified`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
