document.addEventListener("DOMContentLoaded", () => {
  showSection("dashboard", document.querySelector(".menu-item"));
  renderAttendanceTable();
});

/* Sidebar toggle */
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}

/* Section switch */
function showSection(section, element) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));

  if (section === "dashboard")
    document.getElementById("dashboardSection").classList.remove("hidden");

  if (section === "attendance")
    document.getElementById("attendanceSection").classList.remove("hidden");

  document.querySelectorAll(".menu-item").forEach(i => i.classList.remove("active"));
  element.classList.add("active");
}

/* ================= ATTENDANCE LOGIC ================= */

const storageKey = "attendanceRecords";
let records = JSON.parse(localStorage.getItem(storageKey)) || [];

const statusEl = document.getElementById("attendanceStatus");
const checkInBtn = document.getElementById("checkInBtn");
const checkOutBtn = document.getElementById("checkOutBtn");
const tableBody = document.getElementById("attendanceTableBody");

const today = new Date().toLocaleDateString();

/* Load today state */
const todayRecord = records.find(r => r.date === today);
if (todayRecord) {
  if (todayRecord.checkIn && !todayRecord.checkOut) {
    statusEl.innerText = `Status: Checked In at ${todayRecord.checkIn}`;
    checkInBtn.disabled = true;
    checkOutBtn.disabled = false;
  }
  if (todayRecord.checkOut) {
    statusEl.innerText = `Status: Checked Out at ${todayRecord.checkOut}`;
    checkInBtn.disabled = true;
    checkOutBtn.disabled = true;
  }
}

/* Check-In */
function checkIn() {
  const time = new Date().toLocaleTimeString();

  records.push({
    date: today,
    checkIn: time,
    checkOut: "--",
    status: "Present"
  });

  localStorage.setItem(storageKey, JSON.stringify(records));

  statusEl.innerText = `Status: Checked In at ${time}`;
  checkInBtn.disabled = true;
  checkOutBtn.disabled = false;

  renderAttendanceTable();
}

/* Check-Out */
function checkOut() {
  const time = new Date().toLocaleTimeString();

  const record = records.find(r => r.date === today);
  record.checkOut = time;

  localStorage.setItem(storageKey, JSON.stringify(records));

  statusEl.innerText = `Status: Checked Out at ${time}`;
  checkOutBtn.disabled = true;

  renderAttendanceTable();
}

/* Render History */
function renderAttendanceTable() {
  tableBody.innerHTML = "";

  records.forEach(r => {
    tableBody.innerHTML += `
      <tr>
        <td>${r.date}</td>
        <td>${r.checkIn}</td>
        <td>${r.checkOut}</td>
        <td>${r.status}</td>
      </tr>
    `;
  });
}
import { auth, db, doc, getDoc } from "../firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "../SignIn.html";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));

  if (snap.data().role !== "Employee") {
    alert("Unauthorized access");
    window.location.href = "../SignIn.html";
  }
});
