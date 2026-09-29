// Realistic Gandhinagar, Gujarat Spatial Land Parcel Dataset (Centered at Lat: 23.2156, Lng: 72.6369)
// Gandhinagar Sectors 21, 22, Infocity, & Randheja Sub-Divisions

export const GANDHINAGAR_CENTER = [23.2156, 72.6369];
export const DEFAULT_ZOOM = 15;

// Government Officer Profiles for Live Profile Switching
export const OFFICER_PROFILES = [
  {
    id: 'ro-8821',
    roleKey: 'RO',
    title: 'Tehsildar / Revenue Officer',
    name: 'Rajesh Kumar',
    designation: 'Sub-Divisional Revenue Officer (North Tehsil)',
    badgeId: '#8821',
    icon: '👨‍💼',
    division: 'Gandhinagar Revenue Division (Sector 21)',
    avatarBg: 'bg-blue-600',
    permissions: ['Approve Ownership Transfer', 'Issue Notices', 'Verify eKYC', 'Sign Land Detail Record']
  },
  {
    id: 'po-4402',
    roleKey: 'PO',
    title: 'Town Planning & Municipal Officer',
    name: 'Priya Sharma',
    designation: 'Senior Town Planner (GUDA & GMC)',
    badgeId: '#4402',
    icon: '🏗️',
    division: 'Gandhinagar Urban Development Authority',
    avatarBg: 'bg-emerald-600',
    permissions: ['Zoning Compliance', 'Master Plan 2031 Approval', 'Utility Clearance']
  },
  {
    id: 'dc-1001',
    roleKey: 'DC',
    title: 'District Collector & Magistrate',
    name: 'Aman Verma',
    designation: 'District Collector & Head of Land Administration',
    badgeId: '#1001',
    icon: '📊',
    division: 'District Collectorate, Sector 10/21',
    avatarBg: 'bg-purple-600',
    permissions: ['Appellate Review', 'Executive Sanctions', 'Policy Audit', 'High-Risk Clearance']
  },
  {
    id: 'admin-0099',
    roleKey: 'ADMIN',
    title: 'System Administrator',
    name: 'IT Operations Desk',
    designation: 'DPI Infrastructure & Security Operations',
    badgeId: '#0099',
    icon: '⚙️',
    division: 'National Informatics Centre & Gujarat State Data Centre',
    avatarBg: 'bg-slate-700',
    permissions: ['API Health Gateway', 'Cryptographic Key Rotation', 'Audit Log Export', 'User Access Control']
  }
];

// Land Category Styling Definitions
export const LAND_CATEGORIES = {
  Agricultural: {
    label: 'Agricultural Land',
    color: '#10b981', // Emerald Green
    fillColor: '#d1fae5', // Soft Emerald
    borderColor: '#059669',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: '🌾'
  },
  Industrial: {
    label: 'Industrial Land',
    color: '#8b5cf6', // Purple
    fillColor: '#ede9fe', // Soft Purple
    borderColor: '#7c3aed',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: '🏭'
  },
  Utility: {
    label: 'Utility Infrastructure Land',
    color: '#f59e0b', // Amber
    fillColor: '#fef3c7', // Soft Amber
    borderColor: '#d97706',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: '⚡'
  },
  Residential: {
    label: 'Residential Land',
    color: '#0284c7', // Sky Blue
    fillColor: '#e0f2fe', // Soft Sky Blue
    borderColor: '#0369a1',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
    icon: '🏡'
  }
};

