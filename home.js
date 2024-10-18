const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterForm = document.getElementById('showRegisterForm');
const showLoginForm = document.getElementById('showLoginForm');

// إظهار نموذج التسجيل وإخفاء نموذج تسجيل الدخول
showRegisterForm.addEventListener('click', function(e) {
    e.preventDefault();
    loginForm.style.opacity = '0'; // تقليل الشفافية لنموذج تسجيل الدخول
    setTimeout(() => {
        loginForm.style.display = 'none'; // إخفاء نموذج تسجيل الدخول بعد الانتهاء من الانيميشن
        registerForm.style.display = 'flex'; // عرض نموذج التسجيل
        setTimeout(() => {
            registerForm.style.opacity = '1'; // إعادة الشفافية لنموذج التسجيل
        }, 50); // تأخير قليل لتفادي مشكلة الانتقال الفوري
    }, 500); // نفس الوقت كما في الانيميشن
});

// إظهار نموذج تسجيل الدخول وإخفاء نموذج التسجيل
showLoginForm.addEventListener('click', function(e) {
    e.preventDefault();
    registerForm.style.opacity = '0'; // تقليل الشفافية لنموذج التسجيل
    setTimeout(() => {
        registerForm.style.display = 'none'; // إخفاء نموذج التسجيل بعد الانتهاء من الانيميشن
        loginForm.style.display = 'flex'; // عرض نموذج تسجيل الدخول
        setTimeout(() => {
            loginForm.style.opacity = '1'; // إعادة الشفافية لنموذج تسجيل الدخول
        }, 50); // تأخير قليل لتفادي مشكلة الانتقال الفوري
    }, 500); // نفس الوقت كما في الانيميشن
});

// تأكد من أن النماذج في حالة غير مرئية عند التحميل
loginForm.style.opacity = '1';
registerForm.style.opacity = '0'; // بدءاً من نموذج التسجيل بشفافية 0
