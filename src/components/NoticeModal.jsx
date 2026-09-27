import React, { useState } from 'react';
import { X, Printer, CheckCircle, ShieldAlert, FileText, QrCode } from 'lucide-react';

export default function NoticeModal({ alert, isOpen, onClose, onConfirmNotice }) {
  const [officerRemarks, setOfficerRemarks] = useState('Immediate cessation of all unauthorized civil construction works is directed under Section 84 of the State Land Revenue Code. Site inspection scheduled within 72 hours.');
  const [hearingDate, setHearingDate] = useState('2026-09-22');
  const [isGenerated, setIsGenerated] = useState(false);

  if (!isOpen || !alert) return null;

  const noticeNumber = `REV-SEC84-NOTICE-${alert.id.replace('ALERT-AI-', '')}`;
  const generationTimestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const handleGenerate = () => {
    setIsGenerated(true);
    if (onConfirmNotice) {
      onConfirmNotice({
        noticeNumber,
        alertId: alert.id,
        ulpin: alert.ulpin,
        hearingDate,
        remarks: officerRemarks,
        timestamp: generationTimestamp
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Statutory Digital Notice Generator</h2>
              <p className="text-xs text-slate-400">Section 84 - Land Revenue Code & Master Plan Enforcement</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {!isGenerated ? (
            <>
              <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/60 space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Violation Evidence Detected by AI</div>
                <div className="text-white font-medium text-base">{alert.title}</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-700/50">
                    <span className="text-slate-400 block">Target ULPIN:</span>
                    <span className="font-mono text-emerald-400 font-bold">{alert.ulpin}</span>
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-700/50">
                    <span className="text-slate-400 block">Survey / Khasra:</span>
                    <span className="text-slate-200 font-semibold">{alert.surveyNo}</span>
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-700/50">
                    <span className="text-slate-400 block">Affected Area:</span>
                    <span className="text-amber-400 font-semibold">{alert.changeMagnitudeSqM} sq. meters</span>
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-700/50">
                    <span className="text-slate-400 block">Confidence:</span>
                    <span className="text-red-400 font-bold">{alert.confidenceScore}%</span>
                  </div>
                </div>
              </div>

              {/* Form Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Statutory Show-Cause Hearing Date (Min. 15 Days Notice)
                  </label>
                  <input
                    type="date"
                    value={hearingDate}
                    onChange={(e) => setHearingDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Executive Magistrate & Planning Officer Statutory Directives
                  </label>
                  <textarea
                    rows={3}
                    value={officerRemarks}
                    onChange={(e) => setOfficerRemarks(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>

                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-300 flex items-start gap-2">
                  <FileText className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Issuing this digital notice transmits an instantaneous WhatsApp and SMS summons to the registered land title holder, dispatches an automated courier summon, and freezes any pending mutation requests on ULPIN <strong className="font-mono">{alert.ulpin}</strong>.
                  </span>
                </div>
              </div>
            </>
          ) : (
            /* Official Notice Print Document Preview */
            <div className="bg-white text-slate-900 p-8 rounded-lg shadow-inner font-serif border border-slate-300 space-y-4">
              <div className="text-center border-b-2 border-slate-800 pb-4">
                <div className="text-xs tracking-widest uppercase font-sans font-bold text-slate-600">Government of India & State Revenue Department</div>
                <h1 className="text-xl font-bold tracking-tight mt-1 text-slate-900 uppercase">Office of the Sub-Divisional Magistrate & Revenue Authority</h1>
                <p className="text-xs font-sans text-slate-600 mt-1">Court of the Executive Magistrate | Encroachment & Illegal Development Tribunal</p>
                <div className="text-xs font-mono font-bold text-red-700 mt-2">NOTICE NO: {noticeNumber}</div>
              </div>

              <div className="flex justify-between items-start text-xs font-sans">
                <div>
                  <p><strong>To:</strong> Record of Rights (RoR) Registered Owner(s) / Occupants</p>
                  <p><strong>Cadastral Parcel:</strong> {alert.surveyNo}, Village {alert.village}, {alert.district}</p>
                  <p><strong>Bhu-Aadhaar ULPIN:</strong> <span className="font-mono font-bold text-blue-900">{alert.ulpin}</span></p>
                </div>
                <div className="text-right">
                  <p><strong>Date of Issuance:</strong> {generationTimestamp}</p>
                  <p><strong>Hearing Date:</strong> {hearingDate} at 11:00 AM</p>
                  <p><strong>Jurisdiction:</strong> Special Land Tribunal</p>
                </div>
              </div>

              <div className="text-xs leading-relaxed text-justify space-y-2">
                <p>
                  <strong>WHEREAS</strong>, continuous multi-temporal GIS satellite change detection and high-resolution spatial orthomosaics executed under the National Bhu-Aadhaar DPI Framework have detected unauthorized development and spatial non-compliance on the subject parcel:
                </p>
                <div className="p-3 bg-slate-100 rounded border border-slate-300 font-sans text-xs">
                  <p><strong>Infraction Category:</strong> {alert.violationCategory}</p>
                  <p><strong>Spatial Breach Extent:</strong> {alert.changeMagnitudeSqM} sq. meters | Baseline: {alert.historicDate} vs Detected: {alert.currentDate}</p>
                  <p><strong>Officer Directives:</strong> {officerRemarks}</p>
                </div>
                <p>
                  <strong>NOW THEREFORE</strong>, you are hereby directed to <strong>CEASE AND DESIST</strong> all unauthorized activity immediately and appear before the undersigned Sub-Divisional Magistrate on <strong>{hearingDate}</strong> to show cause why the unauthorized structures should not be dismantled and statutory penalties levied.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-slate-100 border border-slate-400 rounded">
                    <QrCode className="w-12 h-12 text-slate-800" />
                  </div>
                  <div className="text-[10px] font-sans text-slate-500">
                    <span className="font-semibold block text-slate-800">Digitally Signed & Sealed</span>
                    <span>Land Stack DPI Gateway</span>
                    <span className="block font-mono text-[9px]">HASH: 0x7c41e889a01f...</span>
                  </div>
                </div>
                <div className="text-right font-sans">
                  <div className="font-bold text-xs text-slate-900">Executive Magistrate & Planning Authority</div>
                  <div className="text-[10px] text-slate-600">Seal of Revenue Sub-Division</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950/90">
          {!isGenerated ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                className="px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-500 text-white rounded-lg transition shadow-lg shadow-red-600/30 flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4" />
                Issue Statutory Notice & Log Audit
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print Notice
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Notice Dispatched Successfully
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
