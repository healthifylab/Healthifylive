<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Healthifylive - Book a Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            text-align: center;
            color: #333;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        button {
            width: 100%;
            padding: 10px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #218838;
        }
        #message {
            margin-top: 10px;
            text-align: center;
            color: #28a745;
            display: none;
        }
        @media (max-width: 600px) {
            .container {
                padding: 15px;
            }
            input, select, button {
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Book a Health Test</h1>
        <form id="booking-form">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" required placeholder="Enter your name">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="Enter your email">
            </div>
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" required placeholder="Enter your phone number">
            </div>
            <div class="form-group">
                <label for="test-select">Select Test/Profile</label>
                <select id="test-select" name="test" required>
                    <option value="">Select a test</option>
                </select>
            </div>
            <div class="form-group">
                <label for="date">Preferred Date</label>
                <input type="date" id="date" name="date" required>
            </div>
            <div class="form-group">
                <label for="time">Preferred Time</label>
                <input type="time" id="time" name="time" required>
            </div>
            <button type="submit">Book Now</button>
        </form>
        <div id="message"></div>
    </div>

    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"></script>
    <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script>
        // Initialize Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyDS-MJYzAB2EDNY7Hhy2RtdEkxflj2jI-A",
            authDomain: "healthify-lab.firebaseapp.com",
            projectId: "healthify-lab",
            storageBucket: "healthify-lab.appspot.com",
            messagingSenderId: "297003315332",
            appId: "1:297003315332:web:49f6ed6fc61cce4a74d2d1"
        };
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();

        // Initialize EmailJS
        emailjs.init("dJE_JHAoNTxxzTxiT");

        // Fetch tests from public/tests.json
        async function fetchTests() {
            try {
                const response = await fetch('public/tests.json');
                if (!response.ok) throw new Error('Failed to fetch tests');
                const tests = await response.json();
                return tests;
            } catch (error) {
                console.error('Error fetching tests:', error);
                return [];
            }
        }

        // Populate dropdown
        async function populateTestDropdown() {
            const tests = await fetchTests();
            const select = document.getElementById('test-select');
            select.innerHTML = '<option value="">Select a test</option>';
            tests.forEach(test => {
                const option = document.createElement('option');
                option.value = test.Test_Name;
                option.textContent = `${test.Test_Name} (${test.Category}) - ₹${test.MRP}`;
                if (test.Test_Parameters_Included) {
                    option.title = test.Test_Parameters_Included;
                }
                select.appendChild(option);
            });
        }

        // Generate PDF receipt
        function generatePDF(name, test, date, time, email, phone) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            doc.text('Healthifylive Booking Receipt', 10, 10);
            doc.text(`Name: ${name}`, 10, 20);
            doc.text(`Test: ${test}`, 10, 30);
            doc.text(`Date: ${date}`, 10, 40);
            doc.text(`Time: ${time}`, 10, 50);
            doc.text(`Email: ${email}`, 10, 60);
            doc.text(`Phone: ${phone}`, 10, 70);
            doc.text('Thank you for booking with Healthifylive!', 10, 90);
            return doc.output('datauristring');
        }

        // Handle form submission
        document.getElementById('booking-form').addEventListener('submit', async function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const test = document.getElementById('test-select').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const message = document.getElementById('message');

            try {
                // Save booking to Firestore
                await db.collection('bookings').add({
                    name,
                    email,
                    phone,
                    test,
                    date,
                    time,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });

                // Generate PDF
                const pdfDataUri = generatePDF(name, test, date, time, email, phone);

                // Send email with EmailJS
                await emailjs.send('healthifylive-emailjs-service_z3ac4pk', 'healthifylive-emailjs-template_5v6t6ku', {
                    name,
                    test,
                    date,
                    time,
                    email
                }, {
                    attachments: [{
                        name: 'booking-receipt.pdf',
                        data: pdfDataUri.split(',')[1],
                        type: 'application/pdf'
                    }]
                });

                message.textContent = `Booking confirmed for ${name}! Email with PDF receipt sent to ${email}.`;
                message.style.display = 'block';
                this.reset();
            } catch (error) {
                message.textContent = `Error: ${error.message}`;
                message.style.color = 'red';
                message.style.display = 'block';
            }
        });

        // Load tests on page load
        document.addEventListener('DOMContentLoaded', populateTestDropdown);
    </script>
</body>
</html>
