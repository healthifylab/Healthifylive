// scripts/search.js
async function fetchTests() {
    try {
        const response = await fetch('/public/tests.json');
        if (!response.ok) throw new Error('Failed to fetch tests: ' + response.statusText);
        const data = await response.json();
        console.log('Tests data loaded:', data); // Debug log
        return data;
    } catch (error) {
        console.error('Error fetching tests:', error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    if (!input || !results) {
        console.error('Search input or results element not found in HTML');
        return;
    }

    const allTests = await fetchTests();

    input.addEventListener('input', () => {
        const query = input.value.toLowerCase();
        results.innerHTML = ''; // Clear previous results

        if (!query || query.length < 2) return;

        const filtered = allTests.filter(test =>
            test.Test_Name.toLowerCase().includes(query) ||
            (test.Description && test.Description.toLowerCase().includes(query))
        ).slice(0, 10); // Limit to 10 results

        if (filtered.length === 0) {
            results.innerHTML = '<p>No results found.</p>';
            return;
        }

        filtered.forEach(test => {
            const item = document.createElement('div');
            item.className = 'result-item';
            item.innerHTML = `
                <strong>${test.Category === 'Health Checkup Profiles' ? '📁' : '🧪'} ${test.Test_Name}</strong><br/>
                <span class="strike"><s>₹${test.MRP || 'N/A'}</s></span> <strong>₹${test.Healthify_Offer_Price || 'N/A'}</strong><br/>
                <small>🧬 ${test.Tests_Included || 'N/A'} | 🕒 ${test.TAT || 'N/A'}</small><br/>
                <em>${test.Description || 'No description available'}</em><br/>
                <a href="/booking.html?test=${test.Test_Name.toLowerCase().replace(/\s/g, '-')}" class="btn">Book Now <i class="fas fa-check"></i></a>
            `;
            results.appendChild(item);
        });
    });
});
