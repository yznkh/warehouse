import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Initialize Firebase Database
const db = getDatabase();

document.getElementById("LoginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("Email").value.trim();
    const password = document.getElementById("Password").value.trim();

    // جلب بيانات المستخدم من Firebase
    const userId = email.replace(/[.#$[\]]/g, "_"); // استبدال الأحرف الغير مدعومة
    get(ref(db, 'users/' + userId))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                if (userData.password === password) {
                    window.location.href = 'inventory.html'; // الانتقال إلى صفحة inventory
                } else {
                    alert("كلمة المرور غير صحيحة.");
                }
            } else {
                alert("البريد الإلكتروني غير موجود.");
            }
        })
        .catch((error) => {
            console.error("حدث خطأ أثناء تسجيل الدخول:", error);
            alert("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة لاحقًا.");
        });
});
