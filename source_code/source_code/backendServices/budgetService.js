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
module.exports = {
    getAllBudgetInformation,
}