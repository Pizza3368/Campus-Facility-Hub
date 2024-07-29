/*
event listener associated with the form.
*/
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const firstName = document.querySelector('input[placeholder="First Name"]').value;
        const sin = document.querySelector('input[placeholder="SIN"]').value;
        
        const formData = {
            firstName,
            sin,
        };
        await loginUser(formData);
    });
});

/*
login user.
*/
async function loginUser(formData) {
    const response = await fetch('/user/loginUser', {
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
        const userType = data.user.role;
        const userId = data.user.userID;
        
        if (userType=== "other"){
            window.location.href = "/pages/otherUserPage.html?userId=" + encodeURIComponent(userId);
        }
        else if (userType === "manager") {
            window.location.href = "/pages/managerPage.html?userId=" + encodeURIComponent(userId);
        }
        else if (userType === "staff") {
            window.location.href = "/pages/staffMemberPage.html?userId=" + encodeURIComponent(userId);
        }
        else if (userType === "organizer") {
            window.location.href = "/pages/eventOrganizerPage.html?userId=" + encodeURIComponent(userId);
        }
        
    }
}