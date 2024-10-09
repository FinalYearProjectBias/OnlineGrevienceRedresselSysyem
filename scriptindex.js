
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Admin credentials
const adminCredentials = {
    email: 'admin@example.com',
    password: 'admin123'
};

document.getElementById('index-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('user-type').value;

    if (email === adminCredentials.email && password === adminCredentials.password && userType === 'admin') {
        localStorage.setItem('isAdminLoggedIn', 'true');
        window.location.href = 'Admin.html';
    } else {
        alert('Invalid email, password, or user type');
    }
});

// window.addEventListener('load', function() {
//     document.body.classList.add('loaded');
// });


