document.addEventListener("DOMContentLoaded", () => {
    // Use the existing drawer element from index.html
    const drawer = document.getElementById('drawer');
    const openBtn = document.querySelector('#openDrawer') || document.createElement('button'); // Fallback if openBtn doesn't exist
    const closeDrawer = drawer.querySelector('#closeDrawer') || drawer.querySelector('.close-drawer'); // Use existing close button

    // If openBtn doesn't exist, create it
    if (!document.querySelector('#openDrawer')) {
        openBtn.innerText = '☰';
        openBtn.id = 'openDrawer';
        document.body.appendChild(openBtn);
    }

    // Apply styles if not already present (avoid duplication)
    if (!document.querySelector('style#drawerStyle')) {
        const style = document.createElement('style');
        style.id = 'drawerStyle';
        style.textContent = `
            .drawer { position: fixed; top: 0; left: -250px; width: 250px; height: 100%; background: #fff; transition: left 0.3s; z-index: 1000; box-shadow: 2px 0 5px rgba(0,0,0,0.2); }
            .drawer.open { left: 0; }
            .drawer-header { display: flex; justify-content: space-between; padding: 10px; background: #00a884; color: white; }
            .drawer ul { list-style: none; padding: 0; }
            .drawer ul li { padding: 10px; }
            .drawer ul li a { text-decoration: none; color: #2E2E2E; font-size: 16px; }
            #openDrawer { position: fixed; top: 10px; left: 10px; font-size: 24px; background: #00a884; color: white; border: none; cursor: pointer; z-index: 1001; }
        `;
        document.head.appendChild(style);
    }

    // Toggle drawer when open button is clicked
    openBtn.onclick = () => drawer.classList.add('open');

    // Close drawer when close button is clicked
    if (closeDrawer) {
        closeDrawer.onclick = () => drawer.classList.remove('open');
    }

    // Close drawer when clicking anywhere outside
    document.addEventListener('click', (event) => {
        if (drawer.classList.contains('open') && !drawer.contains(event.target) && event.target !== openBtn) {
            drawer.classList.remove('open');
        }
    });
});
