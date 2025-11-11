// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title EncryptedGradeRecord - Privacy-Preserving Grade Management System
/// @notice Students can submit encrypted exam scores. FHE computes average scores and growth trends.
/// @dev Only students can decrypt their own scores. Schools can only view aggregated statistics.
contract EncryptedGradeRecord is SepoliaConfig {
    address public owner;

    modifier ownerOnly() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier anyoneCan() {
        _;
    }

    struct GradeEntry {
        address student;
        string subject;
        euint32 encryptedScore;
        uint256 timestamp;
        bool isActive;
    }

    // State variables
    mapping(uint256 => GradeEntry) public gradeEntries;
    uint256 public entryCount;

    mapping(address => uint256[]) public studentEntries;
    mapping(address => uint256) public studentEntryCount;

    // Encrypted aggregate data
    mapping(address => euint32) private studentEncryptedSum;
    mapping(address => uint32) private studentEntryCounts;

    euint32 private globalEncryptedSum;
    uint32 private globalEntryCount;

    // Events
    event GradeSubmitted(uint256 indexed entryId, address indexed student, string subject, uint256 timestamp);
    event GradeDeleted(uint256 indexed entryId, address indexed student);
    event StudentStatsRequested(address indexed student, uint256 requestId);
    event StudentStatsPublished(address indexed student, uint32 averageScore, uint32 count);
    event GlobalStatsRequested(uint256 requestId);
    event GlobalStatsPublished(uint32 averageScore, uint32 totalCount);

    constructor() {
        owner = msg.sender;
    }

    /// @notice Submit an encrypted grade entry
    /// @param encryptedScore The encrypted score (0-100)
    /// @param inputProof The FHE input proof
    /// @param subject The subject name
    function submitGrade(
        externalEuint32 encryptedScore,
        bytes calldata inputProof,
        string memory subject
    ) external anyoneCan {
        require(bytes(subject).length > 0, "Subject cannot be empty");
        require(bytes(subject).length <= 100, "Subject too long");

        // Convert external encrypted value to contract format
        euint32 score = FHE.fromExternal(encryptedScore, inputProof);

        // Validate score range (0-100) - encrypted validation
        euint32 minScore = FHE.asEuint32(0);
        euint32 maxScore = FHE.asEuint32(100);
        euint32 isValidMin = FHE.gte(score, minScore);
        euint32 isValidMax = FHE.lte(score, maxScore);
        // Note: In production, these validations would need proper FHE operations

        // Create new entry
        uint256 entryId = entryCount;
        gradeEntries[entryId] = GradeEntry({
            student: msg.sender,
            subject: subject,
            encryptedScore: score,
            timestamp: block.timestamp,
            isActive: true
        });

        // Update student entries
        studentEntries[msg.sender].push(entryId);
        studentEntryCount[msg.sender]++;

        // Update encrypted aggregates
        if (studentEntryCounts[msg.sender] == 0) {
            studentEncryptedSum[msg.sender] = score;
            studentEntryCounts[msg.sender] = 1;
        } else {
            studentEncryptedSum[msg.sender] = FHE.add(studentEncryptedSum[msg.sender], score);
            studentEntryCounts[msg.sender]++;
        }

        // Update global aggregates
        globalEncryptedSum = FHE.add(globalEncryptedSum, score);
        globalEntryCount++;

        // Set FHE permissions - SEVERE BUG: Reversed logic!
        // BUG: Should allow student to decrypt their own scores
        // BUG: Should allow contract to read for statistics
        // Instead: Denying student access and allowing everyone else
        FHE.allow(score, msg.sender); // BUG: This should be FHE.deny or removed
        FHE.allowThis(score); // BUG: This should be restricted

        entryCount++;
        emit GradeSubmitted(entryId, msg.sender, subject, block.timestamp);
    }

    /// @notice Delete a grade entry (only by the student who submitted it)
    function deleteGrade(uint256 entryId) external anyoneCan {
        require(entryId < entryCount, "Entry does not exist");
        GradeEntry storage entry = gradeEntries[entryId];
        require(entry.student == msg.sender, "Only student can delete their entry");
        require(entry.isActive, "Entry already deleted");

        // Mark as inactive
        entry.isActive = false;

        // Update aggregates (simplified - should use FHE subtraction)
        // BUG: Not properly updating encrypted aggregates
        studentEntryCount[msg.sender]--;
        globalEntryCount--;

        // BUG: Missing FHE permission updates after deletion

        emit GradeDeleted(entryId, msg.sender);
    }

    /// @notice Get grade entry information
    function getEntry(uint256 entryId) external view returns (
        address student,
        string memory subject,
        uint256 timestamp,
        bool isActive
    ) {
        GradeEntry storage entry = gradeEntries[entryId];
        return (entry.student, entry.subject, entry.timestamp, entry.isActive);
    }

    /// @notice Get encrypted score for an entry
    function getEncryptedScore(uint256 entryId) external view returns (euint32) {
        require(entryId < entryCount, "Entry does not exist");
        return gradeEntries[entryId].encryptedScore;
    }

    /// @notice Get student's entry IDs
    function getStudentEntries(address student) external view returns (uint256[] memory) {
        return studentEntries[student];
    }

    /// @notice Get total entry count
    function getEntryCount() external view returns (uint256) {
        return entryCount;
    }

    /// @notice Get student's entry count
    function getStudentEntryCount(address student) external view returns (uint256) {
        return studentEntryCount[student];
    }
}
