import React from 'react';
import { 
  X, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  MapPin 
} from 'lucide-react';

export default function CelebratoryModal({
  isOpen,
  onClose,
  mutationDetails,
  onDownloadCertificate,
  onViewOnMap
}) {
  if (!isOpen || !mutationDetails) return null;

  const newOwnerName = mutationDetails.newOwnerName || mutationDetails.applicantName || 'Vikramaditya Singhania';
  const ulpinCode = mutationDetails.ulpin || 'GJ06GND000101';
  const sector = mutationDetails.sector || 'Gandhinagar Sector 21';
  const transactionAmount = mutationDetails.saleAmount || mutationDetails.transactionValue || '₹ 4,50,00,000';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* Centered Celebratory Card */}
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col text-center animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Animated Confetti Canvas / Background Ribbons */}
        <div className="relative overflow-hidden bg-gradient-to-b from-amber-100/70 via-emerald-50/60 to-white px-6 pt-8 pb-6 border-b border-slate-100">
          
          {/* Confetti graphics particles */}
          <div className="absolute inset-0 pointer-events-none opacity-80">
            <span className="absolute top-3 left-6 text-xl animate-bounce">🎉</span>
            <span className="absolute top-8 left-24 text-lg animate-ping">✨</span>
            <span className="absolute top-4 right-10 text-2xl animate-bounce">🎊</span>
            <span className="absolute top-10 right-28 text-base">⭐</span>
            <span className="absolute bottom-3 left-14 text-sm">🎈</span>
            <span className="absolute bottom-4 right-16 text-xl">🥳</span>
            <div className="absolute top-0 left-1/4 w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <div className="absolute top-6 right-1/3 w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
            <div className="absolute bottom-2 left-1/2 w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="absolute top-12 left-12 w-2 h-2 rounded-full bg-purple-500" />
          </div>

          <button
            id="btn-close-celebration"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-400 hover:text-slate-700 flex items-center justify-center shadow-xs transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Celebratory Badge */}
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg ring-8 ring-amber-50/80 mb-3 transform hover:scale-105 transition-transform">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ownership Transfer Legally Sanctioned</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            WELCOME HOME!
          </h2>

          {/* Exact Required Congratulatory Message */}
          <p className="text-sm text-slate-700 font-medium max-w-md mx-auto mt-2 leading-relaxed">
            Congratulations <strong className="text-slate-900 font-bold">{newOwnerName}</strong>! Ownership of ULPIN <strong className="font-mono text-blue-700">{ulpinCode}</strong> ({sector}) has been legally transferred and updated in official government records.
          </p>
        </div>

        {/* Transaction Recap Card */}
        <div className="p-6 space-y-4 text-xs text-left bg-white">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Official Revenue Record
              </span>
              <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                AnyRoR 7/12 Synchronized
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Bhu-Aadhaar (ULPIN)</span>
                <span className="font-mono font-bold text-slate-900 text-xs">{ulpinCode}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Recorded Owner</span>
                <span className="font-bold text-slate-900 text-xs">{newOwnerName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Registration / Valuation</span>
                <span className="font-extrabold text-slate-900 text-xs">{transactionAmount}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">DigiLocker Seal</span>
                <span className="font-mono font-bold text-blue-700 text-xs">DL-GOV-VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5 pt-2">
            
            {/* Trigger 2: Downloadable Official RoR Certificate (PDF) */}
            <button
              id="btn-download-ror-cert"
              onClick={onDownloadCertificate}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 text-white font-extrabold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 active:scale-[0.99]"
            >
              <FileText className="w-5 h-5 text-blue-100" />
              <span>[ 📄 Download Official RoR Certificate (PDF) ]</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                id="btn-view-mutated-parcel-map"
                onClick={() => {
                  onClose();
                  if (onViewOnMap) onViewOnMap(ulpinCode);
                }}
                className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Locate on GIS Map</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
