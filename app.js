const form = document.querySelector("form");
const loader = document.querySelector(".loader");
const result = document.querySelector(".result");
const heading = document.querySelector(".heading");
const card = document.querySelector(".card");
const resetBtn = document.querySelector(".reset-btn");
let isAlertActive = false;

form.addEventListener("submit", function(e){
    loader.style.display = "block";
    result.style.display = "none";
    setTimeout(function(){
        calculate();
    }, 1000);
    e.preventDefault();
});

form.addEventListener("focus", function(){
    document.querySelector(".alert").remove();
    isAlertActive = false;
}, true);

resetBtn.addEventListener("click", function(){
    document.getElementById("amount").value = "";
    document.getElementById("interest").value = "";
    document.getElementById("years").value = "";
    document.getElementById("monthly-payment").value = "";
    document.getElementById("total-payment").value = "";
    document.getElementById("total-interest").value = "";
});

function calculate(){
    loader.style.display = "none";
    result.style.display = "block";
    const amount = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    const monthlyPayment = document.getElementById("monthly-payment");
    const totalPayment = document.getElementById("total-payment");
    const totalInterest = document.getElementById("total-interest");

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value / 100 / 12);
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/ (x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    }else{
        if(!isAlertActive){
            showError();
        }
    }
}

function showError(){
    const error = document.createElement("div");
    error.className = "alert alert-danger";
    error.innerText = "Invalid input.";
    card.insertBefore(error, heading);
    isAlertActive = true;
}