// test-data.js

const sampleTests = [
  {
    TestName: "CBC (Complete Blood Count)",
    Description: "Complete Blood Count to assess overall health.",
    MRP: 300,
    offerPrice: 249,
    NoofParameters: 24,
    TAT: "24 hours",
    TestType: "Test",
    image: "assets/cbc-profile.jpg", // Add image path for consistency with fetch-tests.js
    id: "cbc" // Add ID for booking URL compatibility
  },
  {
    TestName: "Lipid Profile",
    Description: "Measures cholesterol and triglyceride levels.",
    MRP: 800,
    offerPrice: 649,
    NoofParameters: 8,
    TAT: "24 hours",
    TestType: "Test",
    image: "assets/lipid-profile.jpg",
    id: "lipid"
  },
  {
    TestName: "Blood Glucose",
    Description: "Monitors blood sugar levels.",
    MRP: 300,
    offerPrice: 249,
    NoofParameters: 1,
    TAT: "12 hours",
    TestType: "Test",
    image: "assets/blood-glucose.jpg",
    id: "glucose"
  },
  {
    TestName: "Vitamin D",
    Description: "Checks Vitamin D levels.",
    MRP: 1500,
    offerPrice: 1199,
    NoofParameters: 1,
    TAT: "24 hours",
    TestType: "Test",
    image: "assets/vitamin-d.jpg",
    id: "vitamin-d"
  }
];

const sampleProfiles = [
  {
    TestName: "Healthify Full Body Checkup",
    Description: "Complete health check including 60+ tests.",
    MRP: 2500,
    offerPrice: 1999,
    NoofParameters: 60,
    TAT: "48 hours",
    TestType: "Profile",
    image: "assets/full-body-checkup.jpg",
    id: "full-body-1999"
  },
  {
    TestName: "Healthify Diabetes Profile",
    Description: "Tests for diabetes management.",
    MRP: 1500,
    offerPrice: 1199,
    NoofParameters: 30,
    TAT: "24 hours",
    TestType: "Profile",
    image: "assets/diabetes-profile.jpg",
    id: "diabetes"
  },
  {
    TestName: "Healthify Cardiac Profile",
    Description: "Heart health assessment.",
    MRP: 2000,
    offerPrice: 1599,
    NoofParameters: 15,
    TAT: "48 hours",
    TestType: "Profile",
    image: "assets/cardiac-profile.jpg",
    id: "cardiac"
  }
];

// Store data in localStorage for fallback
localStorage.setItem("testsList", JSON.stringify(sampleTests));
localStorage.setItem("profilesList", JSON.stringify(sampleProfiles));

// Export for potential use in other scripts
export { sampleTests, sampleProfiles };
