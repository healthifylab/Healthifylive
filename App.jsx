import React from 'react';
import tests from './allTests.js';
import profiles from './allProfiles.js';

const App = () => {
  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex flex-col md:flex-row justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <img src="./logo.png" alt="Healthify Logo" className="h-16 w-16 object-contain" />
          <span className="text-2xl font-bold text-green-700">Healthify Lab</span>
        </div>
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search tests or profiles..."
            className="w-full p-2 border border-green-300 rounded"
          />
        </div>
      </header>

      {/* Left Side Menu */}
      <aside className="bg-green-100 p-4 w-full md:w-[200px] fixed top-[110px] left-0 h-full z-30 hidden md:block">
        <nav className="flex flex-col gap-3 text-green-800">
          <a href="index.html" className="hover:underline">Home</a>
          <a href="about.html" className="hover:underline">About</a>
          <a href="book.html" className="hover:underline">Book Test</a>
          <a href="contact.html" className="hover:underline">Contact</a>
        </nav>
      </aside>

      {/* Hero Banner */}
      <section
        className="w-full h-[240px] md:h-[360px] bg-cover bg-center mt-2 rounded shadow ml-0 md:ml-[200px]"
        style={{ backgroundImage: "url('./hero-banner.jpg')" }}
      ></section>

      {/* Promo Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 px-4 md:ml-[200px]">
        <div className="bg-green-50 p-4 rounded shadow text-center">
          <h3 className="font-bold text-lg text-green-800">Full Body Checkup</h3>
          <p>Includes 70+ Parameters</p>
          <p><span className="line-through text-red-500">₹999</span> <span className="font-bold">₹499</span></p>
        </div>
        <div className="bg-green-50 p-4 rounded shadow text-center">
          <h3 className="font-bold text-lg text-green-800">Thyroid Test</h3>
          <p>T3, T4, TSH</p>
          <p><span className="line-through text-red-500">₹699</span> <span className="font-bold">₹399</span></p>
        </div>
        <div className="bg-green-50 p-4 rounded shadow text-center">
          <h3 className="font-bold text-lg text-green-800">Diabetes Package</h3>
          <p>FBS, PPBS, HbA1c</p>
          <p><span className="line-through text-red-500">₹899</span> <span className="font-bold">₹499</span></p>
        </div>
      </section>

      {/* Why Choose Healthify */}
      <section className="bg-blue-50 p-6 rounded shadow mb-6 md:ml-[200px] mx-4">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Why Choose Healthify?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>🔬 Trusted partner in preventive healthcare</li>
          <li>💉 Hassle-free sample collection at home</li>
          <li>🧪 Advanced diagnostics & accurate reports</li>
          <li>🚚 Fast turnaround | ✅ 💙 Happy Customers</li>
          <li>📞 Book your test today — because your health deserves the best</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="bg-white p-6 rounded shadow mb-6 md:ml-[200px] mx-4">
        <h2 className="text-xl font-semibold text-green-700 mb-4">FAQs</h2>
        <div>
          <p className="font-bold">Q. How do I book a test?</p>
          <p className="mb-4">You can book online using the form or call our helpline number.</p>

          <p className="font-bold">Q. Do you offer home sample collection?</p>
          <p className="mb-4">Yes, we offer free home sample collection in most areas.</p>

          <p className="font-bold">Q. When will I get my report?</p>
          <p>Same-day report delivery for most tests.</p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="max-w-3xl mx-auto bg-white p-6 rounded shadow mb-12 md:ml-[200px]">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Book Your Test</h2>
        <form className="grid gap-4">
          <input type="text" placeholder="Full Name" className="p-2 border rounded" />
          <input type="text" placeholder="Mobile Number" className="p-2 border rounded" />
          <input type="text" placeholder="Address" className="p-2 border rounded" />
          <input type="date" className="p-2 border rounded" />

          <select className="p-2 border rounded">
            <option>Select Test</option>
            {tests.map((test, i) => (
              <option key={i}>{test.name}</option>
            ))}
          </select>

          <select className="p-2 border rounded">
            <option>Select Profile</option>
            {profiles.map((profile, i) => (
              <option key={i}>{profile.name}</option>
            ))}
          </select>

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Confirm Booking
          </button>
        </form>
      </section>

      {/* Footer with contact details */}
      <footer className="bg-green-100 text-green-900 p-4 text-center md:ml-[200px]">
        <p>📞 +91 9503832889 | ✉️ report@healthifylab.com</p>
        <p className="text-sm mt-1">© 2025 Healthify Lab</p>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919503832889"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600 z-50"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" />
      </a>
    </div>
  );
};

export default App;
