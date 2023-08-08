const form = document.getElementById('registration-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const dobInput = document.getElementById('dob');
const acceptTermsInput = document.getElementById('accept-terms');
const tableBody = document.querySelector('#details-table tbody');

function isNameValid() {
    return /^[a-zA-Z\s.]+$/.test(nameInput.value);
}

function isDobValid() {
    const currentDate = new Date();
    const dob = new Date(dobInput.value);
    const age = currentDate.getFullYear() - dob.getFullYear();

    console.log("Age:", age);

    if (age < 18 || age > 55) {
        const dobError = document.getElementById('dob-error');
        dobError.textContent = "Age should be between 18 and 55.";
        return false;
    } else if (dob.getFullYear() < 1968 || dob.getFullYear() > 2005) {
        const dobError = document.getElementById('dob-error');
        dobError.textContent = "Year of birth should be between 1968 and 2005.";
        return false;
    } else {
        const dobError = document.getElementById('dob-error');
        dobError.textContent = ""; // Clear the error message
        return true;
    }
}


function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!isNameValid() || !isDobValid() || !isEmailValid(emailInput.value)) {
        return;
    }

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const dob = dobInput.value;
    const acceptedTerms = acceptTermsInput.checked ? 'Yes' : 'No';

    const newRow = document.createElement('tr');
    newRow.innerHTML = `<td>${name}</td><td>${email}</td><td>${password}</td><td>${dob}</td><td>${acceptedTerms}</td>`;
    tableBody.appendChild(newRow);

    // Save data to local storage
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push({ name, email, password, dob, acceptedTerms });
    localStorage.setItem('entries', JSON.stringify(entries));

    // Clear the form fields
    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    dobInput.value = '';
    acceptTermsInput.checked = false;
});

// Load data from local storage on page load
window.addEventListener('load', function () {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.forEach(entry => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${entry.name}</td><td>${entry.email}</td><td>${entry.password}</td><td>${entry.dob}</td><td>${entry.acceptedTerms}</td>`;
        tableBody.appendChild(newRow);
    });
});
