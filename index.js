const form = document.getElementById('registration-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const dobInput = document.getElementById('dob');
const acceptTermsInput = document.getElementById('accept-terms');
const tableBody = document.querySelector('#details-table tbody');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!isNameValid() || !isDobValid()) {
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

    // Clear the form fields
    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    dobInput.value = '';
    acceptTermsInput.checked = false;
});

function isNameValid() {
    return /^[a-zA-Z\s.]+$/.test(nameInput.value);
}

function isDobValid() {
    const currentDate = new Date();
    const dob = new Date(dobInput.value);
    const age = currentDate.getFullYear() - dob.getFullYear();

    if (age < 18 || age > 55) {
        const dobError = document.getElementById('dob-error');
        dobError.textContent = "Age should be between 18 and 55.";
        return false;
    } else {
        const dobError = document.getElementById('dob-error');
        dobError.textContent = ""; // Clear the error message
        return true;
    }
}
