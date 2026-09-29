import React, { useState } from 'react';
import { X, User, Phone, CreditCard, IndianRupee, RefreshCw, ShieldCheck } from 'lucide-react';

export default function MutationTransferModal({ parcel, onClose, onCompleteMutation }) {
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('+91 98');
  const [buyerAadhaar, setBuyerAadhaar] = useState('');
  const [notaryRegNo, setNotaryRegNo] = useState('NOT-GJ-2026-8819');
  const [saleAmount, setSaleAmount] = useState('₹ 2,50,00,000');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!parcel) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!buyerName.trim()) {
      setErrorMsg('Please enter the Buyer / Transferee full name.');
      return;
    }
    if (!buyerAadhaar.trim() || buyerAadhaar.replace(/\D/g, '').length < 4) {
      setErrorMsg('Please enter a valid 12-digit Aadhaar number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onCompleteMutation({
        parcelId: parcel.id,
        ulpin: parcel.ulpin,
        newHolderName: buyerName.trim(),
        newMobile: buyerPhone.trim() || '+91 98765 43210',
        newAadhaarMasked: '•••• •••• ' + buyerAadhaar.replace(/\D/g, '').slice(-4),
        saleAmount: saleAmount.trim() || '₹ 2,50,00,000',
        previousOwner: parcel.holderName,
        notaryRegNo: notaryRegNo.trim() || 'NOT-GJ-2026-8819',
        transactionDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        agreementDocument: {
          fileName: `Standard_Sale_Agreement_${parcel.ulpin}_Executed.pdf`,
          fileSize: '2.8 MB',
          uploadedAt: 'Today',
          banaPaperTemplate: 'Standard Sale Agreement ("Bana Paper" Form 33-A)',
          notaryRegistrationNo: notaryRegNo.trim() || 'NOT-GJ-2026-8819',
          notaryName: 'Adv. Harishchandra Dave, Notary Public',
          notaryExecutionDate: new Date().toLocaleDateString('en-GB'),
          notaryChamber: 'District Court, Sector 11, Gandhinagar',
          notarySealVerified: true,
          sellerName: parcel.holderName,
          buyerName: buyerName.trim(),
          stampDutyChallan: 'E-STAMP-GJ-2026-' + Math.floor(1000 + Math.random() * 9000),
          stampDutyAmount: '₹ 12,50,000',
          saleAmount: saleAmount.trim() || '₹ 2,50,00,000'
        }
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight leading-none">
                Ownership Transfer / Record Update
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Initiate Ownership Transfer & Record Update for {parcel.ulpin}
              </p>
            </div>
          </div>

          <button
            id="btn-close-transfer"
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Existing Ownership Ribbon */}
        <div className="px-6 py-3 bg-blue-50/50 border-b border-blue-100 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Current Holder</span>
            <span className="font-semibold text-slate-800">{parcel.holderName}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Plot Area / Sector</span>
            <span className="font-medium text-slate-700">{parcel.areaSqM.toLocaleString()} sq. m ({parcel.sector})</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* Buyer Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Buyer Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative rounded-lg shadow-2xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="input-buyer-name"
                type="text"
                required
                value={buyerName}
                onChange={(e) => { setBuyerName(e.target.value); setErrorMsg(''); }}
                placeholder="e.g., Harishchandra V. Trivedi"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Buyer Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Buyer Mobile Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative rounded-lg shadow-2xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="input-buyer-phone"
                type="tel"
                required
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                placeholder="+91 98250 99881"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Personal Aadhaar Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Personal Aadhaar Number (12 Digits) <span className="text-rose-500">*</span>
            </label>
            <div className="relative rounded-lg shadow-2xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <CreditCard className="w-4 h-4" />
              </div>
              <input
                id="input-buyer-aadhaar"
                type="text"
                maxLength={14}
                required
                value={buyerAadhaar}
                onChange={(e) => { setBuyerAadhaar(e.target.value); setErrorMsg(''); }}
                placeholder="XXXX-XXXX-8921"
                className="w-full pl-9 pr-3 py-2 text-sm font-mono bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1 flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600 inline" />
              <span>Aadhaar e-KYC will be validated against UIDAI Digital Locker gateway</span>
            </p>
          </div>

          {/* Sale Amount */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Sale Amount (₹) <span className="text-rose-500">*</span>
            </label>
            <div className="relative rounded-lg shadow-2xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <IndianRupee className="w-4 h-4" />
              </div>
              <input
                id="input-sale-amount"
                type="text"
                required
                value={saleAmount}
                onChange={(e) => setSaleAmount(e.target.value)}
                placeholder="₹ 2,75,00,000"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Notary Registration Details */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Notary Registration Number <span className="text-rose-500">*</span>
            </label>
            <input
              id="input-notary-reg-no"
              type="text"
              required
              value={notaryRegNo}
              onChange={(e) => setNotaryRegNo(e.target.value)}
              placeholder="e.g. NOT-GJ-2026-8819"
              className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Executed under Standard Sale Agreement ("Bana Paper") Form 33-A
            </p>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              id="btn-cancel-transfer"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              id="btn-confirm-mutation"
              disabled={isSubmitting}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Continue -&gt;</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
