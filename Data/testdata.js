// ✅ testData.js — Real Test & Profile Information with MRP, TAT, Discounted Price
const testData = {
  cbc: {
    name: 'Complete Blood Count (CBC)',
    mrp: 299,
    price: 249,
    tat: 'Same Day',
    includes: ['Hemoglobin', 'RBC', 'WBC', 'Platelet Count', 'Hematocrit', 'MCV'],
  },
  lft: {
    name: 'Liver Function Test (LFT)',
    mrp: 799,
    price: 649,
    tat: '24 Hours',
    includes: ['Total Bilirubin', 'SGPT (ALT)', 'SGOT (AST)', 'Alkaline Phosphatase', 'Total Protein'],
  },
  kft: {
    name: 'Kidney Function Test (KFT)',
    mrp: 699,
    price: 549,
    tat: '24 Hours',
    includes: ['Urea', 'Creatinine', 'Uric Acid', 'Electrolytes (Na, K, Cl)'],
  },
  diabetes: {
    name: 'Diabetes Panel',
    mrp: 399,
    price: 299,
    tat: 'Same Day',
    includes: ['Fasting Blood Sugar', 'HbA1c'],
  },
  lipid: {
    name: 'Lipid Profile',
    mrp: 899,
    price: 699,
    tat: '24 Hours',
    includes: ['Total Cholesterol', 'HDL', 'LDL', 'Triglycerides', 'VLDL', 'TC/HDL Ratio'],
  },
  thyroid: {
    name: 'Thyroid Profile (T3, T4, TSH)',
    mrp: 699,
    price: 549,
    tat: '24 Hours',
    includes: ['T3', 'T4', 'TSH'],
  },
  fullbody: {
    name: 'Full Body Checkup',
    mrp: 2499,
    price: 1999,
    tat: '24-48 Hours',
    includes: [
      'CBC',
      'LFT',
      'KFT',
      'Lipid Profile',
      'Thyroid Profile',
      'Blood Sugar',
      'Vitamin B12',
      'Vitamin D'
    ],
  }
};

export default testData;
