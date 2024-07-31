document.addEventListener('DOMContentLoaded', async () => {
    const projectTypes = await getAllProjectTypes();
    populateProjectTypes(projectTypes);
    document.getElementById('actionSelect').addEventListener('change', handleActionChange);

    const submitButton = document.querySelector('.appButton');
    submitButton.style.display = 'none';

    document.getElementById('registrationForm').addEventListener('submit', handleFormSubmit);
});

async function getAllProjectTypes() {
    const response = await fetch('/budget/getProjectTypes', {
        method: 'GET',
    });
    const projects = await response.json();
    return projects.data;
}

function populateProjectTypes(projectTypes) {
    const projectTypeSelect = document.getElementById('projectTypeSelect');
    projectTypes.forEach(type => {
        const value =  type.projectTypes;
        const option = document.createElement('option');
        option.value = value;
        option.text = value;
        projectTypeSelect.add(option);
    });
}

function handleActionChange(event) {
    const action = event.target.value;
    const dateFields = document.getElementById('dateFields');
    const projectTypeField = document.getElementById('projectTypeField');
    const budgetIdField = document.getElementById('budgetIdField');
    const submitButton = document.querySelector('.appButton');

    dateFields.style.display = 'none';
    projectTypeField.style.display = 'none';
    budgetIdField.style.display = 'none';
    document.getElementById('startDate').removeAttribute('required');
    document.getElementById('endDate').removeAttribute('required');
    document.getElementById('amount').removeAttribute('required');
    document.getElementById('projectTypeSelect').removeAttribute('required');
    document.getElementById('budgetId').removeAttribute('required');
    submitButton.style.display = 'none';

    if (action === 'create' || action === 'edit') {
        dateFields.style.display = 'block';
        projectTypeField.style.display = 'block';
        document.getElementById('startDate').setAttribute('required', true);
        document.getElementById('endDate').setAttribute('required', true);
        document.getElementById('amount').setAttribute('required', true);
        document.getElementById('projectTypeSelect').setAttribute('required', true);
        if (action === 'edit') {
            budgetIdField.style.display = 'block';
            document.getElementById('budgetId').setAttribute('required', true);
        }
        submitButton.style.display = 'block';
    } else if (action === 'delete') {
        budgetIdField.style.display = 'block';
        document.getElementById('budgetId').setAttribute('required', true);
        submitButton.style.display = 'block';
    }

    if (action) {
        submitButton.style.display = 'block';
        submitButton.textContent = action.charAt(0).toUpperCase() + action.slice(1);
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const selectedOption = document.getElementById('actionSelect').value;
    if (selectedOption === "delete") {
        const budgetID = document.getElementById('budgetId').value;
        await deleteBudget(budgetID);
    }
    else if (selectedOption === "create") {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const amount = document.getElementById('amount').value;
        const projectType = document.getElementById('projectTypeSelect').value;
        const managerID = getUserId();
        const formData = {
            startDate: startDate,
            endDate: endDate,
            amount: amount,
            managerID: managerID,
            projectType: projectType
        };
        console.log(formData);
        await createBudget(formData);
    }

    else if (selectedOption === "edit") {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const amount = document.getElementById('amount').value;
        const projectType = document.getElementById('projectTypeSelect').value;
        const managerID = getUserId();
        const budgetID = document.getElementById('budgetId').value;
        const formData = {
            startDate: startDate,
            endDate: endDate,
            amount: amount,
            managerID: managerID,
            projectType: projectType,
            budgetID: budgetID,
        };
        await editBudget(formData);

    }
}

async function editBudget(formData) {
    const response = await fetch('/budget/editBudget', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    if (response.status === 200) {
        alert("Succesfully edited budget.");
    }
    else{
        alert("Failed to edit budget.");
    }
}

async function deleteBudget(budgetID) {
    const response = await fetch('/budget/deleteBudget', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({budgetID: budgetID})
    });
    if (response.status === 200) {
        alert("Succesfully deleted budget with ID: "+ budgetID);
    }
    else{
        alert("Unable to delete budget with budget ID "+budgetID+".Verify the budget ID.")
    }
}

async function createBudget(formData) {
    const response = await fetch('/budget/createBudget', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    if (response.status === 200) {
        alert("Succesfully created.");
    }
    else{
        alert("Failed to create budget.")
    }
}

function getUserId() {
    return new URLSearchParams(window.location.search).get('userId');
}