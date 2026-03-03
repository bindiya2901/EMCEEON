console.log("✅ auth.js loaded");

import { auth, provider, db } from "./firebase.js";

import { signInWithPopup, signOut } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { doc, getDoc, setDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("googleSignIn");
  const profileWrapper = document.getElementById("profileWrapper");
  const profilePic = document.getElementById("profilePic");
  const dropdown = document.getElementById("profileDropdown");
  const nameEl = document.getElementById("profileName");
  const emailEl = document.getElementById("profileEmail");
  const logoutBtn = document.getElementById("logoutBtn");

  // ================= LOGIN =================
  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Save locally
        localStorage.setItem("uid", user.uid);
        localStorage.setItem("email", user.email);
        localStorage.setItem("name", user.displayName || "");
        localStorage.setItem("photo", user.photoURL || "");

        // Save to Firestore
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
          await setDoc(userRef, {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            unlockedLevel: 1,
            bestTimes: {}
          });
        }

        location.reload();

      } catch (error) {
        console.error("🔥 LOGIN ERROR:", error);
        alert("Login failed: " + error.code);
      }
    });
  }

  // ================= LOAD PROFILE =================
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const photo = localStorage.getItem("photo");

  if (name && photo && profileWrapper) {
    profilePic.src = photo;
    nameEl.textContent = name;
    emailEl.textContent = email;
    profileWrapper.classList.remove("hidden");
  }

  // Toggle dropdown
  if (profilePic) {
    profilePic.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("hidden");
    });
  }

  document.body.addEventListener("click", () => {
    if (dropdown) dropdown.classList.add("hidden");
  });

  // ================= LOGOUT =================
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await signOut(auth);
      localStorage.clear();
      location.reload();
    });
  }

});