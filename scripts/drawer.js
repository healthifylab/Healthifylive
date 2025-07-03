// Swipe Drawer Navigation

document.addEventListener("DOMContentLoaded", () => {

  const drawer = document.createElement('div');

  drawer.id = "swipeDrawer";

  drawer.innerHTML = `

    <div class="drawer-header">

      <span>☰ Menu</span>

      <button id="closeDrawer">✖️</button>

    </div>

    <ul>

      <li><a href="index.html">🏠 Home</a></li>

      <li><a href="#contact">📞 Contact</a></li>

      <li><a href="#about">ℹ️ About</a></li>

      <li><a href="book.html">🧪 Book a Test</a></li>

      <li><a href="cart.html">🛒 My Cart</a></li>

      <li><a href="my-bookings.html">📋 My Bookings</a></li>

    </ul>

  `;

  drawer.classList.add("drawer");



  document.body.appendChild(drawer);



  const openBtn = document.createElement("button");

  openBtn.innerText = "☰";

  openBtn.id = "openDrawer";

  document.body.appendChild(openBtn);



  openBtn.onclick = () => drawer.classList.add("open");

  drawer.querySelector("#closeDrawer").onclick = () =>

    drawer.classList.remove("open");

});



