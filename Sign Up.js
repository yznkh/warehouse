import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Initialize Firebase Database
const db = getDatabase();

document.getElementById("SignUpForm").addEventListener("submit", function (event) {
    event.preventDefault();

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

    // بيانات المستخدم
    const userId = email.replace(/[.#$[\]]/g, "_"); // استبدال الأحرف الغير مدعومة
    set(ref(db, 'users/' + userId), {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: password
    })
        .then(() => {
            alert("تم التسجيل بنجاح! يرجى تسجيل الدخول.");
            window.location.href = 'Login.html'; // التوجيه إلى صفحة تسجيل الدخول
        })
        .catch((error) => {
            console.error("حدث خطأ أثناء التسجيل:", error);
            alert("حدث خطأ أثناء التسجيل. يرجى المحاولة لاحقًا.");
        });
});