// 12 Realistic Gandhinagar Parcel Polygons
// Total Area: 48,250 sq. m (11.9 Acres)
// Active Risk Flags: 3 (Parcels #3, #4, #8)
export const INITIAL_PARCELS = [
  {
    id: 'GJ-GND-01',
    ulpin: 'GJ06GND000101',
    sector: 'Sector 21',
    locality: 'Sector 21 Central Arcade & Residential Colony',
    shapeType: 'L-Shaped Residential Compound',
    landCategory: 'Residential',
    landUse: 'Residential',
    areaSqM: 3250,
    areaAcres: 0.80,
    status: 'Clear',
    statusNote: 'Joint Khata with dual co-ownership recorded under Gujarat Land Revenue Sec 135-D',
    holderName: 'Ramesh Patel & Suresh Patel',
    isSharedOwnership: true,
    ownershipType: 'Joint',
    jointConsentStatus: 'Pending',
    coOwners: [
      {
        id: 'owner-1',
        name: 'Ramesh Patel',
        relation: 'Primary Co-Holder',
        share: '50%',
        sharePercentage: 50,
        mobile: '+91 98250 12345',
        aadhaarMasked: '•••• •••• 8492',
        status: 'Verified',
        statusLabel: '🟢 eKYC Verified (DigiLocker)',
        verificationMethod: 'DigiLocker Aadhaar eKYC',
        verificationSealId: 'DL-GOV-981240',
        timestamp: '14-Jan-2026 11:32 AM IST'
      },
      {
        id: 'owner-2',
        name: 'Suresh Patel',
        relation: 'Joint Co-Holder',
        share: '50%',
        sharePercentage: 50,
        mobile: '+91 98250 54321',
        aadhaarMasked: '•••• •••• 6129',
        status: 'Pending',
        statusLabel: '🟡 Pending Consent (OTP Sent)',
        verificationMethod: 'SMS / WhatsApp OTP Gateway',
        verificationSealId: null,
        timestamp: 'Sent 10 mins ago'
      }
    ],
    mobile: '+91 98250 12345',
    aadhaarMasked: '•••• •••• 8492',
    aadhaarStatus: 'Linked & Verified',
    purchaseDate: '14-Jan-2021',
    transactionValue: '₹ 4,25,00,000',
    previousOwner: 'Gandhinagar Urban Dev Authority (GUDA)',
    encumbranceStatus: 'Nil Encumbrance (SBI NOC Verified)',
    taxStatus: 'Paid (FY 2025-26)',
    khasraNo: '142/1',
    coordinates: [
      [23.2185, 72.6345],
      [23.2205, 72.6345],
      [23.2205, 72.6375],
      [23.2195, 72.6375],
      [23.2195, 72.6360],
      [23.2185, 72.6360],
      [23.2185, 72.6345]
    ],
    centroid: [23.2195, 72.6360]
  },
  {
    id: 'GJ-GND-02',
    ulpin: 'GJ06GND000102',
    sector: 'Sector 22',
    locality: 'Subhadra Enclave, Plot 34, Sector 22, Gandhinagar',
    shapeType: 'Rectangular Residential Plot',
    landCategory: 'Residential',
    landUse: 'Residential',
    areaSqM: 2150,
    areaAcres: 0.53,
    status: 'Clear',
    statusNote: 'Clear title & certified mutation entry in 7/12 RoR',
    holderName: 'Meenakshi Dave',
    mobile: '+91 97123 44556',
    aadhaarMasked: '•••• •••• 1928',
    aadhaarStatus: 'Linked & Verified',
    purchaseDate: '08-May-2023',
    transactionValue: '₹ 1,80,00,000',
    previousOwner: 'Jayeshbhai K. Mehta',
    encumbranceStatus: 'Clear Title',
    taxStatus: 'Paid (FY 2025-26)',
    khasraNo: '88/2',
    coordinates: [
      [23.2140, 72.6320],
      [23.2162, 72.6320],
      [23.2162, 72.6348],
      [23.2140, 72.6348],
      [23.2140, 72.6320]
    ],
    centroid: [23.2151, 72.6334]
  },
  {
    id: 'GJ-GND-03',
    ulpin: 'MH26EAS0900003',
    sector: 'Sector 21',
    locality: 'Electronic Manufacturing Estate, Sector 21, Gandhinagar',
    shapeType: 'Irregular Polygon Industrial Plot',
    landCategory: 'Industrial',
    landUse: 'Industrial',
    areaSqM: 4600,
    areaAcres: 1.14,
    status: 'Flagged',
    statusNote: 'Overlapping survey coordinate claim filed by adjacent industrial leaseholder',
    holderName: 'Sureshchandra K. Joshi',
    mobile: '+91 94280 88219',
    aadhaarMasked: '•••• •••• 7710',
    aadhaarStatus: 'Linked & Verified',
    purchaseDate: '22-Nov-2019',
    transactionValue: '₹ 2,90,00,000',
    previousOwner: 'Bhaskar Desai',
    encumbranceStatus: 'Cautionary Notice (Civil Suit 14/2024)',
    taxStatus: 'Disputed / Under Scrutiny',
    khasraNo: '204/A',
    coordinates: [
      [23.2212, 72.6330],
      [23.2240, 72.6342],
      [23.2230, 72.6380],
      [23.2202, 72.6360],
      [23.2212, 72.6330]
    ],
    centroid: [23.2220, 72.6351]
  },
  {
    id: 'GJ-GND-04',
    ulpin: 'MH26DISP000008',
    sector: 'Sector 22',
    locality: 'High-Tension Power & Water Utility Corridor, Sector 22',
    shapeType: 'Perimeter Infrastructure Zone',
    landCategory: 'Utility',
    landUse: 'Utility Infrastructure',
    areaSqM: 5120,
    areaAcres: 1.27,
    status: 'Flagged',
    statusNote: 'Encroachment alert: Satellite NDVI shows 4.2m southern buffer violation into utility easement',
    holderName: 'Vikramaditya Solanki',
    mobile: '+91 98980 65432',
    aadhaarMasked: '•••• •••• 3341',
    aadhaarStatus: 'Linked & Verified',
    purchaseDate: '04-Jul-2022',
    transactionValue: '₹ 3,60,00,000',
    previousOwner: 'Gujarat Agro Industries Corp',
    encumbranceStatus: 'Demarcation Survey Pending',
    taxStatus: 'Overdue (FY 2024-25)',
    khasraNo: '319/P',
    coordinates: [
      [23.2120, 72.6370],
      [23.2135, 72.6360],
      [23.2152, 72.6382],
      [23.2148, 72.6410],
      [23.2125, 72.6402],
      [23.2120, 72.6370]
    ],
    centroid: [23.2136, 72.6385]
  },
  {
    id: 'GJ-GND-05',
    ulpin: 'GJ06GND000105',
    sector: 'Sector 21-A',
    locality: 'Civil Hospital Road, Sector 21-A, Gandhinagar',
    shapeType: 'Compact Rectangular Residential Plot',
    landCategory: 'Residential',
    landUse: 'Residential',
    areaSqM: 1450,
    areaAcres: 0.36,
    status: 'Clear',
    statusNote: 'Verified transfer deed & digital land boundary footprint',
    holderName: 'Snehalata R. Varma',
    mobile: '+91 94081 77210',
    aadhaarMasked: '•••• •••• 5512',
    aadhaarStatus: 'Linked & Verified',
    purchaseDate: '19-Oct-2020',
    transactionValue: '₹ 1,15,00,000',
    previousOwner: 'Hitesh K. Parekh',
    encumbranceStatus: 'Nil (HDFC Mortgage Cleared)',
    taxStatus: 'Paid (FY 2025-26)',
    khasraNo: '95/4',
    coordinates: [
      [23.2170, 72.6285],
      [23.2190, 72.6285],
      [23.2190, 72.6310],
      [23.2170, 72.6310],
      [23.2170, 72.6285]
    ],
    centroid: [23.2180, 72.6297]
  },
  {
    id: 'GJ-GND-06',
    ulpin: 'GJ06GND000106',
    sector: 'Randheja Outskirts',
    locality: 'Kisan Krishi Corridor, Randheja, Gandhinagar Rural',
    shapeType: 'Large Agricultural Boundary Plot',
    landCategory: 'Agricultural',
    landUse: 'Agricultural',
    areaSqM: 12800,
    areaAcres: 3.16,
    status: 'Clear',
    statusNote: 'Ancestral agricultural holding with verified 7/12 khatauni records',
    holderName: 'Govindbhai N. Prajapati & Co-sharers',
    mobile: '+91 99042 18904',
    aadhaarMasked: '•••• •••• 9014',
    aadhaarStatus: 'Linked & Verified',
    purchaseDate: '12-Mar-2015',
    transactionValue: '₹ 6,40,00,000',
    previousOwner: 'Inherited (Ancestral RoR Khata 412)',
    encumbranceStatus: 'Nil (Kisan Credit Card regularized)',
    taxStatus: 'Exempt / Zero Dues',
    khasraNo: '512/1A',
    coordinates: [
      [23.2240, 72.6230],
      [23.2285, 72.6245],
      [23.2275, 72.6295],
      [23.2225, 72.6275],
      [23.2240, 72.6230]
    ],
    centroid: [23.2256, 72.6261]
  },
  {
    id: 'GJ-GND-07',
    ulpin: 'GJ06GND000107',
    sector: 'Infocity Extension',
    locality: 'Software & Clean Energy Industrial Park, Sector 21 Border',
    shapeType: 'L-Shaped Industrial Park Plot',
    landCategory: 'Industrial',
    landUse: 'Industrial',
    areaSqM: 6200,
    areaAcres: 1.53,
    status: 'Clear',
    statusNote: 'GUDA Master Plan 2031 approved industrial layout',
    holderName: 'Aatman Infotech Infrastructure LLP',
    mobile: '+91 98240 66789',
    aadhaarMasked: '•••• •••• 2891',
    aadhaarStatus: 'Linked & Verified',
    purchaseDate: '17-Feb-2024',
    transactionValue: '₹ 8,90,00,000',
    previousOwner: 'GIFT City Sub-Registry Allotment',
    encumbranceStatus: 'Clear (Bank Consortium Lien Registered)',
    taxStatus: 'Paid (FY 2025-26)',
    khasraNo: '620/IT',
    coordinates: [
      [23.2110, 72.6240],
      [23.2142, 72.6240],
      [23.2142, 72.6280],
      [23.2128, 72.6280],
      [23.2128, 72.6260],
      [23.2110, 72.6260],
      [23.2110, 72.6240]
    ],
    centroid: [23.2125, 72.6258]
  },
  {
    id: 'GJ-GND-08',
    ulpin: 'GJ06GND000108',
    sector: 'Sector 22',
    locality: 'Sub-Station Drainage & Utility Buffer, Sector 22',
    shapeType: 'Trapezoidal Utility Substation Plot',
    landCategory: 'Utility',
    landUse: 'Utility Infrastructure',
    areaSqM: 2890,
    areaAcres: 0.71,
    status: 'Flagged',
    statusNote: 'Stamp duty under-valuation audit triggered under Section 47A & drainage easement notice',
    holderName: 'Dhirubhai M. Choksi',
    mobile: '+91 98790 32145',
    aadhaarMasked: '•••• •••• 4423',
    aadhaarStatus: 'Linked & Verified',
    purchaseDate: '29-Sep-2023',
    transactionValue: '₹ 2,45,00,000',
    previousOwner: 'Narottamdas Jewellers Trust',
    encumbranceStatus: 'Under Section 47A Audit & Easement Hold',
    taxStatus: 'Disputed',
    khasraNo: '177/3',
    coordinates: [
      [23.2172, 72.6375],
      [23.2198, 72.6390],
      [23.2188, 72.6420],
      [23.2160, 72.6405],
      [23.2172, 72.6375]
    ],
    centroid: [23.2179, 72.6397]
  },
  {
    id: 'GJ-GND-09',
    ulpin: 'GJ06GND000109',
    sector: 'PDPU Corridor',
    locality: 'Knowledge City Residential Boulevard, Sector 21 Junction',
    shapeType: 'Rectangular Residential Estate',
    landCategory: 'Residential',
    landUse: 'Residential',
    areaSqM: 2500,
    areaAcres: 0.62,
    status: 'Clear',
    statusNote: 'Regularized NA (Non-Agricultural) order in place',
    holderName: 'Dr. Kalpesh Trivedi',
    mobile: '+91 99252 81765',
    aadhaarMasked: '•••• •••• 6108',
    aadhaarStatus: 'Linked & Verified',
    purchaseDate: '05-Jan-2022',
    transactionValue: '₹ 3,10,00,000',
    previousOwner: 'Gujarat Technical Education Society',
    encumbranceStatus: 'Nil Encumbrance',
    taxStatus: 'Paid (FY 2025-26)',
    khasraNo: '301/B',
    coordinates: [
      [23.2145, 72.6430],
      [23.2170, 72.6430],
      [23.2170, 72.6458],
      [23.2145, 72.6458],
      [23.2145, 72.6430]
    ],
    centroid: [23.2157, 72.6444]
  },
  {
    id: 'GJ-GND-10',
    ulpin: 'GJ06GND000110',
    sector: 'Randheja Agri-Belt',
    locality: 'Sabarmati Basin Farming Strip, Sector 21 East Ext',
    shapeType: 'Organic Agricultural Farmland',
    landCategory: 'Agricultural',
    landUse: 'Agricultural',
    areaSqM: 4340,
    areaAcres: 1.07,
    status: 'Clear',
    statusNote: 'Irrigated fertile farmland with certified solar pump subsidy registered',
    holderName: 'Bhanumati R. Vaghela',
    mobile: '+91 98254 99120',
    aadhaarMasked: '•••• •••• 3021',
    aadhaarStatus: 'Linked & Verified',
    purchaseDate: '10-Aug-2018',
    transactionValue: '₹ 1,75,00,000',
    previousOwner: 'Vaghela Family Trust',
    encumbranceStatus: 'Clear Title (Direct Cultivator)',
    taxStatus: 'Exempt',
    khasraNo: '488/2',
    coordinates: [
      [23.2235, 72.6395],
      [23.2260, 72.6405],
      [23.2255, 72.6440],
      [23.2228, 72.6430],
      [23.2235, 72.6395]
    ],
    centroid: [23.2244, 72.6417]
  },
  {
    id: 'GJ-GND-11',
    ulpin: 'GJ06GND000111',
    sector: 'GIDC Sector 22',
    locality: 'GIDC Precision Engineering Wing, Sector 22',
    shapeType: 'Rectangular Industrial Workshop',
    landCategory: 'Industrial',
    landUse: 'Industrial',
    areaSqM: 1950,
    areaAcres: 0.48,
    status: 'Clear',
    statusNote: 'GIDC 99-year industrial lease with verified pollution board clearance',
    holderName: 'Kunal Synthetics & Tools Ltd',
    mobile: '+91 97241 12390',
    aadhaarMasked: '•••• •••• 7824',
    aadhaarStatus: 'Linked & Verified',
    purchaseDate: '11-Nov-2022',
    transactionValue: '₹ 2,10,00,000',
    previousOwner: 'Gujarat Industrial Dev Corp (GIDC)',
    encumbranceStatus: 'Bank of Baroda Working Capital Charge',
    taxStatus: 'Paid (FY 2025-26)',
    khasraNo: '102/GIDC',
    coordinates: [
      [23.2105, 72.6325],
      [23.2125, 72.6325],
      [23.2125, 72.6350],
      [23.2105, 72.6350],
      [23.2105, 72.6325]
    ],
    centroid: [23.2115, 72.6337]
  },
  {
    id: 'GJ-GND-12',
    ulpin: 'GJ06GND000112',
    sector: 'Sector 21 North',
    locality: 'GUVNL Smart Grid Sub-Station & Water Booster',
    shapeType: 'Compact Square Utility Unit',
    landCategory: 'Utility',
    landUse: 'Utility Infrastructure',
    areaSqM: 1000,
    areaAcres: 0.25,
    status: 'Clear',
    statusNote: 'Municipal water distribution booster station & solar feed-in grid node',
    holderName: 'Gandhinagar Municipal Corporation (GMC)',
    mobile: '+91 79 2322 0440',
    aadhaarMasked: '•••• •••• 0012',
    aadhaarStatus: 'Linked & Verified',
    purchaseDate: '01-Apr-2016',
    transactionValue: '₹ 95,00,000',
    previousOwner: 'State Revenue Department',
    encumbranceStatus: 'Government Utility Asset (Inalienable)',
    taxStatus: 'Exempt',
    khasraNo: 'GMC/UTIL-4',
    coordinates: [
      [23.2208, 72.6300],
      [23.2222, 72.6300],
      [23.2222, 72.6320],
      [23.2208, 72.6320],
      [23.2208, 72.6300]
    ],
    centroid: [23.2215, 72.6310]
  }
];

