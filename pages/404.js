// ✅ Custom 404 Not Found page

import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <span className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 cursor-pointer">
          Go Back Home
        </span>
      </Link>
    </div>
  );
}
