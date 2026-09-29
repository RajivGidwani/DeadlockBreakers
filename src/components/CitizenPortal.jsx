import React, { useState, useMemo } from 'react';
import { 
  Search,
  Home, 
  FileText, 
  Clock, 
  CreditCard, 
  AlertCircle, 
  MapPin, 
  Download, 
  CheckCircle2, 
  Send, 
  FilePlus2, 
  ShieldCheck, 
  IndianRupee,
  AlertTriangle,
  UploadCloud,
  FileDown,
  Stamp,
  Check,
  Eye,
  X,
  FileSignature,
  ArrowRight
} from 'lucide-react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import { GANDHINAGAR_CENTER, LAND_CATEGORIES } from '../data/gandhinagarParcels';
import AgreementPreviewModal from './AgreementPreviewModal';
import AgreementTemplateModal from './AgreementTemplateModal';

export default function CitizenPortal({
  parcels = [],
  citizenParcels = [],
  mutationQueue = [],
  grievances = [],
  taxDues,
  onApplyTransfer,
  onApplyCertificate,
  onPayTax,
  onSubmitGrievance,
  onViewCertificate
}) {
  // Citizen Active Tab: 'search', 'my-parcels', 'apply', 'track', 'taxes', 'grievance'
  const [activeCitizenTab, setActiveCitizenTab] = useState('search');

  // ====================================================================
  // PUBLIC LAND SEARCH (PRE-PURCHASE LOOKUP) STATE
  // ====================================================================
  const [publicSearchQuery, setPublicSearchQuery] = useState('');
  const [publicCategoryFilter, setPublicCategoryFilter] = useState('ALL');
  const [selectedSearchParcel, setSelectedSearchParcel] = useState(parcels[0] || null);

  // Filtered parcels for public land search
  const searchedParcels = useMemo(() => {
    return parcels.filter(p => {
      const q = publicSearchQuery.toLowerCase();
      const matchesText = 
        p.ulpin.toLowerCase().includes(q) ||
        p.holderName.toLowerCase().includes(q) ||
        p.sector.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q);

      if (!matchesText) return false;
      if (publicCategoryFilter !== 'ALL' && p.landCategory !== publicCategoryFilter) return false;
      return true;
    });
  }, [parcels, publicSearchQuery, publicCategoryFilter]);

  // ====================================================================
  // APPLICATION & TRANSFER FORM STATE
  // ====================================================================
  const [applyType, setApplyType] = useState('transfer'); // 'transfer' or 'certificate'

  // Ownership Transfer Form State (with Standard Agreement & Notary)
  const [transferParcelUlpin, setTransferParcelUlpin] = useState(citizenParcels[0]?.ulpin || 'GJ06GND000101');
  const [buyerName, setBuyerName] = useState('');
  const [buyerMobile, setBuyerMobile] = useState('+91 98');
  const [buyerAadhaar, setBuyerAadhaar] = useState('');
  const [saleAmount, setSaleAmount] = useState('₹ 4,50,00,000');
  const [transferRemarks, setTransferRemarks] = useState('');

  // Notary Details
  const [notaryRegNo, setNotaryRegNo] = useState('NOT-GJ-2026-9412');
  const [notaryName, setNotaryName] = useState('Adv. Harishchandra Dave, Notary Public');
  const [notaryExecutionDate, setNotaryExecutionDate] = useState('2026-09-29');
  const [notaryChamber, setNotaryChamber] = useState('District Court, Sector 11, Gandhinagar');

  // File Upload State for Signed Agreement
  const [uploadedAgreementFile, setUploadedAgreementFile] = useState({
    name: 'Signed_Standard_Sale_Agreement_Bana_Paper.pdf',
    size: '2.8 MB',
    date: 'Today',
    verified: true
  });
  const [uploadedIdProof, setUploadedIdProof] = useState({
    name: 'Buyer_Aadhaar_PAN_Verification.pdf',
    size: '1.4 MB',
    date: 'Today',
    verified: true
  });

  // Certificate Request Form State
  const [certParcelUlpin, setCertParcelUlpin] = useState(citizenParcels[0]?.ulpin || 'GJ06GND000101');
  const [certType, setCertType] = useState('Record of Rights (7/12 RoR) Extract');
  const [certPurpose, setCertPurpose] = useState('Bank Loan Application / Collateral Verification');

  // Grievance Form State
  const [grievanceParcelUlpin, setGrievanceParcelUlpin] = useState(citizenParcels[0]?.ulpin || 'GJ06GND000101');
  const [grievanceCategory, setGrievanceCategory] = useState('Boundary Discrepancy');
  const [grievanceSubject, setGrievanceSubject] = useState('');
  const [grievanceDescription, setGrievanceDescription] = useState('');
  const [grievanceUrgency, setGrievanceUrgency] = useState('Urgent');

  // Modals State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [viewingDeedParcel, setViewingDeedParcel] = useState(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [previewAgreementItem, setPreviewAgreementItem] = useState(null);

  // Filter citizen's tracked records (transfers & certificates)
  const citizenApplications = mutationQueue.filter(
    (item) => item.applicantName?.includes('Ramesh Patel') || 
              item.applicantName?.includes('Singhania') || 
              item.ulpin === 'GJ06GND000101'
  );

  const selectedParcelObj = citizenParcels[0] || parcels[0];

  // Quick Action from Public Land Search -> Ownership Transfer
  const handleInitiateTransferFromSearch = (parcel) => {
    setTransferParcelUlpin(parcel.ulpin);
    setActiveCitizenTab('apply');
    setApplyType('transfer');
  };

  // Handle Transfer Form Submit
  const handleTransferSubmit = (e) => {
    e.preventDefault();
    if (!buyerName.trim()) return;

    onApplyTransfer({
      ulpin: transferParcelUlpin,
      transferType: 'Ownership Transfer / Record Update',
      buyerName: buyerName.trim(),
      buyerMobile: buyerMobile.trim(),
      buyerAadhaar: buyerAadhaar.trim() || '•••• •••• 5519',
      saleAmount: saleAmount.trim(),
      remarks: transferRemarks.trim(),
      notaryRegNo,
      notaryName,
      notaryExecutionDate,
      notaryChamber,
      agreementFile: uploadedAgreementFile,
      idProofFile: uploadedIdProof,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    });

    setBuyerName('');
    setActiveCitizenTab('track');
  };

  // Handle Certificate Form Submit
  const handleCertificateSubmit = (e) => {
    e.preventDefault();
    onApplyCertificate({
      ulpin: certParcelUlpin,
      certificateType: certType,
      purpose: certPurpose,
      applicantName: 'Ramesh Patel',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    });
    setActiveCitizenTab('track');
  };

  // Handle Grievance Submit
  const handleGrievanceSubmit = (e) => {
    e.preventDefault();
    if (!grievanceSubject.trim() || !grievanceDescription.trim()) return;
    onSubmitGrievance({
      ulpin: grievanceParcelUlpin,
      category: grievanceCategory,
      subject: grievanceSubject.trim(),
      description: grievanceDescription.trim(),
      urgency: grievanceUrgency,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    });
    setGrievanceSubject('');
    setGrievanceDescription('');
    setActiveCitizenTab('track');
  };

  // Handle Payment Execute
  const handleExecutePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      onPayTax();
      setIsPaying(false);
      setIsPaymentModalOpen(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* ==================================================================== */}
      {/* 1. CITIZEN WELCOME HEADER & TAB NAVIGATION */}
      {/* ==================================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-lg font-extrabold shadow-sm shrink-0">
            RP
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Welcome, Ramesh Patel
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Verified Citizen Owner
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Registered Citizen • Gandhinagar Sector 21 • Aadhaar: •••• •••• 8492</span>
            </p>
          </div>
        </div>

        {/* Quick Nav Pill Tabs */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 overflow-x-auto scrollbar-none gap-1">
          
          <button
            id="tab-citizen-search"
            onClick={() => setActiveCitizenTab('search')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCitizenTab === 'search'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-blue-600" />
            <span>Public Land Search</span>
          </button>

          <button
            id="tab-citizen-my-parcels"
            onClick={() => setActiveCitizenTab('my-parcels')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCitizenTab === 'my-parcels'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-emerald-600" />
            <span>My Land Parcels</span>
          </button>

          <button
            id="tab-citizen-apply"
            onClick={() => setActiveCitizenTab('apply')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCitizenTab === 'apply'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FilePlus2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Apply for Transfer</span>
          </button>

          <button
            id="tab-citizen-track"
            onClick={() => setActiveCitizenTab('track')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCitizenTab === 'track'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Track Application Status</span>
          </button>

          <button
            id="tab-citizen-taxes"
            onClick={() => setActiveCitizenTab('taxes')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCitizenTab === 'taxes'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
            <span>Property Dues & Taxes</span>
          </button>

          <button
            id="tab-citizen-grievance"
            onClick={() => setActiveCitizenTab('grievance')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCitizenTab === 'grievance'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Report Issue</span>
          </button>

        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. TAB 1: PUBLIC LAND SEARCH (PRE-PURCHASE LOOKUP) */}
      {/* ==================================================================== */}
      {activeCitizenTab === 'search' && (
        <div className="space-y-6">
          
          {/* Search Bar & Header */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
                <Search className="w-5 h-5 text-blue-600" />
                <span>Public Land Search & Pre-Purchase Lookup</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Prospective buyers can search any public land parcel by <strong>Parcel ID (ULPIN)</strong>, <strong>Current Owner Name</strong>, or <strong>Location/District</strong>. Verify land boundaries and check for active <strong>Property Claims & Liabilities (liens, mortgages, caveats)</strong> before purchasing.
              </p>
            </div>

            {/* Dedicated Search Input Bar & Category Filter */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="input-public-land-search"
                  type="text"
                  value={publicSearchQuery}
                  onChange={(e) => setPublicSearchQuery(e.target.value)}
                  placeholder="Search by Parcel ID (e.g. GJ06GND000101), Owner Name (e.g. Ramesh), or Location (Sector 21)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium transition-all"
                />
                {publicSearchQuery && (
                  <button
                    onClick={() => setPublicSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none shrink-0">
                {['ALL', 'Residential', 'Agricultural', 'Industrial', 'Utility'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPublicCategoryFilter(cat)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                      publicCategoryFilter === cat
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cat === 'ALL' ? 'All Categories' : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Grid: 2 Columns (Matching Parcel Cards on Left, Map & Inspection Details on Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Parcel Results List */}
            <div className="lg:col-span-5 space-y-3 max-h-[720px] overflow-y-auto pr-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                <span>Matching Land Parcels ({searchedParcels.length})</span>
                <span className="text-[11px] text-blue-600 font-medium">Click to inspect</span>
              </div>

              {searchedParcels.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center text-slate-400 text-xs">
                  No public land parcels match your search query "{publicSearchQuery}".
                </div>
              ) : (
                searchedParcels.map((parcel) => {
                  const isSelected = selectedSearchParcel?.id === parcel.id;
                  const isFlagged = parcel.status === 'Flagged';
                  const hasClaims = isFlagged || (parcel.encumbranceStatus && !parcel.encumbranceStatus.includes('Clear') && !parcel.encumbranceStatus.includes('Inalienable'));
                  const categoryDef = LAND_CATEGORIES[parcel.landCategory] || LAND_CATEGORIES.Residential;

                  return (
                    <div
                      key={parcel.id}
                      id={`public-search-card-${parcel.ulpin}`}
                      onClick={() => setSelectedSearchParcel(parcel)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-150 text-xs ${
                        isSelected
                          ? 'bg-blue-50/80 border-blue-400 shadow-sm ring-2 ring-blue-500/20'
                          : 'bg-white hover:bg-slate-50/90 border-slate-200 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono font-extrabold text-blue-700 text-sm block">
                            {parcel.ulpin}
                          </span>
                          <span className="font-bold text-slate-900 block mt-0.5">
                            {parcel.holderName}
                          </span>
                        </div>

                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border shrink-0 ${categoryDef.badgeClass}`}>
                          {parcel.landCategory}
                        </span>
                      </div>

                      <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50/80 p-2 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Area Size:</span>
                          <span className="font-bold text-slate-800">{parcel.areaSqM.toLocaleString()} m² ({parcel.areaAcres} Ac)</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Location:</span>
                          <span className="font-bold text-slate-800">{parcel.sector}</span>
                        </div>
                      </div>

                      {/* Property Claims & Liabilities Status Tag */}
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Claims & Liabilities:</span>
                        <span className={`inline-flex items-center space-x-1 font-bold px-2 py-0.5 rounded-full text-[10px] border ${
                          hasClaims
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {hasClaims ? (
                            <>
                              <AlertTriangle className="w-3 h-3 text-rose-600" />
                              <span>Active Claim / Lien</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Clear Title</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Column: Interactive Map & Pre-Purchase Dossier */}
            <div className="lg:col-span-7 space-y-5">
              {selectedSearchParcel ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
                  
                  {/* Title & Key Codes */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Bhu-Aadhaar Primary Key (ULPIN)
                      </span>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <span className="text-xl font-mono font-extrabold text-blue-700">
                          {selectedSearchParcel.ulpin}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          {selectedSearchParcel.landCategory}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Land Detail Record (Khasra)
                      </span>
                      <span className="text-sm font-bold text-slate-800">
                        #{selectedSearchParcel.khasraNo} • {selectedSearchParcel.sector}
                      </span>
                    </div>
                  </div>

                  {/* Pre-Purchase Claims & Liabilities Alert Banner */}
                  {selectedSearchParcel.status === 'Flagged' || (selectedSearchParcel.encumbranceStatus && !selectedSearchParcel.encumbranceStatus.includes('Clear') && !selectedSearchParcel.encumbranceStatus.includes('Inalienable')) ? (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                        <h4 className="font-extrabold text-xs uppercase tracking-wider text-rose-900">
                          Active Property Claims & Liabilities Detected
                        </h4>
                      </div>
                      <p className="text-xs text-rose-800 font-medium pl-6">
                        <strong>Caveat Notice:</strong> {selectedSearchParcel.statusNote || selectedSearchParcel.encumbranceStatus || 'Active mortgage lien or dispute caveat registered.'}
                      </p>
                      <p className="text-[11px] text-rose-700 pl-6">
                        Recommendation for Buyers: Do not execute a sale agreement or transfer funds until official no-objection certificate (NOC) is sanctioned by the Sub-Registrar.
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-900">
                          Clear Title — Zero Property Claims & Liabilities
                        </h4>
                      </div>
                      <p className="text-xs text-emerald-800 font-medium pl-6">
                        Verified clear of adverse bank mortgage locks, litigations, and municipal tax arrears. Eligible for safe purchase and ownership transfer.
                      </p>
                    </div>
                  )}

                  {/* Interactive Map View with Boundary Polygon */}
                  <div className="h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-200 relative isolate z-0">
                    <MapContainer
                      key={selectedSearchParcel.id}
                      center={selectedSearchParcel.centroid || GANDHINAGAR_CENTER}
                      zoom={16}
                      scrollWheelZoom={false}
                      className="w-full h-full"
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap'
                      />
                      <Polygon
                        positions={selectedSearchParcel.coordinates}
                        pathOptions={{
                          color: '#2563eb',
                          weight: 4,
                          fillColor: '#60a5fa',
                          fillOpacity: 0.55
                        }}
                      >
                        <Popup>
                          <div className="p-1 text-xs">
                            <span className="font-mono font-bold text-blue-700">{selectedSearchParcel.ulpin}</span>
                            <p className="font-bold text-slate-800 mt-0.5">{selectedSearchParcel.holderName}</p>
                            <p className="text-[11px] text-slate-500">{selectedSearchParcel.areaSqM.toLocaleString()} m²</p>
                          </div>
                        </Popup>
                      </Polygon>
                    </MapContainer>
                    <div className="absolute bottom-2 left-2 z-10 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-600 border border-slate-200 shadow-2xs">
                      Boundary Geometry Traced • {selectedSearchParcel.coordinates.length - 1} Vertices
                    </div>
                  </div>

                  {/* Property Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Recorded Titleholder</span>
                      <span className="font-extrabold text-slate-900 text-sm mt-0.5 block truncate">
                        {selectedSearchParcel.holderName}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Area Size</span>
                      <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">
                        {selectedSearchParcel.areaSqM.toLocaleString()} m² ({selectedSearchParcel.areaAcres} Ac)
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Zoning / Category</span>
                      <span className="font-bold text-blue-700 text-xs mt-0.5 block">
                        {selectedSearchParcel.landCategory} Land
                      </span>
                    </div>
                  </div>

                  {/* Pre-Purchase Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
                    <button
                      id="btn-download-bana-paper-template"
                      onClick={() => setIsTemplateModalOpen(true)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 transition-colors flex items-center space-x-1.5 shadow-2xs"
                    >
                      <FileDown className="w-3.5 h-3.5 text-blue-600" />
                      <span>Download Standard Sale Agreement ("Bana Paper")</span>
                    </button>

                    <button
                      id="btn-initiate-transfer-from-lookup"
                      onClick={() => handleInitiateTransferFromSearch(selectedSearchParcel)}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
                    >
                      <span>Apply for Ownership Transfer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
                  Select a parcel from the search results on the left to inspect property details and claims.
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. TAB 2: MY LAND PARCELS */}
      {/* ==================================================================== */}
      {activeCitizenTab === 'my-parcels' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                My Owned Land Parcels & Boundary Records
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Verified records registered under Gandhinagar Revenue Circle with digital deeds and boundary surveys.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Parcel Details Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
              
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Bhu-Aadhaar Primary Key
                  </span>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="text-lg font-mono font-extrabold text-blue-700">
                      {selectedParcelObj.ulpin}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                      Residential Compound
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Property Location & Details
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    Gandhinagar Sector 21 • Land Detail Record #142/1
                  </span>
                </div>
              </div>

              {/* Key Land Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Land Detail Record / Area Size</span>
                  <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">
                    3,250 m² (0.80 Acres)
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Property Claims & Liabilities</span>
                  <span className="font-bold text-emerald-700 text-xs mt-0.5 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Clear (No Liens)</span>
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Annual Land Tax</span>
                  <span className="font-bold text-emerald-700 text-xs mt-0.5 block">
                    {taxDues.status === 'Paid' ? 'Paid & Certified' : 'Pending Payment'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onViewCertificate({
                    newOwnerName: selectedParcelObj.holderName,
                    ulpin: selectedParcelObj.ulpin,
                    sector: selectedParcelObj.sector,
                    landCategory: selectedParcelObj.landCategory,
                    areaSqM: selectedParcelObj.areaSqM,
                    areaAcres: selectedParcelObj.areaAcres,
                    khasraNo: selectedParcelObj.khasraNo
                  })}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Official Land Certificate (7/12 RoR)</span>
                </button>

                <button
                  onClick={() => setViewingDeedParcel(selectedParcelObj)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 transition-colors flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>View Digital Deed</span>
                </button>

                <button
                  onClick={() => {
                    setTransferParcelUlpin(selectedParcelObj.ulpin);
                    setActiveCitizenTab('apply');
                    setApplyType('transfer');
                  }}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
                >
                  <FileSignature className="w-3.5 h-3.5" />
                  <span>Apply for Ownership Transfer</span>
                </button>
              </div>

            </div>

            {/* Right Column: Parcel Land Boundary Map View */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                  Land Boundary Map • Sector 21
                </h3>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  OpenStreetMap
                </span>
              </div>

              <div className="h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-200 relative isolate z-0">
                <MapContainer
                  center={GANDHINAGAR_CENTER}
                  zoom={16}
                  scrollWheelZoom={false}
                  className="w-full h-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap'
                  />
                  <Polygon
                    positions={selectedParcelObj.coordinates}
                    pathOptions={{
                      color: '#059669',
                      weight: 3,
                      fillColor: '#34d399',
                      fillOpacity: 0.6
                    }}
                  >
                    <Popup>
                      <div className="p-1 text-xs">
                        <span className="font-mono font-bold text-blue-700">{selectedParcelObj.ulpin}</span>
                        <p className="font-bold text-slate-800">{selectedParcelObj.holderName}</p>
                        <p className="text-[11px] text-slate-500">{selectedParcelObj.areaSqM.toLocaleString()} m²</p>
                      </div>
                    </Popup>
                  </Polygon>
                </MapContainer>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                <span>Centroid Coordinates: 23.2156° N, 72.6369° E</span>
                <span className="text-blue-600 font-semibold">Boundary Verified</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. TAB 3: APPLY FOR OWNERSHIP TRANSFER (WITH DRAFT & NOTARY UPLOAD) */}
      {/* ==================================================================== */}
      {activeCitizenTab === 'apply' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                  Apply for Ownership Transfer / Official Certificate
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Execute standard sale agreements, attach notary seals, and submit applications directly to the Revenue Department.
                </p>
              </div>

              {/* Sub-Type Toggle */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs shrink-0 font-bold">
                <button
                  type="button"
                  onClick={() => setApplyType('transfer')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    applyType === 'transfer'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Ownership Transfer
                </button>
                <button
                  type="button"
                  onClick={() => setApplyType('certificate')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    applyType === 'certificate'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Land Certificate (7/12)
                </button>
              </div>
            </div>

            {/* FORM A: OWNERSHIP TRANSFER */}
            {applyType === 'transfer' && (
              <form onSubmit={handleTransferSubmit} className="pt-6 space-y-6">
                
                {/* 1. Step: Download Draft Agreement ("Bana Paper") Card */}
                <div className="bg-gradient-to-r from-blue-50/80 via-white to-amber-50/50 rounded-2xl border-2 border-blue-200 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <FileDown className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-extrabold text-sm text-slate-900">
                          Step 1: Download Standard Sale Agreement ("Bana Paper") Template
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                          Form 33-A
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 max-w-xl">
                        Download the official standard sale agreement draft approved by the Gujarat Revenue Department. Have both Buyer and Seller execute this draft before a certified Notary Public prior to uploading below.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsTemplateModalOpen(true)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5 shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Draft Agreement</span>
                  </button>
                </div>

                {/* 2. Step: Subject Parcel & Buyer Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Subject Land Parcel (ULPIN) <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={transferParcelUlpin}
                      onChange={(e) => setTransferParcelUlpin(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      {parcels.map(p => (
                        <option key={p.id} value={p.ulpin}>
                          {p.ulpin} — {p.holderName} ({p.landCategory}, {p.sector})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Agreed Sale Consideration (₹) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={saleAmount}
                      onChange={(e) => setSaleAmount(e.target.value)}
                      placeholder="e.g. ₹ 4,50,00,000"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Buyer / Transferee Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="e.g. Vikram Singhania & Ananya Singhania"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Buyer Contact Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={buyerMobile}
                      onChange={(e) => setBuyerMobile(e.target.value)}
                      placeholder="+91 98231 09841"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Buyer Aadhaar Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerAadhaar}
                      onChange={(e) => setBuyerAadhaar(e.target.value)}
                      placeholder="e.g. 5519 8812 4912"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Application Notes / Remarks
                    </label>
                    <input
                      type="text"
                      value={transferRemarks}
                      onChange={(e) => setTransferRemarks(e.target.value)}
                      placeholder="e.g. Executed before Notary Public; full consideration cleared"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* 3. Step: Notary Attestation Details */}
                <div className="bg-amber-50/60 rounded-2xl border border-amber-200 p-5 space-y-4">
                  <div className="flex items-center space-x-2 border-b border-amber-200/80 pb-2">
                    <Stamp className="w-4 h-4 text-amber-600" />
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-900">
                      Step 2: Notary Attestation & Execution Details
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Notary Registration Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={notaryRegNo}
                        onChange={(e) => setNotaryRegNo(e.target.value)}
                        placeholder="e.g. NOT-GJ-2026-9412"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Date of Execution <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={notaryExecutionDate}
                        onChange={(e) => setNotaryExecutionDate(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Notary Public Advocate Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={notaryName}
                        onChange={(e) => setNotaryName(e.target.value)}
                        placeholder="Adv. Harishchandra Dave"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Notary Chamber / Office Location <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={notaryChamber}
                        onChange={(e) => setNotaryChamber(e.target.value)}
                        placeholder="e.g. District Court, Gandhinagar"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Step: Upload Executed Agreement & Supporting Documents */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700">
                    Step 3: Upload Executed Sale Agreement ("Bana Paper") & Supporting Documents <span className="text-rose-500">*</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Signed Agreement Upload Card */}
                    <label className="p-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-400 bg-slate-50/70 text-center transition-colors cursor-pointer block">
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setUploadedAgreementFile({
                              name: file.name,
                              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                              date: 'Today',
                              verified: true
                            });
                          }
                        }}
                      />
                      <UploadCloud className="w-7 h-7 text-blue-600 mx-auto mb-2" />
                      <span className="font-bold text-xs text-slate-800 block">
                        Executed Standard Sale Agreement ("Bana Paper")
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        PDF up to 10MB with Notary Seal & Stamps (Click to upload)
                      </span>

                      {uploadedAgreementFile && (
                        <div className="mt-3 p-2 bg-white rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-800 font-semibold">
                          <div className="flex items-center space-x-1.5 truncate">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{uploadedAgreementFile.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0">{uploadedAgreementFile.size}</span>
                        </div>
                      )}
                    </label>

                    {/* ID Proofs Upload Card */}
                    <label className="p-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-400 bg-slate-50/70 text-center transition-colors cursor-pointer block">
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setUploadedIdProof({
                              name: file.name,
                              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                              date: 'Today',
                              verified: true
                            });
                          }
                        }}
                      />
                      <ShieldCheck className="w-7 h-7 text-emerald-600 mx-auto mb-2" />
                      <span className="font-bold text-xs text-slate-800 block">
                        Supporting ID & Address Documents
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        Aadhaar, PAN & Electricity Bill (Click to upload)
                      </span>

                      {uploadedIdProof && (
                        <div className="mt-3 p-2 bg-white rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-800 font-semibold">
                          <div className="flex items-center space-x-1.5 truncate">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{uploadedIdProof.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0">{uploadedIdProof.size}</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Ownership Transfer Application</span>
                  </button>
                </div>

              </form>
            )}

            {/* FORM B: OFFICIAL LAND CERTIFICATE (7/12 ROR) */}
            {applyType === 'certificate' && (
              <form onSubmit={handleCertificateSubmit} className="pt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Select Land Parcel <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={certParcelUlpin}
                      onChange={(e) => setCertParcelUlpin(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none"
                    >
                      {citizenParcels.map(p => (
                        <option key={p.id} value={p.ulpin}>
                          {p.ulpin} — {p.holderName} ({p.landCategory})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Certificate Type <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={certType}
                      onChange={(e) => setCertType(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                    >
                      <option value="Record of Rights (7/12 RoR) Extract">Record of Rights (7/12 RoR) Extract</option>
                      <option value="Certified Land Boundary Map (Naksha)">Certified Land Boundary Map (Naksha)</option>
                      <option value="Property Claims & Liabilities Certificate">Property Claims & Liabilities Certificate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Purpose of Certificate Application
                  </label>
                  <input
                    type="text"
                    value={certPurpose}
                    onChange={(e) => setCertPurpose(e.target.value)}
                    placeholder="e.g. Bank Mortgage Clearance / Succession Filing"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply for Land Certificate</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 5. TAB 4: TRACK APPLICATION STATUS (5-STEP VISUAL TRACKER) */}
      {/* ==================================================================== */}
      {activeCitizenTab === 'track' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Track Application Status & Notary Attestation
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Live step-by-step progress tracking from submission through notary review to official approval and title transfer.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {citizenApplications.length} Tracked Applications
            </span>
          </div>

          <div className="space-y-4">
            {citizenApplications.map((app) => {
              const isApproved = app.status === 'Approved';
              const isRejected = app.status === 'Rejected';
              const isHold = app.status === 'On Hold';

              // 5-Stage Tracker Definition
              const steps = app.trackingSteps || [
                { step: 1, name: 'Submitted', status: 'completed', date: app.submissionDate || '04-Sep-2026', note: 'Request lodged' },
                { step: 2, name: 'Agreement Uploaded', status: 'completed', date: app.submissionDate || '04-Sep-2026', note: 'Sale Agreement ("Bana Paper") attached' },
                { step: 3, name: 'Notary Review', status: isApproved ? 'completed' : 'current', date: '04-Sep-2026', note: 'Notary seal NOT-GJ-2026-8819 verified' },
                { step: 4, name: 'Official Approval', status: isApproved ? 'completed' : 'pending', date: isApproved ? 'Approved' : 'In Progress', note: 'Tehsildar review' },
                { step: 5, name: 'Title Transferred', status: isApproved ? 'completed' : 'pending', date: isApproved ? 'Completed' : 'Pending', note: 'Updated 7/12 issued' }
              ];

              return (
                <div 
                  key={app.id} 
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5"
                >
                  {/* Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm font-extrabold text-blue-700">{app.id}</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-bold text-slate-900 text-sm">{app.type || 'Ownership Transfer'}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-medium block mt-0.5">
                        Land Parcel: <strong>{app.ulpin}</strong> • Transferee: <strong>{app.applicantName}</strong>
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        isApproved
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : isRejected
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : isHold
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {app.status || 'Pending Review'}
                      </span>
                    </div>
                  </div>

                  {/* 5-Step Visual Step-by-Step Progress Tracker */}
                  <div className="py-2">
                    <div className="relative">
                      {/* Connecting Line */}
                      <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0 hidden sm:block" />

                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                        {steps.map((st, idx) => {
                          const isDone = st.status === 'completed' || isApproved;
                          const isCurr = st.status === 'current' && !isApproved;

                          return (
                            <div key={idx} className="flex sm:flex-col items-center sm:items-center text-left sm:text-center space-x-3 sm:space-x-0">
                              
                              {/* Step Node Icon */}
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                                isDone 
                                  ? 'bg-emerald-600 text-white shadow-xs' 
                                  : isCurr 
                                  ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse' 
                                  : 'bg-slate-100 text-slate-400 border border-slate-200'
                              }`}>
                                {isDone ? <Check className="w-4 h-4" /> : st.step}
                              </div>

                              {/* Step Details */}
                              <div className="sm:mt-2 min-w-0">
                                <span className={`block font-bold text-xs ${
                                  isDone ? 'text-slate-900' : isCurr ? 'text-blue-700' : 'text-slate-400'
                                }`}>
                                  {st.name}
                                </span>
                                <span className="text-[10px] text-slate-400 block font-medium truncate">
                                  {st.note}
                                </span>
                              </div>

                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Agreement & Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Stamp className="w-4 h-4 text-amber-600" />
                      <span>Notary Stamp: <strong>{app.notaryRegNo || 'NOT-GJ-2026-8819'}</strong></span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setPreviewAgreementItem(app)}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold border border-amber-200 transition-colors flex items-center space-x-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview Attached Agreement & Notary</span>
                      </button>

                      {isApproved && (
                        <button
                          onClick={() => onViewCertificate({
                            newOwnerName: app.applicantName,
                            ulpin: app.ulpin,
                            sector: 'Gandhinagar Sector 21',
                            landCategory: 'Residential',
                            areaSqM: 3250,
                            areaAcres: 0.80,
                            khasraNo: '142/1'
                          })}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors flex items-center space-x-1.5 shadow-xs"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Official 7/12 Certificate</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ==================================================================== */}
      {/* 6. TAB 5: PROPERTY DUES & TAX STATUS */}
      {/* ==================================================================== */}
      {activeCitizenTab === 'taxes' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                Property Dues & Annual Land Taxes
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Gandhinagar Municipal Corporation (GMC) tax assessment for FY 2025-26.
              </p>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
              taxDues.status === 'Paid'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              {taxDues.status === 'Paid' ? '✓ Dues Cleared' : 'Pending Payment'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Outstanding Balance</span>
              <span className="text-xl font-extrabold text-slate-900 mt-1 block">
                {taxDues.status === 'Paid' ? '₹ 0.00' : '₹ 6,400.00'}
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">GMC Land Assessment</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Assessment Period</span>
              <span className="text-base font-extrabold text-slate-900 mt-1 block">
                FY 2025 - 2026
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Due: 31-Oct-2026</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Receipt Reference</span>
              <span className="text-base font-mono font-bold text-slate-900 mt-1 block">
                {taxDues.receiptId || 'None (Unpaid)'}
              </span>
              <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
                {taxDues.paidAt ? `Paid on ${taxDues.paidAt}` : 'Pay online via UPI / NetBanking'}
              </span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            {taxDues.status === 'Paid' ? (
              <button
                onClick={() => alert(`Official GMC Receipt #${taxDues.receiptId} downloaded.`)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 transition-colors flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>Download Official Tax Receipt</span>
              </button>
            ) : (
              <button
                id="btn-open-payment-modal"
                onClick={() => setIsPaymentModalOpen(true)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Pay Land Taxes (₹ 6,400)</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 7. TAB 6: REPORT ISSUE / GRIEVANCE */}
      {/* ==================================================================== */}
      {activeCitizenTab === 'grievance' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Report Land Issue / Lodge Grievance Ticket
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Submit boundary discrepancies, surveyor demarcation requests, or legal notices directly to the Tehsildar & Legal Resolution queue.
            </p>
          </div>

          <form onSubmit={handleGrievanceSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject Land Parcel (ULPIN) <span className="text-rose-500">*</span>
                </label>
                <select
                  value={grievanceParcelUlpin}
                  onChange={(e) => setGrievanceParcelUlpin(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none"
                >
                  {citizenParcels.map(p => (
                    <option key={p.id} value={p.ulpin}>
                      {p.ulpin} — {p.holderName} ({p.sector})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Issue Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={grievanceCategory}
                  onChange={(e) => setGrievanceCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                >
                  <option value="Boundary Discrepancy">Boundary Discrepancy / Demarcation Request</option>
                  <option value="Encroachment Report">Encroachment on Adjacent Buffer</option>
                  <option value="Name / Title Typo">Name / Title Record Typographical Correction</option>
                  <option value="Tax Assessment Query">Tax Assessment Query</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Urgency Level
                </label>
                <select
                  value={grievanceUrgency}
                  onChange={(e) => setGrievanceUrgency(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                >
                  <option value="Routine">Routine</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Critical">Critical (Immediate Field Demarcation)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Grievance Subject <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={grievanceSubject}
                  onChange={(e) => setGrievanceSubject(e.target.value)}
                  placeholder="e.g. Northern boundary pillar variance (0.8m) following stormwater drain works"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Detailed Statement & Field Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={grievanceDescription}
                onChange={(e) => setGrievanceDescription(e.target.value)}
                placeholder="Describe the discrepancy, GPS pillar reference, or survey order required..."
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Lodge Grievance Ticket</span>
              </button>
            </div>
          </form>

          {/* Citizen Grievance History */}
          {grievances.length > 0 && (
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <h3 className="font-extrabold text-sm text-slate-900">
                Your Lodged Grievance Tickets ({grievances.length})
              </h3>
              <div className="space-y-2">
                {grievances.map((g) => (
                  <div key={g.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-rose-700">{g.id}</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-bold text-slate-800">{g.subject}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Parcel: <strong>{g.ulpin}</strong> • Category: <strong>{g.category}</strong> • Date: {g.date}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                      {g.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* 8. MODALS */}
      {/* ==================================================================== */}

      {/* Standard Sale Agreement ("Bana Paper") Template Modal */}
      {isTemplateModalOpen && (
        <AgreementTemplateModal
          isOpen={isTemplateModalOpen}
          onClose={() => setIsTemplateModalOpen(false)}
          parcel={selectedSearchParcel || selectedParcelObj}
        />
      )}

      {/* Attached Agreement & Notary Preview Modal */}
      {previewAgreementItem && (
        <AgreementPreviewModal
          isOpen={Boolean(previewAgreementItem)}
          onClose={() => setPreviewAgreementItem(null)}
          agreementData={previewAgreementItem}
          isOfficial={false}
        />
      )}

      {/* Mock Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2">
                <IndianRupee className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-sm text-slate-900">GMC Property Tax Payment Gateway</h3>
              </div>
              <button onClick={() => setIsPaymentModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Annual Assessment (FY 2025-26):</span>
                <span className="font-bold text-slate-900">₹ 6,000.00</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Civic Infrastructure Cess:</span>
                <span className="font-bold text-slate-900">₹ 400.00</span>
              </div>
              <div className="flex justify-between text-slate-900 font-extrabold pt-2 border-t text-sm">
                <span>Total Amount Due:</span>
                <span className="text-emerald-700">₹ 6,400.00</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleExecutePayment}
                disabled={isPaying}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1.5"
              >
                {isPaying ? <span>Processing...</span> : <span>Confirm & Pay ₹ 6,400</span>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Deed Viewer Modal */}
      {viewingDeedParcel && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-sm text-slate-900">
                  Digital Conveyance Deed — {viewingDeedParcel.ulpin}
                </h3>
              </div>
              <button onClick={() => setViewingDeedParcel(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border font-serif text-xs leading-relaxed space-y-4 text-slate-800">
              <div className="text-center border-b pb-3 font-sans">
                <h4 className="font-bold text-sm text-slate-900">SUB-REGISTRAR OFFICE • GANDHINAGAR</h4>
                <p className="text-[11px] text-slate-500">Volume 892, Book I, Registration Document #GDN-2022-8190</p>
              </div>

              <p>
                <strong>CERTIFICATE OF REGISTRATION:</strong> This indenture of conveyance executed on 14-Aug-2022 conveys the parcel bearing 14-digit ULPIN <strong>{viewingDeedParcel.ulpin}</strong> situated at Sector 21, Gandhinagar, admeasuring <strong>{viewingDeedParcel.areaSqM.toLocaleString()} sq. meters</strong> in favor of <strong>{viewingDeedParcel.holderName}</strong>.
              </p>

              <div className="grid grid-cols-2 gap-3 p-3 bg-white rounded-xl border font-sans text-[11px]">
                <div>
                  <span className="text-slate-400 block font-bold">Land Detail Record (Khasra) #:</span>
                  <span className="font-bold text-slate-900">{viewingDeedParcel.khasraNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold">Property Claims & Liabilities:</span>
                  <span className="font-bold text-emerald-700">Clear Title</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-400">Digitally Sealed with DSC Level 3</span>
              <button
                onClick={() => alert(`Digital Deed PDF downloaded for ${viewingDeedParcel.ulpin}`)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Certified Deed</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
