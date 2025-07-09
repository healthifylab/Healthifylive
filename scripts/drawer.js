// scripts/drawer.js
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const drawer = document.getElementById('drawer');
    const closeDrawer = document.querySelector('.close-drawer');

    if (menuToggle && drawer && closeDrawer) {
        menuToggle.addEventListener('click', () => {
            drawer.classList.toggle('active');
        });

        closeDrawer.addEventListener('click', () => {
            drawer.classList.remove('active');
        });

        // Close on outside click
        document.addEventListener('click', (event) => {
            if (!drawer.contains(event.target) && !menuToggle.contains(event.target)) {
                drawer.classList.remove('active');
            }
        });
    } else {
        console.error('Drawer elements not found. Check HTML structure.');
    }
});
