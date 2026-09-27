import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Phone, 
  CreditCard, 
  Send, 
  Download, 
  Lock, 
  ArrowRight, 
  Users, 
  Scale, 
  RotateCcw,
  Sparkles,
  Check
} from 'lucide-react';

export default function MultiOwnerEkycModal({
  isOpen,
  onClose,
  parcel,
  onConsentCompleted
}) {
  // Demo simulation state: 'PENDING', 'APPROVED', 'DISPUTED'
  const [simulationState, setSimulationState] = useState('PENDING'); // 'PENDING' | 'APPROVED' | 'DISPUTED'
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpSentMessage, setOtpSentMessage] = useState('');
  const [isProcessingApproval, setIsProcessingApproval] = useState(false);

  if (!isOpen || !parcel) return null;

  // Base owners data from parcel
  const initialOwners = parcel.coOwners || [
    {
      id: 'owner-1',
      name: 'Ramesh Patel',
      relation: 'Primary Co-Holder',
      share: '50%',
      mobile: '+91 98250 12345',
      aadhaarMasked: '•••• •••• 8492',
      status: 'Verified',
      statusLabel: '🟢 eKYC Verified (DigiLocker)',
      verificationSealId: 'DL-GOV-981240',
      timestamp: '14-Jan-2026 11:32 AM IST'
    },
    {
      id: 'owner-2',
      name: 'Suresh Patel',
      relation: 'Joint Co-Holder',
      share: '50%',
      mobile: '+91 98250 54321',
      aadhaarMasked: '•••• •••• 6129',
      status: 'Pending',
      statusLabel: '🟡 Pending Consent (OTP Sent)',
      verificationSealId: null,
      timestamp: 'Sent 10 mins ago'
    }
  ];

  // Dynamic co-owner state according to simulation state
  const owners = initialOwners.map(owner => {
    if (owner.id === 'owner-2' || owner.relation?.includes('Joint')) {
      if (simulationState === 'APPROVED') {
        return {
          ...owner,
          status: 'Verified',
          statusLabel: '🟢 eKYC Verified (DigiLocker)',
          verificationSealId: 'DL-GOV-419822',
          timestamp: 'Just now (Biometric Aadhaar OTP)'
        };
      }
      if (simulationState === 'DISPUTED') {
        return {
          ...owner,
          status: 'Disputed',
          statusLabel: '🔴 Dispute / Objection Lodged',
          verificationSealId: 'OBJ-SEC-135D-88',
          timestamp: 'Objection registered today'
        };
      }
      return {
        ...owner,
        status: 'Pending',
        statusLabel: '🟡 Pending Consent (OTP Sent)'
      };
    }
    return owner;
  });

  const is100PercentConsent = simulationState === 'APPROVED';
  const isDisputed = simulationState === 'DISPUTED';
  const consentPercentage = is100PercentConsent ? 100 : isDisputed ? 50 : 50;

  // Handle Send OTP click for missing owner
  const handleSendOtp = () => {
    setIsSendingOtp(true);
    setOtpSentMessage('');
    setTimeout(() => {
      setIsSendingOtp(false);
      setOtpSentMessage('DigiLocker biometric consent link dispatched via SMS & WhatsApp to Suresh Patel (+91 98250 54321)');
      setTimeout(() => setOtpSentMessage(''), 6000);
    }, 750);
  };

  // Simulate Owner 2 Approval
  const handleSimulateApproval = () => {
    setIsProcessingApproval(true);
    setTimeout(() => {
      setIsProcessingApproval(false);
      setSimulationState('APPROVED');
    }, 600);
  };

  // Simulate Owner 2 Dispute
  const handleSimulateDispute = () => {
    setSimulationState('DISPUTED');
  };

  // Reset demo simulation
  const handleResetSimulation = () => {
    setSimulationState('PENDING');
    setOtpSentMessage('');
  };

  // Proceed to Tehsildar queue with verified consent
  const handleProceedToTehsildar = () => {
    if (onConsentCompleted) {
      onConsentCompleted({
        ulpin: parcel.ulpin,
        parcelId: parcel.id,
        coOwners: owners,
        multiSigReceiptId: 'DL-MSIG-2026-GJ06-000101-994A',
        shaHash: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
        completedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ==================================================================== */}
        {/* MODAL HEADER */}
        {/* ==================================================================== */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-blue-50/20 to-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md border border-amber-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                  DigiLocker Joint Consent Verification Gateway
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  {parcel.ulpin}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                National Digital Public Infrastructure (DPI) • Gujarat Revenue Code Sec 135-D Multi-Sig Protocol
              </p>
            </div>
          </div>

          <button
            id="btn-close-multi-owner-modal"
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shadow-2xs"
            title="Close Gateway"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ==================================================================== */}
        {/* MODAL BODY */}
        {/* ==================================================================== */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">

          {/* 1. Step Tracker / Quorum Indicator */}
          <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-slate-800 text-xs sm:text-sm">
                  Co-Owner Quorum Consensus Tracker
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                  Gandhinagar Sector 21
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500 font-medium">Status:</span>
                <span className={`text-xs font-extrabold font-mono px-2.5 py-0.5 rounded-full border ${
                  is100PercentConsent
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : isDisputed
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}>
                  {is100PercentConsent
                    ? '100% Consent Achieved — 2 of 2 Verified'
                    : isDisputed
                    ? '🔴 Dispute Flagged — Quorum Locked'
                    : '50% Consent Achieved — 1 of 2 Verified'}
                </span>
              </div>
            </div>

            {/* Quorum Progress Bar */}
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5 shadow-inner">
              <div 
                className={`h-full rounded-full transition-all duration-700 shadow-sm ${
                  is100PercentConsent 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600' 
                    : isDisputed 
                    ? 'bg-gradient-to-r from-rose-500 to-red-600' 
                    : 'bg-gradient-to-r from-amber-400 to-amber-500'
                }`}
                style={{ width: `${consentPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
              <span>Owner 1: Ramesh Patel (50%) — <strong className="text-emerald-700">Verified</strong></span>
              <span>Owner 2: Suresh Patel (50%) — {
                is100PercentConsent 
                  ? <strong className="text-emerald-700">Verified</strong> 
                  : isDisputed 
                  ? <strong className="text-rose-700">Dispute Raised</strong> 
                  : <strong className="text-amber-700">Awaiting Consent</strong>
              }</span>
            </div>
          </div>

          {/* 2. Interactive Presentation Simulation Switcher */}
          <div className="p-3.5 bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-slate-50 border border-blue-200/80 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">
                Interactive Presentation Switcher:
              </span>
              <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
                Test approval vs dispute state in real-time
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                id="btn-simulate-approve"
                onClick={handleSimulateApproval}
                disabled={isProcessingApproval || is100PercentConsent}
                className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                  is100PercentConsent
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400/30'
                    : 'bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isProcessingApproval ? 'Verifying OTP...' : 'Simulate Owner 2 Approval'}</span>
              </button>

              <button
                id="btn-simulate-dispute"
                onClick={handleSimulateDispute}
                className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                  isDisputed
                    ? 'bg-rose-600 text-white ring-2 ring-rose-400/30'
                    : 'bg-white hover:bg-rose-50 text-rose-700 border border-rose-300'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Simulate Owner 2 Dispute/Reject</span>
              </button>

              {(is100PercentConsent || isDisputed) && (
                <button
                  id="btn-reset-simulation"
                  onClick={handleResetSimulation}
                  className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 transition-colors"
                  title="Reset to Initial State"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* OTP Dispatched Banner Feedback */}
          {otpSentMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center space-x-2 animate-in slide-in-from-top-2 duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{otpSentMessage}</span>
            </div>
          )}

          {/* 3. Co-Owner Sequential Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Registered Co-Holders for Land Parcel {parcel.ulpin}
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {owners.map((owner, idx) => {
                const isVerified = owner.status === 'Verified';
                const isOwnerDisputed = owner.status === 'Disputed';

                return (
                  <div 
                    key={owner.id || idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      isVerified
                        ? 'bg-emerald-50/50 border-emerald-200 shadow-2xs'
                        : isOwnerDisputed
                        ? 'bg-rose-50/60 border-rose-300 shadow-2xs'
                        : 'bg-amber-50/40 border-amber-300/80 shadow-2xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      
                      {/* Left: Owner Info */}
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm text-white shadow-xs shrink-0 ${
                          isVerified ? 'bg-emerald-600' : isOwnerDisputed ? 'bg-rose-600' : 'bg-amber-500'
                        }`}>
                          {isVerified ? (
                            <Check className="w-5 h-5" />
                          ) : isOwnerDisputed ? (
                            <AlertTriangle className="w-5 h-5" />
                          ) : (
                            owner.name.split(' ')[0][0]
                          )}
                        </div>

                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-extrabold text-slate-900 text-sm">{owner.name}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                              Share: {owner.share}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              ({owner.relation || `Co-Owner #${idx + 1}`})
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-600">
                            <span className="flex items-center space-x-1">
                              <CreditCard className="w-3 h-3 text-slate-400" />
                              <span className="font-mono">{owner.aadhaarMasked}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Phone className="w-3 h-3 text-slate-400" />
                              <span>{owner.mobile}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Status Pill & Action */}
                      <div className="flex flex-wrap items-center sm:flex-col sm:items-end gap-2 shrink-0">
                        <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${
                          isVerified
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : isOwnerDisputed
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                        }`}>
                          <span>{isVerified ? '🟢' : isOwnerDisputed ? '🔴' : '🟡'}</span>
                          <span>{owner.statusLabel}</span>
                        </span>

                        {/* Status Note or OTP Trigger */}
                        {isVerified ? (
                          <div className="text-[11px] font-mono text-emerald-700 text-right">
                            <span className="font-semibold">Seal: {owner.verificationSealId}</span>
                            <span className="block text-[10px] text-slate-400 font-sans">{owner.timestamp}</span>
                          </div>
                        ) : isOwnerDisputed ? (
                          <span className="text-[11px] font-bold text-rose-700">
                            Objection: Partition Dispute (Rule 107)
                          </span>
                        ) : (
                          <button
                            id="btn-send-otp-link"
                            onClick={handleSendOtp}
                            disabled={isSendingOtp}
                            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-2xs transition-all active:scale-[0.98]"
                          >
                            <Send className="w-3 h-3" />
                            <span>{isSendingOtp ? 'Sending Link...' : 'Send DigiLocker OTP Link'}</span>
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ==================================================================== */}
          {/* 4. SUCCESS STATE: 100% QUORUM MULTI-SIG DIGITAL RECEIPT */}
          {/* ==================================================================== */}
          {is100PercentConsent && (
            <div className="p-4 bg-gradient-to-br from-emerald-50 via-white to-green-50/50 rounded-2xl border-2 border-emerald-300 shadow-sm space-y-3 animate-in zoom-in-95 duration-200">
              <div className="flex items-center space-x-2.5 text-emerald-800 font-bold border-b border-emerald-200/80 pb-2.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-emerald-900 leading-tight">
                    Multi-Sig Digital Consent Receipt Auto-Generated (100% Consensus)
                  </h4>
                  <p className="text-[11px] text-emerald-700 font-normal">
                    Cryptographic multi-signature registered into National Cadastral Vault • Proof of Consensus
                  </p>
                </div>
              </div>

              {/* Receipt Body */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3.5 rounded-xl border border-emerald-200/80 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Multi-Sig Receipt Token:</span>
                  <span className="font-mono font-bold text-slate-800 text-[11px]">DL-MSIG-2026-GJ06-000101-994A</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Gujarat Revenue Timestamp:</span>
                  <span className="font-mono font-bold text-slate-800 text-[11px]">
                    {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} • 18:15:30 IST
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">SHA-256 Consent Hash:</span>
                  <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 block break-all font-semibold">
                    7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <span className="text-[11px] text-emerald-800 font-medium flex items-center space-x-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Dual DigiLocker Cryptographic Seals Active & Verified</span>
                </span>
                <button
                  id="btn-download-consent-receipt"
                  onClick={() => alert('Downloading official DigiLocker Multi-Sig Digital Consent Certificate (PDF)...')}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold shadow-2xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Download Digital Receipt</span>
                </button>
              </div>
            </div>
          )}

          {/* ==================================================================== */}
          {/* 5. DISPUTE STATE: RED REVENUE COURT NOTICE */}
          {/* ==================================================================== */}
          {isDisputed && (
            <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl shadow-sm space-y-3 animate-in zoom-in-95 duration-200 text-rose-950">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-rose-900 leading-tight">
                    🔴 Co-Owner Consent Dispute Flagged — Application Locked & Sent to Revenue Court
                  </h4>
                  <p className="text-xs text-rose-700 font-medium mt-1">
                    Owner 2 (Suresh Patel) has formally declined digital consent under Gujarat Land Revenue Code Sec 135-D. 
                    Unilateral mutation is prohibited by statutory law to safeguard against fraudulent title dispossession.
                  </p>
                </div>
              </div>

              {/* Court Case File Details */}
              <div className="bg-white p-3.5 rounded-xl border border-rose-200 text-xs space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Revenue Case Tracking No:</span>
                    <span className="font-mono font-bold text-rose-700">RC/GND/2026/0419-DISPUTE</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Jurisdiction Bench:</span>
                    <span className="font-semibold text-slate-800">Sub-Divisional Magistrate (North Tehsil)</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Notice Type:</span>
                    <span className="font-semibold text-slate-800">Summons for Partition Hearing (Form 8-B)</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Registry Action:</span>
                    <span className="font-bold text-rose-700">Status: AUTOMATICALLY LOCKED</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                <span className="text-rose-800 font-semibold flex items-center space-x-1">
                  <Scale className="w-3.5 h-3.5 text-rose-600" />
                  <span>Matter referred to Gandhinagar Revenue Court under Sec 135-E</span>
                </span>
                <button
                  onClick={handleResetSimulation}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold shadow-2xs transition-colors"
                >
                  Reset Demo & Simulate Approval
                </button>
              </div>
            </div>
          )}

        </div>

        {/* ==================================================================== */}
        {/* MODAL ACTION FOOTER */}
        {/* ==================================================================== */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3">
          <button
            id="btn-close-gateway-footer"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            Close Gateway
          </button>

          <div className="flex items-center space-x-2">
            {isDisputed ? (
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-rose-600 flex items-center space-x-1">
                  <Lock className="w-3.5 h-3.5 text-rose-600" />
                  <span>Submission Frozen by Revenue Law</span>
                </span>
                <button
                  disabled={true}
                  className="px-4 py-2.5 bg-slate-300 text-slate-500 rounded-xl text-xs font-bold cursor-not-allowed shadow-none"
                >
                  Proceed to Tehsildar Approval Queue (Locked)
                </button>
              </div>
            ) : is100PercentConsent ? (
              <button
                id="btn-proceed-tehsildar-queue"
                onClick={handleProceedToTehsildar}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all ring-2 ring-emerald-400/30 active:scale-[0.98]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Proceed to Tehsildar Approval Queue</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-amber-800 font-semibold hidden sm:inline">
                  Awaiting 100% consensus from co-owners
                </span>
                <button
                  id="btn-proceed-disabled"
                  disabled={true}
                  className="px-4 py-2.5 bg-slate-200 text-slate-400 rounded-xl text-xs font-bold cursor-not-allowed"
                >
                  Proceed to Tehsildar Approval Queue (50% Quorum)
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
