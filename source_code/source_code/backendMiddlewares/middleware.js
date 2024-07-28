const appService = require('../backendServices/appService');

/*
Function checks for db connection.
If fails returns error code as response. 
*/
async function checkDBConnection(req, res, next) {
    const isConnected = await appService.testOracleConnection();
    if (isConnected) {
        console.log("Verified DB connection\n");
        next()
    }
    else {
        res.status(500).json({
            message: "Oracle database connection failed."
        })
    }
}

module.exports = {
    checkDBConnection
};