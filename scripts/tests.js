// scripts/Tests.js
async function fetchTests() {
  try {
    console.log('Fetching tests from /public/tests.json...');
    let response = await fetch('/public/tests.json');
    if (!response.ok) {
      console.error('Fetch failed for /public/tests.json with status:', response.status);
      console.log('Trying fallback path ./tests.json...');
      response = await fetch('./tests.json');
      if (!response.ok) {
        console.error('Fallback fetch failed with status:', response.status);
        throw new Error('Failed to fetch tests from both paths');
      }
    }
    const data = await response.json();
    console.log('Fetched tests:', data);
    return data;
  } catch (error) {
    console.error('Error fetching tests:', error);
    return [];
  }
}

// Function to update the selected tests summary
function updateSummary(selectedTests) {
  const summary = document.getElementById('selectedTestsSummary');
  if (!summary) {
    console.error('Summary element not found');
    return;
  }

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

// Function to redirect to booking form with selected tests
function bookSelected(selectedTests) {
  if (selectedTests.length === 0) {
    alert('No tests selected for booking.');
    return;
  }
  const testNames = selectedTests.map(t => encodeURIComponent(t.Test_Name)).join(',');
  window.location.href = `/booking.html?tests=${testNames}`;
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log('DOM loaded, initializing tests...');
  const testsContainer = document.getElementById("testsContainer");
  const bookButton = document.getElementById("bookSelectedButton");
  const summary = document.getElementById("selectedTestsSummary");
  if (!testsContainer || !bookButton || !summary) {
    console.error('Missing DOM elements:', { testsContainer, bookButton, summary });
    return;
  }

  const allTests = await fetchTests();
  if (allTests.length === 0) {
    console.error('No tests loaded from JSON');
    testsContainer.innerHTML = '<p>Error loading tests. Please try again later.</p>';
    return;
  }

  const selectedTests = []; // Track selected tests

  // Populate test cards
  allTests.forEach(test => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `
      <div class="test-card">
        <label>
          <input type="checkbox" class="test-checkbox" data-test-name="${test.Test_Name}">
          <strong>🧪 ${test.Test_Name}</strong>
        </label><br/>
        <span class="strike">₹${test.MRP}</span> <span class="offer-price">₹${test.Healthify_Offer_Price}</span><br/>
        <em>${test.Description}</em>
      </div>
    `;
    testsContainer.appendChild(slide);
  });

  // Initialize Swiper
  new Swiper('.tests-swiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.tests-swiper .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

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

  // Attach checkbox listeners
  document.querySelectorAll('.test-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckboxChange);
  });

  // Book button click handler
  bookButton.addEventListener('click', () => bookSelected(selectedTests));

  // Initial summary update
  updateSummary(selectedTests);
});
