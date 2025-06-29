// AdminPanel.jsx – View & Manage Bookings
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/admin-login");
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const snapshot = await getDocs(collection(db, "bookings"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBookings(data);
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    const ref = doc(db, "bookings", id);
    await updateDoc(ref, { status });
    fetchBookings();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">📋 Admin Bookings Panel</h1>
      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-4">
              <h2 className="font-semibold text-lg">{b.name} ({b.mobile})</h2>
              <p>📅 {b.date} ⏰ {b.time}</p>
              <p>📍 {b.address} - {b.pincode}</p>
              <p>🧪 Tests: {b.selectedTests?.join(", ")}</p>
              <p>🟡 Status: <span className="font-semibold text-blue-600">{b.status}</span></p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => updateStatus(b.id, "Confirmed")} className="bg-green-500 text-white px-3 py-1 rounded">Confirm</button>
                <button onClick={() => updateStatus(b.id, "Hold")} className="bg-yellow-500 text-white px-3 py-1 rounded">Hold</button>
                <button onClick={() => updateStatus(b.id, "Rejected")} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                <button onClick={() => updateStatus(b.id, "Reschedule")} className="bg-blue-500 text-white px-3 py-1 rounded">Reschedule</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
