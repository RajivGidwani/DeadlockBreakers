import React, { useState } from 'react';
import LandingLogin from './components/LandingLogin';
import HeaderNav from './components/HeaderNav';
import GovernmentPortal from './components/GovernmentPortal';
import CitizenPortal from './components/CitizenPortal';
import PropertyDossierModal from './components/PropertyDossierModal';
import MutationTransferModal from './components/MutationTransferModal';
import DigiLockerEkycModal from './components/DigiLockerEkycModal';
import MultiOwnerEkycModal from './components/MultiOwnerEkycModal';
import CelebratoryModal from './components/CelebratoryModal';
import RorCertificateModal from './components/RorCertificateModal';
import RejectionModal from './components/RejectionModal';
import AiEncroachmentModal from './components/AiEncroachmentModal';
import { 
  INITIAL_PARCELS, 
  INITIAL_MUTATION_QUEUE, 
  INITIAL_AUDIT_LOGS, 
  OFFICER_PROFILES 
} from './data/gandhinagarParcels';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Authentication & Role State: null (Landing / Login), 'government', or 'citizen'
  const [userRole, setUserRole] = useState(null);

  // Government Portal Active Tab: 'map', 'queue', 'disputes', 'analytics', 'audit'
  const [govTab, setGovTab] = useState('map');
  const [currentOfficer, setCurrentOfficer] = useState(OFFICER_PROFILES[0]); // Rajesh Kumar (#8821)

  // Primary Data State
  const [parcels, setParcels] = useState(INITIAL_PARCELS);
  const [mutationQueue, setMutationQueue] = useState(INITIAL_MUTATION_QUEUE);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  // Citizen-specific state
  const [taxDues, setTaxDues] = useState({
    status: 'Pending',
    amount: 6400,
    receiptId: null,
    paidAt: null
  });

  const [grievances, setGrievances] = useState([
    {
      id: 'GRV-2026-0412',
      ulpin: 'GJ06GND000101',
      category: 'Boundary Discrepancy',
      subject: 'Northern wall offset discrepancy (0.8m) with municipal green belt',
      description: 'Requesting surveyor demarcation to verify boundary offset pillars following storm water drain construction.',
      urgency: 'Routine',
      date: '18-Feb-2026',
      status: 'Under Review'
    }
  ]);

  // Modals & Active Selections
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  
  // DigiLocker eKYC State
  const [isEkycOpen, setIsEkycOpen] = useState(false);
  const [ekycContext, setEkycContext] = useState(null); // { targetParcel, targetApplicant, onSuccess }

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
    }, 4500);
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

  // Citizen's owned parcels (Ramesh Patel)
  const citizenParcels = parcels.filter(
    p => p.holderName?.includes('Ramesh Patel') || p.ulpin === 'GJ06GND000101'
  );

  // ====================================================================
  // AUTHENTICATION & ROLE SWITCHING HANDLERS
  // ====================================================================
  const handleLoginAsOfficial = (officer) => {
    if (officer) setCurrentOfficer(officer);
    setUserRole('government');
    setGovTab('map');
    showToast(
      'Signed in as Government Official',
      `Welcome, ${officer?.name || currentOfficer.name} (${officer?.title?.split('/')[0] || 'Tehsildar'}). Accessing Land Administration Suite.`,
      'success'
    );
  };

  const handleLoginAsCitizen = () => {
    setUserRole('citizen');
    showToast(
      'Signed in as Citizen',
      'Welcome, Ramesh Patel. Accessing your Land Records, Deeds & Citizen Services.',
      'success'
    );
  };

  const handleSwitchPortal = () => {
    setUserRole(null);
  };

  const handleSelectOfficer = (profile) => {
    setCurrentOfficer(profile);
    showToast(
      'Profile Switched',
      `Active officer: ${profile.name} (${profile.title})`,
      'success'
    );
  };

  // ====================================================================
  // CITIZEN ACTIONS
  // ====================================================================
  
  // 1. Citizen applies for official land certificate
  const handleCitizenApplyCertificate = (certData) => {
    const newId = `REQ-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const matchedParcel = parcels.find(p => p.ulpin === certData.ulpin) || citizenParcels[0];

    const newQueueItem = {
      id: newId,
      ulpin: certData.ulpin,
      landCategory: matchedParcel?.landCategory || 'Residential',
      applicantName: certData.applicantName || 'Ramesh Patel',
      applicantPhone: '+91 98250 12345',
      type: certData.certificateType,
      submissionDate: certData.date || 'Today',
      preVerification: 'DigiLocker Authenticated',
      status: 'Approved', // Certificates approved automatically
      reviewNotes: `Official Record of Rights (7/12 RoR) issued for purpose: ${certData.purpose}.`
    };

    setMutationQueue(prev => [newQueueItem, ...prev]);

    logAuditEvent(
      'CERTIFICATE_ISSUED',
      certData.ulpin,
      `Official Land Certificate (${certData.certificateType}) issued to ${certData.applicantName} via DigiLocker.`
    );

    showToast(
      'Certificate Request Sanctioned!',
      `Official certificate ${newId} generated and digitally signed. Ready for download.`,
      'success'
    );

    // Auto-open certificate viewer
    setRorCertDetails({
      newOwnerName: matchedParcel?.holderName || 'Ramesh Patel',
      ulpin: matchedParcel?.ulpin,
      sector: matchedParcel?.sector || 'Gandhinagar Sector 21',
      landCategory: matchedParcel?.landCategory || 'Residential',
      areaSqM: matchedParcel?.areaSqM || 3250,
      areaAcres: matchedParcel?.areaAcres || 0.80,
      khasraNo: matchedParcel?.khasraNo || '142/1',
      officerName: currentOfficer?.name || 'Rajesh Kumar',
      officerTitle: currentOfficer?.title || 'Tehsildar / Revenue Officer',
      certId: newId
    });
    setIsRorCertOpen(true);
  };

  // 2. Citizen applies for ownership transfer
  const handleCitizenApplyTransfer = (transferData) => {
    const newId = `APP-2026-MUT-${Math.floor(1000 + Math.random() * 9000)}`;
    const matchedParcel = parcels.find(p => p.ulpin === transferData.ulpin) || citizenParcels[0];

    const newQueueItem = {
      id: newId,
      ulpin: transferData.ulpin,
      landCategory: matchedParcel?.landCategory || 'Residential',
      sellerName: matchedParcel?.holderName || 'Ramesh Patel',
      applicantName: transferData.buyerName,
      applicantPhone: transferData.buyerMobile || '+91 98231 09841',
      type: 'Ownership Transfer / Record Update',
      submissionDate: transferData.date || 'Today',
      preVerification: 'DigiLocker eKYC Submitted',
      status: 'Under Scrutiny',
      saleAmount: transferData.saleAmount || '₹ 4,50,00,000',
      reviewNotes: transferData.remarks || 'Standard Sale Agreement ("Bana Paper") attached and verified with Notary. Awaiting Tehsildar & Town Planning review.',
      notaryRegNo: transferData.notaryRegNo || 'NOT-GJ-2026-9412',
      notaryName: transferData.notaryName || 'Adv. Harishchandra Dave, Notary Public',
      executionDate: transferData.notaryExecutionDate || '2026-09-29',
      stampChallan: 'E-STAMP-GJ-2026-' + Math.floor(1000 + Math.random() * 9000),
      agreementDocument: {
        fileName: transferData.agreementFile?.name || `Standard_Sale_Agreement_${transferData.ulpin}_Executed.pdf`,
        fileSize: transferData.agreementFile?.size || '2.8 MB',
        uploadedAt: 'Today (Immediate)',
        banaPaperTemplate: 'Standard Sale Agreement ("Bana Paper" Form 33-A)',
        notaryRegistrationNo: transferData.notaryRegNo || 'NOT-GJ-2026-9412',
        notaryName: transferData.notaryName || 'Adv. Harishchandra Dave, Notary Public',
        notaryExecutionDate: transferData.notaryExecutionDate || '2026-09-29',
        notaryChamber: transferData.notaryChamber || 'District Court, Sector 11, Gandhinagar',
        notarySealVerified: true,
        sellerName: matchedParcel?.holderName || 'Ramesh Patel',
        buyerName: transferData.buyerName,
        stampDutyChallan: 'E-STAMP-GJ-2026-' + Math.floor(1000 + Math.random() * 9000),
        stampDutyAmount: '₹ 22,50,000',
        saleAmount: transferData.saleAmount || '₹ 4,50,00,000'
      },
      trackingSteps: [
        { step: 1, name: 'Submitted', status: 'completed', date: 'Today', note: 'Ownership transfer request filed online' },
        { step: 2, name: 'Agreement Uploaded', status: 'completed', date: 'Today', note: 'Standard Sale Agreement ("Bana Paper") attached' },
        { step: 3, name: 'Notary Review', status: 'completed', date: 'Today', note: `Notary registration #${transferData.notaryRegNo || 'NOT-GJ-2026-9412'} verified` },
        { step: 4, name: 'Official Approval', status: 'current', date: 'In Progress', note: 'Under Tehsildar & Revenue Officer scrutiny' },
        { step: 5, name: 'Title Transferred', status: 'pending', date: 'Pending Step 4', note: 'Updated 7/12 Land Detail Record' }
      ]
    };

    setMutationQueue(prev => [newQueueItem, ...prev]);

    logAuditEvent(
      'TRANSFER_REQUEST_FILED',
      transferData.ulpin,
      `Ownership transfer request filed by ${matchedParcel?.holderName} in favor of ${transferData.buyerName} (${newId}) with attached Standard Sale Agreement and Notary #${transferData.notaryRegNo || 'NOT-GJ-2026-9412'}.`
    );

    showToast(
      'Ownership Transfer Lodged',
      `Application ${newId} submitted. Track status under "Track Application Status".`,
      'success'
    );
  };

  // 3. Citizen pays annual land tax
  const handleCitizenPayTax = () => {
    const receiptNum = `GMC-TX-2026-${Math.floor(8000 + Math.random() * 1999)}`;
    setTaxDues({
      status: 'Paid',
      amount: 0,
      receiptId: receiptNum,
      paidAt: new Date().toLocaleDateString('en-GB')
    });

    logAuditEvent(
      'TAX_DUES_CLEARED',
      'GJ06GND000101',
      `Annual GMC Land Tax dues cleared by Ramesh Patel. Receipt generated: ${receiptNum}.`
    );

    showToast(
      'Land Taxes Paid Successfully',
      `Payment confirmed. Receipt ${receiptNum} issued by Gandhinagar Municipal Corporation.`,
      'success'
    );
  };

  // 4. Citizen files grievance
  const handleCitizenSubmitGrievance = (grievanceData) => {
    const ticketId = `GRV-2026-${Math.floor(5000 + Math.random() * 4000)}`;
    const newGrievance = {
      id: ticketId,
      ulpin: grievanceData.ulpin,
      category: grievanceData.category,
      subject: grievanceData.subject,
      description: grievanceData.description,
      urgency: grievanceData.urgency,
      date: grievanceData.date || 'Today',
      status: 'Active Review'
    };

    setGrievances(prev => [newGrievance, ...prev]);

    logAuditEvent(
      'GRIEVANCE_LODGED',
      grievanceData.ulpin,
      `Citizen boundary grievance ${ticketId} lodged: "${grievanceData.subject}" (Urgency: ${grievanceData.urgency}).`
    );

    showToast(
      'Grievance Ticket Lodged',
      `Dispute ticket ${ticketId} dispatched to Tehsildar & Legal Resolution queue.`,
      'info'
    );
  };

  // 5. Official resolves citizen grievance
  const handleResolveGrievance = (grievanceId) => {
    setGrievances(prev => prev.filter(g => g.id !== grievanceId));

    logAuditEvent(
      'GRIEVANCE_RESOLVED',
      'GJ06GND000101',
      `Grievance ticket ${grievanceId} formally resolved by ${currentOfficer?.name}.`
    );

    showToast(
      'Grievance Resolved',
      `Ticket ${grievanceId} closed with field survey resolution.`,
      'success'
    );
  };

  // ====================================================================
  // DOSSIER & OFFICER QUEUE CONTROLS
  // ====================================================================
  const handleOpenDossier = (parcel) => {
    setSelectedParcel(parcel);
    setIsDossierOpen(true);
  };

  const handleCloseDossier = () => {
    setIsDossierOpen(false);
  };

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
          `Citizen ${verifiedData.verifiedName} authenticated with Seal ${verifiedData.verificationSealId}.`,
          'success'
        );
        logAuditEvent(
          'EKYC_VERIFIED',
          verifiedData.ulpin,
          `DigiLocker identity verified for ${verifiedData.verifiedName}.`
        );
        setIsEkycOpen(false);
      }
    });
    setIsEkycOpen(true);
  };

  const handleInitiateMutationFromDossier = (parcel) => {
    setIsDossierOpen(false);
    setSelectedParcel(parcel);
    setIsTransferOpen(true);
  };

  const handleOpenMultiOwnerEkyc = (parcel) => {
    setIsDossierOpen(false);
    setMultiOwnerParcelTarget(parcel || selectedParcel);
    setIsMultiOwnerEkycOpen(true);
  };

  const handleCompleteMultiOwnerConsent = (result) => {
    setParcels(prev => prev.map(p => {
      if (p.ulpin === result.ulpin || p.id === result.parcelId) {
        return {
          ...p,
          jointConsentStatus: 'Verified',
          statusNote: '100% Consent Quorum Verified (DL-MSIG-2026-GJ06-000101-994A)',
          coOwners: result.coOwners
        };
      }
      return p;
    }));

    const newQueueItem = {
      id: `APP-2026-MUT-${Math.floor(7000 + Math.random() * 2000)}`,
      ulpin: result.ulpin,
      applicantName: 'Ramesh Patel & Suresh Patel (Joint Khata)',
      coOwners: result.coOwners,
      type: 'Joint Khata Succession & Consent Verification',
      sector: 'Sector 21',
      dateSubmitted: 'Today (Immediate)',
      status: 'Approved',
      receiptId: result.multiSigReceiptId
    };
    setMutationQueue(prev => [newQueueItem, ...prev]);

    logAuditEvent(
      'JOINT_KHATA_CONSENT_100',
      result.ulpin,
      `Multi-Sig Digital Consent Certificate generated (${result.multiSigReceiptId}) with 100% consensus.`
    );

    showToast(
      'Multi-Owner Consent Complete',
      '100% consensus quorum verified across all co-owners. Application routed to Tehsildar Approval Queue.',
      'success'
    );
  };

  const handleCompleteMutationTransfer = (data) => {
    setIsTransferOpen(false);

    setEkycContext({
      targetParcel: selectedParcel,
      targetApplicant: {
        applicantName: data.newHolderName,
        ulpin: data.ulpin
      },
      onSuccess: (verifiedData) => {
        setIsEkycOpen(false);

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
              statusNote: 'Title successfully updated via verified Conveyance Deed'
            };
          }
          return p;
        }));

        const newRecordId = `APP-2026-MUT-${Math.floor(1000 + Math.random() * 9000)}`;
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
          reviewNotes: `Title updated from ${data.previousOwner} to ${data.newHolderName}.`
        };

        setMutationQueue(prev => [newQueueItem, ...prev]);

        logAuditEvent(
          'RECORD_UPDATE_APPROVED',
          data.ulpin,
          `Ownership transfer approved for ${data.newHolderName} (${data.saleAmount}). Verified eKYC ${verifiedData.verificationSealId}.`
        );

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
          'Record Updated & Sanctioned!',
          `Land record updated. Welcome Home docket issued to ${data.newHolderName}.`,
          'success'
        );
      }
    });

    setIsEkycOpen(true);
  };

  const handleApproveFromQueue = (item) => {
    const matchedParcel = parcels.find(p => p.ulpin === item.ulpin);

    setEkycContext({
      targetParcel: matchedParcel,
      targetApplicant: item,
      onSuccess: (verifiedData) => {
        setIsEkycOpen(false);

        setMutationQueue(prev => prev.map(m => {
          if (m.id === item.id) {
            const completedSteps = (m.trackingSteps || []).map(s => ({
              ...s,
              status: 'completed',
              date: s.date === 'In Progress' || s.date === 'Pending Step 4' || s.date === 'Under Scrutiny' ? 'Sanctioned Today' : s.date
            }));

            return { 
              ...m, 
              status: 'Approved',
              trackingSteps: completedSteps.length > 0 ? completedSteps : [
                { step: 1, name: 'Submitted', status: 'completed', date: m.submissionDate || 'Today', note: 'Ownership transfer request lodged' },
                { step: 2, name: 'Agreement Uploaded', status: 'completed', date: 'Today', note: 'Standard Sale Agreement ("Bana Paper") attached' },
                { step: 3, name: 'Notary Review', status: 'completed', date: 'Today', note: `Notary registration #${m.notaryRegNo || 'NOT-GJ-2026-8819'} verified` },
                { step: 4, name: 'Official Approval', status: 'completed', date: 'Sanctioned Today', note: `Approved by ${currentOfficer?.name || 'Revenue Officer'}` },
                { step: 5, name: 'Title Transferred', status: 'completed', date: 'Transferred Today', note: 'Updated 7/12 Land Detail Record issued' }
              ]
            };
          }
          return m;
        }));

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

        logAuditEvent(
          'APPLICATION_SANCTIONED',
          item.ulpin,
          `Application ${item.id} sanctioned by ${currentOfficer?.name}. Transferred to ${item.applicantName}. eKYC seal: ${verifiedData?.verificationSealId || 'DL-GOV-981240'}.`
        );

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
          'Application Approved!',
          `Docket ${item.id} approved by ${currentOfficer?.name}. Certificate issued.`,
          'success'
        );
      }
    });

    setIsEkycOpen(true);
  };

  const handleOpenRejectModal = (item) => {
    setRejectionTarget(item);
    setIsRejectionOpen(true);
  };

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

    logAuditEvent(
      'APPLICATION_REJECTED',
      rejectionTarget?.ulpin || 'UNKNOWN',
      `Application ${applicationId} rejected by ${currentOfficer?.name}. Statutory Reason: ${reasonComment}`
    );

    setIsRejectionOpen(false);
    showToast(
      'Application Contested & Rejected',
      `Docket ${applicationId} rejected with official reason comment.`,
      'error'
    );
  };

  const handleHoldFromQueue = (item) => {
    setMutationQueue(prev => prev.map(m => {
      if (m.id === item.id) {
        return { 
          ...m, 
          status: 'On Hold',
          reviewNotes: 'Flagged for physical field demarcation survey & boundary check.'
        };
      }
      return m;
    }));

    logAuditEvent(
      'DEMARCATION_SURVEY_ORDERED',
      item.ulpin,
      `Application ${item.id} held for field boundary demarcation.`
    );

    showToast(
      'Placed on Inspection Hold',
      `Application ${item.id} held pending field demarcation survey.`,
      'info'
    );
  };

  const handleReviewItem = (item) => {
    const matchedParcel = parcels.find(p => p.ulpin === item.ulpin);
    if (matchedParcel) {
      setSelectedParcel(matchedParcel);
      setIsDossierOpen(true);
    } else {
      showToast('Land Parcel Details', `Viewing application ${item.id} details for ${item.ulpin}`);
    }
  };

  const handleViewParcelMap = (ulpin) => {
    const matchedParcel = parcels.find(p => p.ulpin === ulpin);
    if (matchedParcel) {
      setSelectedParcel(matchedParcel);
      setGovTab('map');
    }
  };

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
      'STATUTORY_NOTICE_ISSUED',
      record.ulpin,
      `Digital Statutory Notice issued to ${record.applicantName || record.holderName}. ${reason || 'Boundary shift detected'}.`
    );
    showToast(
      'Statutory Notice Issued',
      `Notice dispatched to ${record.applicantName || record.holderName} (ULPIN: ${record.ulpin}) via DigiLocker e-Notice Gateway.`,
      'error'
    );
  };

  // ====================================================================
  // VIEW RENDER LOGIC
  // ====================================================================

  // If no role selected, render the Mock Landing / Login Page
  if (!userRole) {
    return (
      <LandingLogin 
        onLoginAsOfficial={handleLoginAsOfficial}
        onLoginAsCitizen={handleLoginAsCitizen}
        selectedOfficer={currentOfficer}
        onSelectOfficer={handleSelectOfficer}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      
      {/* 1. TOP NAVBAR */}
      <HeaderNav 
        userRole={userRole}
        activeTab={govTab} 
        setActiveTab={setGovTab} 
        currentOfficer={currentOfficer}
        onSelectOfficer={handleSelectOfficer}
        onSwitchPortal={handleSwitchPortal}
      />

      {/* 2. MAIN PORTAL CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {userRole === 'government' ? (
          <GovernmentPortal
            activeTab={govTab}
            setActiveTab={setGovTab}
            parcels={parcels}
            selectedParcel={selectedParcel}
            onSelectParcel={setSelectedParcel}
            onOpenDossier={handleOpenDossier}
            mutationQueue={mutationQueue}
            currentOfficer={currentOfficer}
            onApproveMutation={handleApproveFromQueue}
            onRejectMutation={handleOpenRejectModal}
            onHoldMutation={handleHoldFromQueue}
            onReviewMutation={handleReviewItem}
            onInspectEncroachment={handleInspectEncroachment}
            onViewParcelMap={handleViewParcelMap}
            auditLogs={auditLogs}
            grievances={grievances}
            onIssueNotice={handleIssueNotice}
            onResolveGrievance={handleResolveGrievance}
          />
        ) : (
          <CitizenPortal
            parcels={parcels}
            citizenParcels={citizenParcels}
            mutationQueue={mutationQueue}
            grievances={grievances}
            taxDues={taxDues}
            onApplyTransfer={handleCitizenApplyTransfer}
            onApplyCertificate={handleCitizenApplyCertificate}
            onPayTax={handleCitizenPayTax}
            onSubmitGrievance={handleCitizenSubmitGrievance}
            onViewCertificate={(details) => {
              setRorCertDetails(details);
              setIsRorCertOpen(true);
            }}
          />
        )}

      </main>

      {/* ==================================================================== */}
      {/* MODALS */}
      {/* ==================================================================== */}
      
      {/* Property Dossier Modal */}
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

      {/* Ownership Transfer Modal */}
      {isTransferOpen && selectedParcel && (
        <MutationTransferModal
          parcel={selectedParcel}
          onClose={() => setIsTransferOpen(false)}
          onCompleteMutation={handleCompleteMutationTransfer}
        />
      )}

      {/* DigiLocker eKYC Modal */}
      {isEkycOpen && (
        <DigiLockerEkycModal
          isOpen={isEkycOpen}
          onClose={() => setIsEkycOpen(false)}
          targetParcel={ekycContext?.targetParcel}
          targetApplicant={ekycContext?.targetApplicant}
          onSuccessVerification={ekycContext?.onSuccess}
        />
      )}

      {/* Multi-Owner Sequential eKYC Modal */}
      {isMultiOwnerEkycOpen && multiOwnerParcelTarget && (
        <MultiOwnerEkycModal
          isOpen={isMultiOwnerEkycOpen}
          onClose={() => setIsMultiOwnerEkycOpen(false)}
          parcel={multiOwnerParcelTarget}
          onConsentCompleted={handleCompleteMultiOwnerConsent}
        />
      )}

      {/* Post-Mutation Celebratory Modal */}
      {isCelebrationOpen && celebrationDetails && (
        <CelebratoryModal
          isOpen={isCelebrationOpen}
          onClose={() => setIsCelebrationOpen(false)}
          mutationDetails={celebrationDetails}
          onDownloadCertificate={() => {
            setIsCelebrationOpen(false);
            setIsRorCertOpen(true);
          }}
          onViewOnMap={(ulpin) => {
            setIsCelebrationOpen(false);
            handleViewParcelMap(ulpin);
          }}
        />
      )}

      {/* Official Land Certificate (7/12 RoR) Modal */}
      {isRorCertOpen && rorCertDetails && (
        <RorCertificateModal
          isOpen={isRorCertOpen}
          onClose={() => setIsRorCertOpen(false)}
          details={rorCertDetails}
        />
      )}

      {/* Rejection Modal */}
      {isRejectionOpen && rejectionTarget && (
        <RejectionModal
          isOpen={isRejectionOpen}
          onClose={() => setIsRejectionOpen(false)}
          application={rejectionTarget}
          onConfirmReject={handleConfirmRejection}
        />
      )}

      {/* AI Satellite Encroachment Inspector Modal */}
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
            <span className="text-emerald-700 font-bold">DigiLocker Certified</span>
          </div>
          <div className="text-[11px] text-slate-400">
            OpenStreetMap Vector Tiles • React 19 • Leaflet (preferCanvas)
          </div>
        </div>
      </footer>

    </div>
  );
}
