// ✅ Thank You Page After Booking

import Link from 'next/link';
import Head from 'next/head';

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Thank You - Healthify Lab</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 Thank You for Booking!</h1>
        <p className="text-lg mb-2">Your blood test appointment has been received successfully.</p>
        <p className="text-md text-gray-600 mb-6">
          Our team will contact you shortly. You’ll also receive an email confirmation with details and receipt.
        </p>

        <Link href="/">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow">
            Back to Home
          </button>
        </Link>
      </div>
    </>
  );
}
