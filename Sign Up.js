document.getElementById("SignUpForm").addEventListener("submit", function(event) {
    event.preventDefault();  // منع إعادة تحميل الصفحة

    const name = document.getElementById("Name").value.trim();
    const email = document.getElementById("Email").value.trim();
    const phoneNumber = document.getElementById("PhoneNumber").value.trim();
    const password = document.getElementById("Password").value.trim();
    const confirmPassword = document.getElementById("ConfirmPassword").value.trim();

    // تحقق من تطابق كلمة المرور مع تأكيد كلمة المرور
    if (password !== confirmPassword) {
        alert("كلمة المرور غير متطابقة.");
        return;
    }

    // تحقق من صحة البريد الإلكتروني
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(email)) {
        alert("يرجى إدخال بريد إلكتروني صحيح.");
        return;
    }

    // تحقق من كلمة المرور
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل وتشمل حروفًا وأرقامًا.");
        return;
    }

    // بيانات المستخدم لإرسالها
    const userData = {
        "users": [
            {
                "name": name,
                "email": email,
                "phoneNumber": phoneNumber,
                "password": password,  // يجب عليك تشفير كلمة المرور قبل إرسالها
                "ConfirmPassword" : ConfirmPassword
            }
        ]
    };

    // إرسال البيانات إلى JSONBin باستخدام fetch
    fetch('https://api.jsonbin.io/v3/b/6768b123e41b4d34e469bd21', {
        method: 'PUT',  // استخدم 'PUT' لتحديث البيانات إذا كانت موجودة
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$HqM1bdrr41131InBzameUOsGOzVlBP5j278TTKfP.OSQWn6daWmFi',
            'X-Bin-Private': 'true'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('تم إرسال البيانات بنجاح:', data);
        alert("تم التسجيل بنجاح! يرجى تسجيل الدخول.");
        window.location.href = 'login.html'; // التوجيه إلى صفحة تسجيل الدخول
    })
    .catch((error) => {
        console.error('حدث خطأ:', error);
        alert("حدث خطأ أثناء التسجيل. يرجى المحاولة لاحقًا.");
    });
});
