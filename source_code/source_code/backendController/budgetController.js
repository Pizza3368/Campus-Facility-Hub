const express = require('express');
const middlewares = require('../backendMiddlewares/middleware');
const budgetService = require('../backendServices/budgetService');
const router = express.Router();

router.use(middlewares.checkDBConnection);

router.get("/getAllBudgets", async(req, res) => {
    const retrievedBudgets = await budgetService.getAllBudgetInformation();
    if (retrievedBudgets.success === true) {
        res.status(200).json({
            budgets: retrievedBudgets.budgets,
        })
    }
    else {
        res.status(500).json({
            message: "Failed to retrieve all budgets."
        })
    }
})
module.exports = router;