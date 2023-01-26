const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');


// Show input error message
// Makes error messages visible and highlights around the wrong field.
// Takes in an error message to replace the default in HTML
function showError(input, message) {
    const formControl = input.parentElement;
    const errorMessage = formControl.parentElement.querySelector(`#${input.id}-error-message`);
    formControl.className = "form-control error";
    input.className = "error";
    errorMessage.className = "error";
    errorMessage.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    let errorMessage = "";
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(input.value.trim())) {
        errorMessage = 'Email is not valid';
    }
    return errorMessage;
}

// Validate password
function checkPassword(password) {
    let errorMessage = "";
    let upperCase = new RegExp("[A-Z]");
    let number = new RegExp("[0-9]");
    let special = new RegExp("[!@#\$%\^&\*]");

    if (password.value.length < 8) {
        errorMessage += "Password must be at least 8 characters long. ";
    } else if (!upperCase.test(password.value)) {
        errorMessage += "Password must contain at least 1 uppercase character. ";
    } else if (!number.test(password.value)) {
        errorMessage += "Password must contain at least 1 number. ";
    } else if (!special.test(password.value)) {
        errorMessage += "Password must contain at least 1 special character. ";
    }
    
    return errorMessage;
}


// Check Required for input fields
function checkRequired(inputArray) {
    temp = true;
    inputArray.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            temp = false;
        }
    });
    return temp;
}

// Check passwords match
// input password2 first when calling the function
function checkPasswordsMatch(password2, password1) {
    let errorMessage = "";
    if (password2.value !== password1.value) {
        errorMessage = "Passwords do not match"
    }
    return errorMessage;
}

// Show error or success
function showErrorOrSuccess(validator, input, input2 = null) {
    if (input2) {
        message = validator(input, input2);
    } else {
        message = validator(input);
    }

    if (message === "") {
        showSuccess(input);
        return true;
    } else {
        showError(input, message);
        return false;
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    showErrorOrSuccess(checkEmail, email);
    showErrorOrSuccess(checkPassword, password1);

    // parameters are passed to the functions in the same order as they are defined
    // checkPasswordsMatch takes in password2 first, then password1
    if (checkPassword(password1) === "") {
        showErrorOrSuccess(checkPasswordsMatch, password2, password1);
    }

    checkRequired([username, email, password1, password2]);

    if (showErrorOrSuccess(checkEmail, email) && 
        showErrorOrSuccess(checkPassword, password1) &&
        showErrorOrSuccess(checkPasswordsMatch, password2, password1) &&
        checkRequired([username, email, password1, password2])) {
            form.submit();
    }
});
