document.addEventListener('DOMContentLoaded', function() {

    // Initialize Swiper

    const swiper = new Swiper('.swiper-container', {

        slidesPerView: 1,

        pagination: { el: '.swiper-pagination', clickable: true }

    });



    // Initialize EmailJS with your public key

    emailjs.init('dJE_JHAoNTxxzTxiT');



    // Initialize Firebase with your config

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

    // const analytics = firebase.getAnalytics(app); // Remove if unused



    // Form submission handling

    document.getElementById('bookTestForm').addEventListener('submit', function(e) {

        e.preventDefault();

        const tests = document.getElementById('tests').selectedOptions;

        const profiles = document.getElementById('profiles').selectedOptions;

        if (tests.length === 0 && profiles.length === 0) {

            alert('Please select at least one test or profile.');

            return;

        }



        // Send email via EmailJS

        emailjs.send('service_z3ac4pk', 'template_5v6t6ku', {

            tests: Array.from(tests).map(opt => opt.value).join(','),

            profiles: Array.from(profiles).map(opt => opt.value).join(',')

        }, 'dJE_JHAoNTxxzTxiT')

            .then(() => {

                console.log('Email sent successfully');

                alert('Booking email sent!');

            })

            .catch(error => {

                console.error('EmailJS error:', error.text);

                alert('Failed to send email: ' + error.text);

            });



        // Save to Firebase Firestore

        db.collection('bookings').add({

            tests: Array.from(tests).map(opt => opt.value),

            profiles: Array.from(profiles).map(opt => opt.value),

            timestamp: new Date(),

            user: 'anonymous'

        })

            .then(() => {

                console.log('Booking saved to Firebase');

                alert('Booking saved to database!');

            })

            .catch(error => {

                console.error('Firebase error:', error.message);

                alert('Failed to save booking: ' + error.message);

            });

    });

});
