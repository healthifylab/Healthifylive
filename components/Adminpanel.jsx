import React, { useState, useEffect } from "react";
// import { db } from "../firebase";
// import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const dummyBookings = [
  {
    id: "123",
    name: "Ravi Sharma",
    mobile: "9876543210",
    tests: ["CBC", "LFT"],
    profiles: ["Full Body Checkup"],
    date: "2025-06-30",
    time: "10:00",
    status: "Pending"
  }
];

const AdminPanel = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // 🔁 Replace dummy with Firebase fetch
    // const fetchBookings = async () => {
    //   const snapshot = await getDocs(collection(db, "bookings"));
    //   const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //   setBookings(data);
    // };
    // fetchBookings();

    setBookings(dummyBookings); // TEMP
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );

    // ✅ Update Firestore if connected
    // const bookingRef = doc(db, "bookings", id);
    // await updateDoc(bookingRef, { status: newStatus });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-xl font-bold mb-4 text-blue-700">📋 Admin Booking Panel</h2>
      {bookings.map((b) => (
        <div key={b.id} className="border p-4 rounded mb-3 bg-white shadow">
          <div className="font-semibold text-lg">{b.name} — {b.mobile}</div>
          <div className="text-sm text-gray-700">
            📅 {b.date} at {b.time}<br />
            🧪 Tests: {b.tests.join(", ")}<br />
            🧬 Profiles: {b.profiles.join(", ")}
          </div>
          <div className="mt-2">
            <label>Status:</label>
            <select
              value={b.status}
              onChange={(e) => handleStatusChange(b.id, e.target.value)}
              className="ml-2 border px-2 py-1 rounded"
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Hold</option>
              <option>Rejected</option>
              <option>Reschedule</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
