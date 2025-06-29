import React from "react";

const Hero = () => {
  return (
    <section className="text-center py-10 bg-blue-50 mt-4">
      <h2 className="text-3xl font-bold text-green-700 mb-3">
        Your Health, Our Priority
      </h2>
      <p className="text-gray-700 text-lg">
        Get tested from the comfort of your home. Affordable. Accurate. Trusted.
      </p>
      <img
        src="/banner1.jpg"
        alt="Lab Banner"
        className="mx-auto mt-5 rounded-lg shadow-md max-w-xl"
      />
    </section>
  );
};

export default Hero;
