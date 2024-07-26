const oracledb = require('oracledb');
const appService = require('./appService');

// Function to check if an address exists and insert it if it doesn't
async function checkAndInsertAddress(postalCode, city, province) {
    return await appService.withOracleDB(async (connection) => {
        try {
            // Check if the postal code exists in the AddressData table
            const result = await connection.execute(
                `SELECT postalCode FROM AddressData WHERE postalCode = :postalCode`,
                [postalCode]
            );

            // If the postal code does not exist, insert it into the AddressData table
            if (result.rows.length === 0) {
                await connection.execute(
                    `INSERT INTO AddressData (postalCode, City, Province) VALUES (:postalCode, :city, :province)`,
                    { postalCode, city, province },
                    { autoCommit: true }
                );
            }
            return true;
        } catch (error) {
            console.error('Error in checkAndInsertAddress:', error);
            return false;
        }
    }).catch((error) => {
        console.error('Error in withOracleDB:', error);
        return false;
    });
}

module.exports = { 
    checkAndInsertAddress 
};
