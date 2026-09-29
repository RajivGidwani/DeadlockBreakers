// Mock Database for Land Stack - Integrated GIS-Based Digital Land Governance System

export const ROLES = {
  TEHSILDAR: {
    id: 'tehsildar',
    title: 'Tehsildar / Revenue Officer',
    badge: 'Executive Magistrate',
    icon: 'ShieldCheck',
    avatar: '👨‍💼',
    name: 'Rajeshwar Sharma, IAS (Sub-Divisional Magistrate)',
    office: 'Tehsil Headquarters, North Division - Central Land Registry',
    allowedModules: ['mutation', 'encroachment', 'analytics', 'audit'],
    tagline: 'Quasi-Judicial Land Record Update, Title Dispute Resolution & Demarcation Authority',
    color: 'emerald'
  },
  TOWN_PLANNER: {
    id: 'town_planner',
    title: 'Town Planning & Municipal Officer',
    badge: 'Zoning & Master Plan Authority',
    icon: 'Building2',
    avatar: '🏗️',
    name: 'Ar. Sunita Deshmukh, FIIA',
    office: 'Directorate of Urban Local Bodies & Development Authority',
    allowedModules: ['encroachment', 'mutation', 'analytics', 'audit'],
    tagline: 'Master Plan 2031 Enforcement, FAR/FSI Validation & Building NOC',
    color: 'indigo'
  },
  DISTRICT_COLLECTOR: {
    id: 'district_collector',
    title: 'Executive District Collector',
    badge: 'District Magistrate & Land Revenue Chief',
    icon: 'BarChart3',
    avatar: '📊',
    name: 'Dr. Anand V. Kulkarni, IAS',
    office: 'Office of the District Collector & District Magistrate',
    allowedModules: ['analytics', 'encroachment', 'mutation', 'interoperability', 'audit'],
    tagline: 'High-Level Governance Analytics, Fiscal Revenue, & District GIS Heatmaps',
    color: 'amber'
  },
  SYS_ADMIN: {
    id: 'sys_admin',
    title: 'System Administrator (GovTech / NIC)',
    badge: 'DPI Infrastructure Architect',
    icon: 'Cpu',
    avatar: '⚙️',
    name: 'Vikramaditya Rathore, Sr. Technical Director',
    office: 'National Informatics Centre (NIC) & DPI Cloud Gateway Command',
    allowedModules: ['interoperability', 'audit', 'analytics', 'mutation', 'encroachment'],
    tagline: 'Interoperability Gateway, CERSAI/RoR API Health & Cryptographic Audit Ledger',
    color: 'purple'
  }
};