// Initial Pending Ownership Transfer & Record Update Applications for Officer Control Panel
export const INITIAL_MUTATION_QUEUE = [
  {
    id: 'MUT-2026-0811',
    ulpin: 'GJ06GND000101',
    landCategory: 'Residential',
    sellerName: 'Ramesh Patel',
    applicantName: 'Vikram & Ananya Singhania',
    applicantPhone: '+91 98231 09841',
    type: 'Ownership Transfer / Record Update',
    submissionDate: '04-Sep-2026',
    preVerification: 'Sub-Registrar Attested (e-Garvi)',
    status: 'Pending Review',
    saleAmount: '₹ 4,50,00,000',
    reviewNotes: 'Standard Sale Agreement ("Bana Paper") attached and verified with Notary Registration #NOT-GJ-2026-8819. Awaiting final Official Approval & Title Transfer.',
    aiRiskLevel: 'LOW',
    aiRiskScore: '9.4%',
    aiRiskFactors: ['Verified Land Detail Record (7/12 RoR)', 'Zero Property Claims & Liabilities (CERSAI Clear)', 'e-Stamp Duty Reconciled'],
    mismatchAlerts: null,
    hasEncroachment: false,
    notaryRegNo: 'NOT-GJ-2026-8819',
    notaryName: 'Adv. Harishchandra Dave, Notary Public (Govt. of India)',
    executionDate: '03-Sep-2026',
    stampChallan: 'E-STAMP-GJ-2026-9812-C',
    agreementDocument: {
      fileName: 'Standard_Sale_Agreement_GJ06GND000101_Executed.pdf',
      fileSize: '2.8 MB',
      uploadedAt: '04-Sep-2026 11:20 AM',
      banaPaperTemplate: 'Standard Sale Agreement ("Bana Paper" Form 33-A)',
      notaryRegistrationNo: 'NOT-GJ-2026-8819',
      notaryName: 'Adv. Harishchandra Dave, Notary Public (Govt. of India)',
      notaryExecutionDate: '03-Sep-2026',
      notaryChamber: 'Chamber 14, District & Sessions Court, Gandhinagar',
      notarySealVerified: true,
      sellerName: 'Ramesh Patel',
      buyerName: 'Vikram & Ananya Singhania',
      stampDutyChallan: 'E-STAMP-GJ-2026-9812-C',
      stampDutyAmount: '₹ 22,50,000',
      saleAmount: '₹ 4,50,00,000'
    },
    trackingSteps: [
      { step: 1, name: 'Submitted', status: 'completed', date: '04-Sep-2026 09:30 AM', note: 'Ownership transfer request lodged by applicant online' },
      { step: 2, name: 'Agreement Uploaded', status: 'completed', date: '04-Sep-2026 11:20 AM', note: 'Executed Standard Sale Agreement ("Bana Paper") uploaded with ID proofs' },
      { step: 3, name: 'Notary Review', status: 'completed', date: '04-Sep-2026 02:45 PM', note: 'Notary registration #NOT-GJ-2026-8819 and advocate seal verified' },
      { step: 4, name: 'Official Approval', status: 'current', date: 'In Progress', note: 'Awaiting Revenue Officer final review and digital signature' },
      { step: 5, name: 'Title Transferred', status: 'pending', date: 'Pending Step 4', note: 'Official 7/12 Land Detail Record update & digital deed issue' }
    ]
  },
  {
    id: 'MUT-2026-0814',
    ulpin: 'MH26DISP000008',
    landCategory: 'Utility',
    sellerName: 'Gujarat Energy Transmission Corp',
    applicantName: 'Vikramaditya Solanki',
    applicantPhone: '+91 98980 65432',
    type: 'Ownership Transfer / Record Update',
    submissionDate: '05-Sep-2026',
    preVerification: 'Disputed Boundary (NDVI Alert)',
    status: 'Under Scrutiny',
    saleAmount: '₹ 3,60,00,000',
    reviewNotes: 'Satellite Sentinel-2 temporal scan flagged 2.4m southern deviation onto municipal public green reserve.',
    aiRiskLevel: 'HIGH',
    aiRiskScore: '94.2%',
    aiRiskFactors: [
      'Active Encroachment onto Public Reserve',
      'Overdue Property Tax (FY 2024-25)',
      'High-Tension Buffer Zone Variance: 2.4m'
    ],
    mismatchAlerts: 'Spatial Variance: 142 sq. m overlap into Municipal Green Buffer',
    hasEncroachment: true,
    encroachmentDetails: {
      historicalYear: 2022,
      currentYear: 2026,
      boundaryDeviation: 'Boundary Shift Detected: 2.4m onto Public Reserve',
      deviationAreaSqM: 142,
      aiConfidence: '94.2% AI Confidence Score',
      zoneType: 'High-Tension Power & Public Drainage Corridor',
      sensorSource: 'ISRO Cartosat-3 (0.28m) & Sentinel-2 Orthomosaic Stream',
      surveyorRecommended: 'Demarcation Rover Unit 04',
      coordinates: [23.2136, 72.6385]
    },
    notaryRegNo: 'NOT-GJ-2026-4402',
    notaryName: 'Adv. Manan Vyas, Notary Public',
    executionDate: '04-Sep-2026',
    stampChallan: 'E-STAMP-GJ-2026-7731-U',
    agreementDocument: {
      fileName: 'Standard_Sale_Agreement_MH26DISP000008.pdf',
      fileSize: '3.1 MB',
      uploadedAt: '05-Sep-2026 10:15 AM',
      banaPaperTemplate: 'Standard Sale Agreement ("Bana Paper" Form 33-A)',
      notaryRegistrationNo: 'NOT-GJ-2026-4402',
      notaryName: 'Adv. Manan Vyas, Notary Public',
      notaryExecutionDate: '04-Sep-2026',
      notaryChamber: 'High Court Notary Registry, Ahmedabad',
      notarySealVerified: true,
      sellerName: 'Gujarat Energy Transmission Corp',
      buyerName: 'Vikramaditya Solanki',
      stampDutyChallan: 'E-STAMP-GJ-2026-7731-U',
      stampDutyAmount: '₹ 18,00,000',
      saleAmount: '₹ 3,60,00,000'
    },
    trackingSteps: [
      { step: 1, name: 'Submitted', status: 'completed', date: '05-Sep-2026 09:00 AM', note: 'Transfer request submitted online' },
      { step: 2, name: 'Agreement Uploaded', status: 'completed', date: '05-Sep-2026 10:15 AM', note: 'Standard Sale Agreement uploaded' },
      { step: 3, name: 'Notary Review', status: 'completed', date: '05-Sep-2026 01:20 PM', note: 'Notary details validated' },
      { step: 4, name: 'Official Approval', status: 'current', date: 'Under Scrutiny', note: 'Held pending boundary survey reconciliation' },
      { step: 5, name: 'Title Transferred', status: 'pending', date: 'Pending Step 4', note: 'Awaiting resolution' }
    ]
  },
  {
    id: 'MUT-2026-0819',
    ulpin: 'GJ06GND000105',
    landCategory: 'Residential',
    sellerName: 'Kirit Somaiya',
    applicantName: 'Sunil & Ritu Parmar',
    applicantPhone: '+91 99099 33211',
    type: 'Ownership Transfer / Record Update',
    submissionDate: '07-Sep-2026',
    preVerification: 'e-Stamp Cleared',
    status: 'Pending Review',
    saleAmount: '₹ 1,28,00,000',
    reviewNotes: 'e-Stamp Duty cleared. Bank mortgage NOC confirmed by HDFC API. Notary seal verified.',
    aiRiskLevel: 'LOW',
    aiRiskScore: '12.1%',
    aiRiskFactors: ['Verified Land Detail Record (7/12 RoR)', 'HDFC Mortgage Release NOC', 'Tax Paid FY 2025-26'],
    mismatchAlerts: null,
    hasEncroachment: false,
    notaryRegNo: 'NOT-GJ-2026-5120',
    notaryName: 'Adv. S. K. Pathak, Notary Public',
    executionDate: '06-Sep-2026',
    stampChallan: 'E-STAMP-GJ-2026-5512-R',
    agreementDocument: {
      fileName: 'Standard_Sale_Agreement_GJ06GND000105.pdf',
      fileSize: '2.1 MB',
      uploadedAt: '07-Sep-2026 09:40 AM',
      banaPaperTemplate: 'Standard Sale Agreement ("Bana Paper" Form 33-A)',
      notaryRegistrationNo: 'NOT-GJ-2026-5120',
      notaryName: 'Adv. S. K. Pathak, Notary Public',
      notaryExecutionDate: '06-Sep-2026',
      notaryChamber: 'Civil Court, Sector 11, Gandhinagar',
      notarySealVerified: true,
      sellerName: 'Kirit Somaiya',
      buyerName: 'Sunil & Ritu Parmar',
      stampDutyChallan: 'E-STAMP-GJ-2026-5512-R',
      stampDutyAmount: '₹ 6,40,000',
      saleAmount: '₹ 1,28,00,000'
    },
    trackingSteps: [
      { step: 1, name: 'Submitted', status: 'completed', date: '07-Sep-2026 08:30 AM', note: 'Request lodged' },
      { step: 2, name: 'Agreement Uploaded', status: 'completed', date: '07-Sep-2026 09:40 AM', note: 'Standard Sale Agreement attached' },
      { step: 3, name: 'Notary Review', status: 'completed', date: '07-Sep-2026 11:15 AM', note: 'Notary seal verified' },
      { step: 4, name: 'Official Approval', status: 'current', date: 'In Progress', note: 'Ready for Tehsildar sign-off' },
      { step: 5, name: 'Title Transferred', status: 'pending', date: 'Pending Step 4', note: 'Title conveyance' }
    ]
  },
  {
    id: 'MUT-2026-0822',
    ulpin: 'GJ06GND000107',
    landCategory: 'Industrial',
    sellerName: 'Gujarat Industrial Dev Corp',
    applicantName: 'CloudCore Technologies Pvt Ltd',
    applicantPhone: '+91 97250 88900',
    type: 'Ownership Transfer / Record Update',
    submissionDate: '08-Sep-2026',
    preVerification: 'FAR Zoning Variance',
    status: 'Under Scrutiny',
    saleAmount: '₹ 9,20,00,000',
    reviewNotes: 'GUDA High-rise zoning verification flagged 12m height variance vs Master Plan 2031.',
    aiRiskLevel: 'MEDIUM',
    aiRiskScore: '68.5%',
    aiRiskFactors: ['Pending Master Plan 2031 FAR Validation', 'Unsettled Urban Cess ₹ 4.2L'],
    mismatchAlerts: 'FAR Mismatch: Proposed 2.8 vs Zoned Max 2.2',
    hasEncroachment: false,
    notaryRegNo: 'NOT-GJ-2026-1029',
    notaryName: 'Adv. J. N. Bhatt, Notary Public',
    executionDate: '07-Sep-2026',
    stampChallan: 'E-STAMP-GJ-2026-9921-I',
    agreementDocument: {
      fileName: 'Standard_Sale_Agreement_GJ06GND000107.pdf',
      fileSize: '4.2 MB',
      uploadedAt: '08-Sep-2026 08:30 AM',
      banaPaperTemplate: 'Standard Sale Agreement ("Bana Paper" Form 33-A)',
      notaryRegistrationNo: 'NOT-GJ-2026-1029',
      notaryName: 'Adv. J. N. Bhatt, Notary Public',
      notaryExecutionDate: '07-Sep-2026',
      notaryChamber: 'Infocity Corporate Chamber, Gandhinagar',
      notarySealVerified: true,
      sellerName: 'Gujarat Industrial Dev Corp',
      buyerName: 'CloudCore Technologies Pvt Ltd',
      stampDutyChallan: 'E-STAMP-GJ-2026-9921-I',
      stampDutyAmount: '₹ 46,00,000',
      saleAmount: '₹ 9,20,00,000'
    },
    trackingSteps: [
      { step: 1, name: 'Submitted', status: 'completed', date: '08-Sep-2026 08:00 AM', note: 'Request lodged' },
      { step: 2, name: 'Agreement Uploaded', status: 'completed', date: '08-Sep-2026 08:30 AM', note: 'Agreement & Board Resolution attached' },
      { step: 3, name: 'Notary Review', status: 'completed', date: '08-Sep-2026 10:45 AM', note: 'Notary verified' },
      { step: 4, name: 'Official Approval', status: 'current', date: 'Under Scrutiny', note: 'Awaiting Town Planning clearance' },
      { step: 5, name: 'Title Transferred', status: 'pending', date: 'Pending Step 4', note: 'Pending' }
    ]
  },
  {
    id: 'MUT-2026-0825',
    ulpin: 'MH26EAS0900003',
    landCategory: 'Industrial',
    sellerName: 'Bhaskar Desai',
    applicantName: 'Sureshchandra K. Joshi',
    applicantPhone: '+91 94280 88219',
    type: 'Ownership Transfer / Record Update',
    submissionDate: '09-Sep-2026',
    preVerification: 'Active Civil Suit 14/2024',
    status: 'Pending Review',
    saleAmount: '₹ 2,90,00,000',
    reviewNotes: 'Cautionary notice entered onto Land Detail Record following civil suit 14/2024 filed by adjacent tenant.',
    aiRiskLevel: 'HIGH',
    aiRiskScore: '91.8%',
    aiRiskFactors: ['Disputed Ownership Claim (Civil Suit 14/2024)', 'Cautionary Injunction Notice', 'Co-sharer Objection'],
    mismatchAlerts: 'Ownership Mismatch: Contested title between Bhaskar Desai & S. K. Joshi',
    hasEncroachment: true,
    encroachmentDetails: {
      historicalYear: 2022,
      currentYear: 2026,
      boundaryDeviation: 'Boundary Shift Detected: 1.8m into Neighboring Land Parcel #204/B',
      deviationAreaSqM: 88,
      aiConfidence: '91.8% AI Confidence Score',
      zoneType: 'Industrial Plot Demarcation',
      sensorSource: 'ISRO High-Res Temporal Land Boundary Map',
      surveyorRecommended: 'Kalol Tehsil Demarcation Team',
      coordinates: [23.2220, 72.6351]
    },
    notaryRegNo: 'NOT-GJ-2026-9041',
    notaryName: 'Adv. M. C. Mehta, Notary Public',
    executionDate: '08-Sep-2026',
    stampChallan: 'E-STAMP-GJ-2026-3390-D',
    agreementDocument: {
      fileName: 'Standard_Sale_Agreement_MH26EAS0900003.pdf',
      fileSize: '2.5 MB',
      uploadedAt: '09-Sep-2026 09:15 AM',
      banaPaperTemplate: 'Standard Sale Agreement ("Bana Paper" Form 33-A)',
      notaryRegistrationNo: 'NOT-GJ-2026-9041',
      notaryName: 'Adv. M. C. Mehta, Notary Public',
      notaryExecutionDate: '08-Sep-2026',
      notaryChamber: 'District Court, Sector 11, Gandhinagar',
      notarySealVerified: true,
      sellerName: 'Bhaskar Desai',
      buyerName: 'Sureshchandra K. Joshi',
      stampDutyChallan: 'E-STAMP-GJ-2026-3390-D',
      stampDutyAmount: '₹ 14,50,000',
      saleAmount: '₹ 2,90,00,000'
    },
    trackingSteps: [
      { step: 1, name: 'Submitted', status: 'completed', date: '09-Sep-2026 08:45 AM', note: 'Request lodged' },
      { step: 2, name: 'Agreement Uploaded', status: 'completed', date: '09-Sep-2026 09:15 AM', note: 'Agreement uploaded' },
      { step: 3, name: 'Notary Review', status: 'completed', date: '09-Sep-2026 10:30 AM', note: 'Notary details logged' },
      { step: 4, name: 'Official Approval', status: 'current', date: 'Flagged', note: 'Flagged for civil suit caveat clearance' },
      { step: 5, name: 'Title Transferred', status: 'pending', date: 'Pending Step 4', note: 'Pending' }
    ]
  },
  {
    id: 'MUT-2026-0828',
    ulpin: 'GJ06GND000110',
    landCategory: 'Agricultural',
    sellerName: 'Govindbhai Patel',
    applicantName: 'Bhanumati R. Vaghela',
    applicantPhone: '+91 98254 99120',
    type: 'Ownership Transfer / Record Update',
    submissionDate: '09-Sep-2026',
    preVerification: 'Non-Agricultural (NA) Query',
    status: 'Pending Review',
    saleAmount: '₹ 1,75,00,000',
    reviewNotes: 'Commercial warehouse activity detected via satellite NDVI on land designated as Agricultural in Land Detail Record.',
    aiRiskLevel: 'HIGH',
    aiRiskScore: '87.4%',
    aiRiskFactors: ['Commercial Activity Detected on Agricultural Zone', 'Unapproved Warehouse Footprint', 'Missing NA Sanction'],
    mismatchAlerts: 'Zoning Mismatch: Revenue Record is Agricultural (Krishi), Satellite confirms Commercial Warehouse',
    hasEncroachment: true,
    encroachmentDetails: {
      historicalYear: 2022,
      currentYear: 2026,
      boundaryDeviation: 'Unauthorized Commercial Footprint Detected (340 sq. m on Agri Zone)',
      deviationAreaSqM: 340,
      aiConfidence: '87.4% AI Confidence Score',
      zoneType: 'Agricultural Prime Soil (Section 65 Violation)',
      sensorSource: 'Sentinel-2 Multi-Spectral NDVI Vegetation-Loss Stream',
      surveyorRecommended: 'Gandhinagar Rural Revenue Inspection Team',
      coordinates: [23.2244, 72.6417]
    },
    notaryRegNo: 'NOT-GJ-2026-3810',
    notaryName: 'Adv. R. K. Zala, Notary Public',
    executionDate: '08-Sep-2026',
    stampChallan: 'E-STAMP-GJ-2026-8810-A',
    agreementDocument: {
      fileName: 'Standard_Sale_Agreement_GJ06GND000110.pdf',
      fileSize: '3.0 MB',
      uploadedAt: '09-Sep-2026 10:00 AM',
      banaPaperTemplate: 'Standard Sale Agreement ("Bana Paper" Form 33-A)',
      notaryRegistrationNo: 'NOT-GJ-2026-3810',
      notaryName: 'Adv. R. K. Zala, Notary Public',
      notaryExecutionDate: '08-Sep-2026',
      notaryChamber: 'Taluka Seva Sadan, Mansa / Gandhinagar',
      notarySealVerified: true,
      sellerName: 'Govindbhai Patel',
      buyerName: 'Bhanumati R. Vaghela',
      stampDutyChallan: 'E-STAMP-GJ-2026-8810-A',
      stampDutyAmount: '₹ 8,75,000',
      saleAmount: '₹ 1,75,00,000'
    },
    trackingSteps: [
      { step: 1, name: 'Submitted', status: 'completed', date: '09-Sep-2026 09:30 AM', note: 'Farmland transfer lodged' },
      { step: 2, name: 'Agreement Uploaded', status: 'completed', date: '09-Sep-2026 10:00 AM', note: 'Standard Sale Agreement uploaded' },
      { step: 3, name: 'Notary Review', status: 'completed', date: '09-Sep-2026 11:30 AM', note: 'Notary stamp logged' },
      { step: 4, name: 'Official Approval', status: 'current', date: 'In Progress', note: 'Query raised regarding NA permission' },
      { step: 5, name: 'Title Transferred', status: 'pending', date: 'Pending Step 4', note: 'Pending' }
    ]
  }
];

