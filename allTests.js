const tests = [
  {
    name: "CBC (Complete Blood Count)",
    mrp: 399,
    offerPrice: 319,
    description: "Checks WBC, RBC, Hemoglobin, Platelets and more.",
    tat: "4-6 Hours"
  },
  {
    name: "Thyroid Profile (T3, T4, TSH)",
    mrp: 499,
    offerPrice: 399,
    description: "Evaluates thyroid hormone levels to detect thyroid disorders.",
    tat: "6-8 Hours"
  },
  {
    name: "Blood Sugar - Fasting (FBS)",
    mrp: 299,
    offerPrice: 239,
    description: "Measures glucose level after 8-12 hours fasting.",
    tat: "2-4 Hours"
  },
  {
    name: "Blood Sugar - Postprandial (PPBS)",
    mrp: 299,
    offerPrice: 239,
    description: "Checks glucose level 2 hours after a meal.",
    tat: "2-4 Hours"
  },
  {
    name: "HbA1c (Glycated Hemoglobin)",
    mrp: 549,
    offerPrice: 439,
    description: "Monitors average blood sugar over 3 months.",
    tat: "6-8 Hours"
  },
  {
    name: "Liver Function Test (LFT)",
    mrp: 799,
    offerPrice: 639,
    description: "Assesses overall liver health and enzymes.",
    tat: "6-8 Hours"
  },
  {
    name: "Kidney Function Test (KFT)",
    mrp: 749,
    offerPrice: 599,
    description: "Evaluates urea, creatinine, and electrolytes for kidney function.",
    tat: "6-8 Hours"
  },
  {
    name: "Vitamin D Total",
    mrp: 999,
    offerPrice: 799,
    description: "Measures vitamin D levels for bone and immune health.",
    tat: "24 Hours"
  },
  {
    name: "Vitamin B12",
    mrp: 899,
    offerPrice: 719,
    description: "Detects vitamin B12 deficiency causing anemia and nerve issues.",
    tat: "24 Hours"
  },
  {
    name: "Serum Iron",
    mrp: 499,
    offerPrice: 399,
    description: "Checks iron levels to evaluate anemia or iron overload.",
    tat: "6-8 Hours"
  },
  {
    name: "Lipid Profile",
    mrp: 649,
    offerPrice: 519,
    description: "Measures cholesterol, HDL, LDL, triglycerides.",
    tat: "6-8 Hours"
  },
  {
    name: "Uric Acid",
    mrp: 299,
    offerPrice: 239,
    description: "Monitors uric acid levels in blood; helps detect gout.",
    tat: "4-6 Hours"
  },
  {
    name: "Creatinine Serum",
    mrp: 299,
    offerPrice: 239,
    description: "Checks kidney function by measuring creatinine level.",
    tat: "4-6 Hours"
  },
  {
    name: "Urea Serum",
    mrp: 299,
    offerPrice: 239,
    description: "Assesses kidney efficiency through blood urea.",
    tat: "4-6 Hours"
  },
  {
    name: "Electrolytes (Na/K/Cl)",
    mrp: 499,
    offerPrice: 399,
    description: "Monitors body fluid balance and dehydration.",
    tat: "4-6 Hours"
  },
  {
    name: "Calcium Serum",
    mrp: 349,
    offerPrice: 279,
    description: "Measures calcium essential for bones, muscles, and nerves.",
    tat: "4-6 Hours"
  },
  {
    name: "Phosphorus",
    mrp: 299,
    offerPrice: 239,
    description: "Evaluates phosphate levels crucial for bone & cell function.",
    tat: "4-6 Hours"
  },
  {
    name: "Alkaline Phosphatase (ALP)",
    mrp: 299,
    offerPrice: 239,
    description: "Detects liver and bone disorders.",
    tat: "4-6 Hours"
  },
  {
    name: "SGOT / AST",
    mrp: 299,
    offerPrice: 239,
    description: "Liver enzyme test to diagnose liver damage.",
    tat: "4-6 Hours"
  },
  {
    name: "SGPT / ALT",
    mrp: 299,
    offerPrice: 239,
    description: "Liver enzyme to assess liver inflammation.",
    tat: "4-6 Hours"
  },
  {
    name: "Total Bilirubin",
    mrp: 349,
    offerPrice: 279,
    description: "Measures bilirubin levels to assess jaundice/liver.",
    tat: "4-6 Hours"
  },
  {
    name: "Direct Bilirubin",
    mrp: 349,
    offerPrice: 279,
    description: "Monitors liver function and bile flow.",
    tat: "4-6 Hours"
  },
  {
    name: "Albumin",
    mrp: 299,
    offerPrice: 239,
    description: "Protein test to evaluate liver/kidney disease.",
    tat: "4-6 Hours"
  },
  {
    name: "Total Protein",
    mrp: 349,
    offerPrice: 279,
    description: "Measures all proteins in blood including albumin & globulin.",
    tat: "4-6 Hours"
  },
  {
    name: "Globulin",
    mrp: 299,
    offerPrice: 239,
    description: "Assesses immune system protein levels.",
    tat: "4-6 Hours"
  },
  {
    name: "A/G Ratio",
    mrp: 249,
    offerPrice: 199,
    description: "Evaluates ratio of albumin to globulin.",
    tat: "4-6 Hours"
  },
  {
    name: "ESR",
    mrp: 299,
    offerPrice: 239,
    description: "Checks inflammation in the body.",
    tat: "2-4 Hours"
  },
  {
    name: "CRP (C-Reactive Protein)",
    mrp: 599,
    offerPrice: 479,
    description: "Detects inflammation, infection, or autoimmune issues.",
    tat: "6-8 Hours"
  },
  {
    name: "RA Factor",
    mrp: 499,
    offerPrice: 399,
    description: "Helps diagnose rheumatoid arthritis.",
    tat: "6-8 Hours"
  },
  {
    name: "Widal Test",
    mrp: 399,
    offerPrice: 319,
    description: "Used to detect typhoid fever.",
    tat: "6-8 Hours"
  },
  {
    name: "ASO Titre",
    mrp: 499,
    offerPrice: 399,
    description: "Detects streptococcus infection.",
    tat: "6-8 Hours"
  },
  {
    name: "Urine Routine",
    mrp: 349,
    offerPrice: 279,
    description: "Detects UTI, kidney disorders, and metabolic diseases.",
    tat: "2-4 Hours"
  },
  {
    name: "Stool Routine",
    mrp: 349,
    offerPrice: 279,
    description: "Detects GI infections and parasites.",
    tat: "6-8 Hours"
  },
  {
    name: "TSH (Thyroid Stimulating Hormone)",
    mrp: 399,
    offerPrice: 319,
    description: "Evaluates thyroid gland function.",
    tat: "6-8 Hours"
  },
  {
    name: "Free T3",
    mrp: 399,
    offerPrice: 319,
    description: "Measures free triiodothyronine levels.",
    tat: "6-8 Hours"
  },
  {
    name: "Free T4",
    mrp: 399,
    offerPrice: 319,
    description: "Measures free thyroxine levels.",
    tat: "6-8 Hours"
  },
  {
    name: "Prolactin",
    mrp: 699,
    offerPrice: 559,
    description: "Assesses prolactin hormone levels.",
    tat: "6-8 Hours"
  },
  {
    name: "FSH (Follicle Stimulating Hormone)",
    mrp: 699,
    offerPrice: 559,
    description: "Checks reproductive health in men and women.",
    tat: "6-8 Hours"
  },
  {
    name: "LH (Luteinizing Hormone)",
    mrp: 699,
    offerPrice: 559,
    description: "Monitors ovulation and fertility.",
    tat: "6-8 Hours"
  },
  {
    name: "Testosterone Total",
    mrp: 749,
    offerPrice: 599,
    description: "Evaluates male hormone levels.",
    tat: "6-8 Hours"
  },
  {
    name: "Insulin Fasting",
    mrp: 899,
    offerPrice: 719,
    description: "Helps assess insulin resistance and diabetes.",
    tat: "6-8 Hours"
  },
  {
    name: "HIV 1 & 2",
    mrp: 599,
    offerPrice: 479,
    description: "Detects HIV infection.",
    tat: "24 Hours"
  },
  {
    name: "Hepatitis B Surface Antigen (HBsAg)",
    mrp: 549,
    offerPrice: 439,
    description: "Screens for hepatitis B infection.",
    tat: "24 Hours"
  },
  {
    name: "HCV (Hepatitis C Virus)",
    mrp: 599,
    offerPrice: 479,
    description: "Screens for hepatitis C infection.",
    tat: "24 Hours"
  },
  {
    name: "VDRL",
    mrp: 399,
    offerPrice: 319,
    description: "Detects syphilis infection.",
    tat: "6-8 Hours"
  },
  {
    name: "PSA (Prostate Specific Antigen)",
    mrp: 699,
    offerPrice: 559,
    description: "Used in prostate cancer screening.",
    tat: "6-8 Hours"
  },
  {
    name: "Pregnancy Test (Urine hCG)",
    mrp: 299,
    offerPrice: 239,
    description: "Detects early pregnancy using urine sample.",
    tat: "2 Hours"
  },
  {
    name: "Beta hCG (Blood)",
    mrp: 549,
    offerPrice: 439,
    description: "Confirms and monitors pregnancy.",
    tat: "6 Hours"
  },
  {
    name: "Blood Group & Rh Typing",
    mrp: 299,
    offerPrice: 239,
    description: "Determines blood group and Rh factor.",
    tat: "2 Hours"
  },
  {
    name: "PT/INR",
    mrp: 499,
    offerPrice: 399,
    description: "Measures blood clotting time, important before surgery.",
    tat: "4 Hours"
  },
  {
    name: "D-Dimer",
    mrp: 999,
    offerPrice: 799,
    description: "Detects clotting disorders like DVT and pulmonary embolism.",
    tat: "6-8 Hours"
  },
  {
    name: "Ferritin",
    mrp: 649,
    offerPrice: 519,
    description: "Checks iron storage levels in the body.",
    tat: "6-8 Hours"
  }
];