export const INITIAL_APPLICATIONS = [
  {
    id: 'APP-2026-MUT-8841',
    category: 'Ownership Transfer Requests',
    type: 'Sale Deed Transfer (Registered Conveyance)',
    applicantName: 'Vikramaditya Singhania & Ananya Singhania',
    applicantAadhaarMasked: 'XXXX-XXXX-4912',
    applicantPhone: '+91 98231 09841',
    applicantAddress: 'B-402, Royal Orchids, Sector 14, Gandhinagar',
    coSharersCount: 2,
    applicationDate: '2026-09-02',
    priority: 'HIGH',
    status: 'Pending Verification',
    landDetails: {
      ulpin: 'IN-GJ-04-7821094382',
      khasraNumber: '142/2A',
      khatauniNumber: 'KH-8812',
      state: 'Gujarat',
      district: 'Gandhinagar',
      tehsil: 'Kalol',
      village: 'Shertha',
      zone: 'Sub-Urban Mixed Residential R2',
      areaHectares: 0.84,
      areaLocalUnit: '3.32 Bigha (Pucca)',
      marketValueInr: '₹ 1,84,50,000',
      stampDutyPaid: '₹ 9,22,500 (e-Challan #GR-9921)',
      deedRegistrationNo: 'SUB-REG-KALOL-2026-88194',
      dateOfRegistration: '2026-08-28'
    },
    preVerificationChecks: {
      rorAuthenticity: { passed: true, message: 'Cryptographically signed 7/12 RoR verified against State Revenue Node' },
      encumbranceStatus: { passed: true, message: 'Nil encumbrance 30-year search certificate valid' },
      bankLoanLock: { passed: true, message: 'No active CERSAI / Banking mortgage lien detected' },
      zoningCompliance: { passed: true, message: 'Residential R2 compliant with Master Plan 2031' }
    },
    documents: [
      { name: 'Registered Sale Deed (Conveyance)', fileType: 'pdf', verified: true, size: '3.8 MB', date: '2026-08-28' },
      { name: 'Latest RoR Extract (7/12 & 8-A)', fileType: 'pdf', verified: true, size: '1.2 MB', date: '2026-08-30' },
      { name: 'Aadhaar e-KYC Verification Certificate', fileType: 'pdf', verified: true, size: '850 KB', date: '2026-09-01' },
      { name: 'Land Boundary Map (Naksha) with GPS Bounds', fileType: 'image', verified: true, size: '4.5 MB', date: '2026-09-02' }
    ],
    timeline: [
      { step: 'e-Registration Completed at Sub-Registrar', timestamp: '2026-08-28 11:42 AM', user: 'Sub-Registrar Kalol' },
      { step: 'Application Auto-Ingested via Land Stack API', timestamp: '2026-08-28 11:45 AM', user: 'System Gateway' },
      { step: 'Automated 4-Tier Pre-Verification Cleared', timestamp: '2026-08-29 09:15 AM', user: 'AI Compliance Engine' }
    ]
  },
  {
    id: 'APP-2026-MUT-8842',
    category: 'Ownership Transfer Requests',
    type: 'Succession & Inheritance (Virasat / Fauti Intiqal)',
    applicantName: 'Harpreet Kaur Dhillon & Gurmeet Dhillon',
    applicantAadhaarMasked: 'XXXX-XXXX-7110',
    applicantPhone: '+91 98140 33219',
    applicantAddress: 'Village Majri, Sub-Tehsil Kharar, Mohali',
    coSharersCount: 4,
    applicationDate: '2026-09-03',
    priority: 'MEDIUM',
    status: 'Flagged for Dispute Review',
    landDetails: {
      ulpin: 'IN-PB-12-3901928374',
      khasraNumber: '89//14/2, 15/1',
      khatauniNumber: 'KH-402',
      state: 'Punjab',
      district: 'SAS Nagar (Mohali)',
      tehsil: 'Kharar',
      village: 'Majri',
      zone: 'Prime Agricultural Zone A1',
      areaHectares: 2.45,
      areaLocalUnit: '19.6 Kanal (245 Marla)',
      marketValueInr: '₹ 3,20,00,000',
      stampDutyPaid: 'Exempt (Agricultural Succession)',
      deedRegistrationNo: 'WILL-REGISTERED-2018-0912',
      dateOfRegistration: '2018-04-12'
    },
    preVerificationChecks: {
      rorAuthenticity: { passed: true, message: 'Jamabandi extract matched with PLRS central database' },
      encumbranceStatus: { passed: false, message: 'Objection petition filed by 3rd co-heir (Kuldeep Dhillon)' },
      bankLoanLock: { passed: true, message: 'Cooperative Bank KCC Loan cleared via No-Due Certificate' },
      zoningCompliance: { passed: true, message: 'Agricultural zoning intact' }
    },
    documents: [
      { name: 'Registered Will & Death Certificate', fileType: 'pdf', verified: true, size: '2.1 MB', date: '2026-09-01' },
      { name: 'Legal Heir Certificate (Tehsildar Certified)', fileType: 'pdf', verified: true, size: '920 KB', date: '2026-09-02' },
      { name: 'Third Party Objection Notice filed #OBJ-882', fileType: 'pdf', verified: false, size: '1.4 MB', date: '2026-09-04' }
    ],
    timeline: [
      { step: 'Succession Petition Received', timestamp: '2026-09-03 10:20 AM', user: 'Patwari Halqa Majri' },
      { step: 'Public Notice 30-Day Objection Window', timestamp: '2026-09-03 02:00 PM', user: 'System Automated Notice' },
      { step: 'Objection Lodged by Co-Heir', timestamp: '2026-09-04 11:30 AM', user: 'Revenue Court Portal' }
    ]
  },
  {
    id: 'APP-2026-SUR-5012',
    category: 'Boundary Surveys',
    type: 'Land Boundary Demarcation & Partition (Batwara)',
    applicantName: 'Muralidhar Ramachandran',
    applicantAadhaarMasked: 'XXXX-XXXX-9938',
    applicantPhone: '+91 94440 88219',
    applicantAddress: 'Plot 12, Anna Nagar West, Madurai',
    coSharersCount: 1,
    applicationDate: '2026-09-04',
    priority: 'HIGH',
    status: 'Pending Verification',
    landDetails: {
      ulpin: 'IN-TN-18-4902194821',
      khasraNumber: 'Survey 214/3B',
      khatauniNumber: 'Patta #5591',
      state: 'Tamil Nadu',
      district: 'Madurai',
      tehsil: 'Madurai North',
      village: 'Samayanallur',
      zone: 'Industrial Logistics Corridor',
      areaHectares: 1.15,
      areaLocalUnit: '2.84 Acres (114 Cent)',
      marketValueInr: '₹ 4,10,00,000',
      stampDutyPaid: 'Survey Fee ₹ 12,000 (e-Treasury TN)',
      deedRegistrationNo: 'DEMARC-REQ-2026-0914',
      dateOfRegistration: '2026-09-04'
    },
    preVerificationChecks: {
      rorAuthenticity: { passed: true, message: 'Tamil Nilam e-Patta and Chitta verified' },
      encumbranceStatus: { passed: true, message: 'No registered adverse claims' },
      bankLoanLock: { passed: true, message: 'Mortgage free parcel' },
      zoningCompliance: { passed: true, message: 'Compatible with National Highway Expansion Corridor' }
    },
    documents: [
      { name: 'Patta Passbook Extract', fileType: 'pdf', verified: true, size: '1.7 MB', date: '2026-09-04' },
      { name: 'FMB (Field Measurement Book) Sketch', fileType: 'image', verified: true, size: '5.2 MB', date: '2026-09-04' },
      { name: 'Neighbor Boundary NOC Affidavits', fileType: 'pdf', verified: true, size: '3.1 MB', date: '2026-09-04' }
    ],
    timeline: [
      { step: 'Survey Fee Paid & Application Logged', timestamp: '2026-09-04 09:00 AM', user: 'Citizen Citizen Portal' },
      { step: 'DGPS Survey Rover Scheduled', timestamp: '2026-09-04 03:30 PM', user: 'Taluk Surveyor Desk' }
    ]
  },
  {
    id: 'APP-2026-BLD-3391',
    category: 'Building Permits',
    type: 'Commercial High-Rise Development NOC & FAR Sanction',
    applicantName: 'Apex Urban Infra LLP (Director: Sameer Mittal)',
    applicantAadhaarMasked: 'XXXX-XXXX-6014',
    applicantPhone: '+91 98200 44921',
    applicantAddress: '18th Floor, Pinnacle Tower, Whitefield, Bengaluru',
    coSharersCount: 0,
    applicationDate: '2026-09-01',
    priority: 'HIGH',
    status: 'Pending Verification',
    landDetails: {
      ulpin: 'IN-KA-03-9018471629',
      khasraNumber: 'Sy No. 84/1, 84/2',
      khatauniNumber: 'Khata Certificate #B-9912',
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      tehsil: 'Bengaluru East',
      village: 'Varthur',
      zone: 'Commercial High-Density C4',
      areaHectares: 1.82,
      areaLocalUnit: '4.50 Acres (180 Guntha)',
      marketValueInr: '₹ 38,50,00,000',
      stampDutyPaid: 'Scrutiny Fee ₹ 8,40,000 (BBMP)',
      deedRegistrationNo: 'BMRDA-PLAN-2026-1120',
      dateOfRegistration: '2026-08-25'
    },
    preVerificationChecks: {
      rorAuthenticity: { passed: true, message: 'Bhoomi RTC record verified with biometric e-sign' },
      encumbranceStatus: { passed: true, message: 'Nil encumbrance certificate issued' },
      bankLoanLock: { passed: false, message: 'Construction Consortium Loan Lien ₹15 Cr held by State Bank of India' },
      zoningCompliance: { passed: true, message: 'FAR 3.25 compliant; Lake buffer clearance 30m required' }
    },
    documents: [
      { name: 'Architectural Blueprint & Structural Stability', fileType: 'pdf', verified: true, size: '18.4 MB', date: '2026-08-25' },
      { name: 'Fire & Emergency Services NOC', fileType: 'pdf', verified: true, size: '2.4 MB', date: '2026-08-27' },
      { name: 'KSPCB Environmental Consent for Establishment', fileType: 'pdf', verified: true, size: '4.8 MB', date: '2026-08-29' },
      { name: 'SBI Bank Pari-Passu NOC for Construction', fileType: 'pdf', verified: true, size: '1.9 MB', date: '2026-08-31' }
    ],
    timeline: [
      { step: 'Online Building Approval System Submission', timestamp: '2026-09-01 11:15 AM', user: 'Licensed Town Architect' },
      { step: 'GIS Setback & Lake Buffer Validation Pass', timestamp: '2026-09-02 04:45 PM', user: 'AI Spatial Engine' }
    ]
  },
  {
    id: 'APP-2026-DIS-1104',
    category: 'Dispute Complaints',
    type: 'Encroachment on Common Gram Sabha Grazing Land (Gauchar)',
    applicantName: 'Gram Panchayat Devpura (Sarpanch: Ramesh Chandra)',
    applicantAadhaarMasked: 'XXXX-XXXX-3341',
    applicantPhone: '+91 97840 11984',
    applicantAddress: 'Panchayat Bhavan, Devpura, Sikar',
    coSharersCount: 0,
    applicationDate: '2026-09-05',
    priority: 'HIGH',
    status: 'Pending Verification',
    landDetails: {
      ulpin: 'IN-RJ-08-5510293847',
      khasraNumber: 'Khasra 412 (Gair Mumkin Gauchar)',
      khatauniNumber: 'Khatauni #01 (State Government Land)',
      state: 'Rajasthan',
      district: 'Sikar',
      tehsil: 'Danta Ramgarh',
      village: 'Devpura',
      zone: 'Public Commons & Protected Grazing',
      areaHectares: 3.10,
      areaLocalUnit: '12.25 Bigha (Pucca)',
      marketValueInr: '₹ 1,15,00,000',
      stampDutyPaid: 'Public Complaint - Fee Exempt',
      deedRegistrationNo: 'REVENUE-COURT-2026-0419',
      dateOfRegistration: '2026-09-05'
    },
    preVerificationChecks: {
      rorAuthenticity: { passed: true, message: 'Apna Khata record confirms Government Gauchar ownership' },
      encumbranceStatus: { passed: true, message: 'Classified under Public Trust Doctrine' },
      bankLoanLock: { passed: true, message: 'Non-transferable government asset' },
      zoningCompliance: { passed: false, message: 'Severe violation: Illegal commercial warehouse structure spotted' }
    },
    documents: [
      { name: 'Panchayat Resolution #44/2026', fileType: 'pdf', verified: true, size: '1.1 MB', date: '2026-09-05' },
      { name: 'Drone Reconnaissance Geo-Tagged Photo', fileType: 'image', verified: true, size: '6.4 MB', date: '2026-09-05' },
      { name: 'Encroacher Show-Cause Summons Notice', fileType: 'pdf', verified: true, size: '820 KB', date: '2026-09-05' }
    ],
    timeline: [
      { step: 'Public Complaint Lodged by Gram Sabha', timestamp: '2026-09-05 09:30 AM', user: 'Panchayat Secretary' },
      { step: 'Satellite Drone Flagging Generated', timestamp: '2026-09-05 11:00 AM', user: 'AI Change Detector' }
    ]
  },
  {
    id: 'APP-2026-MUT-8843',
    category: 'Ownership Transfer Requests',
    type: 'Gift Deed (Hiba / Blood Relation Conveyance)',
    applicantName: 'Nitin K. Deshmukh & Priya Deshmukh',
    applicantAadhaarMasked: 'XXXX-XXXX-1940',
    applicantPhone: '+91 99220 55182',
    applicantAddress: 'Flat 304, Sahyadri Heights, Kothrud, Pune',
    coSharersCount: 1,
    applicationDate: '2026-09-04',
    priority: 'LOW',
    status: 'Approved',
    landDetails: {
      ulpin: 'IN-MH-12-8819203948',
      khasraNumber: 'Gat No. 342/1',
      khatauniNumber: '7/12 #1042',
      state: 'Maharashtra',
      district: 'Pune',
      tehsil: 'Haveli',
      village: 'Wagholi',
      zone: 'Residential Urban R1',
      areaHectares: 0.42,
      areaLocalUnit: '1.04 Acres (41.6 Guntha)',
      marketValueInr: '₹ 1,10,00,000',
      stampDutyPaid: '₹ 3,30,000 (e-Challan #MH-8819)',
      deedRegistrationNo: 'SUB-REG-HAVELI-2026-4412',
      dateOfRegistration: '2026-08-30'
    },
    preVerificationChecks: {
      rorAuthenticity: { passed: true, message: 'Mahabhulekh RoR digital signature verified' },
      encumbranceStatus: { passed: true, message: 'Clear title certificate issued' },
      bankLoanLock: { passed: true, message: 'Zero mortgage recorded in CERSAI' },
      zoningCompliance: { passed: true, message: 'Fully compliant with PMC Development Plan' }
    },
    documents: [
      { name: 'Registered Gift Deed', fileType: 'pdf', verified: true, size: '2.8 MB', date: '2026-08-30' },
      { name: 'Affidavit of Blood Relationship', fileType: 'pdf', verified: true, size: '950 KB', date: '2026-09-01' }
    ],
    timeline: [
      { step: 'e-Registration at Sub-Registrar', timestamp: '2026-08-30 02:15 PM', user: 'Sub-Registrar Haveli' },
      { step: 'Pre-Verification Checks Cleared', timestamp: '2026-09-02 10:00 AM', user: 'AI Compliance Engine' },
      { step: 'Mutation Order Sanctioned', timestamp: '2026-09-04 04:30 PM', user: 'Tehsildar Haveli' }
    ]
  },
  {
    id: 'APP-2026-MUT-8844',
    category: 'Ownership Transfer Requests',
    type: 'Court Decree Execution (Partition Suit #14/2021)',
    applicantName: 'Sanjay Rawat & Tribhuvan Rawat',
    applicantAadhaarMasked: 'XXXX-XXXX-8821',
    applicantPhone: '+91 97190 22019',
    applicantAddress: 'Ward 4, Clement Town, Dehradun',
    coSharersCount: 3,
    applicationDate: '2026-09-02',
    priority: 'HIGH',
    status: 'Pending Verification',
    landDetails: {
      ulpin: 'IN-UK-05-6610928374',
      khasraNumber: 'Khasra 512, 513/1',
      khatauniNumber: 'Khata #290',
      state: 'Uttarakhand',
      district: 'Dehradun',
      tehsil: 'Dehradun Sadar',
      village: 'Dharampur',
      zone: 'Mixed Commercial / High Street',
      areaHectares: 0.65,
      areaLocalUnit: '13.0 Nali (3.2 Bigha)',
      marketValueInr: '₹ 4,75,00,000',
      stampDutyPaid: '₹ 14,25,000 (Court Decree Fee)',
      deedRegistrationNo: 'CIVIL-COURT-DEHRADUN-DECREE-2026',
      dateOfRegistration: '2026-07-15'
    },
    preVerificationChecks: {
      rorAuthenticity: { passed: true, message: 'Bhulekh UK digital record synchronized' },
      encumbranceStatus: { passed: true, message: 'Decree finality verified from NJDG portal' },
      bankLoanLock: { passed: true, message: 'No active lien' },
      zoningCompliance: { passed: true, message: 'Commercial setback verified' }
    },
    documents: [
      { name: 'Certified Copy of High Court Decree', fileType: 'pdf', verified: true, size: '4.2 MB', date: '2026-07-20' },
      { name: 'Advocate Commissioner Partition Map', fileType: 'image', verified: true, size: '3.6 MB', date: '2026-08-10' }
    ],
    timeline: [
      { step: 'Court Decree Ingested via NJDG Bridge', timestamp: '2026-09-02 01:00 PM', user: 'NJDG-API Gateway' }
    ]
  },
  {
    id: 'APP-2026-BLD-3392',
    category: 'Building Permits',
    type: 'Residential Villa Community Sanction (Phase 2)',
    applicantName: 'Green Meadows Realtech Corp',
    applicantAadhaarMasked: 'XXXX-XXXX-4419',
    applicantPhone: '+91 94120 77114',
    applicantAddress: 'Cyber City Phase 3, Gurugram',
    coSharersCount: 0,
    applicationDate: '2026-09-03',
    priority: 'MEDIUM',
    status: 'Pending Verification',
    landDetails: {
      ulpin: 'IN-HR-02-1102938475',
      khasraNumber: 'Rect 44 Killa 12/2, 13',
      khatauniNumber: 'Khewat 204',
      state: 'Haryana',
      district: 'Gurugram',
      tehsil: 'Badshahpur',
      village: 'Tigra',
      zone: 'Low-Density Residential R-Zone',
      areaHectares: 2.10,
      areaLocalUnit: '5.20 Acres (41.6 Kanal)',
      marketValueInr: '₹ 24,00,00,000',
      stampDutyPaid: 'EDC & IDC Charges ₹ 72,00,000 (DTCP)',
      deedRegistrationNo: 'DTCP-LIC-2026-8812',
      dateOfRegistration: '2026-08-10'
    },
    preVerificationChecks: {
      rorAuthenticity: { passed: true, message: 'Jamabandi verified via Web-HALRIS Haryana' },
      encumbranceStatus: { passed: true, message: 'Clear 30-year search title' },
      bankLoanLock: { passed: true, message: 'HDFC Escrow Account registered' },
      zoningCompliance: { passed: true, message: 'Internal road width 12m compliant with Gurugram Master Plan' }
    },
    documents: [
      { name: 'DTCP Master Layout Sanction', fileType: 'pdf', verified: true, size: '12.6 MB', date: '2026-08-10' },
      { name: 'Groundwater Extraction Clearance (CGWA)', fileType: 'pdf', verified: true, size: '1.8 MB', date: '2026-08-18' }
    ],
    timeline: [
      { step: 'Permit Application Submitted', timestamp: '2026-09-03 09:40 AM', user: 'Town Planning Desk' }
    ]
  },
  {
    id: 'APP-2026-DIS-1105',
    category: 'Dispute Complaints',
    type: 'Boundary Encroachment on Irrigation Canal Buffer',
    applicantName: 'Command Area Development Authority (Irrigation Dept)',
    applicantAadhaarMasked: 'XXXX-XXXX-0092',
    applicantPhone: '+91 94370 99812',
    applicantAddress: 'Superintending Engineer, Mahanadi South Division, Cuttack',
    coSharersCount: 0,
    applicationDate: '2026-09-06',
    priority: 'HIGH',
    status: 'Pending Verification',
    landDetails: {
      ulpin: 'IN-OD-14-7729104821',
      khasraNumber: 'Plot 890 (Canal Embankment)',
      khatauniNumber: 'Khata 02 (Irrigation Dept)',
      state: 'Odisha',
      district: 'Cuttack',
      tehsil: 'Salepur',
      village: 'Choudwar',
      zone: 'Protected Water Drainage Infrastructure',
      areaHectares: 0.75,
      areaLocalUnit: '1.85 Acres (185 Decimals)',
      marketValueInr: '₹ 85,00,000',
      stampDutyPaid: 'Departmental Petition',
      deedRegistrationNo: 'WATER-RES-COMP-2026-004',
      dateOfRegistration: '2026-09-06'
    },
    preVerificationChecks: {
      rorAuthenticity: { passed: true, message: 'Bhulekh Odisha RoR matches Canal Right of Way' },
      encumbranceStatus: { passed: true, message: 'State sovereign asset' },
      bankLoanLock: { passed: true, message: 'Non-alienable public utility' },
      zoningCompliance: { passed: false, message: 'CRITICAL: Heavy masonry wall built inside 15m Canal buffer zone' }
    },
    documents: [
      { name: 'Executive Engineer Field Inspection Report', fileType: 'pdf', verified: true, size: '3.4 MB', date: '2026-09-06' },
      { name: 'Satellite Drone Orthomosaic Map', fileType: 'image', verified: true, size: '8.2 MB', date: '2026-09-06' }
    ],
    timeline: [
      { step: 'Departmental Eviction Warrant Request Filed', timestamp: '2026-09-06 08:30 AM', user: 'Irrigation Dept' }
    ]
  },
  {
    id: 'APP-2026-SUR-5013',
    category: 'Boundary Surveys',
    type: 'Sub-Division Survey for Industrial Park Expansion',
    applicantName: 'Telangana State Industrial Infrastructure Corp (TSIIC)',
    applicantAadhaarMasked: 'XXXX-XXXX-5521',
    applicantPhone: '+91 94400 12098',
    applicantAddress: 'Parishrama Bhavan, Basheerbagh, Hyderabad',
    coSharersCount: 0,
    applicationDate: '2026-09-05',
    priority: 'MEDIUM',
    status: 'Pending Verification',
    landDetails: {
      ulpin: 'IN-TG-01-9988223311',
      khasraNumber: 'Sy Nos. 302, 303, 304/P',
      khatauniNumber: 'TSIIC Title 99',
      state: 'Telangana',
      district: 'Medchal-Malkajgiri',
      tehsil: 'Ghatkesar',
      village: 'Pocharam',
      zone: 'Special Economic Zone / IT Park',
      areaHectares: 6.80,
      areaLocalUnit: '16.80 Acres (672 Guntha)',
      marketValueInr: '₹ 95,00,00,000',
      stampDutyPaid: '₹ 1,50,000 Survey DGPS Charges',
      deedRegistrationNo: 'DHARANI-SURVEY-2026-9901',
      dateOfRegistration: '2026-09-05'
    },
    preVerificationChecks: {
      rorAuthenticity: { passed: true, message: 'Dharani Portal synchronized & title cleared' },
      encumbranceStatus: { passed: true, message: 'Govt land acquisition complete under 2013 Act' },
      bankLoanLock: { passed: true, message: 'No financial encumbrance' },
      zoningCompliance: { passed: true, message: 'Designated IT/Hardware Industrial Park' }
    },
    documents: [
      { name: 'Gazette Notification for Land Acquisition', fileType: 'pdf', verified: true, size: '5.1 MB', date: '2026-08-15' },
      { name: 'TSIIC Approved Master Layout Plan', fileType: 'pdf', verified: true, size: '9.4 MB', date: '2026-09-01' }
    ],
    timeline: [
      { step: 'DGPS Boundary Geo-Tagging Scheduled', timestamp: '2026-09-05 11:15 AM', user: 'Survey & Land Records' }
    ]
  },
  {
    id: 'APP-2026-MUT-8845',
    category: 'Ownership Transfer Requests',
    type: 'Sale Deed Transfer (Commercial Plot)',
    applicantName: 'Shri Balaji Logi-Parks Private Limited',
    applicantAadhaarMasked: 'XXXX-XXXX-7782',
    applicantPhone: '+91 98250 88231',
    applicantAddress: 'Plot 401, Narol Industrial Estate, Ahmedabad',
    coSharersCount: 0,
    applicationDate: '2026-09-06',
    priority: 'HIGH',
    status: 'Pending Verification',
    landDetails: {
      ulpin: 'IN-GJ-01-3344556677',
      khasraNumber: 'Survey 512/P',
      khatauniNumber: 'Khata 1109',
      state: 'Gujarat',
      district: 'Ahmedabad',
      tehsil: 'Daskroi',
      village: 'Bakrol',
      zone: 'Logistics & Warehousing Zone',
      areaHectares: 1.45,
      areaLocalUnit: '5.75 Bigha (Pucca)',
      marketValueInr: '₹ 8,90,00,000',
      stampDutyPaid: '₹ 44,50,000 (e-Stamp #GJ-10928)',
      deedRegistrationNo: 'SUB-REG-DASKROI-2026-1184',
      dateOfRegistration: '2026-09-06'
    },
    preVerificationChecks: {
      rorAuthenticity: { passed: true, message: 'AnyRoR 7/12 authenticated' },
      encumbranceStatus: { passed: true, message: '30-year search clean' },
      bankLoanLock: { passed: true, message: 'No mortgages found' },
      zoningCompliance: { passed: true, message: 'Zoned under AUDA Logistics Master Plan' }
    },
    documents: [
      { name: 'Registered Conveyance Deed', fileType: 'pdf', verified: true, size: '4.1 MB', date: '2026-09-06' }
    ],
    timeline: [
      { step: 'e-Registration Completed', timestamp: '2026-09-06 10:45 AM', user: 'Sub-Registrar Daskroi' }
    ]
  },
  {
    id: 'APP-2026-MUT-8846',
    category: 'Ownership Transfer Requests',
    type: 'Agricultural Land Purchase',
    applicantName: 'Babulal Patel & Karsanbhai Patel',
    applicantAadhaarMasked: 'XXXX-XXXX-9901',
    applicantPhone: '+91 98980 12345',
    applicantAddress: 'At & Po: Vadasma, Mehsana',
    coSharersCount: 2,
    applicationDate: '2026-09-07',
    priority: 'LOW',
    status: 'Pending Verification',
    landDetails: {
      ulpin: 'IN-GJ-06-9922114433',
      khasraNumber: 'Survey 221/1',
      khatauniNumber: 'Khata 449',
      state: 'Gujarat',
      district: 'Mehsana',
      tehsil: 'Kadi',
      village: 'Nandasan',
      zone: 'Agricultural Zone A1',
      areaHectares: 1.95,
      areaLocalUnit: '7.70 Bigha (Pucca)',
      marketValueInr: '₹ 1,45,00,000',
      stampDutyPaid: '₹ 7,25,000 (e-Stamp #GJ-8812)',
      deedRegistrationNo: 'SUB-REG-KADI-2026-3391',
      dateOfRegistration: '2026-09-07'
    },
    preVerificationChecks: {
      rorAuthenticity: { passed: true, message: 'Farmer status certificate verified under Tenancy Act Section 63' },
      encumbranceStatus: { passed: true, message: 'Nil encumbrance' },
      bankLoanLock: { passed: true, message: 'No crop loan lien' },
      zoningCompliance: { passed: true, message: 'Pure agricultural cultivation zone' }
    },
    documents: [
      { name: 'Registered Agricultural Sale Deed', fileType: 'pdf', verified: true, size: '3.2 MB', date: '2026-09-07' },
      { name: 'Khedut Khatedar Certificate (Bona Fide Agriculturist)', fileType: 'pdf', verified: true, size: '1.1 MB', date: '2026-09-07' }
    ],
    timeline: [
      { step: 'Registered at Kadi Sub-Registrar', timestamp: '2026-09-07 10:00 AM', user: 'Sub-Registrar Kadi' }
    ]
  }
];

