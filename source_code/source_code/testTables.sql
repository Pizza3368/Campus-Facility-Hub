SELECT Budget.projectType, SUM(Budget.amount) as totalBudget, ProjectCost.amountLimit
FROM Budget
JOIN ProjectCost ON Budget.projectType = ProjectCost.projectType
GROUP BY Budget.projectType, ProjectCost.amountLimit
HAVING SUM(Budget.amount) > ProjectCost.amountLimit;
