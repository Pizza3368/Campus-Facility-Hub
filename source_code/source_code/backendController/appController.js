const express = require('express');
const appService = require('../backendServices/appService');

const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.post('/initializeDBTable', async (req, res) => {
    const isInitDone = await appService.initiateDatabaseTables();
    if (isInitDone == true) {
        res.status(200).json({
            message: "Server setup done"
        })
    }
    else {
        res.status(500).json({
            message: "Server setup failed"
        })
    }
});


module.exports = router;