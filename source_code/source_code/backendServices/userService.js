const appService = require('../backendServices/appService');
const addressService = require('../backendServices/addressService');

// Function to generate a unique user ID
function generateUserID() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

async function insertOtherUser(firstName, lastName, streetName, city, province, postalCode, sin) {
    return await appService.withOracleDB(async (connection) => {
        try {
            // Check and insert address
            const addressInserted = await addressService.checkAndInsertAddress(postalCode, city, province);
            if (!addressInserted) {
                throw new Error('Failed to insert address');
            }

            // Generate a unique user ID
            const userID = generateUserID();

            // Insert the user information into the UserData table
            const insertResult = await connection.execute(
                `INSERT INTO UserData (userID, firstName, lastName, SIN, address, postalCode) VALUES (:userID, :firstName, :lastName, :sin, :streetName, :postalCode)`,
                { userID, firstName, lastName, sin, streetName, postalCode },
                { autoCommit: true }
            );

            // Check all rows after INSERT
            const values = await connection.execute(`SELECT * FROM UserData`);
            console.log('All rows in UserData:', values.rows);

            // Return the result of the INSERT operation
            return insertResult.rowsAffected && insertResult.rowsAffected > 0;
        } catch (error) {
            console.error('Error in insertOtherUser:', error);
            return false;
        }
    }).catch((error) => {
        console.error('Error in withOracleDB:', error);
        return false;
    });
}

module.exports = { insertOtherUser };
