import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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
const db = getFirestore(firebaseApp);

// Handle Product Upload
const productForm = document.getElementById('product-form');
const successMessage = document.getElementById('success-message');

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const imageUrl = document.getElementById('product-image').value;

    try {
        await addDoc(collection(db, 'products'), { name, description, price, imageUrl });
        successMessage.textContent = "Product uploaded successfully!";
        successMessage.style.display = 'block';
        productForm.reset();
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    } catch (error) {
        console.error("Error uploading product:", error.message);
    }
});
