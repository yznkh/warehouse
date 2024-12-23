document.getElementById("LoginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("Email").value.trim();
    const password = document.getElementById("Password").value.trim();

    // جلب بيانات المستخدم من JSONBin
    fetch('https://api.jsonbin.io/v3/b/67689c24ad19ca34f8df6ddf', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$HqM1bdrr41131InBzameUOsGOzVlBP5j278TTKf.OSQWn6daWmFi',
            'X-Bin-Private': 'true'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log("Received data:", data);

            // التعامل مع البيانات كمجرد كائن
            const user = data.record || data; // استخدام data مباشرة إذا لم يكن هناك record

            if (user.email === email && user.password === password) {
                window.location.href = 'inventory.html'; // الانتقال إلى صفحة inventory
            } else {
                alert("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
            }
        })
        .catch((error) => {
            console.error('حدث خطأ:', error);
            alert("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة لاحقًا.");
        });
});
