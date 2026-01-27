
document.addEventListener("DOMContentLoaded", () => {
  showSection("dashboard", document.querySelector(".menu-item"));
  renderEmployeeTable();
  renderAttendanceTable();
  updateUIState();
});


function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}

function showSection(section, element) {
  document.querySelectorAll(".section").forEach(sec =>
    sec.classList.add("hidden")
  );

  if (section === "dashboard")
    document.getElementById("dashboardSection").classList.remove("hidden");
  if (section === "employees")
    document.getElementById("employeesSection").classList.remove("hidden");
  if (section === "attendance")
    document.getElementById("attendanceSection").classList.remove("hidden");
  if (section === "leaves")
    document.getElementById("leavesSection").classList.remove("hidden");

  document.querySelectorAll(".menu-item").forEach(i =>
    i.classList.remove("active")
  );
  element.classList.add("active");
}


document
  .getElementById("employeeForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = empName.value.trim();
    const email = empEmail.value.trim();
    const role = empRole.value.trim();
    const dept = empDept.value.trim();

    if (!name || !email || !role || !dept) {
      alert("All fields required");
      return;
    }

    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.push({ name, email, role, dept });
    localStorage.setItem("employees", JSON.stringify(employees));

    this.reset();
    renderEmployeeTable();
  });

function renderEmployeeTable() {
  const tbody = document.querySelector("#employeeTable tbody");
  if (!tbody) return;

  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  tbody.innerHTML = "";

  employees.forEach(emp => {
    tbody.innerHTML += `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.role}</td>
        <td>${emp.dept}</td>
      </tr>
    `;
  });
}


let selectedUser = null;
const attendanceKey = "attendanceRecords";

function today() {
  return new Date().toISOString().split("T")[0];
}

function getAttendanceData() {
  return JSON.parse(localStorage.getItem(attendanceKey)) || [];
}

function saveAttendanceData(data) {
  localStorage.setItem(attendanceKey, JSON.stringify(data));
}

/* CHECK-IN ka logic niche hai */
function handleCheckIn() {
  const name = document.getElementById("userNameInput").value.trim();
  if (!name) {
    alert("Enter employee name");
    return;
  }

  let data = getAttendanceData();
  const exists = data.find(
    r => r.name === name && r.date === today() && !r.checkOut
  );

  if (exists) {
    alert("User already checked in today");
    return;
  }

  data.push({
    name,
    date: today(),
    checkIn: new Date().toLocaleTimeString(),
    checkOut: null
  });

  saveAttendanceData(data);
  document.getElementById("userNameInput").value = "";
  selectedUser = null;
  updateUIState();
  renderAttendanceTable();
}

/* CHECK-OUT ka logic ye hai... */
function handleCheckOut() {
  if (!selectedUser) {
    alert("Select a user from the table");
    return;
  }

  let data = getAttendanceData();
  const record = data.find(
    r => r.name === selectedUser && r.date === today() && !r.checkOut
  );

  if (!record) {
    alert("No active check-in found");
    return;
  }

  record.checkOut = new Date().toLocaleTimeString();
  saveAttendanceData(data);

  selectedUser = null;
  updateUIState();
  renderAttendanceTable();
}


function selectUser(name) {
  selectedUser = name;

  const hint = document.getElementById("attendanceHint");
  hint.innerText = `Selected: ${name}`;

  updateUIState();
  renderAttendanceTable();
}


function updateUIState() {
  const btnIn = document.getElementById("btnCheckIn");
  const btnOut = document.getElementById("btnCheckOut");

  if (!selectedUser) {
    btnOut.disabled = true;
    return;
  }

  const data = getAttendanceData();
  const active = data.find(
    r => r.name === selectedUser && r.date === today() && !r.checkOut
  );

  btnOut.disabled = !active;
}


function renderAttendanceTable() {
  const tbody = document.querySelector("#attendanceTable tbody");
  if (!tbody) return;

  const data = getAttendanceData();

  tbody.innerHTML = data
    .map(
      r => `
    <tr onclick="selectUser('${r.name}')"
        class="${r.name === selectedUser ? "selected" : ""}">
      <td>${r.name}</td>
      <td>${r.date}</td>
      <td>${r.checkIn}</td>
      <td>${r.checkOut || "--"}</td>
    </tr>
  `
    )
    .join("");
}