export const AI_ENCROACHMENT_ALERTS = [
  {
    id: 'ALERT-AI-2026-0941',
    severity: 'CRITICAL',
    title: 'Unauthorized Commercial Construction Detected on Prime Agricultural Land',
    ulpin: 'IN-CH-01-987654',
    surveyNo: 'Khasra 219/1A',
    state: 'Punjab',
    district: 'SAS Nagar',
    village: 'Zirakpur Buffer Zone',
    detectedDate: '2026-09-06 14:22 hrs',
    confidenceScore: 98.4,
    changeMagnitudeSqM: 1420,
    historicDate: 'Nov 2022 Baseline',
    currentDate: 'Feb 2026 Sentinel-2 & High-Res Drone',
    violationCategory: 'Illegal Change of Land Use (CLU) & Master Plan Incursion',
    description: 'Computer vision satellite comparison detected 1,420 sq.m of newly laid concrete foundation and pre-engineered steel framing erected within active cropland without CLU permission.',
    baselineFeatures: 'Green vegetation canopy, furrow irrigation lines, zero built footprint.',
    currentFeatures: 'Excavation, heavy commercial metal shed structure, perimeter concrete wall, commercial truck access pathway.',
    status: 'Action Required',
    assignedOfficer: 'None (Unassigned)',
    coordinates: { lat: 30.6425, lng: 76.8173 }
  },
  {
    id: 'ALERT-AI-2026-0942',
    severity: 'CRITICAL',
    title: 'Boundary Shift Exceeding 2.8 Meters on Public National Highway Right-of-Way',
    ulpin: 'IN-DL-04-112233',
    surveyNo: 'Plot 44, NH-48 Corridor',
    state: 'Delhi NCR',
    district: 'South West Delhi',
    village: 'Mahipalpur Border',
    detectedDate: '2026-09-05 09:15 hrs',
    confidenceScore: 96.8,
    changeMagnitudeSqM: 380,
    historicDate: 'Jan 2023 Baseline',
    currentDate: 'Feb 2026 Orthophoto',
    violationCategory: 'Public Right-of-Way (RoW) Encroachment',
    description: 'Land boundary displacement algorithm detected a lateral boundary wall shift of 2.8 meters outward onto the 45-meter NHAI buffer reservation line.',
    baselineFeatures: 'Clear 45m setback from expressway center line with grass verge.',
    currentFeatures: 'Brick masonry boundary wall constructed 2.8m into public reservation line.',
    status: 'Action Required',
    assignedOfficer: 'Field Inspector Sharma',
    coordinates: { lat: 28.5355, lng: 77.1219 }
  },
  {
    id: 'ALERT-AI-2026-0943',
    severity: 'HIGH',
    title: 'Eco-Sensitive Wetland / Water Catchment Incursion (340 sq.m Plotted)',
    ulpin: 'IN-MH-12-554433',
    surveyNo: 'Khasra 88 (Pashan Lake Catchment)',
    state: 'Maharashtra',
    district: 'Pune',
    village: 'Pashan',
    detectedDate: '2026-09-04 17:40 hrs',
    confidenceScore: 94.2,
    changeMagnitudeSqM: 860,
    historicDate: 'March 2023 Baseline',
    currentDate: 'Feb 2026 High-Res Multispectral',
    violationCategory: 'National Green Tribunal (NGT) Waterbody Buffer Breach',
    description: 'Multispectral water index (NDWI) reveals systematic soil filling and earth reclamation inside the high-flood-line buffer of the natural catchment basin.',
    baselineFeatures: 'Submerged marshland, natural wetland reeds, drainage swale.',
    currentFeatures: 'Debris dumping, leveled red earth platform, temporary construction labor sheds.',
    status: 'Action Required',
    assignedOfficer: 'None (Unassigned)',
    coordinates: { lat: 18.5392, lng: 73.7845 }
  },
  {
    id: 'ALERT-AI-2026-0944',
    severity: 'HIGH',
    title: 'Unauthorized Colony Plottage on Green Belt without Planning Sanction',
    ulpin: 'IN-KA-03-778899',
    surveyNo: 'Sy No. 102 & 103',
    state: 'Karnataka',
    district: 'Bengaluru Rural',
    village: 'Devanahalli Outskirts',
    detectedDate: '2026-09-03 11:30 hrs',
    confidenceScore: 97.1,
    changeMagnitudeSqM: 4200,
    historicDate: 'April 2023 Baseline',
    currentDate: 'Feb 2026 Satellite Feed',
    violationCategory: 'Unapproved Layout & Illegal Plottage',
    description: 'Road grid extraction model detected unauthorized asphalt road carving and boundary stone demarcation for 48 residential plots on non-converted agricultural land.',
    baselineFeatures: 'Dry agricultural fields with mango grove patches.',
    currentFeatures: 'Grid layout, black-topped 30-ft internal roads, stone demarcation markers, real estate promotion banners.',
    status: 'Notice Issued',
    assignedOfficer: 'Town Planning Inspector Varma',
    coordinates: { lat: 13.2483, lng: 77.7126 }
  },
  {
    id: 'ALERT-AI-2026-0945',
    severity: 'MEDIUM',
    title: 'Forest Reserve Buffer Tree Canopy Depletion (1.2 Hectares)',
    ulpin: 'IN-UP-08-442211',
    surveyNo: 'Forest Compartment 14',
    state: 'Uttar Pradesh',
    district: 'Saharanpur',
    village: 'Shivalik Foothills',
    detectedDate: '2026-09-02 16:05 hrs',
    confidenceScore: 91.5,
    changeMagnitudeSqM: 12000,
    historicDate: 'Dec 2022 Sentinel-2',
    currentDate: 'Feb 2026 Sentinel-2 NDVI',
    violationCategory: 'Reserved Forest Incursion & Timber Clearance',
    description: 'NDVI vegetation drop from 0.74 to 0.18 detected across a 1.2-hectare contiguous patch adjacent to village farm boundaries.',
    baselineFeatures: 'Dense sal forest tree canopy cover.',
    currentFeatures: 'Cleared logging clearing, tractor tire ruts, makeshift fencing.',
    status: 'Action Required',
    assignedOfficer: 'Forest Ranger J. P. Singh',
    coordinates: { lat: 30.1584, lng: 77.6201 }
  },
  {
    id: 'ALERT-AI-2026-0946',
    severity: 'MEDIUM',
    title: 'Riverbed Sand Mining & Embankment Erosion Alert',
    ulpin: 'IN-RJ-08-990112',
    surveyNo: 'Banas River Basin Plot 5',
    state: 'Rajasthan',
    district: 'Tonk',
    village: 'Niwai',
    detectedDate: '2026-09-01 10:10 hrs',
    confidenceScore: 89.2,
    changeMagnitudeSqM: 3500,
    historicDate: 'May 2023 Baseline',
    currentDate: 'Feb 2026 Satellite',
    violationCategory: 'Illegal Mineral Excavation & Riverbank Threat',
    description: 'Thermal anomaly and surface elevation change indicates ongoing unpermitted heavy machinery sand scooping altering natural river channel geometry.',
    baselineFeatures: 'Stable alluvial riverbank sand bar with wild grasses.',
    currentFeatures: 'Deep cratering, vehicular ramps, stockpiled sand dunes, mechanized sifter.',
    status: 'Action Required',
    assignedOfficer: 'None (Unassigned)',
    coordinates: { lat: 26.3582, lng: 75.9281 }
  },
  {
    id: 'ALERT-AI-2026-0947',
    severity: 'LOW',
    title: 'Minor Setback Violation on Commercial Mall Frontage',
    ulpin: 'IN-GJ-04-662211',
    surveyNo: 'FP No. 89, TPS 12',
    state: 'Gujarat',
    district: 'Surat',
    village: 'Vesu Ward',
    detectedDate: '2026-08-31 15:45 hrs',
    confidenceScore: 88.0,
    changeMagnitudeSqM: 110,
    historicDate: 'Aug 2023 Sanctioned Plan',
    currentDate: 'Feb 2026 High-Res Orthomosaic',
    violationCategory: 'Municipal Building Bye-Law Non-Compliance',
    description: 'Temporary steel canopy and entry portico exceeds approved front setback by 1.4 meters towards municipal pedestrian sidewalk.',
    baselineFeatures: '6-meter mandatory open front setback.',
    currentFeatures: 'Semi-permanent steel & glass awning structure extending 4.6m into setback.',
    status: 'Action Required',
    assignedOfficer: 'None (Unassigned)',
    coordinates: { lat: 21.1412, lng: 72.7719 }
  },
  {
    id: 'ALERT-AI-2026-0948',
    severity: 'HIGH',
    title: 'Heritage Monument 100-Meter Prohibited Zone Violation',
    ulpin: 'IN-MP-02-334411',
    surveyNo: 'Survey 112/4',
    state: 'Madhya Pradesh',
    district: 'Gwalior',
    village: 'Fort Foothills Ward',
    detectedDate: '2026-08-30 12:20 hrs',
    confidenceScore: 95.3,
    changeMagnitudeSqM: 520,
    historicDate: 'Jan 2023 Archaeological Survey Layer',
    currentDate: 'Feb 2026 Drone Survey',
    violationCategory: 'AMASR Act (Ancient Monuments) Incursion',
    description: 'New two-story RCC residential structure identified at 68 meters from protected monument perimeter wall (statutory prohibition limit is 100 meters).',
    baselineFeatures: 'Open rocky terrain with sparse shrubbery within prohibited buffer.',
    currentFeatures: 'Cast RCC columns, brickwork up to 2nd floor, water tank installation.',
    status: 'Action Required',
    assignedOfficer: 'Heritage Enforcement Officer',
    coordinates: { lat: 26.2298, lng: 78.1724 }
  }
];

