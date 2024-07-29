/*
event listener associated with the form.
*/
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const roleSelect = document.querySelector('select');
    const additionalField = document.getElementById('additionalField');
    const additionalFieldLabel = document.getElementById('additionalFieldLabel');
    const additionalFieldInput = document.getElementById('additionalFieldInput');

    roleSelect.addEventListener('change', function() {
        const selectedRole = this.value;
        switch (selectedRole) {
            case 'manager':
                additionalField.style.display = '';
                additionalFieldLabel.textContent = 'Work Experience (Years):';
                additionalFieldInput.placeholder = 'Enter your work experience';
                additionalFieldInput.name = 'workExperience';
                additionalFieldInput.type = 'number';
                break;
            case 'staff':
                additionalField.style.display = '';
                additionalFieldLabel.textContent = 'Role:';
                additionalFieldInput.placeholder = 'Enter your role';
                additionalFieldInput.name = 'role';
                additionalFieldInput.type = 'text';
                break;
            case 'organizer':
                additionalField.style.display = '';
                additionalFieldLabel.textContent = 'Organizer Level:';
                additionalFieldInput.placeholder = 'Enter organizer level';
                additionalFieldInput.name = 'organizerLevel';
                additionalFieldInput.type = 'number';
                break;
            default:
                additionalField.style.display = 'none';
                additionalFieldInput.name = 'other';
                additionalFieldInput.required =  false;
                break;
        }
    });

    registrationForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const firstName = document.querySelector('input[placeholder="First Name"]').value;
        const lastName = document.querySelector('input[placeholder="Last Name"]').value;
        const streetName = document.querySelector('input[placeholder="Street Name"]').value;
        const province = document.querySelector('input[placeholder="Province"]').value;
        const city = document.querySelector('input[placeholder="City"]').value;
        const postalCode = document.querySelector('input[placeholder="Postal Code"]').value;
        const sin = document.querySelector('input[placeholder="SIN"]').value;
        const userType = document.querySelector('select').value;
        
        const formData = {
            firstName,
            lastName,
            address: {
                streetName,
                province,
                city,
                postalCode
            },
            sin,
            userType
        };

        if (additionalField.style.display !== 'none' && additionalFieldInput.value) {
            formData[additionalFieldInput.name] = additionalFieldInput.value;
        }
        await registerUser(formData);
        
    });
});

/*
registers user as other user.
*/
async function registerUser(formData) {
    const response = await fetch('/user/registerUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.status !== 200) {
        alert("Unable to register now. Please verify your SIN number or try again later.");
    }
    else {
        const data = await response.json();
        const userId = data.userId;
        if (formData.userType === "other"){
            window.location.href = "/pages/otherUserPage.html?userId="+encodeURIComponent(userId);
        }
        else if (formData.userType === "manager") {
            window.location.href = "/pages/managerPage.html?userId="+encodeURIComponent(userId);
        }
        else if (formData.userType === "staff") {
            window.location.href = "/pages/staffMemberPage.html?userId="+encodeURIComponent(userId);
        }
        else if (formData.userType === "organizer") {
            window.location.href = "/pages/eventOrganizerPage.html?userId="+encodeURIComponent(userId);
        }
        
    }
}