import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc,
  setDoc,
  getDoc
} from "./firebase.js";

// SIGN UP
window.register = async function () {
  const empId = document.getElementById("empId")?.value;
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;
  const role = document.getElementById("role")?.value;

  if (!empId || !email || !password) {
    alert("All fields required");
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCred.user.uid), {
      empId,
      email,
      role
    });

    alert("Account created!");
    window.location.href = "SignIn.html";
  } catch (err) {
    alert(err.message);
  }
};

// SIGN IN
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, "users", userCred.user.uid));

    if (snap.data().role === "HR") {
      window.location.href = "./hr/index.html";
    } else {
      window.location.href = "./employee/index.html";
    }

  } catch (err) {
    alert("Invalid login");
  }
};
