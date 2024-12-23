document.getElementById("LoginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("Email").value.trim();
    const password = document.getElementById("Password").value.trim();

    // جلب بيانات المستخدم من JSONBin
    fetch('https://api.jsonbin.io/v3/b/6768b123e41b4d34e469bd21', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$HqM1bdrr41131InBzameUOsGOzVlBP5j278TTKfP.OSQWn6daWmFi',
            'X-Bin-Private': 'true'
        }
    })
    .then(response => response.json())
    .then(data => {
        // تحقق من مطابقة البريد الإلكتروني وكلمة المرور
        const user = data.record;  // هذا المستخدم الوحيد في JSONBin
        if (user.email === email && user.password === password) {
            alert("تم تسجيل الدخول بنجاح!");
            window.location.href = 'inventory.html'; // تحويل إلى صفحة المخزون
        } else {
            alert("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        }
    })
    .catch((error) => {
        console.error('حدث خطأ:', error);
        alert("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة لاحقًا.");
    });
});
