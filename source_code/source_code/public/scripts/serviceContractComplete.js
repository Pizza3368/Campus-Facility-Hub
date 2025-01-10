/*
event listener associated with the form.
*/
document.addEventListener('DOMContentLoaded', function() {
    const manageServiceContractsForm = document.getElementById('manageServiceContractsForm');

    manageServiceContractsForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const contractId = document.querySelector('input[placeholder="Enter contract ID"]').value;

        const formData = {
            contractId,
        };
        await completeServiceContract(formData);
    });
});

/*
Complete service contract.
*/
async function completeServiceContract(formData) {
    const response = await fetch('/serviceContract/complete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.status !== 200) {
        alert("Unable to complete the service contract now. Please try again later.");
    }
    else {
        alert("Service contract completed successfully.");
    }
}
