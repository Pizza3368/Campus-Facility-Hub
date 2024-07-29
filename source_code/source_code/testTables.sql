SELECT 
    UserData.userID,
    CASE 
        WHEN Manager.userID IS NOT NULL THEN 'Manager'
        WHEN EventOrganizer.userID IS NOT NULL THEN 'Event Organizer'
        WHEN StaffMember.userID IS NOT NULL THEN 'Staff Member'
        ELSE 'Other'
    END AS Role
FROM 
    UserData
LEFT JOIN 
    Manager ON Manager.userID = UserData.userID
LEFT JOIN 
    EventOrganizer ON EventOrganizer.userID = UserData.userID
LEFT JOIN 
    StaffMember ON StaffMember.userID = UserData.userID
WHERE 
    UserData.firstName = 'user4' 
    AND UserData.SIN = 4;
