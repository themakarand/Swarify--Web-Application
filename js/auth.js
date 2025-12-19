function register() {
  const name = nameInput();
  const email = emailInput();
  const password = passwordInput();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.email === email)) {
    alert("User already exists");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registered successfully");
  window.location.href = "index.html";
}

function login() {
  const email = emailInput();
  const password = passwordInput();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  window.location.href = "dashboard.html";
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// function protectDashboard() {
//   if (!localStorage.getItem("loggedInUser")) {
//     window.location.href = "index.html";
//   }
// }

function nameInput() {
  return document.getElementById("name")?.value.trim();
}
function emailInput() {
  return document.getElementById("email")?.value.trim();
}
function passwordInput() {
  return document.getElementById("password")?.value.trim();
}
