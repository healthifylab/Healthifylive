export default function Home() {
  return (
    <div className="text-center px-4 py-10 bg-gradient-to-br from-blue-50 to-green-100 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-800">Welcome to Healthify Lab</h1>
      <p className="mt-2 text-gray-700 text-lg">Accurate. Reliable. Hassle-free Testing at Home.</p>

      <div className="mt-6">
        <button className="bg-green-600 text-white px-6 py-2 rounded-full shadow hover:bg-green-700">
          Book Full Body Test @ ₹499
        </button>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 px-4">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold text-lg">🔬 Your trusted partner</h3>
          <p>Preventive healthcare through expert diagnostics.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold text-lg">💉 Hassle-free home collection</h3>
          <p>Sample collection at your doorstep — free.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold text-lg">🧪 Advanced reports</h3>
          <p>Fast turnaround and high accuracy reports.</p>
        </div>
      </div>
    </div>
  );
}
