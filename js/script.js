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
let nameLabel = document.getElementById('name').parentElement;
let emailLabel = document.getElementById('email').parentElement;
let creditCardLabel = document.getElementById('cc-num').parentElement;
let zipCodeLabel = document.getElementById('zip').parentElement;
let cvvLabel = document.getElementById('cvv').parentElement;
let emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let creditCardValidation = /^[0-9]{13,16}$/;
let zipCodeValidation = /^[0-9]{5}$/;
let cvvValidation = /^[0-9]{3}$/;
let activitiesChecked = activities.elements;
let count = 0;


form.addEventListener('submit', (e) => {
    let cvv = document.getElementById('cvv').value;
    let zipCode = document.getElementById('zip').value;
    let creditCardNumber = document.getElementById('cc-num').value;
    let emailField = document.getElementById('email').value;
    let nameField = document.getElementById('name').value;
    let emailResult = emailValidation.test(emailField);
    let creditCardResult = creditCardValidation.test(creditCardNumber);
    let zipCodeResult = zipCodeValidation.test(zipCode);
    let cvvResult = cvvValidation.test(cvv);
    let nameHint = document.getElementById('name-hint');
    let emailHint = document.getElementById('email-hint');
    let creditCardHint = document.getElementById('cc-hint');
    let zipCodeHint = document.getElementById('zip-hint');
    let cvvHint = document.getElementById('cvv-hint');
    let activitiesHint = document.getElementById('activities-hint');
    // Prevents Default Form Action If nameField is Blank or emailResult is False
    if (nameField === '') {
        e.preventDefault();
        nameLabel.classList.add('not-valid');
        nameLabel.classList.remove('valid');
        nameLabel.lastElementChild.hidden = false;
        nameHint.style.display = 'block';
    }
    else {
        nameLabel.classList.remove('not-valid');
        nameLabel.classList.add('valid');
        nameLabel.lastElementChild.hidden = true;
        nameHint.style.display = 'none';
    }
    if (!emailResult) {
        e.preventDefault();
        emailLabel.classList.add('not-valid');
        emailLabel.classList.remove('valid');
        emailLabel.lastElementChild.hidden = false;
        emailHint.style.display = 'block';
    }
    else {
        emailLabel.classList.add('valid');
        emailLabel.classList.remove('not-valid');
        emailLabel.lastElementChild.hidden = true;
        emailHint.style.display = 'none';
    }
    
    for (let i = 0; i < activitiesChecked.length; i++) {
        if (activitiesChecked[i].checked) {
            count += 1;
        }
    }
    if (count === 0) {
        e.preventDefault();
        activities.classList.add('not-valid');
        activities.classList.remove('valid');
        activities.lastElementChild.hidden = false;
        activitiesHint.style.display = 'block';
    } else {
        activities.classList.remove('not-valid');
        activities.classList.add('valid');
        activities.lastElementChild.hidden = true;
        activitiesHint.style.display = 'none';
    }
    if (paymentMethod.value === 'credit-card') {
        // Prevents Default Form Action if creditCardResult, zipCodeResult, or cvvResult is False
        if (!creditCardResult) {
            e.preventDefault();
            creditCardLabel.classList.add('not-valid');
            creditCardLabel.classList.remove('valid');
            creditCardLabel.lastElementChild.hidden = false;
            creditCardHint.style.display = 'block';
        }
        else {
            creditCardLabel.classList.remove('not-valid');
            creditCardLabel.classList.add('valid');
            creditCardLabel.lastElementChild.hidden = true;
            creditCardHint.style.display = 'none';
        }
        if (!zipCodeResult) {
            e.preventDefault();
            zipCodeLabel.classList.add('not-valid');
            zipCodeLabel.classList.remove('valid');
            zipCodeLabel.lastElementChild.hidden = false;
            zipCodeHint.style.display = 'block';
        }
        else {
            zipCodeLabel.classList.remove('not-valid');
            zipCodeLabel.classList.add('valid');
            zipCodeLabel.lastElementChild.hidden = true;
            zipCodeHint.style.display = 'none';
        }
        if (!cvvResult) {
            e.preventDefault();
            cvvLabel.classList.add('not-valid');
            cvvLabel.classList.remove('valid');
            cvvLabel.lastElementChild.hidden = false;
            cvvHint.style.display = 'block';
        }
        else {
            cvvLabel.classList.remove('not-valid');
            cvvLabel.classList.add('valid');
            cvvLabel.lastElementChild.hidden = true;
            cvvHint.style.display = 'none';
        }
    }
    
})

// Create Event Listeners For Activity Checkbox Elements For Focus And Blur Events
let activitiesBox = document.querySelectorAll('#activities-box input');

for (let i = 0; i < activitiesBox.length; i++) {
    activitiesBox[i].addEventListener('focus', (e) => {
        e.target.parentElement.className = 'focus';
    });

    activitiesBox[i].addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove('focus');
    })
}
