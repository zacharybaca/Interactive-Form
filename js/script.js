// Automatically Provides Focus Point To Input Field
let input = document.querySelector('input');
input.focus();

// Hide Job Role Field When Form Loads
let otherJobRole = document.getElementById('other-job-role');
otherJobRole.style.display = 'none';

// Show Job Role Field If Other Is Selected
let jobRole = document.getElementById('title');
jobRole.addEventListener('change', (e) => {
    if (e.target.value === "other") {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    }
})

// Design Select Element Should Listen For Changes, And Only Show Options According To What Is Selected
let colorElement = document.getElementById('color');
let designElement = document.getElementById('design');
let colorOptions = colorElement.options;
// Disables Color Select Element From Being Selectable
colorElement.disabled = true;
// Event Enables colorElement If Selection Is Made On Design Element
designElement.addEventListener('change', (e) => {
    colorElement.disabled = false;
    // Loop Over HTML Collection of Options and Compare Dataset Theme to Show/Hide Options
    for (let i = 1; i < colorOptions.length; i++) {
        if (e.target.value === 'js puns') {
            if (colorOptions[i].dataset.theme !== 'js puns') {
                colorOptions[i].setAttribute("hidden", "hidden");
            } 
            else {
                colorOptions[i].removeAttribute("hidden");
            }
        }
        else if (e.target.value === 'heart js') {
            if (colorOptions[i].dataset.theme !== 'heart js') {
                colorOptions[i].setAttribute("hidden", "hidden");
            }
            else {
                colorOptions[i].removeAttribute("hidden");
            }
        }
        
    }
})

// Register For Activities Fieldset Listens For Changes
let activities = document.getElementById('activities');
let activityCost = document.getElementById('activities-cost');
let totalCost = 0;

// Listens For Changes On Form And Updates Total Value Based On dataset Value
// Need to fix bug where form needs to be cleared at refresh
activities.addEventListener('change', (e) => {
    if (e.target.checked) {
        totalCost += parseInt(e.target.dataset.cost);
    }
    else {
        totalCost -= parseInt(e.target.dataset.cost);
    }
    activityCost.innerHTML = `Total: $${totalCost}`
})

// Make Credit Card Default Payment Option
let paymentMethod = document.getElementById('payment');
let creditCard = document.getElementById('credit-card');
let payPal = document.getElementById('paypal');
let bitCoin = document.getElementById('bitcoin');
paymentMethod.options[1].selected = true;
payPal.setAttribute("hidden", "hidden");
bitCoin.setAttribute("hidden", "hidden");

// Event Listener Listens For Changes To Show Only Selected Payment Method Sections
paymentMethod.addEventListener('change', (e) => {
    if (e.target.value === 'credit-card') {
        creditCard.removeAttribute("hidden");
        payPal.setAttribute("hidden", "hidden");
        bitCoin.setAttribute("hidden", "hidden");
    }
    else if (e.target.value === 'paypal') {
        payPal.removeAttribute("hidden");
        creditCard.setAttribute("hidden", "hidden");
        bitCoin.setAttribute("hidden", "hidden");
    }
    else if (e.target.value === 'bitcoin') {
        bitCoin.removeAttribute("hidden");
        creditCard.setAttribute("hidden", "hidden");
        payPal.setAttribute("hidden", "hidden");
    }
})

// Event Listener Should Check To See If Form Is Filled Out Correctly
let form = document.querySelector('form');
let nameField = document.getElementById('name').value;
let emailField = document.getElementById('email').value;
let emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let activitiesChecked = activities.elements;
let count = 0;


form.addEventListener('submit', (e) => {
    let emailResult = emailValidation.test(emailField);
    if (nameField === '' || nameField === null) {
        alert('Please Enter Your Name!');
    } 
    if (!emailResult) {
        alert('Please Enter An Email In A Valid Format!');
    } 
    for (let i = 0; i < activitiesChecked.length; i++) {
        if (activitiesChecked[i].checked) {
            count += 1;
        }
    }
    if (count === 0) {
        alert('Please Select At Least One Item From The Activities List');
    }
   
})