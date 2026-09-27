import React, { useState } from 'react';
import HeaderNav from './components/HeaderNav';
import KpiMetricsBar from './components/KpiMetricsBar';
import GandhinagarGisMap from './components/GandhinagarGisMap';
import OfficerControlPanel from './components/OfficerControlPanel';
import PropertyDossierModal from './components/PropertyDossierModal';
import MutationTransferModal from './components/MutationTransferModal';
import DigiLockerEkycModal from './components/DigiLockerEkycModal';
import MultiOwnerEkycModal from './components/MultiOwnerEkycModal';
import CelebratoryModal from './components/CelebratoryModal';
import RorCertificateModal from './components/RorCertificateModal';
import RejectionModal from './components/RejectionModal';
import AiEncroachmentModal from './components/AiEncroachmentModal';
import AiIntelligenceHub from './components/AiIntelligenceHub';
import EkycHub from './components/EkycHub';
import AuditTrail from './components/AuditTrail';
import { 
  INITIAL_PARCELS, 
  INITIAL_MUTATION_QUEUE, 
  INITIAL_AUDIT_LOGS, 
  OFFICER_PROFILES 
} from './data/gandhinagarParcels';
import { CheckCircle2, X, ExternalLink, Search, MapPin, ArrowRight } from 'lucide-react';

