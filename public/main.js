const socket = io();
const tableBody = document.querySelector("#studentTable tbody");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

let editId = null;

function loadStudents() {
    fetch("/students")
    .then(res => res.json())
    .then(data => {
        tableBody.innerHTML = "";
        data.forEach(s => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${s.name}</td>
            <td>${s.email}</td>
            <td>${s.age}</td>
            <td>
            <button class="edit-btn" onclick='startEdit(${JSON.stringify(s)})'>Sửa</button>
            <button class="delete-btn" onclick="deleteStudent(${s.id})">Xóa</button>
            </td>
        `;
        tableBody.appendChild(tr);
        });
    });
}

function addOrUpdate() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;

    if (!name || !email || !age) return alert("Nhập đủ thông tin!");

    if (editId) {
    fetch(`/students/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, age })
    }).then(() => cancelEdit());
    } else {
    fetch("/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, age })
    });
    }
}

function startEdit(student) {
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("age").value = student.age;
    saveBtn.textContent = "Lưu";
    saveBtn.className = "save-btn";
    cancelBtn.style.display = "inline";
    editId = student.id;
}

function cancelEdit() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("age").value = "";
    saveBtn.textContent = "Thêm";
    saveBtn.className = "add-btn";
    cancelBtn.style.display = "none";
    editId = null;
}

function deleteStudent(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
    fetch(`/students/${id}`, { method: "DELETE" });
    }
}

socket.on("update", () => {
    loadStudents();
});

loadStudents();
