// scripts/cart-ui.js
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { auth } from "./firebase-auth.js";

const db = getFirestore();

export function displayCart() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const cartDiv = document.getElementById("cartItems");
  const totalPriceDiv = document.getElementById("totalPrice");

  if (!cartItems.length) {
    cartDiv.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceDiv.textContent = "💰 Total: ₹0";
    return;
  }

  cartDiv.innerHTML = cartItems.map(item => `
    <div class="card" style="margin: 10px 0;">
      <h4>${item.TestName}</h4>
      <p>₹${item.offerPrice}</p>
      <button onclick="removeFromCart('${item.TestName}')">Remove</button>
    </div>
  `).join("");

  const total = cartItems.reduce((sum, item) => sum + item.offerPrice, 0);
  totalPriceDiv.textContent = `💰 Total: ₹${total}`;
}

export function removeFromCart(testName) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  cartItems = cartItems.filter(item => item.TestName !== testName);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  displayCart();
}

document.addEventListener("DOMContentLoaded", displayCart);

// Floating Cart Icon (moved here from booking.js)
const cartBtn = document.createElement("div");
cartBtn.innerHTML = `
  <a href="cart.html" style="position: fixed; bottom: 90px; right: 20px; background-color: #00a884; padding: 10px 15px; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.2); z-index: 999;">
    <i class="fas fa-shopping-cart" style="color:white; font-size: 20px;"></i>
  </a>
`;
document.body.appendChild(cartBtn);
