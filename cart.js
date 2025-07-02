function loadCart() {
  const cartData = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const cartDiv = document.getElementById("cartItems");
  const totalDiv = document.getElementById("totalPrice");

  if (cartData.length === 0) {
    cartDiv.innerHTML = "<p>🛒 Your cart is empty.</p>";
    totalDiv.textContent = "💰 Total: ₹0";
    return;
  }

  let html = "<ul>";
  let total = 0;

  cartData.forEach((item, index) => {
    html += `<li>${item.type === 'Profile' ? '📁' : '🧪'} ${item.TestName} – ₹${item.offerPrice} 
      <button onclick="removeItem(${index})">❌ Remove</button></li>`;
    total += item.offerPrice;
  });

  html += "</ul>";
  cartDiv.innerHTML = html;
  totalDiv.textContent = `💰 Total: ₹${total}`;
}

function removeItem(index) {
  const cartData = JSON.parse(localStorage.getItem("cartItems") || "[]");
  cartData.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartData));
  loadCart();
}

window.onload = loadCart;


