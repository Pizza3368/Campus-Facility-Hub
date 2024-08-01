SELECT projectType, SUM(amount) as totalBudget
FROM Budget
GROUP BY projectType;