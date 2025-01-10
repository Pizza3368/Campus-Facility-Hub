SELECT serviceID, companyName, cost, UserData.firstName, UserData.lastName
FROM ServiceContracts
JOIN UserData on UserData.userID = ServiceContracts.staffMemberID;