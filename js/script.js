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
console.log(colorOptions);
// Disables Color Select Element From Being Selectable
colorElement.disabled = true;
// Event Enables colorElement If Selection Is Made On Design Element
designElement.addEventListener('change', (e) => {
    colorElement.disabled = false;
    for (let i = 1; i < colorOptions.length; i++) {
        if (e.target.value === 'js puns') {
            if (colorOptions[i].dataset.theme !== 'js puns') {
                colorOptions[i].setAttribute("hidden", "hidden");
            }
        }
        else {
            colorOptions[i].removeAttribute("hidden");
        }
    }
})