export const GOVERNANCE_METRICS = {
  totalGeoreferencedParcels: '1,428,950',
  georeferencePercent: '99.4%',
  activePendingMutations: 342,
  avgSettlementDays: 4.2,
  slaCompliancePercent: 96.8,
  totalRevenueCollected: '₹ 184.65 Cr',
  revenueYoYGrowth: '+14.2%',
  activeEncroachmentAlerts: 24,
  highSeverityAlerts: 8,
  resolvedAlertsCount: 142
};

export const MONTHLY_MUTATION_DATA = [
  { month: 'Oct 25', received: 480, approved: 450, rejected: 25 },
  { month: 'Nov 25', received: 530, approved: 495, rejected: 28 },
  { month: 'Dec 25', received: 610, approved: 580, rejected: 32 },
  { month: 'Jan 26', received: 590, approved: 560, rejected: 29 },
  { month: 'Feb 26', received: 680, approved: 645, rejected: 31 },
  { month: 'Mar 26', received: 790, approved: 740, rejected: 38 },
  { month: 'Apr 26', received: 720, approved: 685, rejected: 30 },
  { month: 'May 26', received: 660, approved: 630, rejected: 24 },
  { month: 'Jun 26', received: 710, approved: 680, rejected: 27 },
  { month: 'Jul 26', received: 840, approved: 805, rejected: 33 },
  { month: 'Aug 26', received: 890, approved: 850, rejected: 35 },
  { month: 'Sep 26', received: 920, approved: 880, rejected: 36 }
];

