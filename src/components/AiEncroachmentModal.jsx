import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Radio, 
  AlertTriangle, 
  FileText, 
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';

export default function AiEncroachmentModal({
  isOpen,
  onClose,
  record,
  onIssueNotice,
  currentOfficer
}) {
  const [splitSlider, setSplitSlider] = useState(50);
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'side-by-side'
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isNoticeIssued, setIsNoticeIssued] = useState(false);

  if (!isOpen || !record) return null;

  const enc = record.encroachmentDetails || {
    historicalYear: 2022,
    currentYear: 2026,
    boundaryDeviation: 'Boundary Shift Detected: 2.4m onto Public Reserve',
    deviationAreaSqM: 142,
    aiConfidence: '94.2% AI Confidence Score',
    zoneType: 'High-Tension Power & Public Drainage Corridor',
    sensorSource: 'ISRO Cartosat-3 (0.28m) & Sentinel-2 Orthomosaic Stream',
    surveyorRecommended: 'Demarcation Rover Unit 04',
    coordinates: [23.2136, 72.6385]
  };

  const ulpinCode = record.ulpin || 'MH26DISP000008';
  const applicantName = record.applicantName || 'Vikramaditya Solanki';

  const handleIssueNoticeClick = () => {
    setIsNoticeIssued(true);
    if (onIssueNotice) {
      onIssueNotice(record, `Digital Encroachment Notice issued under Section 61 for ${enc.boundaryDeviation}.`);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-rose-50/80 via-white to-amber-50/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-sm ring-4 ring-rose-100">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  AI Cadastral Encroachment & Temporal Satellite Inspector
                </h3>
                {/* AI Confidence Badge */}
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-extrabold border border-rose-200">
                  <Sparkles className="w-3 h-3 text-rose-600" />
                  <span>{enc.aiConfidence || '94.2% AI Confidence Score'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Multi-spectral orthomosaic change detection comparing baseline revenue survey vs current physical footprint
              </p>
            </div>
          </div>

          <button
            id="btn-close-ai-encroachment"
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shadow-2xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          
          {/* Target Parcel Summary Ribbon */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Target ULPIN</span>
                <span className="font-mono font-extrabold text-blue-700 text-sm">{ulpinCode}</span>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Recorded Holder</span>
                <span className="font-bold text-slate-900 text-xs">{applicantName}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-bold">
                ⚠️ {enc.boundaryDeviation}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold">
                Area: +{enc.deviationAreaSqM} sq. m
              </span>
            </div>
          </div>

          {/* ================================================================ */}
          {/* SPLIT-VIEW SATELLITE ANALYSIS: 2022 BASELINE VS 2026 CURRENT */}
          {/* ================================================================ */}
          <div className="bg-slate-950 rounded-2xl p-4 text-white shadow-md space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center space-x-2">
                <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
                <span className="font-bold text-xs uppercase tracking-wider text-slate-200">
                  Split-View Satellite Analysis: Baseline ({enc.historicalYear || 2022}) vs Current ({enc.currentYear || 2026})
                </span>
              </div>

              {/* View Toggle */}
              <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                    viewMode === 'split' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Interactive Split
                </button>
                <button
                  onClick={() => setViewMode('side-by-side')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                    viewMode === 'side-by-side' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Side-by-Side
                </button>
              </div>
            </div>

            {/* Split Screen Canvas */}
            {viewMode === 'split' ? (
              <div className="relative w-full h-72 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 select-none">
                
                {/* Layer 1: 2026 Current High-Res Satellite Image (Full Width Underneath) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center flex items-end p-4"
                  style={{
                    backgroundImage: `linear-gradient(rgba(15,23,42,0.4), rgba(15,23,42,0.7)), url('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/16/28096/46888')`
                  }}
                >
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-rose-600/90 text-white text-[11px] font-bold shadow-md flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>2026 Current High-Res (Cartosat-3 0.28m)</span>
                  </div>

                  {/* Overlaid Cadastral Deviation Vector graphics */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Authorized 2022 legal boundary in green dashed */}
                    <rect x="25%" y="20%" width="45%" height="55%" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6,4" />
                    {/* Encroaching extended 2026 physical boundary in red solid */}
                    <rect x="25%" y="20%" width="58%" height="55%" fill="rgba(244,63,94,0.25)" stroke="#ef4444" strokeWidth="3" />
                    {/* Highlighted Encroachment Strip */}
                    <rect x="70%" y="20%" width="13%" height="55%" fill="rgba(244,63,94,0.55)" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" />
                    <text x="71%" y="50%" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      +2.4m Deviation
                    </text>
                  </svg>
                </div>

                {/* Layer 2: 2022 Baseline Satellite Image (Clipped by Split Slider) */}
                <div 
                  className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-amber-400 shadow-2xl bg-cover bg-center flex items-end p-4"
                  style={{ 
                    width: `${splitSlider}%`,
                    backgroundImage: `linear-gradient(rgba(15,23,42,0.3), rgba(15,23,42,0.6)), url('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/16/28095/46887')`
                  }}
                >
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-emerald-700/90 text-white text-[11px] font-bold shadow-md">
                    2022 Baseline Satellite (Legal Cadastre)
                  </div>

                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ width: '1000px' }}>
                    <rect x="250" y="55" width="450" height="155" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="2.5" />
                  </svg>
                </div>

                {/* Split Slider Handle */}
                <div 
                  className="absolute inset-y-0 -ml-3 w-6 flex items-center justify-center pointer-events-none z-10"
                  style={{ left: `${splitSlider}%` }}
                >
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-lg">
                    ⇄
                  </div>
                </div>

              </div>
            ) : (
              /* Side-by-Side Mode */
              <div className="grid grid-cols-2 gap-3 h-64">
                {/* 2022 Baseline */}
                <div 
                  className="relative rounded-xl overflow-hidden border border-slate-800 bg-cover bg-center p-3 flex flex-col justify-between"
                  style={{
                    backgroundImage: `linear-gradient(rgba(15,23,42,0.4), rgba(15,23,42,0.6)), url('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/16/28095/46887')`
                  }}
                >
                  <span className="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold self-start">
                    2022 Statutory Cadastre
                  </span>
                  <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-[10px]">
                    <span className="text-emerald-400 font-bold block">Legal Parcel Width: 42.0m</span>
                    <span className="text-slate-400">Zero overlap onto reserve</span>
                  </div>
                </div>

                {/* 2026 Current */}
                <div 
                  className="relative rounded-xl overflow-hidden border border-slate-800 bg-cover bg-center p-3 flex flex-col justify-between"
                  style={{
                    backgroundImage: `linear-gradient(rgba(15,23,42,0.4), rgba(15,23,42,0.6)), url('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/16/28096/46888')`
                  }}
                >
                  <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold self-start">
                    2026 Current Physical Boundary
                  </span>
                  <div className="bg-slate-900/80 p-2 rounded-lg border border-rose-900/60 text-[10px]">
                    <span className="text-rose-400 font-bold block">Physical Width: 44.4m (+2.4m Shift)</span>
                    <span className="text-slate-300">Concrete wall extending into buffer</span>
                  </div>
                </div>
              </div>
            )}

            {/* Slider Control Bar (in Split Mode) */}
            {viewMode === 'split' && (
              <div className="flex items-center justify-between text-xs pt-1 px-1">
                <span className="text-emerald-400 font-semibold">← Drag left for 2022 Baseline</span>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={splitSlider}
                  onChange={(e) => setSplitSlider(Number(e.target.value))}
                  className="w-1/2 accent-amber-400 cursor-ew-resize"
                />
                <span className="text-rose-400 font-semibold">Drag right for 2026 High-Res →</span>
              </div>
            )}
          </div>

          {/* AI Inspection Findings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Detected Boundary Deviation
              </span>
              <div className="font-extrabold text-slate-900 text-xs text-rose-700">
                {enc.boundaryDeviation}
              </div>
              <p className="text-[11px] text-slate-500">
                Area: <strong className="text-slate-800">+{enc.deviationAreaSqM} sq. m</strong> encroached
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Violated Zone / Easement
              </span>
              <div className="font-bold text-slate-900 text-xs">
                {enc.zoneType}
              </div>
              <p className="text-[11px] text-slate-500">
                Statutory Ground: <strong className="text-slate-800">Section 61 GLRC</strong>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Telemetry & Sensor Source
              </span>
              <div className="font-mono text-slate-800 text-[11px] truncate" title={enc.sensorSource}>
                {enc.sensorSource}
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold">
                ISRO Bhuvan Timestamp Verified
              </p>
            </div>
          </div>

          {/* Notice Status Banner if Dispatched */}
          {isNoticeIssued && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  <strong>Digital Encroachment Notice Issued!</strong> Dispatched to {applicantName} and logged in Audit Trail.
                </span>
              </div>
              <span className="font-mono font-bold text-[10px] bg-white px-2 py-0.5 rounded border border-emerald-200">
                NOTICE-2026-61A
              </span>
            </div>
          )}

          {/* Simulated AI Field Inspection Report View */}
          {isReportOpen && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                <div className="flex items-center space-x-1.5 font-bold text-amber-950">
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span>AI Field Demarcation & Inspection Dossier (Draft Order)</span>
                </div>
                <button
                  onClick={() => setIsReportOpen(false)}
                  className="text-amber-800 hover:text-amber-950 text-xs font-bold"
                >
                  ✕ Close Report
                </button>
              </div>

              <div className="space-y-1 text-slate-800 leading-relaxed">
                <p>
                  <strong>Case Citation:</strong> GUDA-ENC-2026-0814 • <strong>ULPIN:</strong> {ulpinCode} • <strong>Target:</strong> {applicantName}
                </p>
                <p>
                  <strong>Findings:</strong> Multi-temporal Cartosat-3 satellite telemetry cross-checked with Gujarat Land Revenue GIS database confirms that southern boundary has expanded by 2.4 meters over the last 48 months, causing unauthorized occupation of 142 sq. m of the municipal drainage reserve.
                </p>
                <p>
                  <strong>Recommendation:</strong> Dispatch Revenue Surveyor with GNSS RTK Rover for physical boundary pegging and order restoration of public drainage alignment within 15 statutory days.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-amber-900 border-t border-amber-200/80">
                <span>Authorized by: <strong>{currentOfficer?.name || 'Rajesh Kumar'} ({currentOfficer?.title || 'Tehsildar'})</strong></span>
                <span className="font-mono font-bold">● e-Sign Verified</span>
              </div>
            </div>
          )}

        </div>

        {/* Primary Officer Action Bar */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
          >
            Close Inspector
          </button>

          <div className="flex items-center space-x-2.5">
            {/* Button 1: [ 📄 Generate AI Field Inspection Report ] */}
            <button
              id="btn-generate-field-report"
              onClick={() => setIsReportOpen(true)}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs shadow-2xs transition-all active:scale-[0.98]"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>[ 📄 Generate AI Field Inspection Report ]</span>
            </button>

            {/* Button 2: [ ⚠️ Issue Digital Encroachment Notice ] */}
            <button
              id="btn-issue-encroachment-notice"
              onClick={handleIssueNoticeClick}
              disabled={isNoticeIssued}
              className={`inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl font-extrabold text-xs shadow-sm transition-all active:scale-[0.98] ${
                isNoticeIssued
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-rose-200'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{isNoticeIssued ? '✓ Notice Dispatched' : '[ ⚠️ Issue Digital Encroachment Notice ]'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
