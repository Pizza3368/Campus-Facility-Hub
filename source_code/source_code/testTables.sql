SELECT budgetID, startDate, endDate, amount, projectType, UserData.firstName, UserData.lastName
FROM 
Budget
JOIN UserData on UserData.userID = Budget.ManagerID;