export const LAND_USE_DISTRIBUTION = [
  { name: 'Agricultural Land', value: 36, color: '#10b981' },
  { name: 'Residential Land', value: 30, color: '#0284c7' },
  { name: 'Industrial Land', value: 20, color: '#8b5cf6' },
  { name: 'Utility Infrastructure', value: 14, color: '#f59e0b' }
];

export const REVENUE_COLLECTION_TRENDS = [
  { month: 'Oct 25', stampDutyCr: 11.2, propertyTaxCr: 3.4, totalCr: 14.6 },
  { month: 'Nov 25', stampDutyCr: 12.0, propertyTaxCr: 3.8, totalCr: 15.8 },
  { month: 'Dec 25', stampDutyCr: 13.5, propertyTaxCr: 4.1, totalCr: 17.6 },
  { month: 'Jan 26', stampDutyCr: 12.8, propertyTaxCr: 3.9, totalCr: 16.7 },
  { month: 'Feb 26', stampDutyCr: 14.2, propertyTaxCr: 4.5, totalCr: 18.7 },
  { month: 'Mar 26', stampDutyCr: 18.4, propertyTaxCr: 6.8, totalCr: 25.2 },
  { month: 'Apr 26', stampDutyCr: 13.9, propertyTaxCr: 3.2, totalCr: 17.1 },
  { month: 'May 26', stampDutyCr: 13.1, propertyTaxCr: 3.0, totalCr: 16.1 },
  { month: 'Jun 26', stampDutyCr: 14.8, propertyTaxCr: 3.6, totalCr: 18.4 },
  { month: 'Jul 26', stampDutyCr: 16.2, propertyTaxCr: 4.0, totalCr: 20.2 },
  { month: 'Aug 26', stampDutyCr: 17.9, propertyTaxCr: 4.8, totalCr: 22.7 },
  { month: 'Sep 26', stampDutyCr: 18.2, propertyTaxCr: 5.1, totalCr: 23.3 }
];

