const sampleTests = [
  {
    TestName: "CBC",
    Description: "Complete Blood Count to assess overall health.",
    MRP: 500,
    offerPrice: 400,
    NoofParameters: 24,
    TAT: "24 hours",
    TestType: "Test"
  },
  {
    TestName: "Lipid Profile",
    Description: "Measures cholesterol and triglyceride levels.",
    MRP: 800,
    offerPrice: 640,
    NoofParameters: 8,
    TAT: "24 hours",
    TestType: "Test"
  },
  {
    TestName: "Blood Glucose",
    Description: "Monitors blood sugar levels for diabetes.",
    MRP: 300,
    offerPrice: 240,
    NoofParameters: 1,
    TAT: "12 hours",
    TestType: "Test"
  },
  {
    TestName: "HbA1c",
    Description: "Assesses long-term blood sugar control.",
    MRP: 600,
    offerPrice: 480,
    NoofParameters: 1,
    TAT: "24 hours",
    TestType: "Test"
  },
  {
    TestName: "Liver Function Test",
    Description: "Evaluates liver health and enzyme levels.",
    MRP: 900,
    offerPrice: 720,
    NoofParameters: 12,
    TAT: "24 hours",
    TestType: "Test"
  },
  {
    TestName: "Kidney Function Test",
    Description: "Assesses kidney function and electrolyte balance.",
    MRP: 850,
    offerPrice: 680,
    NoofParameters: 10,
    TAT: "24 hours",
    TestType: "Test"
  },
  {
    TestName: "Thyroid Function Test",
    Description: "Measures thyroid hormone levels (T3, T4, TSH).",
    MRP: 700,
    offerPrice: 560,
    NoofParameters: 3,
    TAT: "24 hours",
    TestType: "Test"
  },
  {
    TestName: "Vitamin D",
    Description: "Checks vitamin D levels for bone health.",
    MRP: 1500,
    offerPrice: 1200,
    NoofParameters: 1,
    TAT: "24 hours",
    TestType: "Test"
  },
  {
    TestName: "Iron Profile",
    Description: "Evaluates iron levels and anemia risk.",
    MRP: 600,
    offerPrice: 480,
    NoofParameters: 4,
    TAT: "24 hours",
    TestType: "Test"
  },
  {
    TestName: "C-Reactive Protein",
    Description: "Measures inflammation in the body.",
    MRP: 400,
    offerPrice: 320,
    NoofParameters: 1,
    TAT: "24 hours",
    TestType: "Test"
  }
];

const sampleProfiles = [
  {
    TestName: "Full Body Checkup",
    Description: "Comprehensive health assessment with 60+ tests.",
    MRP: 2500,
    offerPrice: 2000,
    NoofParameters: 60,
    TAT: "48 hours",
    TestType: "Profile"
  },
  {
    TestName: "Diabetes Profile",
    Description: "Tests for diabetes management and monitoring.",
    MRP: 1500,
    offerPrice: 1200,
    NoofParameters: 30,
    TAT: "24 hours",
    TestType: "Profile"
  },
  {
    TestName: "Vitamin Profile",
    Description: "Checks vitamin D, B12, and other vitamin levels.",
    MRP: 1200,
    offerPrice: 960,
    NoofParameters: 5,
    TAT: "24 hours",
    TestType: "Profile"
  },
  {
    TestName: "Thyroid Profile",
    Description: "Assesses thyroid function with T3, T4, TSH.",
    MRP: 1000,
    offerPrice: 800,
    NoofParameters: 3,
    TAT: "24 hours",
    TestType: "Profile"
  },
  {
    TestName: "Cardiac Profile",
    Description: "Evaluates heart health with lipid and cardiac markers.",
    MRP: 2000,
    offerPrice: 1600,
    NoofParameters: 15,
    TAT: "48 hours",
    TestType: "Profile"
  },
  {
    TestName: "Iron Deficiency Profile",
    Description: "Checks iron levels and anemia markers.",
    MRP: 600,
    offerPrice: 480,
    NoofParameters: 4,
    TAT: "24 hours",
    TestType: "Profile"
  },
  {
    TestName: "Basic Full Body Checkup",
    Description: "Essential health check with 40+ tests.",
    MRP: 600,
    offerPrice: 499,
    NoofParameters: 40,
    TAT: "24 hours",
    TestType: "Profile"
  }
];

// Save to localStorage for search.js
localStorage.setItem("testsList", JSON.stringify(sampleTests));
localStorage.setItem("profilesList", JSON.stringify(sampleProfiles));
