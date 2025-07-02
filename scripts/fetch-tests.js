import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import emailjs from "@emailjs/browser";

document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    try {
        emailjs.init('dJE_JHAoNTxxzTxiT');
        console.log('EmailJS initialized');
    } catch (error) {
        console.error('EmailJS init failed:', error);
    }

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
    try {
        initializeApp(firebaseConfig);
        console.log('Firebase initialized');
    } catch (error) {
        console.error('Firebase init failed:', error);
    }
    const db = getFirestore();
    const auth = getAuth();

    // Check login status
    const user = JSON.parse(localStorage.getItem('user'));
    const loggedIn = !!user;
    console.log('Login status:', loggedIn, 'User:', user);

    // Pre-fill form from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const fields = ['name', 'contact', 'age', 'sex', 'address', 'pincode', 'landmark', 'dateTime'];
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (input && urlParams.has(field)) {
            input.value = field === 'address' ? urlParams.get(field).replace(/\+/g, ' ') : 
                          field === 'dateTime' ? decodeURIComponent(urlParams.get(field)) : 
                          urlParams.get(field);
        }
    });

    // Preselect tests and profiles
    const testsSelect = document.getElementById('tests');
    const profileSelect = document.getElementById('profiles');
    const preselectedTests = urlParams.get('tests')?.split(',').map(t => t.trim()) || [];
    const preselectedProfiles = urlParams.get('profiles')?.split(',').map(p => t.trim()) || [];
    if (testsSelect && preselectedTests.length) {
        for (let option of testsSelect.options) {
            if (preselectedTests.includes(option.value)) option.selected = true;
        }
    }
    if (profileSelect && preselectedProfiles.length) {
        for (let option of profileSelect.options) {
            if (preselectedProfiles.includes(option.value)) option.selected = true;
        }
    }

    // Booking Form Submission
    const bookTestForm = document.getElementById('bookTestForm');
    if (bookTestForm) {
        bookTestForm.onsubmit = async (e) => {
            e.preventDefault();
            if (!loggedIn) {
                alert('Please login first');
                window.location.href = 'login.html';
                return;
            }

            const tests = testsSelect?.selectedOptions || [];
            const profiles = profileSelect?.selectedOptions || [];
            const name = document.getElementById('name').value;
            const contact = document.getElementById('contact').value;
            const age = document.getElementById('age').value;
            const sex = document.getElementById('sex').value;
            const address = document.getElementById('address').value;
            const pincode = document.getElementById('pincode').value;
            const landmark = document.getElementById('landmark').value;
            const dateTime = document.getElementById('dateTime').value;

            if (tests.length === 0 && profiles.length === 0) {
                alert('Select at least one test or profile');
                return;
            }
            if (!name || !contact || !age || !sex || !address || !pincode || !landmark || !dateTime) {
                alert('Fill all required fields');
                return;
            }
            if (!/^\d{6}$/.test(pincode)) {
                alert('Pincode must be 6 digits');
                return;
            }
            if (!/^\d{10}$/.test(contact) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
                alert('Contact must be a 10-digit number or valid email');
                return;
            }

            const bookingData = {
                tests: Array.from(tests).map(opt => ({
                    TestName: opt.value,
                    offerPrice: parseInt(opt.dataset.offer || 0),
                    MRP: parseInt(opt.dataset.mrp || 0),
                    TAT: opt.dataset.tat || '',
                    Description: opt.dataset.desc || ''
                })),
                profiles: Array.from(profiles).map(opt => ({
                    TestName: opt.value,
                    offerPrice: parseInt(opt.dataset.offer || 0),
                    MRP: parseInt(opt.dataset.mrp || 0),
                    TAT: opt.dataset.tat || '',
                    Description: opt.dataset.desc || ''
                })),
                name,
                email: contact.includes('@') ? contact : '',
                mobile: contact.includes('@') ? '' : contact,
                age,
                sex,
                address,
                pincode,
                landmark,
                date: dateTime.split('T')[0],
                time: dateTime.split('T')[1],
                status: 'pending',
                totalTests: tests.length + profiles.length,
                totalPrice: (Array.from(tests).reduce((sum, opt) => sum + parseInt(opt.dataset.offer || 0), 0) + 
                            Array.from(profiles).reduce((sum, opt) => sum + parseInt(opt.dataset.offer || 0), 0)).toString()
            };

            const successMessage = document.getElementById('success-message');
            const errorMessage = document.getElementById('error-message');
            try {
                console.log('Submitting booking:', bookingData);

                // Save to Firebase
                const docRef = await addDoc(collection(db, 'bookings'), bookingData);
                const bookingId = docRef.id;
                console.log('Booking saved to Firebase, ID:', bookingId);

                // Save to localStorage
                localStorage.setItem('lastBooking', JSON.stringify({ ...bookingData, bookingId }));
                console.log('Booking saved to localStorage');

                // Send EmailJS Admin Email
                await emailjs.send('service_z3ac4pk', 'template_5v6t6ku', {
                    to_email: 'report@healthifylab.com',
                    message: `New Booking:\nID: ${bookingId}\nName: ${name}\nContact: ${contact}\nAge: ${age}\nSex: ${sex}\nAddress: ${address}\nPincode: ${pincode}\nLandmark: ${landmark}\nDateTime: ${dateTime}\nTests: ${JSON.stringify(bookingData.tests)}\nProfiles: ${JSON.stringify(bookingData.profiles)}\nTotal Tests: ${bookingData.totalTests}\nTotal Price: ₹${bookingData.totalPrice}`
                });
                console.log('Admin email sent');

                // Send EmailJS User Confirmation
                await emailjs.send('service_z3ac4pk', 'template_5v6t6ku', {
                    to_email: bookingData.email || 'report@healthifylab.com',
                    message: `Booking Confirmed! ID: ${bookingId}\nName: ${name}\nDate & Time: ${dateTime}\nTotal: ₹${bookingData.totalPrice}`
                });
                console.log('User confirmation sent');

                // Show Success Message
                if (successMessage) {
                    successMessage.style.display = 'block';
                    successMessage.textContent = `✅ Booking confirmed! ID: ${bookingId}`;
                    if (errorMessage) errorMessage.style.display = 'none';
                    console.log('Success message displayed');
                } else {
                    console.error('Success message element not found');
                    alert(`Booking confirmed! ID: ${bookingId}`);
                }
                bookTestForm.reset();
                if (document.getElementById('totalTests')) document.getElementById('totalTests').textContent = '0';
                if (document.getElementById('totalPrice')) document.getElementById('totalPrice').textContent = '0';
                localStorage.removeItem('cartItems');
                console.log('Form reset and cart cleared');

                // Redirect after 7 seconds
                setTimeout(() => {
                    if (successMessage) successMessage.style.display = 'none';
                    alert(`Booking confirmed! ID: ${bookingId}. Redirecting...`);
                    window.location.href = 'my-bookings.html';
                }, 7000);
            } catch (error) {
                console.error('Booking error:', error);
                let errorText = 'Booking failed. Please try again.';
                if (error.message.includes('Firebase')) errorText = `Booking failed: Firebase error (${error.code || error.message})`;
                else if (error.status === 400) errorText = 'Booking failed: EmailJS error. Check service/template ID.';
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = `❌ ${errorText}`;
                    if (successMessage) successMessage.style.display = 'none';
                    console.log('Error message displayed:', errorText);
                    setTimeout(() => errorMessage.style.display = 'none', 7000);
                } else {
                    console.error('Error message element not found');
                    alert(errorText);
                }
            }
        };
    }
});
