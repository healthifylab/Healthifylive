document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        pagination: { el: '.swiper-pagination', clickable: true }
    });

    // Initialize EmailJS
    emailjs.init('dJE_JHAoNTxxzTxiT');

    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyDS-MJYzAB2EDNY7Hhy2RtdEkxflj2jI-A",
        authDomain: "healthify-lab.firebaseapp.com",
        projectId: "healthify-lab",
        storageBucket: "healthify-lab.firebasestorage.app",
        messagingSenderId: "297003315332",
        appId: "1:297003315332:web:49f6ed6fc61cce4a74d2d1",
        measurementId: "G-R0R3RYERZW"
    };
    const app = firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // Call-back Popup
    const popup = document.getElementById('callBackPopup');
    const closeBtn = document.querySelector('.close-btn');
    setTimeout(() => popup.style.display = 'block', 2000);
    closeBtn.onclick = () => popup.style.display = 'none';
    document.getElementById('callBackForm').onsubmit = (e) => {
        e.preventDefault();
        alert('Call back requested for: ' + e.target[0].value);
        popup.style.display = 'none';
    };

    // Login Logic (Simulated OTP)
    let loggedIn = false;
    document.getElementById('loginForm').onsubmit = (e) => {
        e.preventDefault();
        const loginInput = document.getElementById('loginInput').value;
        document.getElementById('otpSection').style.display = 'block';
        // Simulate OTP (replace with actual OTP service)
        window.otp = Math.floor(100000 + Math.random() * 900000).toString();
        alert('OTP sent to ' + loginInput + ': ' + window.otp); // For testing
    };

    function verifyOTP() {
        const otpInput = document.getElementById('otpInput').value;
        if (otpInput === window.otp) {
            loggedIn = true;
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('bookTestSection').style.display = 'block';
        } else {
            alert('Invalid OTP');
        }
    }

    // Calculate Totals
    function updateTotals() {
        const tests = document.getElementById('tests').selectedOptions;
        const profiles = document.getElementById('profiles').selectedOptions;
        const totalTests = tests.length + profiles.length;
        const totalPrice = Array.from(tests).reduce((sum, opt) => sum + parseInt(opt.dataset.offer), 0) +
                          Array.from(profiles).reduce((sum, opt) => sum + parseInt(opt.dataset.offer), 0);
        document.getElementById('totalTests').textContent = totalTests;
        document.getElementById('totalPrice').textContent = totalPrice;
    }
    document.getElementById('tests').onchange = updateTotals;
    document.getElementById('profiles').onchange = updateTotals;

    // Booking Form Submission
    document.getElementById('bookTestForm').onsubmit = async (e) => {
        e.preventDefault();
        if (!loggedIn) {
            alert('Please login first');
            return;
        }

        const tests = document.getElementById('tests').selectedOptions;
        const profiles = document.getElementById('profiles').selectedOptions;
        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;
        const address = document.getElementById('address').value;
        const dateTime = document.getElementById('dateTime').value;

        if (tests.length === 0 && profiles.length === 0) {
            alert('Please select at least one test or profile');
            return;
        }

        const bookingData = {
            tests: Array.from(tests).map(opt => ({ name: opt.value, offer: opt.dataset.offer, tat: opt.dataset.tat, desc: opt.dataset.desc })),
            profiles: Array.from(profiles).map(opt => ({ name: opt.value, offer: opt.dataset.offer, tat: opt.dataset.tat, desc: opt.dataset.desc })),
            name, contact, address, dateTime, status: 'pending', totalTests: tests.length + profiles.length, totalPrice: document.getElementById('totalPrice').textContent
        };

        // Save to Firebase
        const docRef = await db.collection('bookings').add(bookingData);
        const bookingId = docRef.id;

        // Send EmailJS Notification to Admin
        await emailjs.send('service_z3ac4pk', 'template_5v6t6ku', {
            to_email: 'your-email@example.com', // Replace with your admin email
            message: `New Booking:\nName: ${name}\nContact: ${contact}\nAddress: ${address}\nDateTime: ${dateTime}\nTests: ${JSON.stringify(bookingData.tests)}\nProfiles: ${JSON.stringify(bookingData.profiles)}\nTotal Tests: ${bookingData.totalTests}\nTotal Price: ₹${bookingData.totalPrice}`
        });

        // Send Confirmation to User
        await emailjs.send('service_z3ac4pk', 'template_5v6t6ku', {
            to_email: contact.includes('@') ? contact : '', // Email if available
            to_mobile: contact.includes('@') ? '' : contact, // Mobile if available
            message: `Booking Confirmed! ID: ${bookingId}\nName: ${name}\nDate & Time: ${dateTime}\nTotal: ₹${bookingData.totalPrice}`
        });

        // Simulate PDF Receipt (Replace with actual PDF generation)
        alert('Booking successful! PDF receipt will be emailed soon.'); // Placeholder

        // Update UI
        document.getElementById('adminSection').style.display = 'block';
        updateTotals();
    };

    // Admin Status Update
    window.updateStatus = async () => {
        const status = document.getElementById('bookingStatus').value;
        const bookingId = (await db.collection('bookings').limit(1).get()).docs[0].id; // Simplistic; improve with actual ID selection
        await db.collection('bookings').doc(bookingId).update({ status });
        alert(`Status updated to ${status}`);
        // Notify user (via EmailJS) - Add logic as needed
    };
});
