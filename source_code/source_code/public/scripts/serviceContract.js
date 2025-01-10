// /*
// Event listener associated with the form.
// */
// document.addEventListener('DOMContentLoaded', function() {
//     const manageServiceContractsForm = document.getElementById('manageServiceContractsForm');

//     manageServiceContractsForm.addEventListener('submit', async function(event) {
//         event.preventDefault();

//         const action = document.getElementById('action').value;
//         const companyName = document.getElementById('company-name').value;
//         const cost = document.getElementById('cost').value;
//         const maintenanceRequestIds = [
//             document.querySelectorAll('#maintenance-requests')[0].value,
//             document.querySelectorAll('#maintenance-requests')[1].value,
//             document.querySelectorAll('#maintenance-requests')[2].value,
//         ];

//         const formData = {
//             companyName,
//             cost,
//             maintenanceRequestIds
//         };

//         if (action === 'create') {
//             await createServiceContract(formData);
//         } else {
//             alert("Currently only 'Create' action is supported.");
//         }
//     });
// });

// /*
// Create service contract.
// */
// async function createServiceContract(formData) {
//     const response = await fetch('/serviceContract/create', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//     });

//     if (response.status !== 200) {
//         alert("Unable to create the service contract now. Please try again later.");
//     } else {
//         alert("Service contract created successfully.");
//     }
// }


window.onload = () => {
    getAllServiceContracts();
}

async function getAllServiceContracts() {
    const response = await fetch('/services/getAllServiceContracts', {
        method: 'GET',
    });

    if (response.status === 200) {
        const data = await response.json();
        console.log(data.service);
        //const budgets = data.budgets;
        displayBudgets(data.service);
        
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
                <h3>#${budget.serviceID}</h3>
                <p><strong>Company Name:</strong> ${budget.companyName}</p>
                <p><strong>Cost:</strong> ${budget.cost}</p>
                <p><strong>Created By:</strong> Staff Member ${budget.firstName} ${budget.lastName}</p>
            </div>
        `;
        container.appendChild(budgetDiv);
    });
}