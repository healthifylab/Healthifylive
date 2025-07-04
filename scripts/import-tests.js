// scripts/fetch-tests.js
import { sampleTests, sampleProfiles } from './test-data.js'; // Adjust path if needed

document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display test cards (called from book.html)
    fetch('https://healthifylab-live.netlify.app/.netlify/functions/tests')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const wrapper = document.getElementById('testCards');
            if (wrapper) {
                data.forEach(test => {
                    const slide = document.createElement('div');
                    slide.className = 'swiper-slide';
                    slide.innerHTML = `
                        <div class="card">
                            <img src="${test.image}" alt="${test.name}">
                            <h4>${test.name}</h4>
                            <button onclick="window.location.href='book.html?profile=${test.id}'" class="book-now">Book Now</button>
                        </div>
                    `;
                    wrapper.appendChild(slide);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching tests from API:', error);
            // Fallback to local data
            const fallbackData = [...sampleTests, ...sampleProfiles];
            const wrapper = document.getElementById('testCards');
            if (wrapper) {
                fallbackData.forEach(test => {
                    const slide = document.createElement('div');
                    slide.className = 'swiper-slide';
                    slide.innerHTML = `
                        <div class="card">
                            <img src="${test.image}" alt="${test.name}">
                            <h4>${test.name}</h4>
                            <button onclick="window.location.href='book.html?profile=${test.id}'" class="book-now">Book Now</button>
                        </div>
                    `;
                    wrapper.appendChild(slide);
                });
            }
        });
});
