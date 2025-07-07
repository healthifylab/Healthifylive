document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const drawer = document.getElementById('drawer');
    const closeDrawerBtn = document.querySelector('.close-drawer');

    // Open drawer when menu toggle is clicked
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            drawer.style.width = '250px';
        });
    }

    // Close drawer when close button is clicked
    if (closeDrawerBtn) {
        closeDrawerBtn.addEventListener('click', () => {
            drawer.style.width = '0';
            const loginForm = document.getElementById('loginForm');
            if (loginForm) loginForm.style.display = 'none';
        });
    }

    // Function to close drawer (used in Firebase login)
    function closeDrawer() {
        if (drawer) {
            drawer.style.width = '0';
            const loginForm = document.getElementById('loginForm');
            if (loginForm) loginForm.style.display = 'none';
        }
    }

    // Make closeDrawer available globally
    window.closeDrawer = closeDrawer;
});
