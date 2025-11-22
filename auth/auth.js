window.addEventListener("DOMContentLoaded", () => {

  // ---------- LOGIN ----------
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      let users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        localStorage.setItem("loggedInUser", username);
        alert("✅ Login successful!");
        window.location.href = "../index.html";
      } else {
        alert("❌ Invalid username or password!");
      }
    });
  }

  // ---------- SIGNUP ----------
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!username || !password) {
        alert("Please fill all fields");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.find(u => u.username === username)) {
        alert("Username already exists!");
        return;
      }

      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("✅ Signup successful! You can now log in.");
      window.location.href = "login.html";
    });
  }

  // ---------- HEADER LOGIN/LOGOUT ----------
  const headerLogout = document.getElementById("headerLogout");
  const headerLogin = document.getElementById("headerLogin");

  const loggedUser = localStorage.getItem("loggedInUser");

  // ---------- WELCOME MESSAGE ----------
const welcomeMessage = document.getElementById("welcomeMessage");
if (welcomeMessage) {
  if (loggedUser) {
    welcomeMessage.innerHTML = `👋 Welcome, <strong>${loggedUser}</strong>! Ready to learn something new today?`;
  } else {
    welcomeMessage.innerHTML = `Welcome to <strong>TechLearn</strong>! Please <a href="auth/login.html">log in</a> or <a href="auth/signup.html">sign up</a>.`;
  }
}


  if (headerLogout && headerLogin) {
    if (loggedUser) {
      headerLogin.style.display = "none";
      headerLogout.style.display = "inline-block";
    } else {
      headerLogin.style.display = "inline-block";
      headerLogout.style.display = "none";
    }

headerLogout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("loggedInUser");
  alert("✅ Logged out successfully");

  headerLogout.style.display = "none";
  headerLogin.style.display = "inline-block";

  // Redirect to homepage correctly no matter where you are
  if (window.location.pathname.includes("/auth/")) {
    window.location.href = "../index.html";
  } else {
    window.location.href = "index.html";
  }
});

  }

});
