// Fetch test and profile data
let tests = [];
let profiles = [];

async function loadData() {
    try {
        const [testResponse, profileResponse] = await Promise.all([
            fetch('/public/tests.json'),
            fetch('/public/profiles.json')
        ]);
        if (!testResponse.ok || !profileResponse.ok) throw new Error('Failed to load data');
        tests = await testResponse.json();
        profiles = await profileResponse.json();
        console.log('Data loaded:', { tests, profiles });
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('searchResults').innerHTML = '<p>Error loading data. Check console.</p>';
    }
}

// Display search results
function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    if (results.length === 0) {
        searchResults.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(item => {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        let content = '';
        if (item.type === 'test') {
            const test = tests.find(t => t.Test_Name.toLowerCase().replace(/\s/g, '-') === item.id);
            if (test) {
                content = `
                    <h3>${test.Test_Name} <i class="fas fa-vial"></i></h3>
                    <p>MRP: <s>₹${test.MRP || test.Healthify_Offer_Price * 1.5}</s>, Offer: ₹${test.Healthify_Offer_Price}</p>
                    <p>${test.Description || 'No description available'}</p>
                    <a href="/booking.html?test=${item.id}" class="btn">Book Now <i class="fas fa-check"></i></a>
                `;
            }
        } else if (item.type === 'profile') {
            const profile = profiles.find(p => p.Test_Name.toLowerCase().replace(/\s/g, '-') === item.id);
            if (profile) {
                content = `
                    <h3>${profile.Test_Name} <i class="fas fa-file-alt"></i></h3>
                    <p>MRP: <s>₹${profile.MRP || 0}</s>, Offer: ₹${profile.Healthify_Offer_Price}</p>
                    <p>${profile.Description || 'No description available'}</p>
                    <a href="/booking.html?profile=${item.id}" class="btn">Book Now <i class="fas fa-check"></i></a>
                `;
            }
        }
        div.innerHTML = content;
        searchResults.appendChild(div);
    });
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', () => {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const results = [];

    // Search tests
    tests.forEach(test => {
        const testId = test.Test_Name.toLowerCase().replace(/\s/g, '-');
        if (test.Test_Name.toLowerCase().includes(query)) {
            results.push({ type: 'test', id: testId });
        }
    });

    // Search profiles
    profiles.forEach(profile => {
        const profileId = profile.Test_Name.toLowerCase().replace(/\s/g, '-');
        if (profile.Test_Name.toLowerCase().includes(query)) {
            results.push({ type: 'profile', id: profileId });
        }
    });

    displaySearchResults(results.slice(0, 5)); // Limit to 5 results
});

// Load data on page load
window.onload = () => {
    loadData();
};
