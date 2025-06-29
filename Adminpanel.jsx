// components/AdminPanel.jsx
import React, { useState, useEffect } from "react";
// Replace this with actual Firebase call in real use
import { dummyBookings } from "../data/dummyBookings";

const AdminPanel = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // 🔄 Fetch bookings from Firebase (mocked here)
    setBookings(dummyBookings);
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...bookings];
    updated[index].status = newStatus;
    setBookings(updated);
    alert(`Booking ${index + 1} marked as "${newStatus}"`);
    // 🔄 Optionally update in Firebase
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">📋 Admin Booking Panel</h2>
      {bookings.map((b, i) => (
        <div
          key={i}
          className="bg-white p-4 border rounded-xl shadow mb-4 space-y-2"
        >
          <div><b>Patient:</b> {b.name} ({b.age}, {b.gender})</div>
          <div><b>Mobile:</b> {b.mobile}</div>
          <div><b>Address:</b> {b.address}, {b.pincode}</div>
          <div><b>Date:</b> {b.date} | <b>Time:</b> {b.time}</div>
          <div><b>Tests:</b> {b.selectedTests.join(", ")}</div>
          <div><b>Profiles:</b> {b.selectedProfiles.join(", ")}</div>
          <div><b>Status:</b> {b.status || "Pending"}</div>
          <div className="flex gap-2 mt-2">
            {["Confirm", "Hold", "Reject", "Reschedule"].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(i, status)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
