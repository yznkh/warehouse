document.getElementById("LoginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("Email").value.trim();
    const password = document.getElementById("Password").value.trim();

    // Email Validation
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(email)) {
        alert("Enter a valid email address, e.g., example@example.com.");
        return;
    }

    // Password Validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters and contain both letters and numbers.");
        return;
    }

    // If validation passes, simulate login process (in real case, you'll compare with your data)
    // For now, we will simply redirect to the inventory page.
    window.location.href = 'inventory.html';
});
