document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("searchInput");

  const results = document.getElementById("searchResults");



  const allTests = [

    ...JSON.parse(localStorage.getItem("testsList") || "[]"),

    ...JSON.parse(localStorage.getItem("profilesList") || "[]")

  ];



  input.addEventListener("input", () => {

    const query = input.value.toLowerCase();

    results.innerHTML = "";



    if (!query || query.length < 2) return;



    const filtered = allTests.filter(t =>

      t.TestName.toLowerCase().includes(query)

    ).slice(0, 10); // Top 10 matches



    filtered.forEach(test => {

      const item = document.createElement("div");

      item.className = "result-item";



      item.innerHTML = `

        <strong>${test.type === "Profile" ? '📁' : '🧪'} ${test.TestName}</strong><br/>

        <span class="strike">₹${test.MRP}</span> <strong>₹${test.offerPrice}</strong><br/>

        <small>🧬 ${test.Parameters} Parameters | 🕒 ${test.TAT}</small>

        <br/><em>${test.Description}</em>

        <br/><button onclick='addToCart(${JSON.stringify(test)})'>➕ Add to Cart</button>

      `;



      results.appendChild(item);

    });

  });

});



function addToCart(testObj) {

  const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");

  const exists = cart.find(t => t.TestName === testObj.TestName);

  if (!exists) {

    cart.push(testObj);

    localStorage.setItem("cartItems", JSON.stringify(cart));

    alert("✅ Added to cart");

  } else {

    alert("⚠️ Already in cart");

  }

}



