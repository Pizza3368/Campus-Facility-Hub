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
});

router.post("/createBudget", async(req, res) => {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const amount = req.body.amount;
    const managerID = req.body.managerID;
    const projectType = req.body.projectType;

    const isBudgetCreated = await budgetService.createBudget(startDate, endDate, amount, managerID, projectType);
    if(isBudgetCreated.success === true) {
        res.status(200).json({
            message: "Successfully created budget"
        })
    }
    else {
        res.status(500).json({
            message: "Unable to create budget."
        })
    }
});

router.post("/editBudget", async (req, res) => {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const amount = req.body.amount;
    const managerID = req.body.managerID;
    const projectType = req.body.projectType;
    const budgetID = req.body.budgetID;

    const isBudgetUpdated = await budgetService.updateBudget(budgetID, startDate, endDate, amount, managerID, projectType);
    if(isBudgetUpdated.success === true) {
        res.status(200).json({
            message: "Successfully update budget"
        })
    }
    else {
        res.status(500).json({
            message: "Unable to update budget."
        })
    }
});

router.post("/deleteBudget", async (req, res) => {
    const budgetID = req.body.budgetID;

    const isBudgetDeleted = await budgetService.deleteBudget(budgetID);
    if(isBudgetDeleted.success === true) {
        res.status(200).json({
            message: "Successfully deleted budget"
        })
    }
    else {
        res.status(500).json({
            message: "Unable to delete budget."
        })
    }
});

router.get("/getProjectTypes", async(req, res) => {
    const retrievedProjectTypes = await budgetService.getAllProjectTypesForBudgets();
    if (retrievedProjectTypes.success === true) {
        res.status(200).json({
            data: retrievedProjectTypes.projectsTypes,
        })
    }else{
        res.status(500).json({
            message: "Unable to retrieve project types."
        })
    }
})

router.get("/getTotalBudgetByProjectType", async(req, res) => {
    const retrievedResult = await budgetService.getTotalBudgetByProjectTypes();
    if (retrievedResult.success === true) {
        res.status(200).json({
            data: retrievedResult.projectsTypesToBudget
        })
    }else{
        res.status(500).json({
            message: "Unabel to retrieve total budget by project type."
        })
    }
});

router.get("/getProjectTypesHavingExceededAmount", async(req, res) => {
    const retrievedResult = await budgetService.getProjectTypesHavingAmountExceedingAmountLimit();
    if (retrievedResult.success === true) {
        res.status(200).json({
            data: retrievedResult.projectsTypesToBudget
        })
    }else{
        res.status(500).json({
            message: "Unabel to retrieve total budget by project type."
        })
    }
});

module.exports = router;