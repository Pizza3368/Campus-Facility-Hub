const express = require('express');
const appController = require('../source_code/backendController/appController');
const userController = require('../source_code/backendController/userController');
const budgetController = require('../source_code/backendController/budgetController');
const serviceContractController = require('../source_code/backendController/serviceContractController');
// Load environment variables from .env file
// Ensure your .env file has the required database credentials.
const loadEnvFile = require('./utils/envUtil');
const envVariables = loadEnvFile('./.env');

const app = express();
const PORT = envVariables.PORT || 65534;  // Adjust the PORT if needed (e.g., if you encounter a "port already occupied" error)

// Middleware setup
app.use(express.static('public'));  // Serve static files from the 'public' directory
app.use(express.json());             // Parse incoming JSON payloads

// mount the router
app.use('/', appController);

// user router.
app.use('/user', userController);

// budget router.
app.use("/budget", budgetController);
app.use("/services", serviceContractController); 


// ----------------------------------------------------------
// Starting the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

