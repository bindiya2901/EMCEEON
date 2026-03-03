// js/profile.js

const wrapper = document.getElementById("profileWrapper");
const pic = document.getElementById("profilePic");
const nameEl = document.getElementById("profileName");
const emailEl = document.getElementById("profileEmail");
const dropdown = document.getElementById("profileDropdown");

const logoutBtn = document.getElementById("logoutBtn");
const leaderboardBtn = document.getElementById("leaderboardBtn");

// Load user from localStorage
const name = localStorage.getItem("name");
const email = localStorage.getItem("email");
const photo = localStorage.getItem("photo");

// If logged in → show profile
if (name && email && photo) {
  wrapper.classList.remove("hidden");
  pic.src = photo;
  nameEl.textContent = name;
  emailEl.textContent = email;
}

// Toggle dropdown
pic?.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.classList.toggle("hidden");
});

// Close dropdown on outside click
document.addEventListener("click", () => {
  dropdown.classList.add("hidden");
});

// Logout
logoutBtn?.addEventListener("click", () => {
  localStorage.clear();
  location.href = "index.html";
});

// Leaderboard
leaderboardBtn?.addEventListener("click", () => {
  location.href = "leaderboard.html";
});
