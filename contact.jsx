export default function Contact() {
  return (
    <div className="p-6 bg-blue-50 min-h-screen text-center">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Contact Us</h1>

      <div className="bg-white shadow rounded-xl max-w-lg mx-auto p-6">
        <p className="text-lg mb-2">📞 <strong>Phone:</strong> +91 9503832889</p>
        <p className="text-lg mb-2">📧 <strong>Email:</strong> <a href="mailto:healthifylab@gmail.com" className="text-blue-600">healthifylab@gmail.com</a></p>
        <p className="text-lg">📍 <strong>Location:</strong> Available in multiple cities with home collection</p>
      </div>
    </div>
  );
}
