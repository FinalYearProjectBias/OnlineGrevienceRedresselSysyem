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
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.signup-form').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the default form submission
            
            // Display the success message
            const successMessage = document.getElementById('success-message');
            successMessage.style.display = 'block'; // Show the message
            
            // Optionally, reset the form
            form.reset();

            // Redirect to the index page after a delay (3 seconds)
            setTimeout(function () {
                window.location.href = 'index.html'; // Change 'index.html' to your desired page
            }, 3000); // 3-second delay
        });
    });
});
