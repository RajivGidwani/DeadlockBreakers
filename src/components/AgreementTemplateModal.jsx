import React from 'react';
import { 
  X, 
  FileDown, 
  Download, 
  Printer, 
  Scale 
} from 'lucide-react';

export default function AgreementTemplateModal({
  isOpen,
  onClose,
  parcel = null
}) {
  if (!isOpen) return null;

  const handleDownload = () => {
    alert('Standard Sale Agreement Template ("Bana Paper" Form 33-A) downloaded. Both parties can execute this draft and notarize it before submitting.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      
      {/* Centered Modal Frame */}
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/90 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                  Official Standard Sale Agreement Template ("Bana Paper")
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                  Form 33-A Standard Draft
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Standard legal draft approved by Gujarat Revenue Department & Sub-Registrar Council
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Draft</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Template</span>
            </button>
            <button
              id="btn-close-template-modal"
              onClick={onClose}
              className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shadow-2xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Instructions Banner */}
        <div className="bg-amber-50/70 border-b border-amber-200/80 px-6 py-3 text-xs text-amber-900 flex items-center space-x-2.5">
          <Scale className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Official Guideline:</strong> Print this template onto authorized non-judicial e-stamp paper, execute signatures in the presence of an advocate or Notary Public, and upload the scanned copy along with Notary registration details.
          </span>
        </div>

        {/* Document Template Preview */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm bg-slate-50">
          
          <div className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 shadow-xs font-serif text-slate-800 space-y-5 leading-relaxed text-xs">
            
            <div className="text-center border-b pb-4">
              <span className="font-mono uppercase font-bold text-[10px] text-slate-400 block tracking-widest">
                FORM NO. 33-A • REVENUE DEPARTMENT GUJARAT
              </span>
              <h3 className="font-sans font-black text-base text-slate-900 mt-1">
                STANDARD AGREEMENT TO SELL / SALE AGREEMENT ("BANA PAPER")
              </h3>
              <p className="font-sans text-[11px] text-slate-500">
                Governed under the Indian Contract Act, 1872 & Transfer of Property Act, 1882
              </p>
            </div>

            <div className="space-y-3">
              <p>
                <strong>THIS SALE AGREEMENT ("BANA PAPER")</strong> is entered into on this ______ day of ______________, 2026, at Gandhinagar, Gujarat, by and between:
              </p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 font-sans">
                <div>
                  <strong>FIRST PARTY / THE VENDOR (SELLER):</strong>
                  <p className="text-slate-600 mt-0.5">
                    Name: <strong>{parcel?.holderName || '_______________________________________'}</strong><br />
                    Father / Husband's Name: _______________________________________<br />
                    Residential Address: {parcel?.sector || '_______________________________________'}, Gandhinagar, Gujarat.<br />
                    Aadhaar No.: ________________________ | Mobile No.: ________________________
                  </p>
                </div>
                
                <div className="pt-2 border-t border-slate-200">
                  <strong>SECOND PARTY / THE PURCHASER (BUYER):</strong>
                  <p className="text-slate-600 mt-0.5">
                    Name: _________________________________________________________________<br />
                    Father / Husband's Name: _______________________________________<br />
                    Residential Address: ___________________________________________________<br />
                    Aadhaar No.: ________________________ | Mobile No.: ________________________
                  </p>
                </div>
              </div>

              <h4 className="font-sans font-bold text-xs uppercase text-slate-900 pt-2 border-b pb-1">
                SCHEDULE OF PROPERTY (LAND PARCEL DETAILS)
              </h4>

              <div className="font-sans grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px]">
                <div>
                  <span className="text-slate-400 block font-bold">14-Digit ULPIN (Bhu-Aadhaar):</span>
                  <span className="font-mono font-bold text-blue-700">{parcel?.ulpin || 'GJ06GND_________________'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold">Land Detail Record / Area Size:</span>
                  <span className="font-bold">{parcel ? `${parcel.areaSqM.toLocaleString()} sq. m (${parcel.areaAcres} Acres)` : '________ sq. m (____ Acres)'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold">Land Detail Record (Khasra) #:</span>
                  <span className="font-bold">{parcel?.khasraNo || '________'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold">Land Category / Zoning:</span>
                  <span className="font-bold">{parcel?.landCategory || 'Residential'}</span>
                </div>
              </div>

              <h4 className="font-sans font-bold text-xs uppercase text-slate-900 pt-2 border-b pb-1">
                TERMS & RECITALS OF SALE
              </h4>

              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Total Sale Consideration:</strong> The total agreed sale consideration for the scheduled Land Parcel is mutually agreed at <strong>₹ ________________________ (Rupees ____________________________________________________________________ only)</strong>.
                </li>
                <li>
                  <strong>Token / Advance Amount ("Bana Deposit"):</strong> The Purchaser has paid to the Vendor an advance earnest amount of <strong>₹ ________________________</strong> via Cheque / RTGS / Bank Draft No. ________________________ dated ________________, the receipt of which the Vendor hereby acknowledges.
                </li>
                <li>
                  <strong>Property Claims & Liabilities Free:</strong> The Vendor expressly warrants that the property is completely free from all mortgages, claims, attachments, charges, court disputes, and municipal liens.
                </li>
                <li>
                  <strong>Time for Conveyance:</strong> The final registered sale conveyance deed and Land Record Update shall be completed within ______ days from the execution of this Agreement.
                </li>
                <li>
                  <strong>Notarization Requirement:</strong> This Agreement shall be executed in the presence of two witnesses and attested before an authorized Notary Public under seal.
                </li>
              </ol>

              <div className="pt-6 border-t-2 grid grid-cols-3 gap-4 font-sans text-center text-[11px]">
                <div className="border border-slate-200 p-2.5 rounded-lg">
                  <div className="h-10 border-b border-dashed border-slate-300"></div>
                  <span className="block font-bold text-slate-700 mt-1">Vendor Signature</span>
                </div>
                <div className="border border-slate-200 p-2.5 rounded-lg">
                  <div className="h-10 border-b border-dashed border-slate-300"></div>
                  <span className="block font-bold text-slate-700 mt-1">Purchaser Signature</span>
                </div>
                <div className="border border-amber-300 bg-amber-50/50 p-2.5 rounded-lg">
                  <div className="h-10 border-b border-dashed border-amber-400"></div>
                  <span className="block font-bold text-amber-900 mt-1">Notary Seal & Reg #</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-white flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Form 33-A Standard Template • Ready for execution
          </span>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Official Template</span>
          </button>
        </div>

      </div>

    </div>
  );
}
