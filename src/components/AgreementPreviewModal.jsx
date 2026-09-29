import React from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  Download, 
  Stamp, 
  Check
} from 'lucide-react';

export default function AgreementPreviewModal({
  isOpen,
  onClose,
  agreementData,
  onApprove,
  onReject,
  onHold,
  isOfficial = false,
  currentOfficer = null
}) {
  if (!isOpen || !agreementData) return null;

  const data = agreementData.agreementDocument || {
    fileName: `Standard_Sale_Agreement_${agreementData.ulpin}_Executed.pdf`,
    fileSize: '2.8 MB',
    uploadedAt: agreementData.submissionDate || '04-Sep-2026',
    banaPaperTemplate: 'Standard Sale Agreement ("Bana Paper" Form 33-A)',
    notaryRegistrationNo: agreementData.notaryRegNo || 'NOT-GJ-2026-8819',
    notaryName: agreementData.notaryName || 'Adv. Harishchandra Dave, Notary Public (Govt. of India)',
    notaryExecutionDate: agreementData.executionDate || '03-Sep-2026',
    notaryChamber: 'Chamber 14, District & Sessions Court, Gandhinagar',
    notarySealVerified: true,
    sellerName: agreementData.sellerName || 'Ramesh Patel',
    buyerName: agreementData.applicantName || 'Vikram & Ananya Singhania',
    stampDutyChallan: agreementData.stampChallan || 'E-STAMP-GJ-2026-9812-C',
    stampDutyAmount: '₹ 22,50,000',
    saleAmount: agreementData.saleAmount || '₹ 4,50,00,000'
  };

  const handleDownload = () => {
    // Mock PDF download trigger
    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('download', data.fileName || 'Standard_Sale_Agreement.pdf');
    alert(`Downloading verified copy of ${data.fileName} with official notary seal.`);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      
      {/* Centered Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/90 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                  Standard Sale Agreement ("Bana Paper") & Notary Review
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Notary Attested</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Official Executed Agreement for Land Parcel <span className="font-mono font-bold text-blue-700">{agreementData.ulpin}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors"
              title="Download Agreement PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              id="btn-close-agreement-modal"
              onClick={onClose}
              className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shadow-2xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm bg-slate-100/50">
          
          {/* Official Verification Banner */}
          <div className="bg-white rounded-2xl border border-amber-200/90 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                <Stamp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Notary Attestation Credentials
                </span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm">
                  {data.notaryName}
                </span>
                <div className="flex items-center space-x-2 mt-0.5 text-[11px] text-slate-600 font-mono">
                  <span className="font-bold text-amber-900">Reg #: {data.notaryRegistrationNo}</span>
                  <span>•</span>
                  <span>Executed: {data.notaryExecutionDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="text-right text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  e-Stamp Challan Ref
                </span>
                <span className="font-mono font-bold text-blue-700">{data.stampDutyChallan}</span>
                <span className="block text-[10px] text-emerald-700 font-semibold">Duty Paid: {data.stampDutyAmount}</span>
              </div>
            </div>
          </div>

          {/* Legal Compliance Checklist (For Government Official & Citizen Clarity) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-500 mb-2.5">
              Legal Compliance & Verification Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-emerald-950">Standard Format (Form 33-A)</span>
              </div>
              <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-emerald-950">Notary Registration Active</span>
              </div>
              <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-emerald-950">e-Stamp Duty Reconciled</span>
              </div>
              <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-emerald-950">Property Claims: Clear</span>
              </div>
            </div>
          </div>

          {/* Document Preview Parchment Frame */}
          <div className="bg-white rounded-2xl border border-slate-300 shadow-md p-6 sm:p-10 space-y-6 text-slate-800 font-serif relative">
            
            {/* Stamp Paper Top Header */}
            <div className="text-center border-b-2 border-double border-amber-900/30 pb-5">
              <div className="inline-block px-3 py-1 bg-amber-100/70 border border-amber-400 text-amber-900 font-mono text-[11px] font-bold rounded mb-2 uppercase">
                GOVERNMENT OF GUJARAT • REVENUE DEPARTMENT
              </div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-wide font-sans">
                STANDARD SALE AGREEMENT ("BANA PAPER")
              </h1>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                Official Registered Instrument under the Transfer of Property Act, 1882 & Notaries Act, 1952
              </p>
            </div>

            {/* Consideration & Identification Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="font-bold text-slate-400 text-[10px] uppercase block">Land Parcel ULPIN (Bhu-Aadhaar)</span>
                <span className="font-mono font-extrabold text-blue-700 text-sm">{agreementData.ulpin}</span>
                <span className="block text-slate-600 mt-1">Sector 21 • Land Detail Record #142/1</span>
              </div>
              <div className="sm:text-right">
                <span className="font-bold text-slate-400 text-[10px] uppercase block">Agreed Consideration Value</span>
                <span className="font-extrabold text-slate-900 text-base font-sans">{data.saleAmount}</span>
                <span className="block text-emerald-700 font-semibold text-[11px]">e-Stamp Verified: {data.stampDutyChallan}</span>
              </div>
            </div>

            {/* Legal Clauses Text */}
            <div className="space-y-4 text-xs leading-relaxed text-slate-700 font-serif">
              <p>
                <strong>THIS SALE AGREEMENT ("BANA PAPER")</strong> is entered into on this <strong>{data.notaryExecutionDate}</strong> at Gandhinagar, Gujarat, between:
              </p>

              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 font-sans space-y-1.5">
                <p>
                  <strong>THE VENDOR (SELLER):</strong> {data.sellerName}, Resident of Sector 21, Gandhinagar, Gujarat, holding recorded title under 7/12 Land Detail Record.
                </p>
                <p>
                  <strong>THE PURCHASER (BUYER):</strong> {data.buyerName}, having submitted verified DigiLocker credentials and valid identity proofs.
                </p>
              </div>

              <h4 className="font-bold font-sans text-xs uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 pt-2">
                Operational Legal Covenants
              </h4>

              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Agreement to Convey:</strong> The Vendor agrees to convey and transfer all absolute ownership rights, interest, and title in the Land Parcel <strong>{agreementData.ulpin}</strong> (Area Size: 3,250 sq. m / 0.80 Acres) to the Purchaser.
                </li>
                <li>
                  <strong>Property Claims & Liabilities:</strong> The Vendor certifies that the subject Land Parcel is free from all encumbrances, prior bank mortgage charges, lis pendens caveats, or undisclosed municipal dues.
                </li>
                <li>
                  <strong>Boundary Concurrence:</strong> Both parties have physically inspected the Land Boundary Map and demarcated perimeter pillars, agreeing that zero boundary shift or encroachment exists.
                </li>
                <li>
                  <strong>Execution & Notary Attestation:</strong> This instrument has been executed in the presence of the undersigned Notary Public and attested under registration number <strong>{data.notaryRegistrationNo}</strong>.
                </li>
              </ol>
            </div>

            {/* Signature & Seal Block */}
            <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans text-center">
              
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between h-32">
                <span className="text-[10px] font-bold uppercase text-slate-400">Vendor Signature</span>
                <div className="font-mono text-xs font-bold text-slate-800 italic underline py-2">
                  {data.sellerName}
                </div>
                <span className="text-[10px] text-emerald-700 font-medium">✓ e-Signed via DigiLocker</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between h-32">
                <span className="text-[10px] font-bold uppercase text-slate-400">Purchaser Signature</span>
                <div className="font-mono text-xs font-bold text-slate-800 italic underline py-2">
                  {data.buyerName}
                </div>
                <span className="text-[10px] text-emerald-700 font-medium">✓ e-Signed via DigiLocker</span>
              </div>

              {/* Notary Stamp / Embossed Seal Box */}
              <div className="p-3 bg-amber-50/60 rounded-xl border-2 border-dashed border-amber-400 flex flex-col items-center justify-between h-32 relative">
                <span className="text-[10px] font-extrabold uppercase text-amber-900 tracking-wider">
                  Notary Public Seal
                </span>
                
                <div className="my-auto text-center">
                  <div className="w-10 h-10 rounded-full border-2 border-amber-600 bg-amber-100 flex items-center justify-center mx-auto text-amber-800 font-bold text-xs shadow-xs">
                    ★ NOTARY ★
                  </div>
                  <span className="font-bold text-[10px] text-amber-950 block mt-1 leading-tight font-mono">
                    {data.notaryRegistrationNo}
                  </span>
                </div>

                <span className="text-[9px] font-bold text-amber-900 uppercase">
                  Govt. of India • Gujarat
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            <span>Document ID: <strong>{data.fileName}</strong> ({data.fileSize})</span>
            {currentOfficer && (
              <span className="ml-2 pl-2 border-l border-slate-200 text-blue-700 font-semibold">
                Reviewing Official: {currentOfficer.name}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              Close
            </button>

            {isOfficial && onApprove && (
              <>
                {onReject && (
                  <button
                    onClick={() => {
                      onClose();
                      onReject(agreementData);
                    }}
                    className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors"
                  >
                    Reject Application
                  </button>
                )}

                {onHold && (
                  <button
                    onClick={() => {
                      onClose();
                      onHold(agreementData);
                    }}
                    className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold transition-colors"
                  >
                    Hold for Inspection
                  </button>
                )}

                <button
                  id="btn-approve-transfer-from-modal"
                  onClick={() => {
                    onClose();
                    onApprove(agreementData);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verify Compliance & Approve Transfer</span>
                </button>
              </>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