// AI Encroachment Incidents for AI Intelligence Hub
export const AI_ENCROACHMENT_INCIDENTS = [
  {
    id: 'ENC-2026-001',
    ulpin: 'MH26DISP000008',
    sector: 'Sector 22',
    locality: 'High-Tension Power & Water Utility Corridor',
    landCategory: 'Utility',
    holderName: 'Vikramaditya Solanki',
    deviationText: 'Boundary Shift Detected: 2.4m onto Public Reserve',
    deviationAreaSqM: 142,
    confidence: '94.2%',
    severity: 'CRITICAL',
    status: 'Notice Pending',
    detectionDate: '08-Sep-2026',
    summary: 'Temporal satellite delta shows new concrete boundary wall extended 2.4m past statutory line into public green corridor.'
  },
  {
    id: 'ENC-2026-002',
    ulpin: 'GJ06GND000110',
    sector: 'Randheja Agri-Belt',
    locality: 'Sabarmati Basin Farming Strip, Sector 21 East Ext',
    landCategory: 'Agricultural',
    holderName: 'Bhanumati R. Vaghela',
    deviationText: 'Unauthorized Commercial Construction on Agri Land (340 sq. m)',
    deviationAreaSqM: 340,
    confidence: '87.4%',
    severity: 'HIGH',
    status: 'Notice Pending',
    detectionDate: '07-Sep-2026',
    summary: 'NDVI vegetation loss confirmed. Pre-engineered steel warehouse erected without NA (Non-Agricultural) clearance under Section 65.'
  },
  {
    id: 'ENC-2026-003',
    ulpin: 'MH26EAS0900003',
    sector: 'Sector 21',
    locality: 'Electronic Manufacturing Estate, Sector 21',
    landCategory: 'Industrial',
    holderName: 'Sureshchandra K. Joshi',
    deviationText: 'Boundary Shift Detected: 1.8m into Neighboring Cadastre',
    deviationAreaSqM: 88,
    confidence: '91.8%',
    severity: 'MEDIUM',
    status: 'Under Review',
    detectionDate: '06-Sep-2026',
    summary: 'Perimeter fence shifted eastward overlapping survey coordinate boundary with GIDC precision engineering facility.'
  }
];

