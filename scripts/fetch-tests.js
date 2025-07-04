async function fetchTests() {
    try {
        const response = await fetch('/tests.json'); // Fetches from public folder
        const tests = await response.json();
        return tests; // Array of tests and profiles
    } catch (error) {
        console.error('Error fetching tests:', error);
        return [];
    }
}

// Populate dropdown
async function populateTestDropdown() {
    const tests = await fetchTests();
    const select = document.getElementById('test-select'); // Your dropdown ID
    select.innerHTML = '<option value="">Select a test</option>';
    tests.forEach(test => {
        const option = document.createElement('option');
        option.value = test.Test_Name;
        option.textContent = `${test.Test_Name} (${test.Category}) - ₹${test.MRP}`;
        select.appendChild(option);
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', populateTestDropdown);
