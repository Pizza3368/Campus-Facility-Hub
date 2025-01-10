const express = require('express');
const router = express.Router();
const serviceContractService = require('../backendServices/serviceContractService'); // Adjust the path as needed

// Middleware to ensure database connection
const middlewares = require('../backendMiddlewares/middleware'); // Adjust the path as needed
router.use(middlewares.checkDBConnection);

// Route to complete a service contract
router.post('/complete', async (req, res) => {
    const { contractId } = req.body;

    // Validate input
    if (!contractId) {
        return res.status(400).json({ success: false, message: 'Contract ID is required' });
    }

    // Call the service to complete the service contract
    const result = await serviceContractService.completeServiceContract(contractId);

    if (result.success) {
        return res.status(200).json({ success: true, message: 'Service contract completed successfully' });
    } else {
        return res.status(500).json({ success: false, message: result.message });
    }
});

// Route to create a service contract
router.post('/create', async (req, res) => {
    const { companyName, cost, maintenanceRequestIds } = req.body;
    
    // Validate input
    if (!companyName || !cost || !maintenanceRequestIds || !Array.isArray(maintenanceRequestIds) || maintenanceRequestIds.length === 0) {
        return res.status(400).json({ success: false, message: 'All fields are required and maintenanceRequestIds should be a non-empty array' });
    }

    // Call the service to create the service contract
    const result = await serviceContractService.createServiceContract(companyName, cost, maintenanceRequestIds);

    if (result.success) {
        return res.status(200).json({ success: true, message: 'Service contract created successfully', contractId: result.contractId });
    } else {
        return res.status(500).json({ success: false, message: result.message });
    }
});

// get all the services info
router.get("/getAllServiceContracts", async(req, res) => {
    const retrievedServices = await serviceContractService.getAllServiceContractsInformation();
    if (retrievedServices.success === true) {
        //console.log(retrievedServices.service);
        res.status(200).json({
            service: retrievedServices.service,
        })
    }
    else {
        res.status(500).json({
            message: "Failed to retrieve all service."
        })
    }
});


module.exports = router;
