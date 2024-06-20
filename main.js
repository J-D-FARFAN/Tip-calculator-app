// Select DOM elements
const nPeople = document.querySelector("#numberPeople"); // Number of people input field
const messageError = document.querySelector(".messageError"); // Error message element
const selectPorcent = document.querySelectorAll(".stylesForSelectedPorcent"); // Percentage selection buttons
const billInput = document.querySelector("#bill"); // Bill amount input field
const displayAmount = document.querySelector(".valueAmount"); // Element to display the tip amount per person
const inputsValues = document.querySelectorAll(".stylesForInputsMain"); // Main input fields
const total = document.querySelector(".valueTotal"); // Element to display the total amount per person
const porcentCustom = document.querySelector(".custom"); // Custom percentage input field
const resetForm = document.querySelector(".reset"); // Reset button
const styleContent = document.querySelectorAll(".contentTip")

// Variable to store the selected tip percentage
let selectedTipPercentage = 0;

// Event listener for each percentage input
selectPorcent.forEach(input => {
    input.addEventListener("click", function() {
        // Reset styles for all percentage inputs
        selectPorcent.forEach(otherInput => {
            otherInput.style.backgroundColor = "";
            otherInput.style.color = "";
            otherInput.disabled = false; // Reactivate all buttons
        });

        // Apply selected styles to the clicked button
        input.style.backgroundColor = "hsl(172, 67%, 45%)";
        input.style.color = "hsl(183, 100%, 15%)";

        selectedTipPercentage = parseFloat(input.value) / 100; // Store the selected percentage
        porcentCustom.value = ''; // Clear the custom input field
        calculateResult(); // Call the function to calculate the result with the new percentage
    });
});

styleContent.forEach(clickC => {
    clickC.addEventListener("click", function(){
        
    })
})

// Event listener for the custom percentage input
porcentCustom.addEventListener("input", function() {
    if (porcentCustom.value !== '') {
        // Disable predefined percentage buttons
        selectPorcent.forEach(otherInput => {
            otherInput.disabled = true;
            otherInput.style.backgroundColor = "";
            otherInput.style.color = "";
        });
        selectedTipPercentage = parseFloat(porcentCustom.value) / 100;
    } else {
        selectPorcent.forEach(otherInput => {
            otherInput.disabled = false;
        });
        selectedTipPercentage = 0;
    }
    calculateResult(); 
});

// Function to calculate and display the tip and total amounts per person
function calculateResult(){
    let nPeopleValue = parseInt(nPeople.value);
    let billInputValue = parseFloat(billInput.value);

    if (!isNaN(nPeopleValue) && !isNaN(billInputValue) && nPeopleValue !== 0) {
        let tipAmount = billInputValue * selectedTipPercentage; // Calculate total tip amount
        let tipPerPerson = tipAmount / nPeopleValue; // Calculate tip amount per person
        let totalPerPerson = (billInputValue / nPeopleValue) + tipPerPerson; // Calculate total amount per person

        displayAmount.textContent = tipPerPerson.toFixed(2); // Display tip amount per person
        total.textContent = totalPerPerson.toFixed(2); // Display total amount per person
    } else {
        displayAmount.textContent = "0.00"; // Display default value if input is invalid
        total.textContent = "0.00"; // Display default value if input is invalid
    }
}

// Event listener for number of people input
nPeople.addEventListener("input", function(){
    calculateResult();
});

// Event listener for bill input
billInput.addEventListener("input", function(){
    calculateResult();
});

// Function to validate and handle the number of people input
function handleNumberOfPeopleInput() {
    const isEmptyOrZero = nPeople.value === '' || parseFloat(nPeople.value) === 0;
    nPeople.classList.toggle("errorBorder", isEmptyOrZero);
    messageError.style.display = isEmptyOrZero ? "block" : "none";
}

// Event listeners for number of people input focus and blur events
nPeople.addEventListener("blur", handleNumberOfPeopleInput);
nPeople.addEventListener("focus", function(){
    nPeople.classList.remove("errorBorder");
    messageError.style.display = "none";
});

// Event listener for reset button
resetForm.addEventListener("click", function() {
    // Reset input fields
    nPeople.value = '';
    billInput.value = '';
    porcentCustom.value = '';

    // Reset selected tip percentage
    selectedTipPercentage = 0;

    // Reset display values
    displayAmount.textContent = "0.00";
    total.textContent = "0.00";

    // Reset styles for all percentage inputs
    selectPorcent.forEach(input => {
        input.style.backgroundColor = "";
        input.style.color = "";
        input.disabled = false; // Reactivate all buttons
    });

    // Remove error styling and message
    nPeople.classList.remove("errorBorder");
    messageError.style.display = "none";
});
