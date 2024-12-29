// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificationData {
    struct Certification {
        string level;
        string issueDate;
        string expiryDate;
        string center;
        string startDate;
        string endDate;
    }

    mapping(address => Certification[]) private certifications;

    event CertificationAdded(
        address indexed user,
        string level,
        string issueDate,
        string expiryDate,
        string center,
        string startDate,
        string endDate
    );

    function addCertification(
        string memory level,
        string memory issueDate,
        string memory expiryDate,
        string memory center,
        string memory startDate,
        string memory endDate
    ) public {
        certifications[msg.sender].push(
            Certification(level, issueDate, expiryDate, center, startDate, endDate)
        );

        emit CertificationAdded(msg.sender, level, issueDate, expiryDate, center, startDate, endDate);
    }

    function getCertifications(address user) public view returns (Certification[] memory) {
        return certifications[user];
    }
}
