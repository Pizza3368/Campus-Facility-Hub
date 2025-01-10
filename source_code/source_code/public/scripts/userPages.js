window.onload = function() {
    document.getElementById("maintenanceRequest")?.addEventListener("click", () => {
        alert("Should navigate to view maintenance request page.") /* Add code here.*/
    });

    document.getElementById("event")?.addEventListener("click", () => {
        alert("Should navigate to view events page.") /* Add code here.*/
    });

    document.getElementById("maintainMaintenanceRequest")?.addEventListener("click", () => {
        alert("Should navigate to maintain maintenance request page.") /* Add code here.*/
    });

    document.getElementById("roomsAndBuildings")?.addEventListener("click", () => {
        alert("Should navigate to Rooms and buildings page.") /* Add code here.*/
    });

    document.getElementById("budgets")?.addEventListener("click", () => {
        window.location.href = "/pages/viewBudgetPage.html?userId="+encodeURIComponent(getUserId())
    });

    document.getElementById("maintainBudget")?.addEventListener("click", () => {
        window.location.href = "/pages/maintainBudgetPage.html?userId="+encodeURIComponent(getUserId())
    });

    document.getElementById("viewDevices")?.addEventListener("click", () => {
        alert("Should navigate to view devices page.") /* Add code here.*/
    });

    document.getElementById("maintainDevices")?.addEventListener("click", () => {
        alert("Should navigate to maintain devices page.") /* Add code here.*/
    });

    document.getElementById("budgetReport")?.addEventListener("click", () => {
        window.location.href = "/pages/budgetReport/budgetReportStarterPage.html"
    });

    document.getElementById("maintainEvents")?.addEventListener("click", () => {
        alert("Should navigate to maintain events page.") /* Add code here.*/
    });

    document.getElementById("serviceContract")?.addEventListener("click", () => {
        window.location.href = "/pages/serviceContractView.html"
    });

    document.getElementById("maintainServiceContract")?.addEventListener("click", () => {
        window.location.href = "/pages/serviceContract.html"
    });
    
    console.log(getUserId());
}

function getUserId() {
    return new URLSearchParams(window.location.search).get('userId');
}