/*
event listener associated with the form.
*/
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const firstName = document.querySelector('input[placeholder="First Name"]').value;
        const lastName = document.querySelector('input[placeholder="Last Name"]').value;
        const phoneNumber = document.querySelector('input[placeholder="Phone Number"]').value;
        const streetName = document.querySelector('input[placeholder="Street Name"]').value;
        const province = document.querySelector('input[placeholder="Province"]').value;
        const city = document.querySelector('input[placeholder="City"]').value;
        const postalCode = document.querySelector('input[placeholder="Postal Code"]').value;
        const sin = document.querySelector('input[placeholder="SIN"]').value;
        const userType = document.querySelector('select').value;
        
        const formData = {
            firstName,
            lastName,
            phoneNumber,
            address: {
                streetName,
                province,
                city,
                postalCode
            },
            sin,
            userType
        };

        console.log(formData);
        if (userType === "other") {
            registerAsOtherUser(formData);
        }
        
    });
});

/*
registers user as other user.
*/
async function registerAsOtherUser(formData) {
    const response = await fetch('/user/registerUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    console.log('Response Status:', response.status);
    const responseData = await response.json();
    console.log(responseData);
}