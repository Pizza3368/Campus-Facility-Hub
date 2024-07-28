/*
This script is for index.html which serves as our home page.
*/

/*
Load homage page buttons.
*/
window.onload = async function() {
    document.getElementById("navigateToRegisterPageButton").addEventListener("click", () => {
        window.location.href = '/pages/registrationPage.html';
    });
    document.getElementById("navigateToLoginPageButton").addEventListener("click", () => {
        window.location.href = "/pages/loginPage.html";
    });

    document.getElementById("startSoftware").addEventListener("click", async () => {
        const response = await fetch('/initializeDBTable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        if (response.status === 500) {
            alert("Unable to initialize database in server.")
        } 
    })
    /*
    
    */

};
