import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Fingerprint, 
  KeyRound, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  RefreshCw, 
  Hash
} from 'lucide-react';

export default function DigiLockerEkycModal({
  isOpen,
  onClose,
  targetParcel,
  targetApplicant,
  onSuccessVerification
}) {
  const [step, setStep] = useState(1); // 1: Virtual ID, 2: OTP, 3: Verified Badge
  const [virtualId, setVirtualId] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Applicant details fallback
  const applicantName = targetApplicant?.applicantName || targetApplicant?.name || targetParcel?.holderName || 'Vikramaditya Singhania';
  const ulpinCode = targetApplicant?.ulpin || targetParcel?.ulpin || 'GJ06GND000101';

  // Step 1: Submit Virtual ID
  const handleVirtualIdSubmit = (e) => {
    e.preventDefault();
    if (!virtualId.trim()) {
      setErrorMsg('Please enter a valid 16-digit Virtual ID or DigiLocker ID.');
      return;
    }
    setErrorMsg('');
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(2);
    }, 600);
  };

  // Step 2: Handle OTP input
  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Auto-fill OTP helper: 123456
  const handleAutoFillOtp = () => {
    setOtp(['1', '2', '3', '4', '5', '6']);
  };

  // Submit OTP Verification
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredCode = otp.join('');
    if (enteredCode.length !== 6) {
      setErrorMsg('Please enter all 6 digits of the OTP.');
      return;
    }

    setErrorMsg('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setStep(3); // Verified!
    }, 800);
  };

  // Final confirmation to pass verification back to caller
  const handleConfirmVerified = () => {
    const verifiedPayload = {
      verified: true,
      verifiedName: applicantName,
      dob: '15-Aug-1984',
      ulpin: ulpinCode,
      virtualId: virtualId || '9102-4821-3910-8842',
      documentHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      verificationSealId: `DL-GOV-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
    };

    onSuccessVerification(verifiedPayload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50/80 to-blue-50/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm ring-4 ring-emerald-50">
              <Fingerprint className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  DigiLocker eKYC Gateway
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                  UIDAI Certified
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Mandatory Cryptographic Identity Authentication for Title Conveyance
              </p>
            </div>
          </div>

          <button
            id="btn-close-ekyc-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Tracker */}
        <div className="px-6 py-3 bg-slate-50/60 border-b border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              1
            </span>
            <span className={`font-semibold ${step === 1 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
              Virtual ID
            </span>
          </div>

          <div className="w-8 h-0.5 bg-slate-200" />

          <div className="flex items-center space-x-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              2
            </span>
            <span className={`font-semibold ${step === 2 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
              OTP Validation
            </span>
          </div>

          <div className="w-8 h-0.5 bg-slate-200" />

          <div className="flex items-center space-x-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              3
            </span>
            <span className={`font-semibold ${step === 3 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
              eKYC Verified
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-sm">
          
          {/* Target Context Banner */}
          <div className="mb-5 p-3 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-blue-600 uppercase font-bold tracking-wider block">
                Target Land Parcel
              </span>
              <span className="font-mono font-bold text-slate-900">{ulpinCode}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-blue-600 uppercase font-bold tracking-wider block">
                Applicant / Transferee
              </span>
              <span className="font-bold text-slate-800 truncate max-w-[170px] block">
                {applicantName}
              </span>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold flex items-center space-x-2">
              <span>⚠️ {errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Prompt for Virtual ID / DigiLocker ID */}
          {step === 1 && (
            <form onSubmit={handleVirtualIdSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Virtual ID (VID) / DigiLocker ID
                </label>
                <div className="relative">
                  <input
                    id="input-virtual-id"
                    type="text"
                    value={virtualId}
                    onChange={(e) => setVirtualId(e.target.value)}
                    placeholder="[Enter Virtual ID]"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  16-digit Virtual ID or Aadhaar-linked DigiLocker ID for zero-knowledge biometric verification.
                </p>
              </div>

              {/* Helper auto-populate button */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setVirtualId('9102-4821-3910-8842')}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline"
                >
                  Fill Sample Virtual ID: 9102-4821-3910-8842
                </button>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  id="btn-submit-virtual-id"
                  type="submit"
                  disabled={isVerifying}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-[0.98]"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Requesting OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to OTP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: 6-Digit OTP Verification Screen */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto mb-2">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">
                  Enter 6-Digit OTP Verification Code
                </h4>
                <p className="text-xs text-slate-500">
                  Authentication code dispatched to mobile registered with DigiLocker.
                </p>
                <div className="inline-block mt-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-bold">
                  Enter OTP: 123456
                </div>
              </div>

              {/* 6 OTP Inputs */}
              <div className="flex justify-center space-x-2 sm:space-x-3 my-4">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-11 h-12 text-center text-lg font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={handleAutoFillOtp}
                  className="text-blue-600 hover:text-blue-800 font-bold underline"
                >
                  Auto-fill Test OTP (123456)
                </button>
                <span className="text-slate-400 font-mono">Resend in 00:45</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  ← Back to VID
                </button>

                <button
                  id="btn-verify-otp-submit"
                  type="submit"
                  disabled={isVerifying}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-[0.98]"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying with UIDAI...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Verify & Authenticate</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Green "DigiLocker Verified" Badge with Mock Credentials */}
          {step === 3 && (
            <div className="space-y-4 animate-in zoom-in-95 duration-200">
              
              {/* Green Verified Header Badge */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-1.5 shadow-xs">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="text-emerald-900 font-extrabold text-base tracking-tight">
                  DigiLocker Verified Badge
                </div>
                <p className="text-xs text-emerald-700 font-semibold">
                  Zero-Knowledge Proof Validated Against Ministry of Electronics & IT
                </p>
              </div>

              {/* Verified Mock Credentials Card */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                
                {/* Photo Placeholder with Official Seal */}
                <div className="flex items-center space-x-4 border-b border-slate-100 pb-3">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 text-2xl font-bold shadow-2xs overflow-hidden">
                      {applicantName.charAt(0)}
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                      ✓
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Verified Identity Record
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900 mt-1">
                      {applicantName}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Citizen of India • Aadhaar Biometrics Active
                    </p>
                  </div>
                </div>

                {/* Credential Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      Date of Birth (DOB)
                    </span>
                    <span className="font-semibold text-slate-800">15-Aug-1984</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      Gender / Nationality
                    </span>
                    <span className="font-semibold text-slate-800">Male / Indian</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      Virtual ID Ref
                    </span>
                    <span className="font-mono font-semibold text-slate-700">
                      {virtualId || '9102-XXXX-8842'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      DigiLocker Seal ID
                    </span>
                    <span className="font-mono font-bold text-emerald-700">
                      DL-GOV-882194
                    </span>
                  </div>
                </div>

                {/* Document SHA-256 Hash */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 flex items-center space-x-1">
                    <Hash className="w-3 h-3 text-slate-400" />
                    <span>Cryptographic Document Hash (SHA-256)</span>
                  </span>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 font-mono text-[10px] text-slate-700 break-all">
                    e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                  </div>
                </div>

              </div>

              {/* Security Rule Clear Badge */}
              <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-800 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Security Clearance:</strong> Final ownership transfer execution is now <strong>UNBLOCKED</strong>.
                </span>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex justify-end space-x-3">
                <button
                  id="btn-confirm-ekyc-verified"
                  onClick={handleConfirmVerified}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-extrabold rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Accept eKYC & Proceed with Ownership Transfer</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
