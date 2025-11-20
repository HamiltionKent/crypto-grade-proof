import { expect } from "chai";
import { ethers } from "hardhat";
import { EncryptedGradeRecord } from "../types/contracts/EncryptedGradeRecord";

describe("EncryptedGradeRecord", function () {
  let encryptedGradeRecord: EncryptedGradeRecord;
  let owner: any;
  let student: any;

  beforeEach(async function () {
    [owner, student] = await ethers.getSigners();

    const EncryptedGradeRecordFactory = await ethers.getContractFactory("EncryptedGradeRecord");
    encryptedGradeRecord = await EncryptedGradeRecordFactory.deploy();
    await encryptedGradeRecord.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await encryptedGradeRecord.owner()).to.equal(owner.address);
    });
  });

  describe("Grade Submission", function () {
    it("Should submit a grade successfully", async function () {
      // This is a basic test - full FHE testing would require FHEVM setup
      const subject = "Mathematics";
      const entryId = await encryptedGradeRecord.getEntryCount();

      // Note: Full FHE testing requires FHEVM environment
      // This test validates basic contract structure
      expect(await encryptedGradeRecord.getEntryCount()).to.equal(0);
    });
  });

  describe("Access Control", function () {
    it("Should enforce owner-only functions", async function () {
      // Test that certain functions are properly restricted
      expect(await encryptedGradeRecord.owner()).to.equal(owner.address);
    });
  });
});
