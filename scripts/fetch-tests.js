import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import emailjs from "@emailjs/browser";

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    try {
        emailjs.init('dJE_JHAoNTxxzTxiT');
        console.log('EmailJS initialized with public key: dJE_JHAoNTxxzTxiT');
    } catch (error) {
        console.error('EmailJS initialization failed:', error);
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
        const app = initializeApp(firebaseConfig);
        console.log('Firebase initialized successfully');
    } catch (error) {
        console.error('Firebase initialization failed:', error);
    }
    const db = getFirestore();
    const auth = getAuth();

    // Check login status
    const user = JSON.parse(localStorage.getItem('user'));
    const loggedIn = !!user;
    console.log('Login status:', loggedIn, 'User:', user);

    // Pre-fill form from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedTests = urlParams.get('tests')?.split(',').map(t => t.trim()) || [];
    const preselectedProfiles = urlParams.get('profiles')?.split(',').map(p => p.trim()) || [];
    const profileSelect = document.getElementById('profiles');
    const testsSelect = document.getElementById('tests');
    const nameInput = document.getElementById('name');
    const contactInput = document.getElementById('contact');
    const ageInput = document.getElementById('age');
    const sexInput = document.getElementById('sex');
    const addressInput = document.getElementById('address');
    const pincodeInput = document.getElementById('pincode');
    const landmarkInput = document.getElementById('landmark');
    const dateTimeInput = document.getElementById('dateTime');

    // Pre-fill form fields
    if (urlParams.has('name')) nameInput.value = urlParams.get('name');
    if (urlParams.has('contact')) contactInput.value = urlParams.get('contact');
    if (urlParams.has('age')) ageInput.value = urlParams.get('age');
    if (urlParams.has('sex')) sexInput.value = urlParams.get('sex');
    if (urlParams.has('address')) addressInput.value = urlParams.get('address').replace(/\+/g, ' ');
    if (urlParams.has('pincode')) pincodeInput.value = urlParams.get('pincode');
    if (urlParams.has('landmark')) landmarkInput.value = urlParams.get('landmark');
    if (urlParams.has('dateTime')) dateTimeInput.value = decodeURIComponent(urlParams.get('dateTime'));

    // Preselect tests and profiles
    if (preselectedTests.length > 0 && testsSelect) {
        for (let option of testsSelect.options) {
            if (preselectedTests.includes(option.value)) option.selected = true;
        }
    }
    if (preselectedProfiles.length > 0 && profileSelect) {
        for (let option of profileSelect.options) {
            if (preselectedProfiles.includes(option.value)) option.selected = true;
        }
    }

    // Update cart from URL parameters
    const testsList = JSON.parse(localStorage.getItem('testsList') || '[]');
    const profilesList = JSON.parse(localStorage.getItem('profilesList') || '[]');
    const cartItems = [
        ...preselectedTests.map(testName => {
            const test = testsList.find(t => t.TestName === testName);
            return test ? { ...test, TestType: 'Test' } : null;
        }).filter(Boolean),
        ...preselectedProfiles.map(profileName => {
            const profile = profilesList.find(p => p.TestName === profileName);
            return profile ? { ...profile, TestType: 'Profile' } : null;
        }).filter(Boolean)
    ];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log('Cart updated from URL:', cartItems);

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
            const address = document.getElement
