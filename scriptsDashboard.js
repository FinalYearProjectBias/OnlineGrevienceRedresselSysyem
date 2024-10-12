function showSection(sectionId) {
  document.querySelectorAll('.content').forEach(section => {
      section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
}

function signOut() {
  window.location.href = 'index.html'; // Redirect to login page
}

document.addEventListener('DOMContentLoaded', () => {
  // Toggle password visibility
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

  // Post Grievance form submission
  const postGrievanceForm = document.getElementById('post-grievance-form');
  if (postGrievanceForm) {
      postGrievanceForm.addEventListener('submit', postGrievance);
  }

  // My Grievance button click
  const myGrievanceButton = document.querySelector('button[onclick="showSection(\'my-grievance\')"]');
  if (myGrievanceButton) {
      myGrievanceButton.addEventListener('click', fetchMyGrievances);
  }
});

// Function to post a grievance
async function postGrievance(event) {
  event.preventDefault(); // Prevent the default form submission

  const title = document.getElementById('grievance-title').value;
  const message = document.getElementById('grievanceMessage').value;
  const userRef = localStorage.getItem('user_id'); // Assuming 'user_id' is the key in local storage

  if (!message || !title) {
      alert('Please enter a grievance message.');
      return;
  }

  const grievanceData = {
      title: title,
      message: message,
      user_ref: userRef // Add user reference from local storage
  };

  // Prevent multiple submissions
  const submitButton = event.target.querySelector('button[type="submit"]');
  submitButton.disabled = true; // Disable the button

  try {
      const prodUrl = 'https://backend-server-ohpm.onrender.com/api/v1/user/add_grievance/';
      const devUrl = 'http://127.0.0.1:8000/api/v1/user/add_grievance/';

      const response = await fetch(prodUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(grievanceData),
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      // Show success message
      document.getElementById('postSuccessMessage').style.display = 'block';
      document.getElementById('postErrorMessage').style.display = 'none';

      // Clear the textarea
      document.getElementById('grievanceMessage').value = '';
  } catch (error) {
      console.error('Error posting grievance:', error);
      document.getElementById('postErrorMessage').style.display = 'block';
      document.getElementById('postSuccessMessage').style.display = 'none';
  } finally {
      // Re-enable the button after the process is complete
      submitButton.disabled = false; // Re-enable the button
  }
}

// Function to fetch grievances made by the user
async function fetchMyGrievances() {
  const userRef = localStorage.getItem('user_id'); // Assuming 'user_id' is the key in local storage

  const prodUrl = `https://backend-server-ohpm.onrender.com/api/v1/user/get_grievances/${userRef}`;
  try {
      const response = await fetch(prodUrl);

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const grievances = await response.json();

      // Display fetched grievances
      displayMyGrievances(grievances.data);
  } catch (error) {
      console.error('Error fetching my grievances:', error);
      // Show user-friendly error message here, e.g., display an alert or update UI
  }
}

// Function to display grievances in the My Grievance section
function displayMyGrievances(grievances) {
  const myGrievanceContainer = document.getElementById('my-grievance');
  myGrievanceContainer.innerHTML = ''; // Clear existing content

  grievances.forEach(grievance => {
      const grievanceElement = document.createElement('div');
      grievanceElement.classList.add('grievance');

      grievanceElement.innerHTML = `
          <h3>Acknowledgment Number: ${grievance.ack_number}</h3>
          <p>Message: ${grievance.message}</p>
          <p>Status: ${grievance.responded ? 'Responded' : 'Not Responded'}</p>
      `;

      myGrievanceContainer.appendChild(grievanceElement);
  });
}
