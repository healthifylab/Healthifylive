// fetch-tests.js
document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display test cards (called from book.html)
    fetch('https://healthifylab-live.netlify.app/.netlify/functions/tests')
        .then(response => response.json())
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
        .catch(error => console.error('Error fetching tests:', error));
});
