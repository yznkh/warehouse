document.getElementById("LoginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("Email").value.trim();
    const password = document.getElementById("Password").value.trim();

    // Fetch the user data from JSONBin
    fetch('https://api.jsonbin.io/v3/b/67689c24ad19ca34f8df6ddf', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$HqM1bdrr41131InBzameUOsGOzVlBP5j278TTKfP.OSQWn6daWmFi',
            'X-Bin-Private': 'true'
        }
    })
    .then(response => response.json())
    .then(data => {
        let userFound = false;

        // Iterate through stored users to check for email and password match
        data.record.forEach(user => {
            if (user.email === email && user.password === password) {
                userFound = true;
                alert("تم تسجيل الدخول بنجاح!");
                window.location.href = 'inventory.html'; // Redirect to inventory page
            }
        });

        if (!userFound) {
            alert("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة لاحقًا.");
    });
});
