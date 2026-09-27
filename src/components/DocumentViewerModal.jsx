import React, { useState } from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, Download, ZoomIn, ZoomOut, Hash, Eye, AlertCircle } from 'lucide-react';

export default function DocumentViewerModal({ doc, application, isOpen, onClose }) {
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!isOpen || !doc || !application) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">{doc.name}</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> State Cryptographic Seal Verified
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Application: <span className="font-mono text-slate-300 font-semibold">{application.id}</span> | ULPIN: <span className="font-mono text-emerald-400">{application.landDetails.ulpin}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700 p-0.5 text-xs text-slate-300">
              <button
                onClick={() => setZoomLevel(prev => Math.max(75, prev - 25))}
                className="p-1.5 hover:text-white hover:bg-slate-700 rounded transition"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(150, prev + 25))}
                className="p-1.5 hover:text-white hover:bg-slate-700 rounded transition"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Content Viewport */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-950/70 flex justify-center">
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="transition-transform duration-200 w-full max-w-2xl"
          >
            {/* Styled Official Digital Government Document Representation */}
            <div className="bg-amber-50/95 text-slate-900 p-8 rounded-lg shadow-xl border border-amber-200/60 font-serif relative overflow-hidden">
              {/* Subtle watermark */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5 rotate-[-30deg]">
                <div className="text-7xl font-bold uppercase tracking-widest text-slate-900 select-none">
                  BHU-AADHAAR OFFICIAL
                </div>
              </div>

              {/* Document Header */}
              <div className="text-center border-b-2 border-slate-900/80 pb-4 mb-4">
                <div className="text-[11px] font-sans font-bold tracking-widest uppercase text-slate-700">
                  Government of {application.landDetails.state} • Revenue & Land Records Department
                </div>
                <h1 className="text-lg font-bold tracking-tight text-slate-900 uppercase font-sans mt-1">
                  {doc.name.toUpperCase()}
                </h1>
                <div className="flex items-center justify-center gap-4 text-[11px] font-sans text-slate-700 mt-2">
                  <span>Deed Reg No: <strong>{application.landDetails.deedRegistrationNo}</strong></span>
                  <span>•</span>
                  <span>Date: <strong>{doc.date}</strong></span>
                  <span>•</span>
                  <span>Tehsil: <strong>{application.landDetails.tehsil}</strong></span>
                </div>
              </div>

              {/* Metadata Box */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-white/80 rounded border border-amber-300/80 font-sans text-xs mb-4">
                <div>
                  <span className="text-slate-500 block text-[10px]">National ULPIN / Bhu-Aadhaar:</span>
                  <span className="font-mono font-bold text-blue-900">{application.landDetails.ulpin}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Khasra / Gat / Survey No:</span>
                  <span className="font-semibold text-slate-900">{application.landDetails.khasraNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Primary Registered Holder(s):</span>
                  <span className="font-semibold text-slate-900">{application.applicantName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Surveyed Area:</span>
                  <span className="font-semibold text-slate-900">{application.landDetails.areaHectares} Ha ({application.landDetails.areaLocalUnit})</span>
                </div>
              </div>

              {/* Body Text Clauses */}
              <div className="text-xs leading-relaxed text-slate-800 space-y-3 text-justify">
                <p>
                  <strong>THIS REGISTERED CONVEYANCE / INSTRUMENT</strong> is endorsed under the relevant State Land Revenue Code and Registration Act. The Sub-Registrar has verified the physical presence of the executing parties, verified their Aadhaar biometric authentication token ({application.applicantAadhaarMasked}), and confirmed receipt of required Stamp Duty: <strong>{application.landDetails.stampDutyPaid}</strong>.
                </p>
                <p>
                  The subject property is bounded on the <strong>North</strong> by Survey Rd, <strong>South</strong> by Private Boundary, <strong>East</strong> by Canal Right-of-Way, and <strong>West</strong> by Agricultural Parcel. The title has undergone continuous computerized encumbrance scrutiny.
                </p>
              </div>

              {/* Simulated Map or Sketch if Cadastral */}
              {doc.fileType === 'image' && (
                <div className="my-4 p-3 bg-slate-900 rounded-lg border border-slate-800 text-center">
                  <div className="text-[11px] font-sans text-emerald-400 font-semibold mb-2 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> High-Precision DGPS Georeferenced Cadastral Polygon
                  </div>
                  <div className="h-44 bg-slate-950 rounded border border-slate-800 flex items-center justify-center relative overflow-hidden">
                    <svg className="w-full h-full p-4" viewBox="0 0 300 150">
                      <polygon points="50,20 220,15 260,110 90,130 40,80" fill="#10b98122" stroke="#10b981" strokeWidth="2.5" />
                      <line x1="50" y1="20" x2="220" y2="15" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4" />
                      <circle cx="50" cy="20" r="4" fill="#3b82f6" />
                      <circle cx="220" cy="15" r="4" fill="#3b82f6" />
                      <circle cx="260" cy="110" r="4" fill="#3b82f6" />
                      <circle cx="90" cy="130" r="4" fill="#3b82f6" />
                      <circle cx="40" cy="80" r="4" fill="#3b82f6" />
                      <text x="110" y="75" fill="#f8fafc" fontSize="9" fontFamily="monospace">ULPIN: {application.landDetails.ulpin.substring(0, 12)}...</text>
                      <text x="115" y="90" fill="#34d399" fontSize="8" fontFamily="sans-serif">Area: {application.landDetails.areaHectares} Ha</text>
                    </svg>
                  </div>
                </div>
              )}

              {/* Digital Signatures & Seal */}
              <div className="mt-6 pt-4 border-t border-slate-300 flex items-center justify-between font-sans">
                <div className="space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">e-Sign Fingerprint</div>
                  <div className="font-mono text-[9px] text-slate-700 bg-amber-100/80 px-2 py-1 rounded border border-amber-300 inline-block">
                    SHA256: 0x4f8b22a01e9d99214482...e9014
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Valid State Sub-Registrar Electronic Key
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-20 h-20 rounded-full border-2 border-red-700/80 p-1 flex flex-col items-center justify-center text-center text-red-800 rotate-[-12deg] bg-red-50/60 shadow-sm ml-auto">
                    <span className="text-[7px] font-bold uppercase tracking-tighter">SUB-REGISTRAR</span>
                    <span className="text-[9px] font-black">GOVT SEAL</span>
                    <span className="text-[6px] tracking-tight">{application.landDetails.district}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-950 text-xs">
          <div className="text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Document verified against Central Land Stack Data Vault via secure API gateway.</span>
          </div>
          <button
            onClick={() => alert(`Downloading verified cryptographically signed package: ${doc.name}`)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Signed Copy
          </button>
        </div>
      </div>
    </div>
  );
}
