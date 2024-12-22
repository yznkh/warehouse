document.getElementById("Signupform").addEventListener("submit", function(event) {
    event.preventDefault();

    const employeename = document.getElementById("Employeename").value.trim();
    const email = document.getElementById("Email").value.trim();
    const phoneNumber = document.getElementById("PhoneNumber").value.trim();
    const password = document.getElementById("Password").value.trim();
    const rePassword = document.getElementById("RePassword").value.trim();

    // Name Validation
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(employeename)) {
        alert("Name must contain only letters (A-Z or a-z), no numbers or symbols.");
        return;
    }

    // Email Validation
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(email)) {
        alert("Enter a valid email address, e.g., example@example.com.");
        return;
    }

    // Phone Number Validation
    const phoneRegex = /^\d{1,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
        alert("Enter a valid phone number with up to 15 digits.");
        return;
    }

    // Prevent harmful code input
    if (email.includes("<") || email.includes(">") || email.includes("'") || email.includes('"')) {
        alert("Invalid characters detected in email.");
        return;
    }
// If all validations pass, redirect to the inventory page
window.location.href = 'inventory.html';
});
