// Booking // ✅ booking.js — Booking Form Page
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import testData from '../data/testData';
import Head from 'next/head';

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    pincode: '',
    landmark: '',
    mobile: '',
    email: '',
    selectedTests: [],
  });

  const [success, setSuccess] = useState(false);

  const testNames = Object.keys(testData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTestChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    setFormData((prev) => ({ ...prev, selectedTests: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalPrice = formData.selectedTests.reduce((sum, key) => sum + testData[key].price, 0);

    try {
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        created: Timestamp.now(),
        totalPrice,
      });

      const templateParams = {
        name: formData.name,
        email: formData.email || 'Not Provided',
        mobile: formData.mobile || 'Not Provided',
        tests: formData.selectedTests.join(', '),
        total: totalPrice,
      };

      await emailjs.send('service_z3ac4pk', 'template_5v6t6ku', templateParams, 'dJE_JHAoNTxxzTxiT');
      setSuccess(true);
      setFormData({
        name: '', age: '', address: '', pincode: '', landmark: '', mobile: '', email: '', selectedTests: [],
      });
    } catch (error) {
      console.error('Booking failed', error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Head><title>Book Blood Test - Healthify Lab</title></Head>
      <h2 className="text-2xl font-bold mb-4">Book a Home Blood Test</h2>
      {success && <p className="text-green-600">✅ Booking Successful! You'll receive a confirmation shortly.</p>}
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="p-2 border rounded" />
        <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" required className="p-2 border rounded" />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required className="p-2 border rounded" />
        <input name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Landmark" className="p-2 border rounded" />
        <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" required className="p-2 border rounded" />
        <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" className="p-2 border rounded" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email (optional)" className="p-2 border rounded" />

        <label className="font-semibold">Select Tests or Profiles</label>
        <select multiple onChange={handleTestChange} value={formData.selectedTests} className="p-2 border rounded h-40">
          {testNames.map((key) => (
            <option key={key} value={key}>
              {testData[key].name} — ₹{testData[key].price}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-green-600 text-white py-2 rounded">Confirm Booking</button>
      </form>
    </div>
  );
}
 with name, age, address, mobile/email, test dropdown, pricing, PDF receipt
