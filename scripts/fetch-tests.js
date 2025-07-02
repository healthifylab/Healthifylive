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
    const cardsSwiper = new Swiper('.cards .swiper-container', {
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
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const auth = firebase.auth();

    // Check login status
    const user = JSON.parse(localStorage.getItem('user'));
    const loggedIn = !!user;

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
            const selectElement = item.TestType === 'Profile' ? profileSelect : testsSelect;
            if (selectElement) {
                for (let option of selectElement.options) {
                    if (option.value === item.TestName) {
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
            ...Array.from(tests).map(opt => ({
                TestType: 'Test',
                TestName: opt.value,
                offerPrice: parseInt(opt.dataset.offer),
                MRP: parseInt(opt.dataset.mrp),
                TAT: opt.dataset.tat,
                Description: opt.dataset.desc
            })),
            ...Array.from(profiles).map(opt => ({
                TestType: 'Profile',
                TestName: opt.value,
                offerPrice: parseInt(opt.dataset.offer),
                MRP: parseInt(opt.dataset.mrp),
                TAT: opt.dataset.tat,
                Description: opt.dataset.desc
            }))
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
            const age = document.getElementById('age').value;
            const sex = document.getElementById('sex').value;
            const address = document.getElementById('address').value;
            const pincode = document.getElementById('pincode').value;
            const landmark = document.getElementById('landmark').value;
            const dateTime = document.getElementById('dateTime').value;

            if (tests.length === 0 && profiles.length === 0) {
                alert('Please select at least one test or profile');
                return;
            }

            const bookingData = {
                tests: Array.from(tests).map(opt => ({
                    TestName: opt.value,
                    offerPrice: parseInt(opt.dataset.offer),
                    MRP: parseInt(opt.dataset.mrp),
                    TAT: opt.dataset.tat,
                    Description: opt.dataset.desc
                })),
                profiles: Array.from(profiles).map(opt => ({
                    TestName: opt.value,
                    offerPrice: parseInt(opt.dataset.offer),
                    MRP: parseInt(opt.dataset.mrp),
                    TAT: opt.dataset.tat,
                    Description: opt.dataset.desc
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
                totalPrice: document.getElementById('totalPrice').textContent
            };

            try {
                // Save to Firebase
                const docRef = await db.collection('bookings').add(bookingData);
                const bookingId = docRef.id;

                // Save to localStorage for my-bookings.html and generate-report.js
                localStorage.setItem('lastBooking', JSON.stringify({
                    ...bookingData,
                    tests: bookingData.tests,
                    profiles: bookingData.profiles
                }));

                // Send EmailJS Notification to Admin
                await emailjs.send('service_z3ac4pk', 'template_5v6t6ku', {
                    to_email: 'report@healthifylab.com',
                    message: `New Booking:\nName: ${name}\nContact: ${contact}\nAge: ${age}\nSex: ${sex}\nAddress: ${address}\nPincode: ${pincode}\nLandmark: ${landmark}\nDateTime: ${dateTime}\nTests: ${JSON.stringify(bookingData.tests)}\nProfiles: ${JSON.stringify(bookingData.profiles)}\nTotal Tests: ${bookingData.totalTests}\nTotal Price: ₹${bookingData.totalPrice}`
                });

                // Send Confirmation to User
                await emailjs.send('service_z3ac4pk', 'template_5v6t6ku', {
                    to_email: bookingData.email,
                    to_mobile: bookingData.mobile,
                    message: `Booking Confirmed! ID: ${bookingId}\nName: ${name}\nDate & Time: ${dateTime}\nTotal: ₹${bookingData.totalPrice}`
                });

                // Show success message and reset form
                const successMessage = document.getElementById('success-message');
                successMessage.style.display = 'block';
                bookTestForm.reset();
                document.getElementById('totalTests').textContent = '0';
                document.getElementById('totalPrice').textContent = '0';
                document.getElementById('adminSection').style.display = 'block';
                localStorage.removeItem('cartItems');
                setTimeout(() => {
                    successMessage.style.display = 'none';
                    window.location.href = 'my-bookings.html';
                }, 3000);
            } catch (error) {
                console.error('Error:', error);
                alert('Booking failed. Please try again.');
            }
        };
    }

    // Admin Status Update
    window.updateStatus = async () => {
        const status = document.getElementById('bookingStatus').value;
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Admin login required');
            return;
        }
        const bookings = await db.collection('bookings')
            .where('mobile', '==', user.phone || '')
            .where('email', '==', user.email || '')
            .limit(1).get();
        if (bookings.empty) {
            alert('No booking found');
            return;
        }
        const bookingId = bookings.docs[0].id;
        await db.collection('bookings').doc(bookingId).update({ status });
        alert(`Status updated to ${status}`);
    };

    // Initialize totals
    updateTotals();
});
