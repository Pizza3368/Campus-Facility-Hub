const appService = require('./appService');

async function getAllBudgetInformation() {
    return await appService.withOracleDB(async (connection) => {
        const allBudgets = await connection.execute(
            `
            SELECT budgetID, startDate, endDate, amount, projectType, UserData.firstName, UserData.lastName
            FROM Budget
            JOIN UserData on UserData.userID = Budget.ManagerID
            `,
            [],
            {autocommit: true},
        )
        const budgets = allBudgets.rows.map((row) => ({
            budgetID: row[0],
            startDate: row[1],
            endDate: row[2],
            amount: row[3],
            projectType: row[4],
            firstName: row[5],
            lastName: row[6],
        }));
        return {success: true, budgets}
    }).catch((error) => {
        console.error('Error in withOracleDB: ',error);
        return {success: false};
    })
}

async function createBudget(startDate, endDate, amount, managerID, projectType) {
    return await appService.withOracleDB(async (connection) => {
        const budgetID = appService.generateUserID();
        const budgetInsertionResult = await connection.execute(
            `
            INSERT INTO Budget(budgetID, startDate, endDate, amount, managerID, projectType) 
            VALUES (:budgetID, TO_DATE(:startDate, 'YYYY-MM-DD'), TO_DATE(:endDate, 'YYYY-MM-DD'), :amount ,:managerID, :projectType)
            `,
            {budgetID, startDate, endDate, amount, managerID, projectType},
            {autocommit: true}
        );

        if (budgetInsertionResult.rowsAffected && budgetInsertionResult.rowsAffected > 0) {
            await connection.commit();
            return {success: true };
        };
    }).catch((error) => {
        console.error('Error in withOracleDB: ',error);
        return {success: false};
    })
}

async function updateBudget(budgetID, startDate, endDate, amount, managerID, projectType) {
    return await appService.withOracleDB(async (connection) => {
        const updateResult = await connection.execute(
            `
            UPDATE Budget SET 
            startDate = TO_DATE(:startDate, 'YYYY-MM-DD'), 
            endDate = TO_DATE(:endDate, 'YYYY-MM-DD'), 
            amount = :amount, 
            managerID = :managerID, 
            projectType = :projectType
            WHERE budgetID = :budgetID
            `,
            {startDate, endDate, amount, managerID, projectType, budgetID},
            {autoCommit: true}
        );

        if (updateResult.rowsAffected && updateResult.rowsAffected > 0) {
            await connection.commit();
            return {success: true};
        } else {
            return {success: false };
        }
    }).catch((error) => {
        console.error('Error in withOracleDB:', error);
        return {success: false };
    });
}

async function deleteBudget(budgetID) {
    return await appService.withOracleDB(async (connection) => {
        const deleteResult = await connection.execute(
            `
            DELETE FROM Budget WHERE budgetID = :budgetID
            `,
            {budgetID},
            {autoCommit: true}
        );

        if (deleteResult.rowsAffected && deleteResult.rowsAffected > 0) {
            await connection.commit();
            return {success: true};
        } else {
            return {success: false};
        }
    }).catch((error) => {
        console.error('Error in withOracleDB ', error);
        return {success: false };
    });
}

async function getAllProjectTypesForBudgets() {
    return await appService.withOracleDB(async(connection) => {
        const projectTypesResult = await connection.execute(
            `
            SELECT ProjectType from ProjectCost
            `,
            [],
            {autoCommit: true},
        );

        const projectsTypes = projectTypesResult.rows.map((row) => ({
            projectTypes: row[0],
        }));

        return {success: true, projectsTypes};
    }).catch((error) => {
        console.error('Error in withOracleDB ', error);
        return {success: false };
    });
}



module.exports = {
    getAllBudgetInformation,
    createBudget,
    updateBudget,
    deleteBudget,
    getAllProjectTypesForBudgets,
}