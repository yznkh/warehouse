// حفظ البيانات في localStorage
// Save data to localStorage
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
// Load data from localStorage
function loadFromLocalStorage() {
    let products = [];
    try {
        products = JSON.parse(localStorage.getItem("products")) || [];
    } catch (e) {
        console.error("Error parsing localStorage data: ", e);
    }

    const table = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];
    table.innerHTML = ""; // Clear old data

    products.forEach(product => {
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.location}</td>
            <td>${product.receivedQuantity}</td>
            <td>${product.remainingQuantity}</td>
            <td>
                <button class="action-button" onclick="editRow(this)">Edit</button>
                <button class="action-button" onclick="deleteRow(this)">Delete</button>
            </td>
        `;
    });
}

// دالة لتعديل صف المنتج
// Function to edit a product row
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
// Function to delete a product row
function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);

    // Save updates to localStorage
    saveToLocalStorage();
}


// دالة للبحث عن المنتجات في الجدول
// Search function
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

// Add new product event
document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const referer = document.referrer;
    if (!referer || !referer.includes(window.location.hostname)) {
        alert("Invalid request source. Potential CSRF detected.");
        event.preventDefault();}
    
    const productName = document.getElementById("product-name").value.trim();
    const quantity = document.getElementById("quantity").value.trim();
    const receivedQuantity = document.getElementById("received-quantity").value.trim();
    const location = document.getElementById("location").value.trim();

    // Check for duplicate product names
    const table = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];
    const rows = table.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].getElementsByTagName("td")[0].innerText.toLowerCase() === productName.toLowerCase()) {
            alert("Product with this name already exists.");
            return;
        }
    }

    // Check inputs
    const alphaNumericRegex = /^[A-Za-z0-9\s]+$/;
    if (!alphaNumericRegex.test(productName) || !alphaNumericRegex.test(location)) {
        alert("Product Name and Location must contain only alphanumeric characters and spaces.");
        event.preventDefault();
        return;
    }

    if (Number(receivedQuantity) > Number(quantity)) {
        alert("Received quantity cannot exceed original quantity.");
        event.preventDefault();
        return;
    }

    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${productName}</td>
        <td>${quantity}</td>
        <td>${location}</td>
        <td>${receivedQuantity}</td>
        <td>${quantity - receivedQuantity}</td>
        <td>
            <button class="action-button" onclick="editRow(this)">Edit</button>
            <button class="action-button" onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    document.getElementById("productForm").reset();
    saveToLocalStorage();
});

// Load data from localStorage on page load
window.onload = function() {
    loadFromLocalStorage();
};

// Additional validation on form submission
document.getElementById("productForm").addEventListener("submit", function(event) {
    const productName = document.getElementById("product-name").value.trim();
    const quantity = document.getElementById("quantity").value.trim();
    const receivedQuantity = document.getElementById("received-quantity").value.trim();
    const location = document.getElementById("location").value.trim();

    const alphaNumericRegex = /^[A-Za-z0-9\s]+$/;
    if (!alphaNumericRegex.test(productName) || !alphaNumericRegex.test(location)) {
        alert("Product Name and Location must contain only alphanumeric characters and spaces.");
        event.preventDefault(); // Prevent form submission
    }

    if (Number(receivedQuantity) > Number(quantity)) {
        alert("Received quantity cannot exceed original quantity.");
        event.preventDefault();
    }
});
