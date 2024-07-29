const oracledb = require('oracledb');
const loadEnvFile = require('../utils/envUtil');

const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`,
    poolMin: 1,
    poolMax: 3,
    poolIncrement: 1,
    poolTimeout: 60
};

// initialize connection pool
async function initializeConnectionPool() {
    try {
        await oracledb.createPool(dbConfig);
        console.log('Connection pool started');
    } catch (err) {
        console.error('Initialization error: ' + err.message);
    }
}

async function closePoolAndExit() {
    console.log('\nTerminating');
    try {
        await oracledb.getPool().close(10); // 10 seconds grace period for connections to finish
        console.log('Pool closed');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

initializeConnectionPool();

process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT', closePoolAndExit);


// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(); // Gets a connection from the default pool 
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}

// Function to generate a unique user ID
function generateUserID() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function initiateDatabaseTables() {
    return await withOracleDB(async (connection) => {
        try {
            /* Add drop table statements here.*/
            await connection.execute(`DROP TABLE EventOrganizer`);
            await connection.execute(`DROP TABLE StaffMember`);
            await connection.execute(`DROP TABLE Manager`);
            await connection.execute(`DROP TABLE UserData`);
            await connection.execute(`DROP TABLE AddressData`);
        } catch(err) {
            console.log('Table might not exist, proceeding to create...');
        }

        /* Create the address table. */
        await connection.execute(`
            CREATE TABLE AddressData(
                postalCode VARCHAR(20),
                City VARCHAR(20) NOT NULL,
                Province VARCHAR(20) NOT NULL,
                PRIMARY KEY (postalCode)
            )
        `);

        /* Create the user data table.*/
        await connection.execute(`
            CREATE TABLE UserData(
                userID INTEGER,
                firstName VARCHAR(20) NOT NULL,
                lastName VARCHAR(20) NOT NULL,
                SIN INTEGER NOT NULL UNIQUE,
                address VARCHAR(40) NOT NULL,
                postalCode VARCHAR(20),
                PRIMARY KEY (userID),
                FOREIGN KEY (postalCode) REFERENCES AddressData (postalCode)
                ON DELETE SET NULL
            )
        `
        )

        /**Create the manager table */
        await connection.execute(
            `
            CREATE TABLE Manager(
                workExperience INTEGER NOT NULL,
                userID INTEGER,
                PRIMARY KEY (userID),
                FOREIGN KEY (userID) REFERENCES UserData(userID) ON DELETE CASCADE
            )
            `
        );

        /* Create staff member table.*/
        await connection.execute(
            `
            CREATE TABLE StaffMember(
                role VARCHAR(20) NOT NULL,
                userID INTEGER,
                PRIMARY KEY (userID),
                FOREIGN KEY (userID) REFERENCES UserData(userID) ON DELETE CASCADE
            )
            `
        );

        /* Create event organizer table.*/
        await connection.execute(
            `
            CREATE TABLE EventOrganizer(
                organizerLevel INTEGER NOT NULL,
                userID INTEGER,
                PRIMARY KEY (userID),
                FOREIGN KEY (userID) REFERENCES UserData(userID) ON DELETE CASCADE
            )
            `
        );

        /* All tables here, remember to add the drop table statement here. Create table fails if table is not dropped before. */
        return true;
    }).catch(() => {
        return false;
    });
}

module.exports = {
    testOracleConnection,
    withOracleDB,
    initiateDatabaseTables,
    generateUserID,
};