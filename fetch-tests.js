let allTests = [];

function roundToFriendly(price) {
  const round = [49, 99, 149, 199, 249, 299, 349, 399, 449, 499, 549, 599, 649, 699, 749, 799, 849, 899, 949, 999];
  const discounted = Math.floor(price * 0.8);
  return round.find(r => r >= discounted) || discounted;
}

function formatTestItem(test) {
  const offer = roundToFriendly(parseFloat(test.MRP));
  return {
    ...test,
    offerPrice: offer,
    type: test.ProfileTest === 'Profile' ? 'Profile' : 'Test'
  };
}

async function fetchTestsFromGD() {
  try {
    const res = await fetch("https://gd-lab.com/DataEntry/PriceList");
    const data = await res.json();
    allTests = data.map(formatTestItem);

    populateSearchSuggestions();
    populateBookingDropdown();
  } catch (err) {
    console.error("Failed to fetch tests:", err);
  }
}

function populateSearchSuggestions() {
  const search = document.getElementById("searchBar");
  if (!search || allTests.length === 0) return;

  search.addEventListener("input", e => {
    const val = e.target.value.toLowerCase();
    const matches = allTests
      .filter(t => t.TestName.toLowerCase().includes(val))
      .slice(0, 5);

    let suggestBox = document.getElementById("suggestBox");
    if (!suggestBox) {
      suggestBox = document.createElement("div");
      suggestBox.id = "suggestBox";
      suggestBox.style.position = "absolute";
      suggestBox.style.background = "#fff";
      suggestBox.style.border = "1px solid #ccc";
      suggestBox.style.zIndex = 999;
      search.parentNode.appendChild(suggestBox);
    }

    suggestBox.innerHTML = matches.map(m => `<div class="suggest-item">${m.TestName}</div>`).join("");

    suggestBox.querySelectorAll(".suggest-item").forEach((el, idx) => {
      el.onclick = () => {
        search.value = matches[idx].TestName;
        suggestBox.innerHTML = "";
      };
    });
  });
}

function populateBookingDropdown() {
  const select = document.getElementById("testSelect");
  if (!select || allTests.length === 0) return;

  allTests.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.TestName;
    opt.text = `${t.TestName} — ₹${t.offerPrice} (MRP: ₹${t.MRP})`;
    select.appendChild(opt);
  });
}

function getTestByName(name) {
  return allTests.find(t => t.TestName === name);
}

function addToCart(testName) {
  const selected = getTestByName(testName);
  if (!selected) return;

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(selected);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${testName} added to cart!`);
}

// Call when DOM loads
document.addEventListener("DOMContentLoaded", fetchTestsFromGD);


