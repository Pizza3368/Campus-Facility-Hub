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

module.exports = router;