export default function App() {
  // Navigation & Officer RBAC Profile State
  const [activeTab, setActiveTab] = useState('map'); // 'map', 'officer', 'ai-hub', 'ekyc', 'audit'
  const [currentOfficer, setCurrentOfficer] = useState(OFFICER_PROFILES[0]); // Rajesh Kumar (#8821)

  // Primary Data State
  const [parcels, setParcels] = useState(INITIAL_PARCELS);
  const [mutationQueue, setMutationQueue] = useState(INITIAL_MUTATION_QUEUE);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [completedMutationsCount, setCompletedMutationsCount] = useState(4);

  // Top Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Modals & Active Selections
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  
  // DigiLocker eKYC State
  const [isEkycOpen, setIsEkycOpen] = useState(false);
  const [ekycContext, setEkycContext] = useState(null); // { targetParcel, targetApplicant, onVerifiedCallback }

  // Multi-Owner Sequential eKYC Modal State
  const [isMultiOwnerEkycOpen, setIsMultiOwnerEkycOpen] = useState(false);
  const [multiOwnerParcelTarget, setMultiOwnerParcelTarget] = useState(null);

  // Post-Mutation Celebratory & Certificate Modals
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const [celebrationDetails, setCelebrationDetails] = useState(null);
  const [isRorCertOpen, setIsRorCertOpen] = useState(false);
  const [rorCertDetails, setRorCertDetails] = useState(null);

  // Rejection Modal State
  const [isRejectionOpen, setIsRejectionOpen] = useState(false);
  const [rejectionTarget, setRejectionTarget] = useState(null);

  // AI Satellite Encroachment Inspector Modal State
  const [isAiEncroachmentOpen, setIsAiEncroachmentOpen] = useState(false);
  const [aiEncroachmentTarget, setAiEncroachmentTarget] = useState(null);

  // Active Toast Notification
  const [activeToast, setActiveToast] = useState(null);

  // Toast Helper
  const showToast = (title, message, type = 'success') => {
    setActiveToast({ title, message, type });
    setTimeout(() => {
      setActiveToast(null);
    }, 4800);
  };

  // Helper to add immutable audit log
  const logAuditEvent = (action, ulpin, details) => {
    const newEntry = {
      id: `LOG-${Math.floor(89102 + Math.random() * 1000)}`,
      blockHeight: 184920 + auditLogs.length + 1,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      officerName: currentOfficer?.name || 'Rajesh Kumar',
      officerRole: currentOfficer?.title || 'Tehsildar / Revenue Officer',
      officerBadge: currentOfficer?.badgeId || '#8821',
      action: action,
      ulpin: ulpin || 'GJ06GND000101',
      details: details,
      verificationHash: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    };

    setAuditLogs(prev => [newEntry, ...prev]);
  };

  // ====================================================================
  // DOSSIER & MANUAL MUTATION FLOWS
  // ====================================================================
  const handleOpenDossier = (parcel) => {
    setSelectedParcel(parcel);
    setIsDossierOpen(true);
  };

  const handleCloseDossier = () => {
    setIsDossierOpen(false);
  };

  // Trigger eKYC verification directly from Dossier or EkycHub
  const handleTriggerDirectEkyc = (target) => {
    setEkycContext({
      targetParcel: target,
      targetApplicant: {
        applicantName: target?.holderName || 'Registered Citizen',
        ulpin: target?.ulpin || 'GJ06GND000101'
      },
      onSuccess: (verifiedData) => {
        showToast(
          'DigiLocker Verified',
          `Citizen ${verifiedData.verifiedName} verified with Seal ${verifiedData.verificationSealId}.`,
          'success'
        );
        logAuditEvent(
          'EKYC_VERIFIED',
          verifiedData.ulpin,
          `DigiLocker zero-knowledge identity authenticated for ${verifiedData.verifiedName}.`
        );
        setIsEkycOpen(false);
      }
    });
    setIsEkycOpen(true);
  };

  // Initiate mutation from Dossier
  const handleInitiateMutationFromDossier = (parcel) => {
    setIsDossierOpen(false);
    setSelectedParcel(parcel);
    setIsTransferOpen(true);
  };

  // Open Multi-Owner Sequential eKYC Modal
  const handleOpenMultiOwnerEkyc = (parcel) => {
    setIsDossierOpen(false);
    setMultiOwnerParcelTarget(parcel || selectedParcel);
    setIsMultiOwnerEkycOpen(true);
  };

  // Callback when 100% multi-owner consent is confirmed
  const handleCompleteMultiOwnerConsent = (result) => {
    // 1. Update parcels in state
    setParcels(prev => prev.map(p => {
      if (p.ulpin === result.ulpin || p.id === result.parcelId) {
        return {
          ...p,
          jointConsentStatus: 'Verified',
          statusNote: '100% Multi-Owner Quorum Consent Verified (DL-MSIG-2026-GJ06-000101-994A)',
          coOwners: result.coOwners
        };
      }
      return p;
    }));

    // 2. Update selectedParcel if active
    setSelectedParcel(prev => {
      if (prev && (prev.ulpin === result.ulpin || prev.id === result.parcelId)) {
        return {
          ...prev,
          jointConsentStatus: 'Verified',
          statusNote: '100% Multi-Owner Quorum Consent Verified (DL-MSIG-2026-GJ06-000101-994A)',
          coOwners: result.coOwners
        };
      }
      return prev;
    });

    // 3. Queue into Mutation Approval Queue
    const newQueueItem = {
      id: `MUT-2026-${Math.floor(7000 + Math.random() * 2000)}`,
      ulpin: result.ulpin,
      applicantName: 'Ramesh Patel & Suresh Patel (Joint Khata)',
      coOwners: result.coOwners,
      type: 'Joint Khata Succession & Consent Verification',
      sector: 'Sector 21',
      dateSubmitted: 'Today (Immediate)',
      status: 'PENDING_APPROVAL',
      riskScore: 'Low (0.02)',
      verificationBadge: '100% Multi-Sig Verified',
      receiptId: result.multiSigReceiptId,
      officerAssigned: currentOfficer?.name || 'Rajesh Kumar (#8821)'
    };
    setMutationQueue(prev => [newQueueItem, ...prev]);

    // 4. Immutable Audit Trail
    logAuditEvent(
      'JOINT_KHATA_CONSENT_100',
      result.ulpin,
      `Multi-Sig Digital Consent Certificate generated (${result.multiSigReceiptId}) with 100% consensus under Section 135-D.`
    );

    // 5. Toast Notification
    showToast(
      'Multi-Owner Consent Complete',
      '100% consensus quorum verified across all co-owners. Application routed to Tehsildar Approval Queue.',
      'success'
    );
  };

  // Execute manual mutation after form submission -> triggers eKYC first!
  const handleCompleteMutationTransfer = (data) => {
    setIsTransferOpen(false);

    // Gated by DigiLocker eKYC:
    setEkycContext({
      targetParcel: selectedParcel,
      targetApplicant: {
        applicantName: data.newHolderName,
        ulpin: data.ulpin
      },
      onSuccess: (verifiedData) => {
        setIsEkycOpen(false);

        // 1. Update parcel state
        setParcels(prev => prev.map(p => {
          if (p.id === data.parcelId || p.ulpin === data.ulpin) {
            return {
              ...p,
              holderName: data.newHolderName,
              mobile: data.newMobile,
              aadhaarMasked: data.newAadhaarMasked,
              transactionValue: data.saleAmount,
              previousOwner: data.previousOwner,
              purchaseDate: data.transactionDate,
              status: 'Clear',
              statusNote: 'Title successfully mutated via verified Conveyance Deed'
            };
          }
          return p;
        }));

        // 2. Add to mutation queue
        const newRecordId = `MUT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const newQueueItem = {
          id: newRecordId,
          ulpin: data.ulpin,
          landCategory: selectedParcel?.landCategory || 'Residential',
          applicantName: data.newHolderName,
          applicantPhone: data.newMobile,
          type: 'Sale Deed Conveyance',
          submissionDate: data.transactionDate,
          preVerification: 'DigiLocker eKYC Cleared',
          status: 'Approved',
          saleAmount: data.saleAmount,
          reviewNotes: `Title mutated from ${data.previousOwner} to ${data.newHolderName} under Section 135.`
        };

        setMutationQueue(prev => [newQueueItem, ...prev]);
        setCompletedMutationsCount(prev => prev + 1);

        // 3. Log to audit ledger
        logAuditEvent(
          'MUTATION_APPROVED',
          data.ulpin,
          `Conveyance transfer approved for ${data.newHolderName} (${data.saleAmount}). Verified eKYC ${verifiedData.verificationSealId}.`
        );

        // 4. Update selected parcel
        setSelectedParcel(prev => prev ? {
          ...prev,
          holderName: data.newHolderName,
          mobile: data.newMobile,
          aadhaarMasked: data.newAadhaarMasked,
          transactionValue: data.saleAmount,
          previousOwner: data.previousOwner,
          purchaseDate: data.transactionDate,
          status: 'Clear'
        } : prev);

        // 5. Trigger "WELCOME HOME!" celebratory modal
        const details = {
          newOwnerName: data.newHolderName,
          ulpin: data.ulpin,
          sector: selectedParcel?.sector || 'Gandhinagar Sector 21',
          saleAmount: data.saleAmount,
          landCategory: selectedParcel?.landCategory || 'Residential',
          areaSqM: selectedParcel?.areaSqM || 3250,
          areaAcres: selectedParcel?.areaAcres || 0.80,
          khasraNo: selectedParcel?.khasraNo || '142/1',
          officerName: currentOfficer?.name || 'Rajesh Kumar',
          officerTitle: currentOfficer?.title || 'Tehsildar / Revenue Officer'
        };

        setCelebrationDetails(details);
        setRorCertDetails(details);
        setIsCelebrationOpen(true);

        showToast(
          'Mutation Sanctioned & Recorded!',
          `7/12 RoR updated. Welcome Home docket issued to ${data.newHolderName}.`,
          'success'
        );
      }
    });

    setIsEkycOpen(true);
  };

  // ====================================================================
  // OFFICER QUEUE CONTROLS: APPROVE, REJECT, HOLD
  // ====================================================================
  
  // 🟢 Approve from Queue: Triggers DigiLocker eKYC -> updates state -> shows "WELCOME HOME!" modal
  const handleApproveFromQueue = (item) => {
    const matchedParcel = parcels.find(p => p.ulpin === item.ulpin);

    setEkycContext({
      targetParcel: matchedParcel,
      targetApplicant: item,
      onSuccess: (verifiedData) => {
        setIsEkycOpen(false);

        // Update queue item
        setMutationQueue(prev => prev.map(m => {
          if (m.id === item.id) {
            return { ...m, status: 'Approved' };
          }
          return m;
        }));

        // If matched parcel, update parcel owner as well
        if (matchedParcel) {
          setParcels(prev => prev.map(p => {
            if (p.ulpin === item.ulpin) {
              return {
                ...p,
                holderName: item.applicantName,
                status: 'Clear',
                statusNote: 'Updated & confirmed by Tehsildar order'
              };
            }
            return p;
          }));
        }

        setCompletedMutationsCount(prev => prev + 1);

        // Log to Audit Ledger
        logAuditEvent(
          'MUTATION_APPROVED',
          item.ulpin,
          `Application ${item.id} sanctioned by ${currentOfficer?.name}. Transferred to ${item.applicantName}. eKYC seal ${verifiedData.verificationSealId}.`
        );

        // Trigger "WELCOME HOME!" Celebratory Modal
        const details = {
          newOwnerName: item.applicantName,
          ulpin: item.ulpin,
          sector: matchedParcel?.sector || 'Gandhinagar Sector 21',
          saleAmount: item.saleAmount || '₹ 4,50,00,000',
          landCategory: item.landCategory || matchedParcel?.landCategory || 'Residential',
          areaSqM: matchedParcel?.areaSqM || 3250,
          areaAcres: matchedParcel?.areaAcres || 0.80,
          khasraNo: matchedParcel?.khasraNo || '142/1',
          officerName: currentOfficer?.name || 'Rajesh Kumar',
          officerTitle: currentOfficer?.title || 'Tehsildar / Revenue Officer'
        };

        setCelebrationDetails(details);
        setRorCertDetails(details);
        setIsCelebrationOpen(true);

        showToast(
          'Mutation Docket Approved!',
          `Application ${item.id} approved by ${currentOfficer?.name}. Welcome Home modal ready.`,
          'success'
        );
      }
    });

    setIsEkycOpen(true);
  };

  // 🔴 Reject from Queue: Opens RejectionModal
  const handleOpenRejectModal = (item) => {
    setRejectionTarget(item);
    setIsRejectionOpen(true);
  };

  // Confirm official rejection with comment
  const handleConfirmRejection = (applicationId, reasonComment) => {
    setMutationQueue(prev => prev.map(m => {
      if (m.id === applicationId) {
        return { 
          ...m, 
          status: 'Rejected',
          reviewNotes: reasonComment
        };
      }
      return m;
    }));

    // Log to Audit Trail
    logAuditEvent(
      'MUTATION_REJECTED',
      rejectionTarget?.ulpin || 'UNKNOWN',
      `Application ${applicationId} rejected by ${currentOfficer?.name}. Statutory Reason: ${reasonComment}`
    );

    setIsRejectionOpen(false);
    showToast(
      'Application Contested & Rejected',
      `Docket ${applicationId} rejected with official comment. Recorded in Audit Ledger.`,
      'error'
    );
  };

  // 🔵 Review / Hold from Queue
  const handleHoldFromQueue = (item) => {
    setMutationQueue(prev => prev.map(m => {
      if (m.id === item.id) {
        return { 
          ...m, 
          status: 'On Hold',
          reviewNotes: 'Flagged by Officer for physical field demarcation survey & boundary check.'
        };
      }
      return m;
    }));

    logAuditEvent(
      'FIELD_INSPECTION_ORDERED',
      item.ulpin,
      `Application ${item.id} flagged for on-site demarcation by ${currentOfficer?.name}.`
    );

    showToast(
      'Placed on Inspection Hold',
      `Application ${item.id} held pending field demarcation survey.`,
      'info'
    );
  };

  // Review item opens property dossier
  const handleReviewItem = (item) => {
    const matchedParcel = parcels.find(p => p.ulpin === item.ulpin);
    if (matchedParcel) {
      setSelectedParcel(matchedParcel);
      setIsDossierOpen(true);
    } else {
      showToast('ULPIN Info', `Viewing application ${item.id} details for ${item.ulpin}`);
    }
  };

  // Locate parcel on GIS map
  const handleViewParcelMap = (ulpin) => {
    const matchedParcel = parcels.find(p => p.ulpin === ulpin);
    if (matchedParcel) {
      setSelectedParcel(matchedParcel);
      setActiveTab('map');
    }
  };

  // Download RoR Certificate handler (opens Certificate modal)
  const handleOpenRorCertificate = () => {
    setIsCelebrationOpen(false);
    setIsRorCertOpen(true);
  };

  // Profile Switching handler
  const handleSelectOfficer = (profile) => {
    setCurrentOfficer(profile);
    showToast(
      'Profile Switched',
      `Active officer: ${profile.name} (${profile.title})`,
      'success'
    );
  };

  // Cadastral Search Query Matching (by ULPIN, Owner Name, Khasra, Sector, Category)
  const searchResults = searchQuery.trim() === '' ? [] : parcels.filter(p => {
    const q = searchQuery.toLowerCase();
    return (
      p.ulpin.toLowerCase().includes(q) ||
      p.holderName.toLowerCase().includes(q) ||
      (p.khasraNo && p.khasraNo.toLowerCase().includes(q)) ||
      (p.sector && p.sector.toLowerCase().includes(q)) ||
      (p.landCategory && p.landCategory.toLowerCase().includes(q))
    );
  }).slice(0, 6);

  const handleSelectSearchParcel = (parcel) => {
    setSelectedParcel(parcel);
    setActiveTab('map');
    setIsDossierOpen(true);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  // AI Satellite Encroachment Inspector Handlers
  const handleInspectEncroachment = (item) => {
    const matchedParcel = parcels.find(p => p.ulpin === item.ulpin);
    const record = {
      ...item,
      applicantName: item.applicantName || item.holderName || matchedParcel?.holderName || 'Registered Citizen',
      ulpin: item.ulpin,
      landCategory: item.landCategory || matchedParcel?.landCategory || 'Residential',
      encroachmentDetails: item.encroachmentDetails || {
        historicalYear: 2022,
        currentYear: 2026,
        boundaryDeviation: item.deviationText || 'Boundary Shift Detected: 2.4m onto Public Reserve',
        deviationAreaSqM: item.deviationAreaSqM || 142,
        aiConfidence: item.confidence ? `${item.confidence} AI Confidence Score` : '94.2% AI Confidence Score',
        zoneType: item.locality || 'High-Tension Power & Public Drainage Corridor',
        sensorSource: 'ISRO Cartosat-3 (0.28m) & Sentinel-2 Orthomosaic Stream',
        surveyorRecommended: 'Demarcation Rover Unit 04',
        coordinates: matchedParcel?.centroid || [23.2136, 72.6385]
      }
    };
    setAiEncroachmentTarget(record);
    setIsAiEncroachmentOpen(true);
  };

  const handleIssueNotice = (record, reason) => {
    logAuditEvent(
      'ENCROACHMENT_NOTICE_ISSUED',
      record.ulpin,
      `Digital Statutory Notice under Gujarat Land Revenue Code Sec 61 issued to ${record.applicantName || record.holderName}. ${reason || 'Encroachment detected'}. Penalty: ₹25,000/day after 7-day cure period.`
    );
    showToast(
      'Digital Statutory Notice Issued',
      `Dispatched notice to ${record.applicantName || record.holderName} (ULPIN: ${record.ulpin}) via DigiLocker e-Notice Gateway.`,
      'error'
    );
  };

  // Compute live active risk flags count
  const riskFlagsCount = parcels.filter(p => p.status === 'Flagged').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      
      {/* ==================================================================== */}
      {/* 1. TOP HEADER & OFFICER PROFILE SWITCHER */}
      {/* ==================================================================== */}
      <HeaderNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentOfficer={currentOfficer}
        onSelectOfficer={handleSelectOfficer}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        
        {/* ==================================================================== */}
        {/* CENTERED PROMINENT CADASTRE SEARCH BAR (max-w-2xl mx-auto) */}
        {/* ==================================================================== */}
        <div className="max-w-2xl mx-auto w-full mb-6 relative z-30">
          <div className="relative flex items-center">
            <div className="absolute left-4 pointer-events-none flex items-center text-slate-400">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <input
              id="main-cadastral-search-bar"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search by ULPIN (e.g. GJ06GND000101), Survey/Khasra (142/1), Citizen Name..."
              className="w-full pl-12 pr-10 py-3.5 bg-white border-2 border-slate-200 hover:border-slate-300 focus:border-blue-500 rounded-2xl shadow-sm text-sm font-medium text-slate-800 placeholder-slate-400 transition-all outline-none focus:ring-4 focus:ring-blue-500/15"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setIsSearchFocused(false); }}
                className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Live Autocomplete Results Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div 
              id="cadastral-search-results-dropdown"
              className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <div className="px-4 py-2 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Cadastral Match Results ({searchResults.length})</span>
                <span className="text-[10px] text-blue-600 font-semibold">Click to Open Dossier & Focus Map</span>
              </div>
              {searchResults.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelectSearchParcel(p)}
                  className="p-3.5 hover:bg-blue-50/60 cursor-pointer transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-slate-900 group-hover:text-blue-700">
                          {p.holderName}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          {p.landCategory}
                        </span>
                        {p.status === 'Flagged' && (
                          <span className="px-1.5 py-0.5 rounded text-[9.5px] font-extrabold bg-rose-100 text-rose-700 border border-rose-200">
                            AI Flagged
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center space-x-2">
                        <span className="text-blue-700 font-bold">{p.ulpin}</span>
                        <span>•</span>
                        <span>Khasra: {p.khasraNo}</span>
                        <span>•</span>
                        <span>{p.sector}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ==================================================================== */}
        {/* 2. CENTERED TOP KPI BAR (4 HIGH-IMPACT CARDS) */}
        {/* ==================================================================== */}
        <KpiMetricsBar 
          totalParcelsCount={parcels.length}
          totalLandArea="48,250 sq. m (11.9 Acres)"
          riskFlagsCount={riskFlagsCount}
          completedMutationsCount={completedMutationsCount}
        />

        {/* ==================================================================== */}
        {/* 3. CENTERED TAB NAVIGATION ROUTING */}
        {/* ==================================================================== */}
        
        {/* TAB 1: GIS OneView Map */}
        {activeTab === 'map' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Cadastral GIS OneView Map (Gandhinagar Sector 21 / 22 Cadastre)
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Vector engine with animated glowing boundary tracing and 3-way basemap switching (No API Key required)
                </p>
              </div>

              <button
                onClick={() => setActiveTab('officer')}
                className="text-blue-600 hover:text-blue-800 font-bold text-xs flex items-center space-x-1"
              >
                <span>Go to Officer Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <GandhinagarGisMap
              parcels={parcels}
              selectedParcel={selectedParcel}
              onSelectParcel={setSelectedParcel}
              onOpenDossier={handleOpenDossier}
            />
          </div>
        )}

        {/* TAB 2: Officer Control Panel */}
        {activeTab === 'officer' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Government Officer Control Center & Analytics Dashboard
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Quasi-judicial application queue with DigiLocker eKYC approvals, statutory reject flows, and Recharts analytics
                </p>
              </div>

              <button
                onClick={() => setActiveTab('map')}
                className="text-blue-600 hover:text-blue-800 font-bold text-xs flex items-center space-x-1"
              >
                <span>Back to Cadastral GIS Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <OfficerControlPanel
              mutationQueue={mutationQueue}
              currentOfficer={currentOfficer}
              onApproveMutation={handleApproveFromQueue}
              onRejectMutation={handleOpenRejectModal}
              onHoldMutation={handleHoldFromQueue}
              onReviewMutation={handleReviewItem}
              onInspectEncroachment={handleInspectEncroachment}
              onViewParcelMap={handleViewParcelMap}
            />
          </div>
        )}

        {/* TAB 3: AI Intelligence Hub */}
        {activeTab === 'ai-hub' && (
          <AiIntelligenceHub 
            onInspectEncroachment={handleInspectEncroachment}
            onViewParcelMap={handleViewParcelMap}
            currentOfficer={currentOfficer}
          />
        )}

        {/* TAB 4: eKYC Hub */}
        {activeTab === 'ekyc' && (
          <EkycHub 
            onTriggerEkyc={handleTriggerDirectEkyc}
            currentOfficer={currentOfficer}
          />
        )}

        {/* TAB 5: Audit Logs */}
        {activeTab === 'audit' && (
          <AuditTrail 
            auditLogs={auditLogs}
            currentOfficer={currentOfficer}
          />
        )}

      </main>

      {/* ==================================================================== */}
      {/* 4. CENTERED PROPERTY DOSSIER MODAL */}
      {/* ==================================================================== */}
      {isDossierOpen && selectedParcel && (
        <PropertyDossierModal
          parcel={selectedParcel}
          onClose={handleCloseDossier}
          onInitiateMutation={handleInitiateMutationFromDossier}
          onTriggerEkyc={handleTriggerDirectEkyc}
          onOpenAiInspector={handleInspectEncroachment}
          onInitiateMultiOwnerConsent={handleOpenMultiOwnerEkyc}
        />
      )}

      {/* ==================================================================== */}
      {/* 5. MANUAL MUTATION TRANSFER MODAL */}
      {/* ==================================================================== */}
      {isTransferOpen && selectedParcel && (
        <MutationTransferModal
          parcel={selectedParcel}
          onClose={() => setIsTransferOpen(false)}
          onCompleteMutation={handleCompleteMutationTransfer}
        />
      )}

      {/* ==================================================================== */}
      {/* 6. DIGILOCKER eKYC MODAL (MANDATORY SAFETY FEATURE) */}
      {/* ==================================================================== */}
      {isEkycOpen && (
        <DigiLockerEkycModal
          isOpen={isEkycOpen}
          onClose={() => setIsEkycOpen(false)}
          targetParcel={ekycContext?.targetParcel}
          targetApplicant={ekycContext?.targetApplicant}
          onSuccessVerification={ekycContext?.onSuccess}
        />
      )}

      {/* ==================================================================== */}
      {/* 6B. MULTI-OWNER SEQUENTIAL eKYC MODAL (JOINT KHATA GATEWAY) */}
      {/* ==================================================================== */}
      {isMultiOwnerEkycOpen && multiOwnerParcelTarget && (
        <MultiOwnerEkycModal
          isOpen={isMultiOwnerEkycOpen}
          onClose={() => setIsMultiOwnerEkycOpen(false)}
          parcel={multiOwnerParcelTarget}
          onConsentCompleted={handleCompleteMultiOwnerConsent}
        />
      )}

      {/* ==================================================================== */}
      {/* 7. POST-MUTATION CELEBRATORY "WELCOME HOME!" MODAL */}
      {/* ==================================================================== */}
      {isCelebrationOpen && celebrationDetails && (
        <CelebratoryModal
          isOpen={isCelebrationOpen}
          onClose={() => setIsCelebrationOpen(false)}
          mutationDetails={celebrationDetails}
          onDownloadCertificate={handleOpenRorCertificate}
          onViewOnMap={(ulpin) => {
            setIsCelebrationOpen(false);
            handleViewParcelMap(ulpin);
          }}
        />
      )}

      {/* ==================================================================== */}
      {/* 8. OFFICIAL ROR 7/12 CERTIFICATE MODAL (PRINTABLE PDF) */}
      {/* ==================================================================== */}
      {isRorCertOpen && rorCertDetails && (
        <RorCertificateModal
          isOpen={isRorCertOpen}
          onClose={() => setIsRorCertOpen(false)}
          details={rorCertDetails}
        />
      )}

      {/* ==================================================================== */}
      {/* 9. REJECTION REASON MODAL (MANDATORY OFFICER COMMENT) */}
      {/* ==================================================================== */}
      {isRejectionOpen && rejectionTarget && (
        <RejectionModal
          isOpen={isRejectionOpen}
          onClose={() => setIsRejectionOpen(false)}
          application={rejectionTarget}
          onConfirmReject={handleConfirmRejection}
        />
      )}

      {/* ==================================================================== */}
      {/* 10. AI SATELLITE ENCROACHMENT INSPECTOR MODAL */}
      {/* ==================================================================== */}
      {isAiEncroachmentOpen && aiEncroachmentTarget && (
        <AiEncroachmentModal
          isOpen={isAiEncroachmentOpen}
          onClose={() => setIsAiEncroachmentOpen(false)}
          record={aiEncroachmentTarget}
          onIssueNotice={handleIssueNotice}
          currentOfficer={currentOfficer}
        />
      )}

      {/* Notification Toast */}
      {activeToast && (
        <div className="fixed bottom-5 right-5 z-70 flex items-start space-x-3 p-4 bg-white rounded-2xl shadow-xl border border-slate-200 animate-in slide-in-from-bottom-3 duration-200 max-w-sm">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
            activeToast.type === 'error'
              ? 'bg-rose-50 border border-rose-200 text-rose-600'
              : activeToast.type === 'info'
              ? 'bg-blue-50 border border-blue-200 text-blue-600'
              : 'bg-emerald-50 border border-emerald-200 text-emerald-600'
          }`}>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs">
            <h4 className="font-bold text-slate-900">{activeToast.title}</h4>
            <p className="text-slate-600 mt-0.5">{activeToast.message}</p>
          </div>
          <button
            onClick={() => setActiveToast(null)}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-3.5 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center space-x-2 font-medium">
            <span className="font-bold text-slate-800">LandStack OneView DPI</span>
            <span>•</span>
            <span>Gandhinagar Urban Development Authority (GUDA) & GMC</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">DigiLocker eKYC Certified</span>
          </div>
          <div className="text-[11px] text-slate-400">
            React 19 • Leaflet (preferCanvas) • Tailwind CSS • Recharts
          </div>
        </div>
      </footer>

    </div>
  );
}