// Interoperability API Status Panel (5 Gateways)
export const INTEROPERABILITY_APIS = [
  {
    id: 'ror',
    name: 'State Revenue System (AnyRoR / 7-12)',
    endpoint: 'api.gujarat.gov.in/revenue/ror/v2',
    status: 'Online',
    latency: '34ms',
    uptime: '99.98%',
    protocol: 'REST / e-Pramaan'
  },
  {
    id: 'sro',
    name: 'Sub-Registrar Office (e-Garvi / Deed)',
    endpoint: 'api.igarvi.gujarat.gov.in/conveyance/sync',
    status: 'Synchronized',
    latency: '48ms',
    uptime: '100%',
    protocol: 'SOAP / Webhook'
  },
  {
    id: 'cersai',
    name: 'Bank Claims & Liabilities Registry (CERSAI / RBI)',
    endpoint: 'gateway.cersai.org.in/mortgage/v3',
    status: 'Connected',
    latency: '56ms',
    uptime: '99.95%',
    protocol: 'ISO 20022 / mTLS'
  },
  {
    id: 'tax',
    name: 'Municipal Tax Registry (GMC Property Tax)',
    endpoint: 'taxportal.gmc.gujarat.gov.in/ledger/live',
    status: 'Active Ledger',
    latency: '29ms',
    uptime: '100%',
    protocol: 'GraphQL API'
  },
  {
    id: 'utility',
    name: 'Utility Infrastructure Grid (GUVNL & Water)',
    endpoint: 'grid.guvnl.com/boundary/easement/v1',
    status: 'Real-time Telemetry',
    latency: '41ms',
    uptime: '99.99%',
    protocol: 'MQTT / GIS WebService'
  }
];

