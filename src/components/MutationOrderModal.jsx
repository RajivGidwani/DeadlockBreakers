import React from 'react';
import { X, CheckCircle, Printer, Download, ShieldCheck, QrCode, FileText } from 'lucide-react';

export default function MutationOrderModal({ application, isOpen, onClose }) {
  if (!isOpen || !application) return null;

  const orderNumber = `MUT-ORD-${application.landDetails.district.substring(0, 3).toUpperCase()}-2026-${application.id.slice(-4)}`;
  const orderDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Official Mutation Sanction Order (Namantaran)</h2>
              <p className="text-xs text-slate-400">Cryptographically Sealed Land Record Update Certificate</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="bg-white text-slate-900 p-8 rounded-lg shadow border border-slate-300 font-serif space-y-4">
            {/* Header */}
            <div className="text-center border-b-2 border-emerald-800 pb-3">
              <div className="text-[11px] font-sans font-bold tracking-widest text-emerald-800 uppercase">
                Revenue Department • Government of {application.landDetails.state}
              </div>
              <h1 className="text-xl font-bold font-sans tracking-tight text-slate-900 uppercase mt-1">
                Office of the Sub-Divisional Magistrate & Tehsildar
              </h1>
              <p className="text-xs font-sans text-slate-600">Land Revenue Code — Formal Order of Mutation & Record of Rights Correction</p>
              <div className="inline-block mt-2 px-3 py-1 bg-emerald-50 border border-emerald-300 rounded font-mono text-xs font-bold text-emerald-900">
                SANCTION ORDER NO: {orderNumber}
              </div>
            </div>

            {/* Clauses */}
            <div className="text-xs leading-relaxed text-slate-800 space-y-3 font-sans">
              <p className="text-justify">
                Having examined Application ID <strong>{application.id}</strong> submitted on {application.applicationDate} for <strong>{application.type}</strong>, and upon completion of the mandatory statutory 30-day public objection window without receipt of valid adverse claims, and upon full verification of e-Stamping Challan (<strong>{application.landDetails.stampDutyPaid}</strong>) registered under Sub-Registrar Document <strong>{application.landDetails.deedRegistrationNo}</strong>:
              </p>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">National ULPIN / Bhu-Aadhaar:</span>
                  <span className="font-mono font-bold text-blue-900">{application.landDetails.ulpin}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Khasra / Gat Number:</span>
                  <span className="font-semibold text-slate-900">{application.landDetails.khasraNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Sanctioned Transferee(s):</span>
                  <span className="font-semibold text-emerald-800">{application.applicantName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Quantum of Land:</span>
                  <span className="font-semibold text-slate-900">{application.landDetails.areaHectares} Hectares ({application.landDetails.areaLocalUnit})</span>
                </div>
              </div>

              <p className="text-justify font-serif text-xs">
                <strong>IT IS HEREBY ORDERED</strong> that the name(s) of the transferee(s) be duly recorded in the Record of Rights (RoR / 7-12 / Khatauni / Jamabandi) in place of the transferor(s). The Patwari / Talati is directed to affect corresponding map and textual corrections in the cadastral database immediately.
              </p>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-6 border-t border-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-slate-100 border border-slate-400 rounded">
                  <QrCode className="w-14 h-14 text-slate-900" />
                </div>
                <div className="text-[10px] font-sans text-slate-600">
                  <div className="font-bold text-slate-900">Digitally Certified & Seeded</div>
                  <div>National Bhu-Aadhaar Ledger</div>
                  <div className="font-mono text-[9px] text-slate-500">ULPIN: {application.landDetails.ulpin}</div>
                  <div className="text-emerald-700 font-semibold text-[10px]">Status: RoR Synchronized</div>
                </div>
              </div>
              <div className="text-right font-sans">
                <div className="font-bold text-xs text-slate-900">Tehsildar & Executive Magistrate</div>
                <div className="text-[10px] text-slate-600">{application.landDetails.tehsil}, {application.landDetails.district}</div>
                <div className="text-[10px] text-slate-500 mt-1">Date: {orderDate}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950">
          <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-sans">
            <CheckCircle className="w-4 h-4" /> Immutable Record Written to Audit Block Ledger
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition text-xs font-semibold flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print Certificate
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
