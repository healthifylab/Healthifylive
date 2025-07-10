// scripts/Search.js
async function fetchTests() {
  try {
    const response = await fetch('/public/tests.json');
    if (!response.ok) throw new Error('Failed to fetch tests');
    return await response.json();
  } catch (error) {
    console.error('Error fetching tests:', error);
    return [];
  }
}

// Placeholder function for booking selected tests (replace with your actual booking logic)
function bookTests(selectedTests) {
  if (selectedTests.length === 0) {
    alert('No tests selected for booking.');
    return;
  }
  console.log('Booking tests:', selectedTests);
  alert(`Booked ${selectedTests.length} test(s): ${selectedTests.map(t => t.Test_Name).join(', ')}`);
  // Clear selections after booking
  document.querySelectorAll('.test-checkbox').forEach(checkbox => {
    checkbox.checked = false;
  });
  // Clear summary
  selectedTests.length = 0;
  updateSummary(selectedTests);
}

// Function to update the selected tests summary
function updateSummary(selectedTests) {
  const summary = document.getElementById('selectedTestsSummary');
  if (!summary) return;

  if (selectedTests.length === 0) {
    summary.innerHTML = '<p>No tests selected.</p>';
    return;
  }

  summary.innerHTML = `
    <h3>Selected Tests (${selectedTests.length})</h3>
    ${selectedTests.map(test => `
      <div class="summary-item">
        <strong>${test.Test_Name}</strong><br/>
        <span class="strike">₹${test.MRP}</span> <span class="offer-price">₹${test.Healthify_Offer_Price}</span><br/>
        <em>${test.Description}</em>
      </div>
    `).join('')}
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");
  const bookButton = document.getElementById("bookButton");
  const summary = document.getElementById("selectedTestsSummary");
  if (!input || !results || !bookButton || !summary) return;

  const allTests = await fetchTests();
  const selectedTests = []; // Track selected tests

  // Update summary when checkboxes change
  function handleCheckboxChange() {
    selectedTests.length = 0; // Clear array
    document.querySelectorAll('.test-checkbox:checked').forEach(checkbox => {
      const testName = checkbox.getAttribute('data-test-name');
      const test = allTests.find(t => t.Test_Name === testName);
      if (test) selectedTests.push(test);
    });
    updateSummary(selectedTests);
  }

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    results.innerHTML = "";

    if (!query || query.length < 2) {
      updateSummary(selectedTests); // Update summary even if no results
      return;
    }

    const filtered = allTests.filter(t =>
      t.Test_Name.toLowerCase().includes(query) ||
      t.Description.toLowerCase().includes(query)
    ).slice(0, 10);

    filtered.forEach(test => {
      const item = document.createElement("div");
      item.className = "result-item";
      item.innerHTML = `
        <label>
          <input type="checkbox" class="test-checkbox" data-test-name="${test.Test_Name}">
          <strong>${test.Category === "Health Checkup Profiles" ? '📁' : '🧪'} ${test.Test_Name}</strong>
        </label><br/>
        <span class="strike">₹${test.MRP}</span> <strong class="offer-price">₹${test.Healthify_Offer_Price}</strong><br/>
        <small>🧬 ${test.Tests_Included || "N/A"} | 🕒 ${test.TAT}</small>
        <br/><em>${test.Description}</em>
        <br/><button onclick='cartUI.addToCart("${test.Test_Name}")'>➕ Add to Cart</button>
      `;
      results.appendChild(item);
    });

    // Re-attach checkbox listeners and restore checked state
    document.querySelectorAll('.test-checkbox').forEach(checkbox => {
      const testName = checkbox.getAttribute('data-test-name');
      checkbox.checked = selectedTests.some(t => t.Test_Name === testName);
      checkbox.addEventListener('change', handleCheckboxChange);
    });

    updateSummary(selectedTests);
  });

  // Book button click handler
  bookButton.addEventListener('click', () => bookTests(selectedTests));
});
