const appService = require('./appService');

async function getAllServiceContractsInformation() {
    return await appService.withOracleDB(async (connection) => {
        const allServiceContracts = await connection.execute(
            `
            SELECT serviceID, companyName, cost, UserData.firstName, UserData.lastName
            FROM ServiceContracts
            JOIN UserData on UserData.userID = ServiceContracts.staffMemberID
            `,
            [],
            {autocommit: true},
        )
        const service = allServiceContracts.rows.map((row) => ({
            serviceID: row[0],
            companyName: row[1],
            cost: row[2],
            firstName: row[3],
            lastName: row[4],
        }));
        console.log(allServiceContracts);
        return {success: true, service} 
    }).catch((error) => {
        console.error('Error in withOracleDB: ',error);
        return {success: false};
    })
}

async function completeServiceContract(contractId) {
    return await appService.withOracleDB(async (connection) => {
        try {
            // Update the service contract to mark it as completed
            const updateResult = await connection.execute(
                `UPDATE ServiceContracts SET status = 'completed' WHERE contractId = :contractId`,
                { contractId },
                { autoCommit: true }
            );

            // Return the result of the UPDATE operation
            if (updateResult.rowsAffected && updateResult.rowsAffected > 0) {
                return { success: true };
            } else {
                return { success: false, message: 'No contract found with the provided ID' };
            }
        } catch (error) {
            console.error('Error in completeServiceContract:', error);
            return { success: false, message: 'Database operation failed' };
        }
    }).catch((error) => {
        console.error('Error in withOracleDB:', error);
        return { success: false, message: 'Database connection failed' };
    });
}

async function createServiceContract(companyName, cost, maintenanceRequestIds) {
    return await appService.withOracleDB(async (connection) => {
        try {
            // Generate a unique contract ID
            const contractId = appService.generateContractID();

            // Insert the service contract into the ServiceContracts table
            const insertResult = await connection.execute(
                `INSERT INTO ServiceContracts (contractId, companyName, cost, status) VALUES (:contractId, :companyName, :cost, 'active')`,
                { contractId, companyName, cost },
                { autoCommit: true }
            );

            // Insert the maintenance requests associated with this service contract
            for (const requestId of maintenanceRequestIds) {
                await connection.execute(
                    `INSERT INTO MaintenanceRequests (contractId, requestId) VALUES (:contractId, :requestId)`,
                    { contractId, requestId },
                    { autoCommit: true }
                );
            }

            // Return the result of the INSERT operation
            if (insertResult.rowsAffected && insertResult.rowsAffected > 0) {
                return { success: true, contractId };
            } else {
                return { success: false, message: 'Failed to create service contract' };
            }
        } catch (error) {
            console.error('Error in createServiceContract:', error);
            return { success: false, message: 'Database operation failed' };
        }
    }).catch((error) => {
        console.error('Error in withOracleDB:', error);
        return { success: false, message: 'Database connection failed' };
    });
}

module.exports = {
    completeServiceContract,
    createServiceContract,
    getAllServiceContractsInformation
};
