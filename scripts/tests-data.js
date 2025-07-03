// tests-data.js

const sampleTests = [
  {
    TestName: "Complete Blood Count (CBC)",
    Description: "Basic screening for blood components",
    MRP: 300,
    offerPrice: 249,
    NoofParameters: 24,
    TAT: "24 hours",
    TestType: "Test"
  },
  {
    TestName: "Thyroid Function Test (T3 T4 TSH)",
    Description: "Checks for thyroid hormone imbalance",
    MRP: 799,
    offerPrice: 649,
    NoofParameters: 3,
    TAT: "24 hours",
    TestType: "Test"
  },
  {
    TestName: "Lipid Profile",
    Description: "Evaluates cholesterol and triglycerides",
    MRP: 999,
    offerPrice: 799,
    NoofParameters: 8,
    TAT: "24 hours",
    TestType: "Test"
  }
];

const sampleProfiles = [
  {
    TestName: "Healthify Full Body Checkup",
    Description: "Complete health check with 65+ tests",
    MRP: 2499,
    offerPrice: 1999,
    NoofParameters: 65,
    TAT: "48 hours",
    TestType: "Profile"
  },
  {
    TestName: "Healthify Liver Function Profile",
    Description: "Liver enzymes and overall liver health",
    MRP: 1199,
    offerPrice: 949,
    NoofParameters: 11,
    TAT: "24 hours",
    TestType: "Profile"
  },
  {
    TestName: "Healthify Diabetes Monitoring",
    Description: "Glucose, HbA1c and more",
    MRP: 1299,
    offerPrice: 1049,
    NoofParameters: 6,
    TAT: "24 hours",
    TestType: "Profile"
  }
];

// Save to localStorage for search, dropdowns, cart, etc.
localStorage.setItem("testsList", JSON.stringify(sampleTests));
localStorage.setItem("profilesList", JSON.stringify(sampleProfiles));
