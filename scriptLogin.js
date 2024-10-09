function showSection(sectionId) {
    document.querySelectorAll('.content').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function signOut() {
    window.location.href = 'login.html'; // Redirect to login page
}

function handleFormSubmit(event, formId, successMessageId) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Display success message
    document.getElementById(successMessageId).style.display = 'block';
    
    // Clear the form
    document.getElementById(formId).reset();

    // Optionally, hide the success message after a few seconds
    setTimeout(() => {
        document.getElementById(successMessageId).style.display = 'none';
    }, 3000);
}

function checkPasswordStrength() {
    const password = document.getElementById('new-password').value;
    const strengthBars = document.querySelectorAll('.strength-bar');
    const requirements = {
        length: /(?=.{8,})/,
        uppercase: /(?=.*[A-Z])/,
        number: /(?=.*\d)/,
        specialChar: /(?=.*[!@#$%^&*])/,
    };

    let strength = 0;
    if (requirements.length.test(password)) strength++;
    if (requirements.uppercase.test(password)) strength++;
    if (requirements.number.test(password)) strength++;
    if (requirements.specialChar.test(password)) strength++;

    strengthBars.forEach((bar, index) => {
        if (index < strength) {
            bar.classList.add('strong');
            bar.classList.remove('medium');
        } else if (index === strength) {
            bar.classList.add('medium');
            bar.classList.remove('strong');
        } else {
            bar.classList.remove('medium', 'strong');
        }
    });

    document.getElementById('length-requirement').classList.toggle('valid', requirements.length.test(password));
    document.getElementById('uppercase-requirement').classList.toggle('valid', requirements.uppercase.test(password));
    document.getElementById('number-requirement').classList.toggle('valid', requirements.number.test(password));
    document.getElementById('special-char-requirement').classList.toggle('valid', requirements.specialChar.test(password));
}

function handlePasswordChange(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const isValid = validatePasswordChange(currentPassword, newPassword, confirmPassword);
    
    if (isValid) {
        // Display success message
        document.getElementById('change-password-success').style.display = 'block';

        // Clear the form
        document.getElementById('change-password-form').reset();

        // Optionally, hide the success message after a few seconds
        setTimeout(() => {
            document.getElementById('change-password-success').style.display = 'none';
        }, 3000);
    }
}

function validatePasswordChange(currentPassword, newPassword, confirmPassword) {
    // This function should include the logic to check the current password and validate the new password
    // For demo purposes, we'll use the following basic validation

    const passwordRequirements = {
        minLength: 8,
        hasUppercase: /[A-Z]/,
        hasNumber: /[0-9]/,
        hasSpecialChar: /[!@#$%^&*]/,
    };

    // Ensure new password is different from current password
    if (currentPassword === newPassword) {
        alert('New password cannot be the same as the current password.');
        return false;
    }

    // Check new password strength
    if (!passwordRequirements.hasUppercase.test(newPassword) ||
        !passwordRequirements.hasNumber.test(newPassword) ||
        !passwordRequirements.hasSpecialChar.test(newPassword) ||
        newPassword.length < passwordRequirements.minLength) {
        alert('New password does not meet the strength requirements.');
        return false;
    }

    // Ensure new password and confirm password match
    if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match.');
        return false;
    }

    return true;
}
document.addEventListener('DOMContentLoaded', () => {
document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const inputId = toggle.getAttribute('data-input');
        const inputElement = document.getElementById(inputId);
        
        // Toggle between password and text input types
        if (inputElement.type === 'password') {
            inputElement.type = 'text';
            toggle.classList.remove('fa-eye');
            toggle.classList.add('fa-eye-slash');
        } else {
            inputElement.type = 'password';
            toggle.classList.remove('fa-eye-slash');
            toggle.classList.add('fa-eye');
        }
    });
});
});