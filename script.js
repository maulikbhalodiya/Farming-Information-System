// Get references to form elements
const name = document.getElementById('name');
const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Get references to error message elements
const name_error = document.getElementById('name_error');
const email_error = document.getElementById('email_error');
const pass_error = document.getElementById('pass_error');
const pass_error2 = document.getElementById('pass_error2');

// Add event listener to form submit event
form.addEventListener('submit', (e) => {
    // Define regular expression patterns for validation
    var pass_check = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,20}$/; // Password pattern
    var email_pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Email pattern

    // Validate name field
    if (name.value === '' || name.value == null) { // Check if name is empty or null
        e.preventDefault(); // Prevent form submission
        name_error.innerHTML = "Name is required"; // Display error message
    } else {
        name_error.innerHTML = ""; // Clear error message
    }
    
    // Validate email field
    if (!email.value.match(email_pattern)) { // Check if email matches the pattern
        e.preventDefault(); // Prevent form submission
        email_error.innerHTML = "Valid email is required"; // Display error message
    } else {
        email_error.innerHTML = ""; // Clear error message
    }
    
    // Validate password field
    if (!password.value.match(pass_check)) { // Check if password matches the pattern
        e.preventDefault(); // Prevent form submission
        pass_error.innerHTML = "Valid password is required   '</br>' Password must be atleat one capital letter '<br>'lenth must be 5-20"; // Display error message
    } else {
        pass_error.innerHTML = ""; // Clear error message
    }

    // Validate password confirmation field
    if (password2.value !== password.value) { // Check if password confirmation matches password
        e.preventDefault(); // Prevent form submission
        pass_error2.innerHTML = "Passwords must match"; // Display error message
    } else {
        pass_error2.innerHTML = ""; // Clear error message
    } 
});
