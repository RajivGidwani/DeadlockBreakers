import React, { useState } from 'react';
import { X, AlertOctagon, FileWarning } from 'lucide-react';

export default function RejectionModal({
  isOpen,
  onClose,
  application,
  onConfirmReject
}) {
  const [reasonCategory, setReasonCategory] = useState('TITLE_DEFECT');
  const [comment, setComment] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !application) return null;

  const standardReasons = [
    { id: 'TITLE_DEFECT', label: 'Title Defect or Contested Ownership Claim (Sec 47A)' },
    { id: 'ENCROACHMENT', label: 'Spatial Buffer / Easement Encroachment Detected' },
    { id: 'STAMP_UNDERVALUATION', label: 'Stamp Duty Undervaluation & Pending SRO Audit' },
    { id: 'EKYC_FAIL', label: 'DigiLocker Identity Discrepancy or Unverified Co-sharer' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setErrorMsg('Official rejection reason comment is mandatory for judicial audit compliance.');
      return;
    }

    const selectedReason = standardReasons.find(r => r.id === reasonCategory)?.label || reasonCategory;
    const fullReason = `${selectedReason}: ${comment.trim()}`;

    onConfirmReject(application.id, fullReason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-rose-50/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-sm ring-4 ring-rose-100">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Official Rejection Docket
              </h3>
              <p className="text-xs text-rose-700 font-medium">
                Mandatory Administrative Reason Comment Required
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Target Application Recap */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Application ID</span>
              <span className="font-mono font-bold text-slate-900 text-xs">{application.id}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">ULPIN</span>
              <span className="font-mono font-bold text-blue-700 text-xs">{application.ulpin}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Applicant</span>
              <span className="font-bold text-slate-800 text-xs truncate max-w-[120px] block">
                {application.applicantName}
              </span>
            </div>
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-semibold">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Standard Reason Select */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
              Statutory Ground for Rejection
            </label>
            <select
              value={reasonCategory}
              onChange={(e) => setReasonCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-medium"
            >
              {standardReasons.map(r => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </div>

          {/* Officer Comment Textarea */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
              Officer Formal Rejection Reason Comment *
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter detailed official findings, legal citation, or survey order reference explaining why this mutation cannot be sanctioned..."
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              This notice will be recorded onto the immutable audit ledger and dispatched to the applicant via SMS/e-Notice.
            </p>
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>

            <button
              id="btn-confirm-rejection-submit"
              type="submit"
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center space-x-1.5"
            >
              <FileWarning className="w-4 h-4" />
              <span>Confirm Official Rejection</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
