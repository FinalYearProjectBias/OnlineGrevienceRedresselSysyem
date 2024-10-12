// Function to toggle the visibility of the sign-up forms based on user type
function toggleForm() {
    var role = document.getElementById("role").value;
    document.getElementById("student-form").style.display = "none";
    document.getElementById("teacher-form").style.display = "none";
    document.getElementById("staff-form").style.display = "none";

    if (role === "student") {
        document.getElementById("student-form").style.display = "block";
    } else if (role === "teacher") {
        document.getElementById("teacher-form").style.display = "block";
    } else if (role === "staff") {
        document.getElementById("staff-form").style.display = "block";
    }
}

// Function to handle sign-up form submission
async function handleSignUp(event, userType) {
    event.preventDefault(); // Prevent the default form submission

    let signUpData;

    // Collect data based on user type
    if (userType === 'student') {
        signUpData = {
            user_type: userType,
            name: document.getElementById('student-name').value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            course: document.getElementById('course').value,
            batch: document.getElementById('batch').value,
            roll_no: document.getElementById('roll-no').value,
            email: document.getElementById('email').value,
            contact_number: document.getElementById('contact-number').value,
            password: document.getElementById('password').value,
        };
    } else if (userType === 'teacher') {
        signUpData = {
            user_type: userType,
            name: document.getElementById('teacher-name').value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            department: document.getElementById('department').value,
            designation: document.getElementById('designation').value,
            email: document.getElementById('teacher-email').value,
            contact_number: document.getElementById('teacher-contact').value,
            password: document.getElementById('teacher-password').value,
        }; 
    } else if (userType === 'staff') {
        signUpData = {
            user_type: "non-teaching",
            name: document.getElementById('staff-name').value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            department: document.getElementById('staff-department').value,
            designation: document.getElementById('staff-designation').value,
            email: document.getElementById('staff-email').value,
            contact_number: document.getElementById('staff-contact').value,
            password: document.getElementById('staff-password').value,
        };
    }

    // Log the form data to the console
    console.log('Form Data to be sent to API:', signUpData);

    // Define the API endpoint based on user type
    let apiUrl;
    if (userType === 'student') {
        apiUrl = 'https://backend-server-ohpm.onrender.com/api/v1/student/signup/';
    } else if (userType === 'teacher' || userType==='staff') {
        apiUrl = 'https://backend-server-ohpm.onrender.com/api/v1/faculty/signup/';
    } 
     
    else {
        console.error('Invalid user type');
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpData),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        console.log('Sign-up successful:', result);
        
        // Display the success message
        const successMessage = document.getElementById('success-message');
        successMessage.style.display = 'block'; // Show the message
        
        // Optionally, reset the form
        event.target.reset();

        // Redirect to the index page after a delay (3 seconds)
        setTimeout(function () {
            window.location.href = 'index.html'; // Change 'index.html' to your desired page
        }, 3000); // 3-second delay
    } catch (error) {
        console.error('Error during sign-up:', error);
        // Handle error (e.g., show an error message)
    }
}

// Add event listeners to the forms
document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('student-form');
    const teacherForm = document.getElementById('teacher-form');
    const staffForm = document.getElementById('staff-form');

    studentForm.addEventListener('submit', (event) => handleSignUp(event, 'student'));
    teacherForm.addEventListener('submit', (event) => handleSignUp(event, 'teacher'));
    staffForm.addEventListener('submit', (event) => handleSignUp(event, 'staff'));
});
