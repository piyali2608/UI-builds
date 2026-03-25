// ─── State ───────────────────────────────────────────────────────────────────
let isDark = false;
let mode   = "login";   // "login" | "signup"
let role   = "student"; // "student" | "vendor"

// ─── Init ─────────────────────────────────────────────────────────────────────
document.body.classList.add("light");
renderForm();

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
function toggleTheme() {
  isDark = !isDark;
  document.body.classList.toggle("light", !isDark);
  document.body.classList.toggle("dark",  isDark);
  document.getElementById("themeBtn").textContent = isDark ? "☀ Light" : "🌙 Dark";
}

// ─── Mode Toggle (login ↔ signup) ─────────────────────────────────────────────
function toggleMode() {
  mode = mode === "login" ? "signup" : "login";
  clearSuccess();
  updateHeader();
  renderForm();
}

function goToLogin() {
  mode = "login";
  clearSuccess();
  updateHeader();
  renderForm();
}

// ─── Role Toggle ──────────────────────────────────────────────────────────────
function setRole(r) {
  role = r;
  document.getElementById("btnStudent").classList.toggle("active", role === "student");
  document.getElementById("btnVendor").classList.toggle("active",  role === "vendor");
  renderForm(); // re-render to swap "Business Name" ↔ "Student ID"
}

// ─── Header / subtitle update ─────────────────────────────────────────────────
function updateHeader() {
  document.getElementById("formTitle").textContent =
    mode === "login" ? "Welcome back" : "Create account";
  document.getElementById("formSubtitle").textContent =
    mode === "login"
      ? "Log in to your CravEX account."
      : "Your campus buddy is waiting — join now.";
  document.getElementById("roleRow").style.display =
    mode === "signup" ? "flex" : "none";
  document.getElementById("switchText").textContent =
    mode === "login" ? "Don't have an account?" : "Already have an account?";
  document.getElementById("switchBtn").textContent =
    mode === "login" ? "Sign up" : "Log in";
}

// ─── Render Form HTML ─────────────────────────────────────────────────────────
function renderForm() {
  updateHeader();
  const area = document.getElementById("formArea");

  if (mode === "login") {
    area.innerHTML = `
      <div class="field">
        <label>Email</label>
        <input type="email" id="loginEmail" placeholder="you@email.com" />
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" id="loginPassword" placeholder="••••••••" />
      </div>
      <div class="error-msg" id="loginError" style="display:none;"></div>
      <button class="submit-btn" onclick="handleLogin()">Log In</button>
    `;
  } else {
    const extraLabel = role === "vendor" ? "Business Name" : "Student ID / College";
    const extraPlaceholder = role === "vendor" ? "Night canteen" : "S202500****";
    area.innerHTML = `
      <div class="field">
        <label>Full Name</label>
        <input type="text" id="signupName" placeholder="your name" />
      </div>
      <div class="field">
        <label>${extraLabel}</label>
        <input type="text" id="signupExtra" placeholder="${extraPlaceholder}" />
      </div>
      <div class="field">
        <label>Email</label>
        <input type="email" id="signupEmail" placeholder="you@email.com" />
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" id="signupPassword" placeholder="••••••••" />
      </div>
      <div class="field">
        <label>Confirm Password</label>
        <input type="password" id="signupConfirm" placeholder="••••••••" />
      </div>
      <div class="error-msg" id="signupError" style="display:none;"></div>
      <button class="submit-btn" onclick="handleSignup()">Create Account</button>
    `;
  }
}

// ─── Login Handler ────────────────────────────────────────────────────────────
function handleLogin() {
  const email    = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const errEl    = document.getElementById("loginError");

  if (!email || !password)       return showError(errEl, "Please fill in all fields.");
  if (!email.includes("@"))      return showError(errEl, "Enter a valid email.");
  if (password.length < 6)       return showError(errEl, "Password must be at least 6 characters.");

  errEl.style.display = "none";
  showSuccess(`Welcome back, ${email.split("@")[0]}!`);
}

// ─── Signup Handler ───────────────────────────────────────────────────────────
function handleSignup() {
  const name     = document.getElementById("signupName").value.trim();
  const extra    = document.getElementById("signupExtra").value.trim();
  const email    = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirm  = document.getElementById("signupConfirm").value;
  const errEl    = document.getElementById("signupError");

  if (!name || !extra || !email || !password || !confirm)
                                 return showError(errEl, "Please fill in all fields.");
  if (!email.includes("@"))      return showError(errEl, "Enter a valid email.");
  if (password.length < 6)       return showError(errEl, "Password must be at least 6 characters.");
  if (password !== confirm)      return showError(errEl, "Passwords do not match.");

  errEl.style.display = "none";
  showSuccess(`Account created! Welcome, ${name} 🎉`);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function showError(el, msg) {
  el.textContent    = "⚠ " + msg;
  el.style.display  = "block";
}

function showSuccess(msg) {
  document.getElementById("formArea").innerHTML = "";
  document.getElementById("successMsg").textContent = "✅ " + msg;
  document.getElementById("successBox").style.display  = "block";
  document.getElementById("switchRow").style.display   = "none";
  document.getElementById("roleRow").style.display     = "none";
}

function clearSuccess() {
  document.getElementById("successBox").style.display = "none";
  document.getElementById("switchRow").style.display  = "block";
}