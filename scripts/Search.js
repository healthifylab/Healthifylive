// scripts/search.js
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

document.addEventListener("DOMContentLoaded", async () => {
  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");
  if (!input || !results) return;

  const allTests = await fetchTests();
  let displayedTests = new Set(); // Track displayed test names

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();

    // Clear results and reset displayedTests only if input is empty
    if (query.length === 0) {
      results.innerHTML = "";
      displayedTests.clear();
      return;
    }

    // Proceed only if query is 2+ characters
    if (query.length < 2) return;

    const filtered = allTests.filter(t =>
      (t.Test_Name?.toLowerCase().includes(query) || t.Description?.toLowerCase().includes(query)) &&
      !displayedTests.has(t.Test_Name)
    ).slice(0, 10); // Limit to 10 new results

    if (filtered.length === 0) {
      if (!results.innerHTML.includes("No new results found")) {
        results.innerHTML += '<p>No new results found.</p>';
      }
      return;
    }

    filtered.forEach(test => {
      const item = document.createElement("div");
      item.className = "result-item";
      item.innerHTML = `
        <strong>${test.Category === "Health Checkup Profiles" ? '📁' : '🧪'} ${test.Test_Name || 'Unnamed Test'}</strong><br/>
        <span class="strike"><s>₹${test.MRP || 'N/A'}</s></span> <strong>₹${test.Healthify_Offer_Price || 'N/A'}</strong><br/>
        <small>🧬 ${test.Tests_Included || "N/A"} | 🕒 ${test.TAT || "N/A"}</small><br/>
        <em>${test.Description || 'No description available'}</em><br/>
        <a href="/booking.html?test=${encodeURIComponent(test.Test_Name.toLowerCase().replace(/\s/g, '-'))}" class="btn">Book Now <i class="fas fa-check"></i></a>
      `;
      results.appendChild(item);
      displayedTests.add(test.Test_Name); // Add to displayed set
    });
  });
});