export const VILLAGE_WARD_METRICS = [
  { name: 'Rampur Rural Tehsil', totalParcels: 284100, pendingMutations: 42, avgSettlementDays: 3.8, revenueCr: '₹ 28.4', complianceRate: '98.6%', riskIndex: 'LOW' },
  { name: 'Devpura Agricultural Sector', totalParcels: 198450, pendingMutations: 58, avgSettlementDays: 4.1, revenueCr: '₹ 19.8', complianceRate: '97.2%', riskIndex: 'LOW' },
  { name: 'Shivgarh Peri-Urban Zone', totalParcels: 310200, pendingMutations: 74, avgSettlementDays: 5.6, revenueCr: '₹ 41.5', complianceRate: '93.4%', riskIndex: 'MEDIUM' },
  { name: 'Anand Nagar Urban Ward 4', totalParcels: 245600, pendingMutations: 39, avgSettlementDays: 3.4, revenueCr: '₹ 38.2', complianceRate: '99.1%', riskIndex: 'LOW' },
  { name: 'Greenfield Master Plan Ward', totalParcels: 178200, pendingMutations: 65, avgSettlementDays: 6.2, revenueCr: '₹ 29.6', complianceRate: '91.8%', riskIndex: 'HIGH' },
  { name: 'Cyber Cyber Corridor Ward 12', totalParcels: 212400, pendingMutations: 64, avgSettlementDays: 4.0, revenueCr: '₹ 27.1', complianceRate: '96.5%', riskIndex: 'MEDIUM' }
];