// Initial Immutable Audit Trail Records
export const INITIAL_AUDIT_LOGS = [
  {
    id: 'LOG-89101',
    blockHeight: 184920,
    timestamp: '09-Sep-2026 15:42:10 IST',
    officerName: 'Rajesh Kumar',
    officerRole: 'Tehsildar / Revenue Officer',
    officerBadge: '#8821',
    action: 'OWNERSHIP_TRANSFER_APPROVED',
    ulpin: 'GJ06GND000105',
    details: 'Sanctioned 7/12 Land Detail Record conveyance deed for Sunil & Ritu Parmar after DigiLocker biometric eKYC.',
    verificationHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'LOG-89100',
    blockHeight: 184919,
    timestamp: '09-Sep-2026 14:15:22 IST',
    officerName: 'Priya Sharma',
    officerRole: 'Town Planning & Municipal Officer',
    officerBadge: '#4402',
    action: 'ZONING_VERIFIED',
    ulpin: 'GJ06GND000107',
    details: 'Master Plan 2031 Industrial FAR clearance verified with GUDA GIS raster overlay.',
    verificationHash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4'
  },
  {
    id: 'LOG-89099',
    blockHeight: 184918,
    timestamp: '09-Sep-2026 11:30:05 IST',
    officerName: 'Rajesh Kumar',
    officerRole: 'Tehsildar / Revenue Officer',
    officerBadge: '#8821',
    action: 'DISPUTE_FLAGGED',
    ulpin: 'MH26EAS0900003',
    details: 'Cautionary notice entered onto Land Detail Record following civil suit 14/2024 filing.',
    verificationHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
  },
  {
    id: 'LOG-89098',
    blockHeight: 184917,
    timestamp: '08-Sep-2026 17:02:44 IST',
    officerName: 'Aman Verma',
    officerRole: 'District Collector & Magistrate',
    officerBadge: '#1001',
    action: 'POLICY_AUDIT',
    ulpin: 'MH26DISP000008',
    details: 'Ordered Joint Demarcation Survey with GMC Executive Engineer regarding southern utility corridor buffer.',
    verificationHash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a'
  },
  {
    id: 'LOG-89097',
    blockHeight: 184916,
    timestamp: '08-Sep-2026 09:24:19 IST',
    officerName: 'IT Operations Desk',
    officerRole: 'System Administrator',
    officerBadge: '#0099',
    action: 'API_GATEWAY_RESYNC',
    ulpin: 'GLOBAL-DPI',
    details: 'Periodic cryptographic key rotation & CERSAI / GMC GraphQL ledger synchronization completed.',
    verificationHash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d'
  }
];

