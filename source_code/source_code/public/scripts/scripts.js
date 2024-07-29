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

};
