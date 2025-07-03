// pages/index.js

import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Healthify Lab - Book Blood Tests from Home</title>
        <meta name="description" content="Book certified home blood sample collections with Healthify Lab. Fast, accurate reports in Mumbai, Navi Mumbai & Thane." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://healthifylive.vercel.app" />
      </Head>

      <Navbar />

      <main className="min-h-screen p-4 flex flex-col items-center justify-center bg-gray-50">
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

        {/* Why Choose Us */}
        <div className="mt-16 max-w-4xl w-full px-4">
          <h2 className="text-2xl font-semibold text-center text-green-700 mb-4">🔬 Why Choose Healthify Lab?</h2>
          <ul className="list-disc text-gray-800 text-lg ml-6">
            <li>Your trusted partner in preventive healthcare</li>
            <li>💉 Hassle-free sample collection at home</li>
            <li>🧪 Advanced diagnostics & accurate reports</li>
            <li>🚚 Fast turnaround time</li>
            <li>✅ 💙 Happy customers across Mumbai, Navi Mumbai & Thane</li>
          </ul>
          <p className="text-center mt-4 text-base">
            📞 Book your test today — because your health deserves the best.
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-4xl w-full px-4">
          <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">❓ Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="border p-4 rounded-md">
              <summary className="font-medium cursor-pointer">What areas do you serve?</summary>
              <p className="mt-2">We currently serve Mumbai, Navi Mumbai, and Thane for home sample collection.</p>
            </details>
            <details className="border p-4 rounded-md">
              <summary className="font-medium cursor-pointer">When will I get my report?</summary>
              <p className="mt-2">Most reports are delivered within 12–24 hours, depending on the test profile.</p>
            </details>
            <details className="border p-4 rounded-md">
              <summary className="font-medium cursor-pointer">Is sample collection free?</summary>
              <p className="mt-2">Yes, home sample collection is absolutely free.</p>
            </details>
            <details className="border p-4 rounded-md">
              <summary className="font-medium cursor-pointer">How do I get my report?</summary>
              <p className="mt-2">Reports are sent to your email and WhatsApp. You can also download it using your Booking ID.</p>
            </details>
          </div>
        </div>
      </main>

      {/* Floating WhatsApp Button */}
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