// Open Basemap Configurations (Default Open Tile Servers)
export const BASEMAP_OPTIONS = [
  {
    id: 'street',
    name: 'Street / Vector View',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  },
  {
    id: 'satellite',
    name: 'Satellite View (ArcGIS)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18
  },
  {
    id: 'positron',
    name: 'Clean Positron View',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19
  }
];

// Standard RFC 7946 GeoJSON FeatureCollection for Gandhinagar Land Parcels
export const GANDHINAGAR_PARCELS_GEOJSON = {
  type: 'FeatureCollection',
  name: 'Gandhinagar_Land_Parcels_Sector21_22',
  crs: {
    type: 'name',
    properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' }
  },
  features: INITIAL_PARCELS.map((p) => ({
    type: 'Feature',
    id: p.id,
    properties: {
      ulpin: p.ulpin,
      holderName: p.holderName,
      landCategory: p.landCategory,
      landUse: p.landUse,
      areaSqM: p.areaSqM,
      areaAcres: p.areaAcres,
      khasraNo: p.khasraNo,
      sector: p.sector,
      status: p.status,
      statusNote: p.statusNote,
      mobile: p.mobile,
      aadhaarMasked: p.aadhaarMasked,
      aadhaarStatus: p.aadhaarStatus,
      transactionValue: p.transactionValue,
      purchaseDate: p.purchaseDate,
      taxStatus: p.taxStatus,
      encumbranceStatus: p.encumbranceStatus,
      isSharedOwnership: p.isSharedOwnership || false,
      ownershipType: p.ownershipType || 'Individual',
      coOwners: p.coOwners || null,
      jointConsentStatus: p.jointConsentStatus || null
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        // GeoJSON uses [longitude, latitude] ordering
        p.coordinates.map((c) => [c[1], c[0]])
      ]
    }
  }))
};