export const API_GATEWAY_SERVICES = [
  {
    id: 'api-ror',
    name: 'State Revenue RoR / Land Detail Record Registry',
    department: 'Department of Revenue & Land Records (Bhu-Aadhaar National)',
    protocol: 'REST / OpenBhuGov v2.4 (mTLS Encrypted)',
    endpoint: 'https://gateway.landstack.gov.in/api/v2/ror/query',
    status: 'ONLINE',
    latencyMs: 34,
    uptimePercent: 99.98,
    dailyTransactions: '1,420,840',
    lastSync: '12 seconds ago',
    description: 'Real-time two-way synchronization of digital 7/12, Jamabandi, Land Detail Records, and Patta records with instant lock/unlock capabilities.'
  },
  {
    id: 'api-sro',
    name: 'Sub-Registrar Office (e-Stamping & Registered Conveyances)',
    department: 'Inspector General of Registration (IGR / NGDRS)',
    protocol: 'gRPC / JSON-RPC over HTTP/2',
    endpoint: 'https://ngdrs.landstack.gov.in/v1/deeds/stream',
    status: 'ONLINE',
    latencyMs: 28,
    uptimePercent: 99.95,
    dailyTransactions: '88,290',
    lastSync: '4 seconds ago',
    description: 'Automatic push ingestion of newly registered sale, gift, and mortgage deeds upon biometric endorsement by Sub-Registrars.'
  },
  {
    id: 'api-cersai',
    name: 'Banking & Mortgages Network (CERSAI National Portal)',
    department: 'Central Registry of Securitisation & RBI Lien Gateway',
    protocol: 'REST / OAuth2 + PKI Digital Seal',
    endpoint: 'https://cersai.api.gov.in/v3/liens/verify',
    status: 'ONLINE',
    latencyMs: 62,
    uptimePercent: 99.89,
    dailyTransactions: '412,010',
    lastSync: '18 seconds ago',
    description: 'Instant verification and programmatic lien-marking of property mortgages, home loans, and property claims & liabilities.'
  },
  {
    id: 'api-municipal',
    name: 'Municipal Corporation Grid (Property Tax & Water Utility)',
    department: 'Urban Local Bodies (ULB) & Municipal GIS Platform',
    protocol: 'REST / GeoJSON API',
    endpoint: 'https://ulb.smartcities.gov.in/api/spatial/tax-utility',
    status: 'ONLINE',
    latencyMs: 45,
    uptimePercent: 99.91,
    dailyTransactions: '654,120',
    lastSync: '25 seconds ago',
    description: 'Bi-directional link connecting land parcel ULPINs to municipal property tax assessments, water meters, and trade licenses.'
  },
  {
    id: 'api-bhuvan',
    name: 'ISRO BHUKOSH / Bhuvan High-Resolution Satellite GIS Service',
    department: 'National Remote Sensing Centre (ISRO / DoS)',
    protocol: 'WMS / WFS / OGC Standard 1.3.0',
    endpoint: 'https://bhuvan-cadastral.nrsc.gov.in/geoserver/wms',
    status: 'ONLINE',
    latencyMs: 78,
    uptimePercent: 99.94,
    dailyTransactions: '2,890,140',
    lastSync: '1 minute ago',
    description: 'High-resolution 0.5m Cartosat/Sentinel multi-temporal imagery tiles and land boundary polygon overlay services.'
  },
  {
    id: 'api-njdg',
    name: 'National Judicial Data Grid (NJDG Land Injunctions & Disputes)',
    department: 'e-Courts Project, Supreme Court of India',
    protocol: 'REST / eCourts Interop v3.1',
    endpoint: 'https://njdg.services.ecourts.gov.in/api/land-cases',
    status: 'ONLINE',
    latencyMs: 95,
    uptimePercent: 99.78,
    dailyTransactions: '38,910',
    lastSync: '3 minutes ago',
    description: 'Automated lookup of civil suits, injunctions, stay orders, and pending partition litigations linked to Land Detail / Survey numbers.'
  }
];

