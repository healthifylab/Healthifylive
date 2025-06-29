// Sample structure – full test/profile data loaded separately from allTests.js and allProfiles.js

let tests = [];     // Filled from allTests.js
let profiles = [];  // Filled from allProfiles.js

document.addEventListener("DOMContentLoaded", () => {
  // Populate dropdowns
  if (document.getElementById("testSelect")) {
    populateSelect("testSelect", tests, "test");
    populateSelect("profileSelect", profiles, "profile");

    // URL auto-select (e.g. ?test=cbc or ?profile=diabetic)
    const params = new URLSearchParams(window.location.search);
    if (params.has("test")) selectOptionByName("testSelect", params.get("test"));
    if (params.has("profile")) selectOptionByName("profileSelect", params.get("profile"));

    document.getElementById("testSelect").addEventListener("change", updatePrice);
    document.getElementById("profileSelect").addEventListener("change", updatePrice);
    updatePrice();
  }

  const form = document.getElementById("bookingForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✅ Booking submitted! Confirmation will be sent.");
      form.reset();
      updatePrice();
    });
  }
});

function populateSelect(id, data, type) {
  const select = document.getElementById(id);
  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.name;
    option.textContent = `${item.name} – ₹${item.offerPrice}`;
    option.title = `Click to view details`;
    option.onclick = () => showPopup(item, type);
    select.appendChild(option);
  });
}

function selectOptionByName(selectId, value) {
  const select = document.getElementById(selectId);
  for (const opt of select.options) {
    if (opt.value.toLowerCase().includes(value.toLowerCase())) {
      opt.selected = true;
      break;
    }
  }
}

function updatePrice() {
  const testSel = document.getElementById("testSelect");
  const profileSel = document.getElementById("profileSelect");

  let totalMrp = 0;
  let totalOffer = 0;

  [...testSel.selectedOptions].forEach(opt => {
    const item = tests.find(t => t.name === opt.value);
    if (item) {
      totalMrp += item.mrp;
      totalOffer += item.offerPrice;
    }
  });

  [...profileSel.selectedOptions].forEach(opt => {
    const item = profiles.find(p => p.name === opt.value);
    if (item) {
      totalMrp += item.mrp;
      totalOffer += item.offerPrice;
    }
  });

  document.getElementById("mrp").textContent = `₹${totalMrp}`;
  document.getElementById("offerPrice").textContent = `₹${totalOffer}`;
  document.getElementById("saving").textContent = `₹${totalMrp - totalOffer}`;
}

function showPopup(item, type) {
  alert(
    `🧪 ${type === "test" ? "Test" : "Profile"}: ${item.name}\n\nDescription: ${item.description}\nTAT: ${item.tat}`
  );
}
