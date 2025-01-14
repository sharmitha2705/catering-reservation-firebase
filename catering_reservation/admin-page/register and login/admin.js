import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWR1WIv8rcJgoMTaAA-pZZxF9_hL4mJDg",
    authDomain: "login--user.firebaseapp.com",
    projectId: "login--user",
    storageBucket: "login--user.appspot.com",
    messagingSenderId: "848511002999",
    appId: "1:848511002999:web:2dc998b9e61ab8b9851972"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Handle Admin Login
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // Redirect to product.html on success
        window.location.href = "product.html";
    } catch (error) {
        console.error("Login failed:", error.message);
        errorMessage.textContent = "Invalid email or password.";
        errorMessage.style.display = 'block';
    }
});

