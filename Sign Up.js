document.getElementById("SignUpForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("Name").value.trim();
    const email = document.getElementById("Email").value.trim();
    const phoneNumber = document.getElementById("PhoneNumber").value.trim();
    const password = document.getElementById("Password").value.trim();
    const confirmPassword = document.getElementById("ConfirmPassword").value.trim();

    // Validate if password and confirm password match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Validate the email and password (can be expanded based on your security needs)
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters long and contain both letters and numbers.");
        return;
    }

    // Data to be sent to JSONBin
    const userData = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: password // You should hash the password before storing it for security
    };

    // Send the data to JSONBin using fetch API
    fetch('https://api.jsonbin.io/v3/b/67689c24ad19ca34f8df6ddf', {
        method: 'PUT', // Or POST, depending on whether you want to create or update data
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$HqM1bdrr41131InBzameUOsGOzVlBP5j278TTKfP.OSQWn6daWmFi',
            'X-Bin-Private': 'true'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert("Sign Up successful! Please log in.");
        window.location.href = 'login.html'; // Redirect to login page after successful sign up
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("There was an error while signing up. Please try again.");
    });
});
