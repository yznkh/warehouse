// حفظ البيانات في localStorage
function saveToLocalStorage() {
    const table = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];
    const rows = table.getElementsByTagName("tr");
    let products = [];

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td");
        let product = {
            name: cells[0].innerText,
            quantity: cells[1].innerText,
            location: cells[2].innerText,
            receivedQuantity: cells[3].innerText,
            remainingQuantity: cells[4].innerText
        };
        products.push(product);
    }

    localStorage.setItem("products", JSON.stringify(products));
}

// استعادة البيانات من localStorage
function loadFromLocalStorage() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const table = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];
    table.innerHTML = ""; // مسح البيانات القديمة

    products.forEach(product => {
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.location}</td>
            <td>${product.receivedQuantity}</td>
            <td>${product.remainingQuantity}</td>
            <td>
                <button class="action-button" onclick="editRow(this)">تعديل</button>
                <button class="action-button" onclick="deleteRow(this)">حذف</button>
            </td>
        `;
    });
}

// دالة لتعديل صف المنتج
function editRow(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName("td");

    document.getElementById("product-name").value = cells[0].innerText;
    document.getElementById("quantity").value = cells[1].innerText;
    document.getElementById("received-quantity").value = cells[3].innerText;
    document.getElementById("location").value = cells[2].innerText;

    // حذف الصف الحالي
    row.parentNode.removeChild(row);

    // حفظ التحديثات إلى localStorage
    saveToLocalStorage();
}

// دالة لحذف صف المنتج
function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);

    // حفظ التحديثات إلى localStorage
    saveToLocalStorage();
}

// دالة للبحث عن المنتجات في الجدول
document.getElementById("searchInput").addEventListener("input", function() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const table = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];
    const rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        const productName = rows[i].getElementsByTagName("td")[0].innerText.toLowerCase();
        if (productName.includes(input)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
});

// دالة لتصدير البيانات إلى ملف Excel
function exportToExcel() {
    const table = document.getElementById("inventoryTable");

    // تأكد من وجود بيانات في الجدول
    if (table.rows.length === 1) {
        alert("لا توجد بيانات لتصديرها");
        return;
    }

    // تحويل الجدول إلى ورقة عمل Excel
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // إنشاء ملف Excel
    XLSX.writeFile(workbook, "inventory.xlsx");
}

// إضافة حدث عند تقديم النموذج لإضافة منتج جديد
document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const productName = document.getElementById("product-name").value;
    const quantity = document.getElementById("quantity").value;
    const receivedQuantity = document.getElementById("received-quantity").value;
    const location = document.getElementById("location").value;

    const table = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${productName}</td>
        <td>${quantity}</td>
        <td>${location}</td>
        <td>${receivedQuantity}</td>
        <td>${quantity - receivedQuantity}</td>
        <td>
            <button class="action-button" onclick="editRow(this)">تعديل</button>
            <button class="action-button" onclick="deleteRow(this)">حذف</button>
        </td>
    `;

    // إعادة تعيين النموذج
    document.getElementById("productForm").reset();

    // حفظ البيانات إلى localStorage
    saveToLocalStorage();
});

// تحميل البيانات من localStorage عند تحميل الصفحة
window.onload = function() {
    loadFromLocalStorage();
};
