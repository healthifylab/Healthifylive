// ✅ Fixed index.js
// Paste this into your /pages/index.js file

import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Healthify Live</title>
        <link rel="canonical" href="https://healthifylive.vercel.app" />
        <meta name="description" content="Book home blood test appointments with Healthify Lab in Mumbai, Navi Mumbai & Thane. Fast, accurate reports & technician visits at your doorstep." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main className="min-h-screen p-4 flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-6">
          Welcome to Healthify Lab
        </h1>
        <p className="text-center text-lg max-w-xl">
          Book a blood test from the comfort of your home. We serve Mumbai, Navi Mumbai & Thane with certified lab technicians and fast results.
        </p>

        <div className="mt-6">
          <Link href="/booking" className="bg-green-600 text-white px-6 py-3 rounded-full shadow hover:bg-green-700">
            Book Your Test
          </Link>
        </div>

        {/* Promo Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          <Image src="/assets/Text_Welcome1.jpg" alt="Promo 1" width={400} height={300} className="rounded-xl shadow-md" />
          <Image src="/assets/Text_Welcome2.jpg" alt="Promo 2" width={400} height={300} className="rounded-xl shadow-md" />
          <Image src="/assets/Text_Welcome3.jpg" alt="Promo 3" width={400} height={300} className="rounded-xl shadow-md" />
        </div>

        {/* Why Choose Healthify */}
        <div className="bg-white mt-12 p-6 rounded-xl shadow-md max-w-4xl">
          <h2 className="text-2xl font-semibold text-center mb-4 text-green-700">🔬 Why Choose Healthify Lab</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Your trusted partner in preventive healthcare.</li>
            <li>💉 Hassle-free sample collection at home</li>
            <li>🧪 Advanced diagnostics & accurate reports</li>
            <li>🚚 Fast turnaround</li>
            <li>📍 Serving Mumbai, Navi Mumbai, Thane</li>
            <li>✅ 💙 Happy Customers</li>
          </ul>
          <p className="mt-4 text-center font-medium">📞 Book your test today — because your health deserves the best.</p>
        </div>
  import Faq from '../components/Faq';
...
<Faq />


        {/* FAQs */}
        <div className="bg-white mt-12 p-6 rounded-xl shadow-md max-w-4xl">
          <h2 className="text-2xl font-semibold text-center mb-4 text-green-700">❓ Frequently Asked Questions</h2>
          <ul className="space-y-4">
            <li>
              <strong>Q: How do I book a test?</strong>
              <p>A: Click on the "Book Your Test" button and fill in the form. Our technician will contact you shortly.</p>
            </li>
            <li>
              <strong>Q: Do you provide home sample collection?</strong>
              <p>A: Yes, we specialize in home sample collection across Mumbai, Navi Mumbai, and Thane.</p>
            </li>
            <li>
              <strong>Q: How soon will I receive my reports?</strong>
              <p>A: Most test reports are delivered within 24-48 hours to your email and WhatsApp.</p>
            </li>
            <li>
              <strong>Q: Is the lab certified?</strong>
              <p>A: We work with certified partner labs for accurate diagnostics, even though we are not NABL-accredited ourselves.</p>
            </li>
            <li>
              <strong>Q: What if I have more questions?</strong>
              <p>A: Contact us at <a href="mailto:report@healthifylab.com" className="text-blue-600">report@healthifylab.com</a> or WhatsApp us at 9503832889.</p>
            </li>
          </ul>
        </div>
      </main>

      {/* ✅ Floating WhatsApp Button */}
      <a
        href="https://wa.me/919503832889"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50"
      >
        <Image
          src="/assets/whatsapp-icon.png"
          alt="WhatsApp Chat"
          width={60}
          height={60}
        />
      </a>

      <Footer />
    </div>
  );
}
