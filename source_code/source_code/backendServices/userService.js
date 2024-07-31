const appService = require('../backendServices/appService');
const addressService = require('../backendServices/addressService');


async function insertOtherUser(firstName, lastName, streetName, city, province, postalCode, sin) {
    return await appService.withOracleDB(async (connection) => {
        try {
            // Check and insert address
            const addressInserted = await addressService.checkAndInsertAddress(postalCode, city, province);
            if (!addressInserted) {
                throw new Error('Failed to insert address');
            }

            // Generate a unique user ID
            const userID = appService.generateUserID();

            // Insert the user information into the UserData table
            const insertResult = await connection.execute(
                `INSERT INTO UserData (userID, firstName, lastName, SIN, address, postalCode) VALUES (:userID, :firstName, :lastName, :sin, :streetName, :postalCode)`,
                { userID, firstName, lastName, sin, streetName, postalCode },
                { autoCommit: true }
            );

            // Return the result of the INSERT operation
            if (insertResult.rowsAffected && insertResult.rowsAffected > 0) {
                console.log("Created a other user.");
                return {success: true, userID};
            };
        } catch (error) {
            console.error('Error in insertOtherUser:', error);
            return {success: false};
        }
    }).catch((error) => {
        console.error('Error in withOracleDB:', error);
        return {success: false};
    });
}

async function insertManager(firstName, lastName, streetName, city, province, postalCode, workExperience, sin){
    const userInsertedResult = await insertOtherUser(firstName, lastName, streetName, city, province, postalCode, sin);
    if (userInsertedResult.success === true) {
        const userID = userInsertedResult.userID;

        return await appService.withOracleDB(async (connection) => {
            const managerInsertResult = await connection.execute(
                `INSERT INTO Manager (userID, workExperience) VALUES (:userID, :workExperience)`,
                { userID, workExperience },
                {autoCommit: true},
            );

            if (managerInsertResult.rowsAffected && managerInsertResult.rowsAffected > 0) {
                console.log("Created a other Manager.");
                return {success: true, userID};
            } else {
                return {success: false};
            }

        }).catch((error) => {
            console.error('Error in withOracleDB: ',error);
            return {success: false};
        })
    }
    else {
        return false;
    }
}

async function insertStaffMember(firstName, lastName, streetName, city, province, postalCode, role, sin){
    const userInsertedResult = await insertOtherUser(firstName, lastName, streetName, city, province, postalCode, sin);
    if (userInsertedResult.success === true) {
        const userID = userInsertedResult.userID;

        return await appService.withOracleDB(async (connection) => {
            const managerInsertResult = await connection.execute(
                `INSERT INTO StaffMember(userID, role) VALUES (:userID, :role)`,
                { userID, role },
                { autoCommit: true }
            );

            if (managerInsertResult.rowsAffected && managerInsertResult.rowsAffected > 0) {
                return {success: true, userID};
            } else {
                return {success: false};
            }

        }).catch((error) => {
            console.error('Error in withOracleDB: ',error);
            return {success: false};
        })
    }
    else {
        return false;
    }
}

async function insertEventOrganizer(firstName, lastName, streetName, city, province, postalCode, organizerLevel, sin){
    const userInsertedResult = await insertOtherUser(firstName, lastName, streetName, city, province, postalCode, sin);
    if (userInsertedResult.success === true) {
        const userID = userInsertedResult.userID;

        return await appService.withOracleDB(async (connection) => {
            const managerInsertResult = await connection.execute(
                `INSERT INTO EventOrganizer(userID, organizerLevel) VALUES (:userID, :organizerLevel)`,
                { userID, organizerLevel },
                { autoCommit: true }
            );

            if (managerInsertResult.rowsAffected && managerInsertResult.rowsAffected > 0) {
                return {success: true, userID};
            } else {
                return {success: false};
            }

        }).catch((error) => {
            console.error('Error in withOracleDB: ',error);
            return {success: false};
        })
    }
    else {
        return false;
    }
}

async function getUserBySinAndFirstName(firstName, sin) {
    return await appService.withOracleDB(async (connection) => {
        const userResult = await connection.execute(
            `
            SELECT 
    UserData.userID,
    CASE 
        WHEN Manager.userID IS NOT NULL THEN 'manager'
        WHEN EventOrganizer.userID IS NOT NULL THEN 'organizer'
        WHEN StaffMember.userID IS NOT NULL THEN 'staff'
        ELSE 'other'
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
    UserData.firstName = :firstName 
    AND UserData.SIN = :sin
            `,
            {firstName, sin},
            {autoCommit: true}
        );
        const user = userResult.rows.map((row) => ({
            userID: row[0],
            role: row[1]
        }));
        if (user[0]) {
            return {success: true, data: user[0]};
        }
        else {
            return {success: false}
        }
        
    }).catch((error) => {
        console.error('Error in withOracleDB: ',error);
        return {success: false};
    })
}

module.exports = { 
    insertOtherUser,
    insertManager,
    insertStaffMember,
    insertEventOrganizer,
    getUserBySinAndFirstName,
 };
