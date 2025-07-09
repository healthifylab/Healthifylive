// scripts/search.js
async function fetchTests() {
    try {
        const response = await fetch('/public/tests.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch tests: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched tests data:', data); // Debug log
        return data;
    } catch (error) {
        console.error('Error fetching tests:', error);
        return []; // Return empty array on failure
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    
    if (!input || !results) {
        console.error('Search input or results element not found. Check HTML IDs: searchInput, searchResults');
        return;
    }

    console.log('Search elements found:', { input, results }); // Debug log

    const allTests = await fetchTests();

    if (allTests.length === 0) {
        console.warn('No test data available. Check /public/tests.json');
        results.innerHTML = '<p>No test data available. Contact support.</p>';
        return;
    }

    let selectedTests = new Set(); // Store selected test names

    input.addEventListener('input', () => {
        const query = input.value.toLowerCase().trim();
        results.innerHTML = ''; // Clear previous results

        if (!query || query.length < 2) {
            if (selectedTests.size > 0) {
                displaySelectedTests(); // Show selected tests if any
            }
            return;
        }

        console.log('Search query:', query); // Debug log

        const filtered = allTests.filter(test =>
            test.Test_Name && test.Test_Name.toLowerCase().includes(query) ||
            (test.Description && test.Description.toLowerCase().includes(query))
        ).slice(0, 10); // Limit to 10 results

        if (filtered.length === 0) {
            results.innerHTML = '<p>No results found for your query.</p>';
            return;
        }

        filtered.forEach(test => {
            const isSelected = selectedTests.has(test.Test_Name);
            const item = document.createElement('div');
            item.className = 'result-item';
            item.innerHTML = `
                <strong>${test.Category === 'Health Checkup Profiles' ? '📁' : '🧪'} ${test.Test_Name || 'Unnamed Test'}</strong><br/>
                <span class="strike"><s>₹${test.MRP || 'N/A'}</s></span> <strong>₹${test.Healthify_Offer_Price || 'N/A'}</strong><br/>
                <small>🧬 ${test.Tests_Included || 'N/A'} | 🕒 ${test.TAT || 'N/A'}</small><br/>
                <em>${test.Description || 'No description available'}</em><br/>
                <button class="select-btn ${isSelected ? 'selected' : ''}" data-test="${test.Test_Name}">
                    ${isSelected ? '✓ Selected' : 'Select'} <i class="fas fa-check"></i>
                </button>
            `;
            results.appendChild(item);
        });

        // Add click event for select buttons
        document.querySelectorAll('.select-btn').forEach(button => {
            button.addEventListener('click', () => {
                const testName = button.getAttribute('data-test');
                if (selectedTests.has(testName)) {
                    selectedTests.delete(testName);
                } else {
                    selectedTests.add(testName);
                }
                input.dispatchEvent(new Event('input')); // Refresh results
            });
        });
    });

    // Display selected tests below results
    function displaySelectedTests() {
        results.innerHTML = ''; // Clear results
        selectedTests.forEach(testName => {
            const test = allTests.find(t => t.Test_Name === testName);
            if (test) {
                const item = document.createElement('div');
                item.className = 'result-item selected-item';
                item.innerHTML = `
                    <strong>✅ ${test.Test_Name}</strong><br/>
                    <span class="strike"><s>₹${test.MRP || 'N/A'}</s></span> <strong>₹${test.Healthify_Offer_Price || 'N/A'}</strong><br/>
                    <button class="remove-btn" data-test="${test.Test_Name}">Remove <i class="fas fa-times"></i></button>
                `;
                results.appendChild(item);
            }
        });

        // Add remove button functionality
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', () => {
                const testName = button.getAttribute('data-test');
                selectedTests.delete(testName);
                input.dispatchEvent(new Event('input')); // Refresh results
            });
        });

        // Add Proceed to Booking button if items are selected
        if (selectedTests.size > 0) {
            const proceedButton = document.createElement('button');
            proceedButton.className = 'proceed-btn';
            proceedButton.innerHTML = `Proceed to Booking (${selectedTests.size} selected) <i class="fas fa-arrow-right"></i>`;
            proceedButton.addEventListener('click', () => {
                const testParams = Array.from(selectedTests).join(',');
                window.location.href = `/booking.html?tests=${testParams}`;
            });
            results.appendChild(proceedButton);
        }
    }
});
