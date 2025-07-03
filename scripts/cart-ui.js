// cart-ui.js

const cartBtn = document.createElement("div");
cartBtn.id = "cart-float";
cartBtn.innerHTML = "🛒";
cartBtn.style.position = "fixed";
cartBtn.style.bottom = "90px";
cartBtn.style.right = "20px";
cartBtn.style.fontSize = "32px";
cartBtn.style.background = "#00a884";
cartBtn.style.color = "white";
cartBtn.style.padding = "10px 16px";
cartBtn.style.borderRadius = "50%";
cartBtn.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
cartBtn.style.cursor = "pointer";
cartBtn.style.zIndex = "1000";
document.body.appendChild(cartBtn);

cartBtn.onclick = () => {
  const cart = document.getElementById("cart");
  if (cart.style.display === "none") {
    cart.style.display = "block";
  } else {
    cart.style.display = "none";
  }
};
