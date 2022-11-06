/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

import {
  getProof,
  getRoot,
  prepareWorldID,
  registerIdentity,
  setUpWorldID,
} from "./helpers/InteractsWithWorldID";
import { id } from "./utils/abi-coder";

describe("ProofIDVerifiable", function () {
  const ACTION_ID = "wid_test_123456789";
  let proofIDVerifiable: Contract;
  let callerAddr: string;

  this.beforeAll(async () => {
    await prepareWorldID();
  });

  beforeEach(async () => {
    const [signer] = await ethers.getSigners();
    const worldIDAddress = await setUpWorldID();
    const ProofIDVerifiableFactory = await ethers.getContractFactory(
      "ProofIDVerifiable"
    );
    proofIDVerifiable = await ProofIDVerifiableFactory.deploy(
      worldIDAddress,
      ACTION_ID
    );
    await proofIDVerifiable.deployed();
    callerAddr = await signer.getAddress();
  });

  describe("verify", function () {
    it("Work", async function () {
      await registerIdentity();
      const [nullifierHash, proof] = await getProof(ACTION_ID, callerAddr);
      const tx = await proofIDVerifiable.verifyWithWorldId(
        callerAddr,
        await getRoot(),
        nullifierHash,
        proof
      );
      await tx.wait();
      expect(
        await proofIDVerifiable.getVerified(callerAddr, id("WORLDID"))
      ).to.be.eq(true);
    });
  });
});
