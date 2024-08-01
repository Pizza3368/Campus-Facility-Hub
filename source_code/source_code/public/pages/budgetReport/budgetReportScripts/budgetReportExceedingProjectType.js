window.onload = async () => {
    await getBudgetByProjectType();
}

async function getBudgetByProjectType() {
    const response = await fetch('/budget/getProjectTypesHavingExceededAmount', {
        method: 'GET',
    });

    if (response.status === 200) {
        const data = await response.json();
        console.log(data.data);
        displayBudgetData(data.data);
    }
}

function displayBudgetData(data) {
    const container = document.getElementById('budget-container');
    data.forEach(item => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project';

        const typeElement = document.createElement('h3');
        typeElement.textContent = `Project Type: ${item.projectType}`;

        const budgetElement = document.createElement('p');
        budgetElement.textContent = `Total Budget: $${item.totalBudget}`;

        const limitElement = document.createElement('p');
        limitElement.textContent = `Amount Limit: $${item.amountLimit}`

        projectElement.appendChild(typeElement);
        projectElement.appendChild(budgetElement);
        projectElement.appendChild(limitElement);
        container.appendChild(projectElement);
    });
}