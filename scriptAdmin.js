document.addEventListener('DOMContentLoaded', () => {
    // Handle dropdown functionality
    
    // Handle sidebar link clicks to show the relevant section
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Handle sign-out button click
    document.getElementById('sign-out-btn')?.addEventListener('click', signOut);

    // Handle form submissions
    function handleFormSubmit(formId, successMessageId) {
        document.getElementById(formId)?.addEventListener('submit', (event) => {
            event.preventDefault();
            // Perform form submission logic here

            // Show success message
            const messageElement = document.getElementById(successMessageId);
            messageElement.style.display = 'block';

            // Clear the form fields
            document.getElementById(formId).reset();
        });
    }

    // Handle add member form submission
    document.getElementById('add-member-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        document.getElementById('form-success-message').style.display = 'block';
        document.getElementById('add-member-form').reset();
    });

    // Handle change password form submission
    document.getElementById('change-password-form')?.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        if (!checkPasswordMatch()) return; // Check if passwords match

        // Perform password change logic here

        // Show success message
        const messageElement = document.getElementById('change-password-success-message');
        if (messageElement) {
            messageElement.style.display = 'block';
        }

        // Clear the form fields
        document.getElementById('change-password-form').reset();
    });

    // Handle edit profile form submission
    document.getElementById('edit-profile-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        // Perform the update profile logic here

        // Show success message
        const messageElement = document.getElementById('edit-profile-success-message');
        if (messageElement) {
            messageElement.style.display = 'block';
        }

        // Clear form fields
        document.getElementById('edit-profile-form').reset();
    });

    // Fetch grievances and display them
    fetchGrievances();

    // Function to fetch grievances from the API
    async function fetchGrievances() {
        try {
            const prodUrl = 'https://backend-server-ohpm.onrender.com/api/v1/admin/get_grievance/';
            const response = await fetch(prodUrl); // Adjust the endpoint as necessary
            if (!response.ok) throw new Error('Network response was not ok');
            const grievances = await response.json();
            console.log(grievances);
            displayGrievances(grievances.data);
        } catch (error) {
            console.error('Error fetching grievances:', error);
        }
    }

    // Function to display grievances in a blog format
    function displayGrievances(grievances) {
        const grievancesContainer = document.getElementById('grievancesContainer');
        console.log(grievancesContainer); // Check if this is null
        if (!grievancesContainer) {
            console.error('Grievances container not found!');
            return; // Exit the function if the container is not found
        }
        grievancesContainer.innerHTML = ''; // Clear existing content

        grievances.forEach(grievance => {
            const grievanceElement = document.createElement('div');
            grievanceElement.classList.add('grievance');

            grievanceElement.innerHTML = `
                <h3>Acknowledgment Number: ${grievance.ack_number}</h3>
                <p>Message: ${grievance.message}</p>
                <button onclick="replyToGrievance('${grievance.ack_number}')">Reply</button>
            `;

            grievancesContainer.appendChild(grievanceElement);
        });
    }

    // Function to handle replying to a grievance
    window.replyToGrievance = function(acknowledgmentNumber) {
        // Show the reply modal
        const replyModal = document.getElementById('replyModal');
        replyModal.style.display = 'block';

        // Store the acknowledgment number in a data attribute for later use
        replyModal.setAttribute('data-acknowledgment-number', acknowledgmentNumber);
    };

    // Function to close the reply modal
    window.closeModal = function() {
        const replyModal = document.getElementById('replyModal');
        replyModal.style.display = 'none';
    };

    // Event listener for the Send Reply button
    document.getElementById('sendReplyButton')?.addEventListener('click', async () => {
        const replyMessage = document.getElementById('replyMessage').value;
        const acknowledgmentNumber = document.getElementById('replyModal').getAttribute('data-acknowledgment-number');

        if (!replyMessage) {
            alert('Please enter a reply message.');
            return;
        }

        const replyData = {
            ack_number: acknowledgmentNumber,
            reply: replyMessage
        };

        try {
            const prodUrl = 'https://backend-server-ohpm.onrender.com/api/v1/admin/reply_grievance/';
            const response = await fetch(prodUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(replyData),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            // Show success message
            alert('Reply sent successfully!');
            closeModal(); // Close the modal
            document.getElementById('replyMessage').value = ''; // Clear the textarea
        } catch (error) {
            console.error('Error sending reply:', error);
            alert('Error sending reply. Please try again.');
        }
    });

    // Function to check if new passwords match and validate the password strength
    function checkPasswordMatch() {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-new-password').value;
        const errorElement = document.getElementById('password-error');
        
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,])[A-Za-z\d!@#$%^&*()_+}{":;'?/>.<,]{8,}$/;
        
        
        
        // Check if the new password is not the same as the current password
        if (currentPassword === newPassword && currentPassword === confirmPassword) {
            errorElement.textContent = 'New password should not be the same as the current password.';
            return false;
        }

        // Validate password strength
        if (!passwordRegex.test(newPassword)) {
            errorElement.textContent = 'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.';
            return false;
        }
        
        // Check if new password matches confirm password
        if (newPassword !== confirmPassword) {
            errorElement.textContent = 'Passwords do not match!';
            return false;
        } else {
            errorElement.textContent = '';
            return true;
        }
    }

    // Sign out function
    function signOut() {
        window.location.href = 'index.html'; // Adjust the URL to match your login page
    }

    // Initialize members array
    const members = [];

    // Function to populate the table with data
    function populateTable() {
        const tableBody = document.querySelector('#members-table tbody');
        tableBody.innerHTML = ''; // Clear the table before populating
        members.forEach(member => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${member.srNo}</td>
                <td>${member.name}</td>
                <td>${member.gender}</td>
                <td>${member.designation}</td>
                <td>${member.email}</td>
                <td>${member.contact}</td>
                <td><button class="action-button" onclick="deleteMember(${member.srNo})"><i class="fas fa-trash-alt"></i></button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Function to handle member deletion
    function deleteMember(srNo) {
        const confirmation = confirm('Are you sure you want to delete this member?');
        if (confirmation) {
            // Remove the member from the data array
            const index = members.findIndex(member => member.srNo === srNo);
            if (index !== -1) {
                members.splice(index, 1);
                // Refresh the table
                populateTable();
            }
        }
    }

    // Handle form submission
    document.getElementById('add-member-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get form values
        const name = document.getElementById('member-name').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const designation = document.getElementById('member-designation').value; // Fixed typo from 'member-degination' to 'member-designation'
        const email = document.getElementById('member-email').value;
        const contact = document.getElementById('member-contact').value;
        const password = document.getElementById('member-password').value;

        // Generate new member object
        const newMember = {
            srNo: members.length + 1,
            name,
            gender,
            designation,
            email,
            contact,
            password
        };

        // Add new member to the array and refresh the table
        members.push(newMember);
        populateTable();

        // Show success message and reset the form
        document.getElementById('form-success-message').style.display = 'block';
        setTimeout(() => {
            document.getElementById('form-success-message').style.display = 'none';
        }, 3000);
        document.getElementById('add-member-form').reset();
    });

    // Populate the table on page load (if you want to add some initial data, you can do it here)
    document.addEventListener('DOMContentLoaded', populateTable);
});