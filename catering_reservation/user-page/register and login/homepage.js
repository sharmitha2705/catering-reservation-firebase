import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Initialize Firebase (ensure you have the correct config set up here)
const db = getFirestore();
const auth = getAuth();

// Get the current logged-in user
const user = auth.currentUser;
if (user) {
    // Fetch the user data from Firestore
    const userDocRef = doc(db, "users", user.uid);
    getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists()) {
            const userData = docSnap.data();
            document.getElementById("userNameDisplay").innerText = `${userData.firstName} ${userData.lastName}`;
            document.getElementById("userEmailDisplay").innerText = userData.email;
        }
    });
}

// Fetch and display cart items
const cartDocRef = doc(db, "carts", user.uid);  // Assuming you have a 'carts' collection in Firestore
getDoc(cartDocRef).then((docSnap) => {
    if (docSnap.exists()) {
        const cartData = docSnap.data();
        const cartItemsDiv = document.getElementById("cartItems");
        cartItemsDiv.innerHTML = ""; // Clear the existing cart items
        cartData.items.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");
            itemDiv.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <p>${item.name}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${item.price}</p>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });
    }
});

// Handle adding items to cart
const addToCartButton = document.getElementById("addToCartButton");
addToCartButton.addEventListener("click", () => {
    const mealName = document.getElementById("meal-name").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);
    const imageUrl = document.getElementById("meal-img-url").value;

    const cartDocRef = doc(db, "carts", user.uid);
    getDoc(cartDocRef).then((docSnap) => {
        let cartData = docSnap.exists() ? docSnap.data() : { items: [] };
        cartData.items.push({ name: mealName, quantity, price, imageUrl });
        updateDoc(cartDocRef, cartData);
    });
});



