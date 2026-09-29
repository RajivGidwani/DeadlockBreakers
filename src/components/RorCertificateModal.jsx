import React from 'react';
import { 
  X, 
  Printer, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode
} from 'lucide-react';

export default function RorCertificateModal({
  isOpen,
  onClose,
  details
}) {
  if (!isOpen || !details) return null;

  const ownerName = details.newOwnerName || details.applicantName || 'Vikramaditya Singhania';
  const ulpinCode = details.ulpin || 'GJ06GND000101';
  const sector = details.sector || 'Gandhinagar Sector 21';
  const category = details.landCategory || 'Residential';
  const areaSqM = details.areaSqM || 3250;
  const areaAcres = details.areaAcres || 0.80;
  const khasraNo = details.khasraNo || '142/1';
  const officerName = details.officerName || 'Rajesh Kumar';
  const officerTitle = details.officerTitle || 'Tehsildar / Revenue Officer (RO #8821)';
  const dateStr = details.date || '09-Sep-2026';
  const certId = details.certId || `ROR-GJ-GND-882194`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Printable Certificate Modal Container */}
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Control Bar */}
        <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="font-bold text-xs tracking-wide">
                Digital Record of Rights (RoR) Certificate Viewer
              </span>
              <span className="text-[10px] text-slate-400 block">
                Official AnyRoR 7/12 & 8-A Extract • Cryptographically Signed
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="btn-print-certificate"
              onClick={handlePrint}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Paper Canvas */}
        <div className="p-8 sm:p-12 overflow-y-auto bg-[#fafafa] flex justify-center">
          
          <div 
            id="ror-print-area"
            className="relative w-full max-w-2xl bg-white border-4 border-double border-amber-900/30 p-8 rounded-2xl shadow-sm text-slate-800 font-serif leading-relaxed"
          >
            {/* Watermark Emblem in Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <div className="w-80 h-80 rounded-full border-8 border-slate-900 flex items-center justify-center font-bold text-9xl text-slate-900">
                GUJ
              </div>
            </div>

            {/* Certificate Header */}
            <div className="text-center border-b-2 border-amber-900/30 pb-4 relative z-10">
              <div className="w-14 h-14 mx-auto mb-2 text-amber-900 flex items-center justify-center font-bold text-xl border-2 border-amber-900/40 rounded-full">
                ⚖️
              </div>
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 font-sans">
                GOVERNMENT OF GUJARAT
              </h2>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950 font-sans mt-0.5">
                DEPARTMENT OF REVENUE & LAND ADMINISTRATION
              </h3>
              <p className="text-[11px] text-slate-500 font-sans italic mt-1">
                Sub-Divisional Revenue Office • Gandhinagar North Division, Gujarat
              </p>

              <div className="mt-3 inline-block px-4 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold font-sans tracking-wide">
                FORM NO. 7/12 & 8-A: CERTIFIED RECORD OF RIGHTS (RoR)
              </div>
            </div>

            {/* Certificate Metadata Bar */}
            <div className="my-4 py-2 px-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-[11px] font-sans text-slate-600 relative z-10">
              <div>Certificate Ref: <strong className="font-mono text-slate-900">{certId}</strong></div>
              <div>Issue Date: <strong className="text-slate-900">{dateStr}</strong></div>
              <div className="text-emerald-700 font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Legally Certified</span>
              </div>
            </div>

            {/* Legal Statement */}
            <div className="text-xs text-justify space-y-3 relative z-10 my-4">
              <p>
                This is to officially certify that under the provisions of the <strong>Gujarat Land Revenue Code (GLRC)</strong> and Digital Public Infrastructure (DPI) mandate, title ownership of the below-described land parcel has been duly verified, updated, and recorded in the State Land Registry.
              </p>
            </div>

            {/* Land & Geometry Details Table */}
            <div className="border border-slate-300 rounded-xl overflow-hidden text-xs font-sans mb-4 relative z-10">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-slate-200 bg-slate-50/70">
                    <td className="py-2 px-3 font-bold text-slate-600 w-1/3">Bhu-Aadhaar (ULPIN):</td>
                    <td className="py-2 px-3 font-mono font-bold text-blue-700">{ulpinCode}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 px-3 font-bold text-slate-600">Recorded Legal Owner:</td>
                    <td className="py-2 px-3 font-bold text-slate-900">{ownerName}</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50/70">
                    <td className="py-2 px-3 font-bold text-slate-600">Land Detail Record #:</td>
                    <td className="py-2 px-3 font-mono text-slate-800">Land Detail Record #{khasraNo}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 px-3 font-bold text-slate-600">Area Size:</td>
                    <td className="py-2 px-3 font-semibold text-slate-800">
                      {areaSqM.toLocaleString()} sq. meters ({areaAcres} Acres)
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50/70">
                    <td className="py-2 px-3 font-bold text-slate-600">Land Use Classification:</td>
                    <td className="py-2 px-3 font-bold text-slate-800">{category} Land</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-slate-600">Jurisdiction / Tehsil:</td>
                    <td className="py-2 px-3 text-slate-800">{sector}, Gandhinagar Urban Area (GUDA)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cryptographic Verification & Seals Section */}
            <div className="pt-4 border-t-2 border-amber-900/30 grid grid-cols-2 gap-4 items-end relative z-10 font-sans text-xs">
              
              {/* DigiLocker Digital Verification Seal & QR Code */}
              <div className="flex items-center space-x-3 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                <div className="w-12 h-12 bg-white border border-emerald-300 rounded-lg flex items-center justify-center text-slate-800 shrink-0">
                  <QrCode className="w-9 h-9 text-emerald-800" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                    DigiLocker Certified Seal
                  </span>
                  <p className="text-[10px] text-slate-600">
                    SHA-256 Digest Verified • Valid Across All Indian Judicial Forums
                  </p>
                  <span className="text-[9px] font-mono text-emerald-700 font-bold block mt-0.5">
                    ID: DL-GUJ-2026-8821
                  </span>
                </div>
              </div>

              {/* Digital Signature of Presiding Officer */}
              <div className="text-right space-y-1">
                <div className="font-serif italic text-blue-900 text-sm font-bold">
                  Rajesh Kumar
                </div>
                <div className="w-32 border-b border-slate-400 ml-auto" />
                <p className="font-bold text-[11px] text-slate-900">
                  {officerName}
                </p>
                <p className="text-[10px] text-slate-500">
                  {officerTitle}
                </p>
                <p className="text-[9px] text-emerald-700 font-mono font-semibold">
                  Signed with e-Pramaan Token (DSC Level 3)
                </p>
              </div>

            </div>

            {/* Footer Disclaimer */}
            <div className="mt-6 pt-3 border-t border-slate-200 text-[9px] text-center text-slate-400 font-sans">
              This digital extract is electronically generated under Section 6 of the Information Technology Act 2000 and requires no physical ink signature. Document verification URL: https://anyror.gujarat.gov.in/verify
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
