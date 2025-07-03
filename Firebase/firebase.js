// ✅ firebase.js — Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA4V-gQt6xYycr9tyZqQWkVwqlmwlTIkp0',
  authDomain: 'healthify-lab.firebaseapp.com',
  projectId: 'healthify-lab',
  storageBucket: 'healthify-lab.appspot.com',
  messagingSenderId: '693124683359',
  appId: '1:693124683359:web:8feec4d3b5d508256c98a9'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
