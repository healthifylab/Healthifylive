// ✅ Full Code Structure Overview:
// I will now share the complete essential files for your project.
// Paste each into your GitHub repo in the right place.

// ==============================
// 1. /pages/index.js
// ==============================

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
