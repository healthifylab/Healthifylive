document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper instances
    const promoSwiper = new Swiper('.promo-swiper', {
        slidesPerView: 1,
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });
    const featSwiper = new Swiper('.feat-swiper', {
        slidesPerView: 1,
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });
    const testiSwiper = new Swiper('.testi-swiper', {
        slidesPerView: 1,
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
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
    if (popup) {
        const closeBtn = popup.querySelector('.close-btn');
        setTimeout(() => popup.style.display = 'block', 2000);
        closeBtn.onclick = () => popup.style.display = 'none';
        document.getElementById('callBackForm').onsubmit = (e) => {
            e.preventDefault();
            alert('Call back requested for: ' + e.target[0].value);
            popup.style.display = 'none';
        };
    }

    // OTP Logic
    let loggedIn = false;
    let generatedOTP = null;
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            const loginInput = document.getElementById('loginInput').value;
            generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
            document.getElementById('otpSection').style.display = 'block';
            alert('OTP sent to ' + loginInput + ': ' + generatedOTP); // Replace with SMS service
        };
    }
    window.verifyOTP = function() {
        const otpInput = document.getElementById('otpInput').value;
        if (otpInput === generatedOTP) {
            loggedIn = true;
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('bookTestSection').style.display = 'block';
        } else {
            alert('Invalid OTP. Please try again.');
        }
    };

    // Preselect Profile from URL or Cart
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedProfile = urlParams.get('profile');
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const profileSelect = document.getElementById('profiles');
    const testsSelect = document.getElementById('tests');
    if (preselectedProfile && profileSelect) {
        for (let option of profileSelect.options) {
            if (option.value === preselectedProfile) {
                option.selected = true;
                break;
            }
        }
    }
    if (cartItems.length > 0 && (profileSelect || testsSelect)) {
        cartItems.forEach(item => {
            const selectElement = item.type === 'profile' ? profileSelect : testsSelect;
            if (selectElement) {
                for (let option of selectElement.options) {
                    if (option.value === item.value) {
                        option.selected = true;
                        break;
                    }
                }
            }
        });
    }

    // Calculate Totals
    function updateTotals() {
        const tests = document.getElementById('tests')?.selectedOptions || [];
        const profiles = document.getElementById('profiles')?.selectedOptions || [];
        const totalTests = tests.length + profiles.length;
        const totalPrice = Array.from(tests).reduce((sum, opt) => sum + parseInt(opt.dataset.offer), 0) +
                          Array.from(profiles).reduce((sum, opt) => sum + parseInt(opt.dataset.offer), 0);
        document.getElementById('totalTests').textContent = totalTests;
        document.getElementById('totalPrice').textContent = totalPrice;

        // Update cart in localStorage
        const cartItems = [
            ...Array.from(tests).map(opt => ({ type: 'test', value: opt.value })),
            ...Array.from(profiles).map(opt => ({ type: 'profile', value: opt.value }))
        ];
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    if (document.getElementById('tests')) {
        document.getElementById('tests').onchange = updateTotals;
    }
    if (document.getElementById('profiles')) {
        document.getElementById('profiles').onchange = updateTotals;
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

            const tests = document.getElementById('tests').selectedOptions;
            const profiles = document.getElementById('profiles').selectedOptions;
            const name = document.getElementById('name').value;
            const contact = document.getElementById('contact').value;
            const age = document.getElementById('age')?.value || '';
            const sex = document.getElementById('sex')?.value || '';
            const address = document.getElementById('address').value;
            const pincode = document.getElementById('pincode')?.value || '';
            const landmark = document.getElementById('landmark')?.value || '';
            const dateTime = document.getElementById('dateTime').value;

            if (tests.length === 0 && profiles.length === 0) {
                alert('Please select at least one test or profile');
                return;
            }

            const bookingData = {
                tests: Array.from(tests).map(opt => ({
                    name: opt.value,
                    offer: opt.dataset.offer,
                    tat: opt.dataset.tat,
                    desc: opt.dataset.desc
                })),
                profiles: Array.from(profiles).map(opt => ({
                    name: opt.value,
                    offer: opt.dataset.offer,
                    tat: opt.dataset.tat,
                    desc: opt.dataset.desc
                })),
                name,
                contact,
                age,
                sex,
                address,
                pincode,
                landmark,
                date: dateTime.split('T')[0],
                time: dateTime.split('T')[1],
                status: 'pending',
                totalTests: tests.length + profiles.length,
                totalPrice: document.getElementById('totalPrice').textContent
            };

            try {
                // Save to Firebase
                const docRef = await db.collection('bookings').add(bookingData);
                const bookingId = docRef.id;

                // Save to localStorage for my-bookings.html
                localStorage.setItem('lastBooking', JSON.stringify({
                    ...bookingData,
                    tests: bookingData.tests.map(t => t.name),
                    profiles: bookingData.profiles.map(p => p.name)
                }));

                // Send EmailJS Notification to Admin
                await emailjs.send('service_z3ac4pk', 'template_5v6t6ku', {
                    to_email: 'report@healthifylab.com',
                    message: `New Booking:\nName: ${name}\nContact: ${contact}\nAge: ${age}\nSex: ${sex}\nAddress: ${address}\nPincode: ${pincode}\nLandmark: ${landmark}\nDateTime: ${dateTime}\nTests: ${JSON.stringify(bookingData.tests)}\nProfiles: ${JSON.stringify(bookingData.profiles)}\nTotal Tests: ${bookingData.totalTests}\nTotal Price: ₹${bookingData.totalPrice}`
                });

                // Send Confirmation to User
                await emailjs.send('service_z3ac4pk', 'template_5v6t6ku', {
                    to_email: contact.includes('@') ? contact : '',
                    to_mobile: contact.includes('@') ? '' : contact,
                    message: `Booking Confirmed! ID: ${bookingId}\nName: ${name}\nDate & Time: ${dateTime}\nTotal: ₹${bookingData.totalPrice}`
                });

                // Show success message and reset form
                const successMessage = document.getElementById('success-message');
                successMessage.style.display = 'block';
                bookTestForm.reset();
                document.getElementById('totalTests').textContent = '0';
                document.getElementById('totalPrice').textContent = '0';
                document.getElementById('adminSection').style.display = 'block';
                localStorage.removeItem('cartItems'); // Clear cart
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);

                // Redirect to my-bookings.html
                window.location.href = 'my-bookings.html';
            } catch (error) {
                console.error('Error:', error);
                alert('Booking failed. Please try again.');
            }
        };
    }

    // Admin Status Update
    window.updateStatus = async () => {
        const status = document.getElementById('bookingStatus').value;
        const bookingId = (await db.collection('bookings').limit(1).get()).docs[0].id;
        await db.collection('bookings').doc(bookingId).update({ status });
        alert(`Status updated to ${status}`);
    };

    // Initialize totals
    updateTotals();
});
