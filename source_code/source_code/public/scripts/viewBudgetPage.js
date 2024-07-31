window.onload = () => {
    getAllBudgets();
}

async function getAllBudgets() {
    const response = await fetch('/budget/getAllBudgets', {
        method: 'GET',
    });

    if (response.status === 200) {
        const data = await response.json();
        const budgets = data.budgets;
        displayBudgets(budgets);
    }
}

function displayBudgets(budgets) {
    const container = document.getElementById('budgetsContainer');
    container.innerHTML = ''; // Clear existing content

    budgets.forEach(budget => {
        const budgetDiv = document.createElement('div');
        budgetDiv.className = 'card'; // Add CSS class for styling
        budgetDiv.innerHTML = `
            <div class="info">
                <h3>#${budget.budgetID}</h3>
                <p><strong>Amount:</strong> $${budget.amount.toLocaleString()}</p>
                <p><strong>Project Type:</strong> ${budget.projectType}</p>
                <p><strong>Duration:</strong> ${budget.startDate} - ${budget.endDate}</p>
                <p><strong>Created By:</strong> Manager ${budget.firstName} ${budget.lastName}</p>
            </div>
        `;
        container.appendChild(budgetDiv);
    });
}