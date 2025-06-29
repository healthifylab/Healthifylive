// About.jsx – About Healthify Page

export default function About() {
  return (
    <div className="p-6 bg-white min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold text-blue-800 text-center mb-4">About Healthify Lab</h1>
      <p className="max-w-2xl mx-auto text-lg leading-relaxed">
        Healthify Lab is committed to providing reliable and accurate diagnostic services to help you stay ahead of your health. We specialize in a wide range of blood tests and wellness profiles, ensuring convenience through home sample collection and same-day reports. Our state-of-the-art technology and expert technicians ensure the highest standard of care.
      </p>
      <ul className="mt-6 space-y-3 text-left max-w-xl mx-auto">
        <li>✅ NABL & ISO certified lab</li>
        <li>✅ 20+ collection partners across India</li>
        <li>✅ Over 100,000 tests processed</li>
        <li>✅ Trusted by families, doctors, and corporates</li>
      </ul>
    </div>
  );
}