export const STATE_UNIT_CONVERTERS = [
  {
    state: 'Punjab & Haryana',
    localUnitName: 'Kanal / Marla',
    formulaDesc: '1 Acre = 8 Kanal = 160 Marla; 1 Kanal = 505.857 sq.m',
    toHectaresFactor: 0.0505857,
    toSqMetersFactor: 505.857,
    terms: {
      rorName: 'Jamabandi',
      parcelRef: 'Murabba / Killa / Mustil',
      subDivision: 'Tarf / Patti',
      villageOfficer: 'Patwari Halqa'
    }
  },
  {
    state: 'Uttar Pradesh & Bihar',
    localUnitName: 'Bigha (Pucca) / Biswa',
    formulaDesc: '1 Pucca Bigha = 20 Biswa = 2,529.3 sq.m (approx 0.2529 Hectare)',
    toHectaresFactor: 0.252928,
    toSqMetersFactor: 2529.28,
    terms: {
      rorName: 'Khatauni / Khasra',
      parcelRef: 'Gata / Khasra Sankhya',
      subDivision: 'Mauza / Pargana',
      villageOfficer: 'Lekhpal'
    }
  },
  {
    state: 'Gujarat & Maharashtra',
    localUnitName: 'Guntha / Vigha',
    formulaDesc: '1 Guntha = 101.17 sq.m (1/40 Acre); 1 Vigha = 16 Guntha = 1,618.7 sq.m',
    toHectaresFactor: 0.010117,
    toSqMetersFactor: 101.17,
    terms: {
      rorName: '7/12 (Saat Bara) & 8-A Extract',
      parcelRef: 'Gat No. / Survey No. & Hissa',
      subDivision: 'Taluka / Gram Panchayat',
      villageOfficer: 'Talati-cum-Mantri'
    }
  },
  {
    state: 'Tamil Nadu & Kerala',
    localUnitName: 'Cent / Ground / Kuzhi',
    formulaDesc: '1 Cent = 40.46 sq.m; 1 Ground = 222.96 sq.m (2,400 sq.ft)',
    toHectaresFactor: 0.00404686,
    toSqMetersFactor: 40.4686,
    terms: {
      rorName: 'Patta / Chitta',
      parcelRef: 'Survey No. & Sub-Division (FMB Sketch)',
      subDivision: 'Firka / Taluk',
      villageOfficer: 'Village Administrative Officer (VAO)'
    }
  },
  {
    state: 'West Bengal & Assam',
    localUnitName: 'Bigha / Katha / Chhatak',
    formulaDesc: '1 Bigha = 20 Katha = 1,337.8 sq.m; 1 Katha = 66.89 sq.m',
    toHectaresFactor: 0.13378,
    toSqMetersFactor: 1337.8,
    terms: {
      rorName: 'Khatian (ROR) & Porcha',
      parcelRef: 'Dag Number',
      subDivision: 'Mouza & JL Number',
      villageOfficer: 'Revenue Inspector (RI)'
    }
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'LOG-891024',
    timestamp: '2026-09-07 15:42:19 IST',
    officerName: 'Rajeshwar Sharma, IAS',
    officerRole: 'Tehsildar / Revenue Officer',
    action: 'MUTATION_APPROVED',
    ulpin: 'IN-MH-12-8819203948',
    details: 'Sanctioned registered Gift Deed transfer in favor of Priya Deshmukh. RoR updated.',
    verificationHash: '0x8f2a99c4d11b238e9a4f0012c8b74e6291a83427fcd9182374b62e8419a120fc',
    ipAddress: '10.144.12.8 (GovNIC-VLAN3)',
    blockHeight: 1489201
  },
  {
    id: 'LOG-891023',
    timestamp: '2026-09-07 14:18:02 IST',
    officerName: 'Ar. Sunita Deshmukh',
    officerRole: 'Town Planning & Municipal Officer',
    action: 'NOTICE_ISSUED',
    ulpin: 'IN-CH-01-987654',
    details: 'Generated Section 84 Eviction Notice for unauthorized commercial construction in cropland.',
    verificationHash: '0x7c41e889a01f44e82b7199c488910aa3941bca2801948271018938475294101e',
    ipAddress: '10.144.18.22 (DTCP-SecGateway)',
    blockHeight: 1489200
  },
  {
    id: 'LOG-891022',
    timestamp: '2026-09-07 13:05:44 IST',
    officerName: 'Ar. Sunita Deshmukh',
    officerRole: 'Town Planning & Municipal Officer',
    action: 'SURVEYOR_DISPATCHED',
    ulpin: 'IN-DL-04-112233',
    details: 'Assigned Field Surveyor S. K. Nair with DGPS Rover for NH-48 boundary shift audit.',
    verificationHash: '0x9923be710a9c8411d382991048f12a83819024fbc09182374182937401928472',
    ipAddress: '10.144.18.22 (DTCP-SecGateway)',
    blockHeight: 1489199
  },
  {
    id: 'LOG-891021',
    timestamp: '2026-09-07 11:20:15 IST',
    officerName: 'Dr. Anand V. Kulkarni, IAS',
    officerRole: 'Executive District Collector',
    action: 'ANALYTICS_REPORT_EXPORTED',
    ulpin: 'DISTRICT-WIDE-SUMMARY',
    details: 'Exported Q3 Comprehensive Land Revenue & Encroachment Mitigation Report to State Chief Secretary.',
    verificationHash: '0x3344a1928f001928374619203847562819023847561920384756192038475621',
    ipAddress: '10.144.02.1 (Collector-Encrypted-VIP)',
    blockHeight: 1489198
  },
  {
    id: 'LOG-891020',
    timestamp: '2026-09-07 09:45:30 IST',
    officerName: 'Vikramaditya Rathore',
    officerRole: 'System Administrator (NIC)',
    action: 'API_GATEWAY_RESYNC',
    ulpin: 'GATEWAY-CERSAI-NODE',
    details: 'Refreshed TLS mTLS mutual certs and reconnected Banking Lien synchronization queue.',
    verificationHash: '0x6610928374619283746192837461928374619283746192837461928374619283',
    ipAddress: '10.200.01.10 (NIC-Cloud-Core)',
    blockHeight: 1489197
  },
  {
    id: 'LOG-891019',
    timestamp: '2026-09-06 17:30:11 IST',
    officerName: 'Rajeshwar Sharma, IAS',
    officerRole: 'Tehsildar / Revenue Officer',
    action: 'DISPUTE_FLAGGED',
    ulpin: 'IN-PB-12-3901928374',
    details: 'Referred Succession Application to Sub-Divisional Revenue Court due to co-sharer objection #OBJ-882.',
    verificationHash: '0x112233445566778899aabbccddeeff00112233445566778899aabbccddeeff00',
    ipAddress: '10.144.12.8 (GovNIC-VLAN3)',
    blockHeight: 1489196
  },
  {
    id: 'LOG-891018',
    timestamp: '2026-09-06 15:10:50 IST',
    officerName: 'Rajeshwar Sharma, IAS',
    officerRole: 'Tehsildar / Revenue Officer',
    action: 'MUTATION_REJECTED',
    ulpin: 'IN-RJ-08-9901123344',
    details: 'Rejected conveyance mutation: defective Power of Attorney revoked prior to execution.',
    verificationHash: '0xccbbaa99887766554433221100ffeeddccbbaa99887766554433221100ffeedd',
    ipAddress: '10.144.12.8 (GovNIC-VLAN3)',
    blockHeight: 1489195
  },
  {
    id: 'LOG-891017',
    timestamp: '2026-09-06 12:40:05 IST',
    officerName: 'Vikramaditya Rathore',
    officerRole: 'System Administrator (NIC)',
    action: 'SECURITY_AUDIT_CHECK',
    ulpin: 'SYSTEM-LEDGER',
    details: 'Completed zero-knowledge cryptographic integrity verification of 1,489,195 audit blocks.',
    verificationHash: '0x778899aabbccddeeff00112233445566778899aabbccddeeff00112233445566',
    ipAddress: '10.200.01.10 (NIC-Cloud-Core)',
    blockHeight: 1489194
  },
  {
    id: 'LOG-891016',
    timestamp: '2026-09-05 16:22:18 IST',
    officerName: 'Ar. Sunita Deshmukh',
    officerRole: 'Town Planning & Municipal Officer',
    action: 'PERMIT_SANCTIONED',
    ulpin: 'IN-KA-03-9018471629',
    details: 'Provisionally approved commercial high-rise building plan subject to lake buffer verification NOC.',
    verificationHash: '0x5566778899aabbccddeeff00112233445566778899aabbccddeeff0011223344',
    ipAddress: '10.144.18.22 (DTCP-SecGateway)',
    blockHeight: 1489193
  },
  {
    id: 'LOG-891015',
    timestamp: '2026-09-05 14:05:32 IST',
    officerName: 'Dr. Anand V. Kulkarni, IAS',
    officerRole: 'Executive District Collector',
    action: 'TASK_FORCE_CONSTITUTED',
    ulpin: 'IN-RJ-08-5510293847',
    details: 'Directed joint anti-encroachment task force (Police + Revenue) to reclaim Devpura Gram Sabha land.',
    verificationHash: '0x33445566778899aabbccddeeff00112233445566778899aabbccddeeff001122',
    ipAddress: '10.144.02.1 (Collector-Encrypted-VIP)',
    blockHeight: 1489192
  }
];
