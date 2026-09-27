import React, { useState } from 'react';
import { 
  Radio, 
  Layers, 
  ShieldAlert, 
  Navigation, 
  FileText, 
  CheckCircle, 
  X, 
  Eye, 
  Sliders, 
  Maximize2, 
  Scan, 
  MapPin, 
  AlertTriangle, 
  ChevronRight,
  Sparkles,
  RefreshCw,
  Crosshair,
  Compass,
  ArrowRight
} from 'lucide-react';
import NoticeModal from './NoticeModal';
import SurveyorDispatchModal from './SurveyorDispatchModal';

export default function AIEncroachmentMonitor({ 
  alerts, 
  onIssueNotice, 
  onDispatchSurveyor, 
  onDismissAlert,
  currentRole,
  selectedAlertId
}) {
  const [selectedAlert, setSelectedAlert] = useState(
    selectedAlertId ? alerts.find(a => a.id === selectedAlertId) || alerts[0] : alerts[0]
  );
  const [splitPosition, setSplitPosition] = useState(50); // percentage 0 - 100
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'side-by-side'
  const [showCadastralOverlay, setShowCadastralOverlay] = useState(true);
  const [showDetectedViolation, setShowDetectedViolation] = useState(true);
  const [showBufferZone, setShowBufferZone] = useState(true);

  // Modals state
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [dismissModalOpen, setDismissModalOpen] = useState(false);
  const [dismissReason, setDismissReason] = useState('');

  // Update selected alert when selectedAlertId changes
  React.useEffect(() => {
    if (selectedAlertId) {
      const match = alerts.find(a => a.id === selectedAlertId);
      if (match) setSelectedAlert(match);
    }
  }, [selectedAlertId, alerts]);

  const handleDismissConfirm = () => {
    if (selectedAlert && dismissReason.trim()) {
      onDismissAlert(selectedAlert, dismissReason);
      setDismissModalOpen(false);
      setDismissReason('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Satellite Sensor Telemetry */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 bg-red-500/20 text-red-400 rounded-xl border border-red-500/30">
            <Radio className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">
                AI GIS Encroachment & Illegal Construction Monitor
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                0.5m Cartosat/Sentinel Stream
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated temporal change detection comparing baseline GIS cadastral layers vs multi-spectral satellite orthomosaics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-400">ISRO Bhuvan Sync:</span>
            <span className="font-mono text-emerald-400 font-bold">14.8 ms</span>
          </div>
          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2">
            <span className="text-slate-400">Active High-Risk Parcels:</span>
            <span className="font-mono text-red-400 font-bold">{alerts.length}</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid: Split-View Comparator on Left, Alert Feed on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Satellite Analysis & Comparator (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Comparator Controls Toolbar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Comparison Mode:</span>
              <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                    viewMode === 'split' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Interactive Split Slider
                </button>
                <button
                  onClick={() => setViewMode('side-by-side')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                    viewMode === 'side-by-side' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Side-by-Side Dual View
                </button>
              </div>
            </div>

            {/* Overlay Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCadastralOverlay(!showCadastralOverlay)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                  showCadastralOverlay
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-950 text-slate-500 border border-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Cadastral Boundary</span>
              </button>

              <button
                onClick={() => setShowDetectedViolation(!showDetectedViolation)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                  showDetectedViolation
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                    : 'bg-slate-950 text-slate-500 border border-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>AI Detected Footprint</span>
              </button>

              <button
                onClick={() => setShowBufferZone(!showBufferZone)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                  showBufferZone
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-950 text-slate-500 border border-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Buffer Zone</span>
              </button>
            </div>
          </div>

          {/* Interactive GIS Satellite Canvas Viewport */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
            {/* Viewport Header HUD */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2 pointer-events-none">
              <div className="bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs shadow-lg">
                <div className="font-mono text-emerald-400 font-bold">{selectedAlert.ulpin}</div>
                <div className="text-[10px] text-slate-400">{selectedAlert.surveyNo} • {selectedAlert.village}</div>
              </div>
              <div className="bg-red-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-red-800/80 text-xs shadow-lg flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span className="font-mono text-red-300 font-bold">{selectedAlert.changeMagnitudeSqM} sq.m Encroached</span>
              </div>
            </div>

            {/* Viewport Top Right HUD: Compass & Resolution */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-2 pointer-events-none">
              <div className="bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-300 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '20s' }} />
                <span>N 30°38' | E 76°49'</span>
              </div>
              <div className="bg-slate-950/90 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-800 text-[10px] font-mono text-emerald-400">
                0.5m/px
              </div>
            </div>

            {/* Split Slider Mode */}
            {viewMode === 'split' ? (
              <div className="relative h-[430px] select-none overflow-hidden bg-slate-950">
                {/* Background: Current 2026 Satellite View */}
                <div className="absolute inset-0 w-full h-full">
                  <svg className="w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="none">
                    <defs>
                      <pattern id="soil-pattern-new" width="40" height="40" patternUnits="userSpaceOnUse">
                        <rect width="40" height="40" fill="#1c2518" />
                        <circle cx="20" cy="20" r="1" fill="#2d3725" />
                        <line x1="0" y1="20" x2="40" y2="20" stroke="#161f12" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="800" height="450" fill="url(#soil-pattern-new)" />
                    
                    {/* Road Network */}
                    <path d="M 0 100 Q 400 80 800 120" stroke="#334155" strokeWidth="48" fill="none" />
                    <path d="M 0 100 Q 400 80 800 120" stroke="#fbbf24" strokeWidth="2" strokeDasharray="12 8" fill="none" />

                    {/* Surrounding Farmland patches */}
                    <polygon points="40,160 320,150 300,340 30,320" fill="#253a1f" stroke="#1d2e18" strokeWidth="2" />
                    <polygon points="480,180 760,170 780,410 490,400" fill="#294022" stroke="#1d2e18" strokeWidth="2" />

                    {/* Waterbody / Canal */}
                    <path d="M 0 420 Q 300 390 800 410" stroke="#0e3a53" strokeWidth="32" fill="none" opacity="0.8" />

                    {/* NEW UNAUTHORIZED CONSTRUCTION (2026 Current) */}
                    <g transform="translate(320, 160)">
                      {/* Heavy Concrete Pad */}
                      <rect x="20" y="20" width="180" height="130" rx="4" fill="#64748b" stroke="#94a3b8" strokeWidth="2" />
                      {/* Commercial Warehouse Pre-Engineered Roof */}
                      <rect x="35" y="35" width="150" height="100" fill="#3b82f6" opacity="0.85" stroke="#60a5fa" strokeWidth="2" />
                      <line x1="35" y1="85" x2="185" y2="85" stroke="#ffffff" strokeWidth="1" strokeDasharray="4" />
                      {/* Parking / Truck Bays */}
                      <rect x="25" y="125" width="40" height="20" fill="#475569" />
                      <rect x="75" y="125" width="40" height="20" fill="#475569" />
                      {/* Construction Cranes / Heavy Truck Markers */}
                      <circle cx="170" cy="45" r="5" fill="#f59e0b" />
                      <circle cx="180" cy="135" r="4" fill="#ef4444" />
                    </g>

                    {/* Cadastral Boundary Overlay */}
                    {showCadastralOverlay && (
                      <polygon 
                        points="320,140 560,130 540,360 300,350" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="3.5" 
                        strokeDasharray="6 3" 
                      />
                    )}

                    {/* AI Detected Footprint Overlay (Red Pulsing) */}
                    {showDetectedViolation && (
                      <g>
                        <rect 
                          x="340" 
                          y="180" 
                          width="180" 
                          height="130" 
                          rx="4" 
                          fill="#ef4444" 
                          fillOpacity="0.45" 
                          stroke="#ef4444" 
                          strokeWidth="3" 
                        />
                        <text x="350" y="200" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace">
                          VIOLATION: {selectedAlert.changeMagnitudeSqM} sq.m
                        </text>
                        <text x="350" y="220" fill="#fecaca" fontSize="10" fontFamily="sans-serif">
                          Confidence: {selectedAlert.confidenceScore}%
                        </text>
                      </g>
                    )}

                    {/* Buffer Zone Overlay */}
                    {showBufferZone && (
                      <path 
                        d="M 0 148 Q 400 128 800 168" 
                        stroke="#06b6d4" 
                        strokeWidth="2" 
                        strokeDasharray="8 6" 
                        fill="none" 
                      />
                    )}
                  </svg>
                  <div className="absolute bottom-3 right-3 bg-slate-900/90 text-white font-mono px-3 py-1 rounded text-xs border border-slate-700">
                    CURRENT: {selectedAlert.currentDate}
                  </div>
                </div>

                {/* Foreground Layer (Historic Baseline clipped by splitPosition) */}
                <div 
                  className="absolute inset-0 h-full overflow-hidden border-r-2 border-emerald-400"
                  style={{ width: `${splitPosition}%` }}
                >
                  <div className="absolute inset-0 w-[800px] h-[450px]">
                    <svg className="w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="none">
                      <defs>
                        <pattern id="soil-pattern-old" width="40" height="40" patternUnits="userSpaceOnUse">
                          <rect width="40" height="40" fill="#182c16" />
                          <circle cx="20" cy="20" r="1" fill="#2d4a2a" />
                          <line x1="0" y1="20" x2="40" y2="20" stroke="#122410" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="800" height="450" fill="url(#soil-pattern-old)" />
                      
                      {/* Road Network */}
                      <path d="M 0 100 Q 400 80 800 120" stroke="#334155" strokeWidth="48" fill="none" />
                      <path d="M 0 100 Q 400 80 800 120" stroke="#fbbf24" strokeWidth="2" strokeDasharray="12 8" fill="none" />

                      {/* Surrounding Farmland patches */}
                      <polygon points="40,160 320,150 300,340 30,320" fill="#22441c" stroke="#173013" strokeWidth="2" />
                      <polygon points="480,180 760,170 780,410 490,400" fill="#24481e" stroke="#173013" strokeWidth="2" />

                      {/* HISTORIC PARCEL (Pure Green Agriculture in 2022) */}
                      <polygon points="320,140 560,130 540,360 300,350" fill="#2a5824" stroke="#1b3f17" strokeWidth="2" />
                      {/* Crop furrows */}
                      <line x1="330" y1="180" x2="530" y2="170" stroke="#346c2d" strokeWidth="2" />
                      <line x1="325" y1="220" x2="535" y2="210" stroke="#346c2d" strokeWidth="2" />
                      <line x1="320" y1="260" x2="530" y2="250" stroke="#346c2d" strokeWidth="2" />
                      <line x1="315" y1="300" x2="520" y2="290" stroke="#346c2d" strokeWidth="2" />

                      {/* Cadastral Boundary Overlay */}
                      {showCadastralOverlay && (
                        <polygon 
                          points="320,140 560,130 540,360 300,350" 
                          fill="none" 
                          stroke="#10b981" 
                          strokeWidth="3.5" 
                          strokeDasharray="6 3" 
                        />
                      )}

                      {/* Buffer Zone Overlay */}
                      {showBufferZone && (
                        <path 
                          d="M 0 148 Q 400 128 800 168" 
                          stroke="#06b6d4" 
                          strokeWidth="2" 
                          strokeDasharray="8 6" 
                          fill="none" 
                        />
                      )}
                    </svg>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-slate-900/90 text-white font-mono px-3 py-1 rounded text-xs border border-slate-700 z-10">
                    HISTORIC: {selectedAlert.historicDate}
                  </div>
                </div>

                {/* Draggable Divider Handle */}
                <div 
                  className="absolute top-0 bottom-0 z-30 flex items-center justify-center pointer-events-none"
                  style={{ left: `calc(${splitPosition}% - 14px)` }}
                >
                  <div className="w-7 h-7 bg-emerald-500 rounded-full shadow-lg border-2 border-white flex items-center justify-center cursor-ew-resize pointer-events-auto">
                    <Sliders className="w-3.5 h-3.5 text-slate-950" />
                  </div>
                </div>
              </div>
            ) : (
              /* Side by side view mode */
              <div className="grid grid-cols-2 h-[430px] divide-x divide-slate-800 bg-slate-950">
                {/* Left: Historic */}
                <div className="relative overflow-hidden">
                  <div className="w-full h-full p-2">
                    <svg className="w-full h-full" viewBox="0 0 400 450">
                      <rect width="400" height="450" fill="#182c16" />
                      <polygon points="100,100 340,90 320,360 80,350" fill="#2a5824" stroke="#10b981" strokeWidth="2.5" />
                      <text x="130" y="240" fill="#a7f3d0" fontSize="12" fontWeight="bold">HISTORIC CROPLAND</text>
                      <text x="130" y="260" fill="#6ee7b7" fontSize="10">No Built Footprint</text>
                    </svg>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-slate-900/90 text-white font-mono px-2 py-0.5 rounded text-[11px] border border-slate-700">
                    {selectedAlert.historicDate}
                  </div>
                </div>

                {/* Right: Current with Red Violation */}
                <div className="relative overflow-hidden">
                  <div className="w-full h-full p-2">
                    <svg className="w-full h-full" viewBox="0 0 400 450">
                      <rect width="400" height="450" fill="#1c2518" />
                      <polygon points="100,100 340,90 320,360 80,350" fill="#2a5824" stroke="#10b981" strokeWidth="2.5" />
                      <rect x="130" y="140" width="160" height="150" fill="#ef4444" fillOpacity="0.5" stroke="#ef4444" strokeWidth="2" />
                      <text x="145" y="210" fill="#ffffff" fontSize="12" fontWeight="bold">UNAUTHORIZED SHED</text>
                      <text x="145" y="230" fill="#fecaca" fontSize="10">Area: {selectedAlert.changeMagnitudeSqM} sq.m</text>
                    </svg>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-red-950/90 text-red-200 font-mono px-2 py-0.5 rounded text-[11px] border border-red-700">
                    {selectedAlert.currentDate}
                  </div>
                </div>
              </div>
            )}

            {/* Split Slider Range Controller */}
            {viewMode === 'split' && (
              <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-4 text-xs">
                <span className="text-slate-400 font-mono">Historic: {selectedAlert.historicDate}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={splitPosition}
                  onChange={(e) => setSplitPosition(Number(e.target.value))}
                  className="flex-1 accent-emerald-500 cursor-ew-resize h-1.5 bg-slate-800 rounded-lg"
                />
                <span className="text-slate-400 font-mono">Current: {selectedAlert.currentDate}</span>
              </div>
            )}
          </div>

          {/* Selected Alert Details Card & Official Action Center */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                    selectedAlert.severity === 'CRITICAL'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {selectedAlert.severity} ALERT
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    ID: {selectedAlert.id}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mt-1">
                  {selectedAlert.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">AI Confidence Score</span>
                <span className="text-lg font-mono font-extrabold text-red-400">
                  {selectedAlert.confidenceScore}%
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedAlert.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800/80">
              <div>
                <span className="text-slate-500 block text-[10px]">Historic Satellite Baseline:</span>
                <span className="text-slate-300">{selectedAlert.baselineFeatures}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Current Satellite Features:</span>
                <span className="text-amber-300 font-semibold">{selectedAlert.currentFeatures}</span>
              </div>
            </div>

            {/* Official Action Center Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                Authorized Officer: <strong className="text-white">{currentRole.title}</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDismissModalOpen(true)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <X className="w-4 h-4" />
                  <span>Dismiss False Alarm</span>
                </button>

                <button
                  onClick={() => setDispatchModalOpen(true)}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Dispatch DGPS Field Surveyor</span>
                </button>

                <button
                  onClick={() => setNoticeModalOpen(true)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-red-600/30"
                >
                  <FileText className="w-4 h-4" />
                  <span>Issue Section 84 Notice</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Real-time AI Risk Alert Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Scan className="w-4 h-4 text-red-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Live AI Risk Detection Feed ({alerts.length})
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Stream: Active</span>
            </div>

            {/* Alerts Scrollable List */}
            <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
              {alerts.map((item) => {
                const isSelected = selectedAlert.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedAlert(item)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer text-xs ${
                      isSelected
                        ? 'bg-slate-800/90 border-red-500/50 shadow-lg shadow-red-500/10'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${
                        item.severity === 'CRITICAL'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : item.severity === 'HIGH'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {item.severity}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">{item.detectedDate}</span>
                    </div>

                    <div className="font-bold text-white text-xs mb-1 line-clamp-1">
                      {item.title}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span className="text-emerald-400">{item.ulpin}</span>
                      <span className="text-slate-300 font-sans">{item.surveyNo}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[10px]">
                      <span className="text-slate-400">
                        Area: <strong className="text-red-400 font-mono">{item.changeMagnitudeSqM} sq.m</strong>
                      </span>
                      <span className="text-slate-400">
                        Confidence: <strong className="text-white font-mono">{item.confidenceScore}%</strong>
                      </span>
                      <span className="text-indigo-400 font-semibold flex items-center gap-0.5">
                        Inspect <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Notice Generator Modal */}
      {noticeModalOpen && (
        <NoticeModal
          alert={selectedAlert}
          isOpen={noticeModalOpen}
          onClose={() => setNoticeModalOpen(false)}
          onConfirmNotice={(noticeData) => {
            onIssueNotice(noticeData);
            setNoticeModalOpen(false);
          }}
        />
      )}

      {/* Surveyor Dispatch Modal */}
      {dispatchModalOpen && (
        <SurveyorDispatchModal
          alert={selectedAlert}
          isOpen={dispatchModalOpen}
          onClose={() => setDispatchModalOpen(false)}
          onConfirmDispatch={(ticketData) => {
            onDispatchSurveyor(ticketData);
            setDispatchModalOpen(false);
          }}
        />
      )}

      {/* Dismiss False Alarm Modal */}
      {dismissModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Dismiss False Positive Alarm</span>
            </h3>
            <p className="text-xs text-slate-400">
              Provide the official ground-truth rationale for dismissing this satellite change detection alert. This feedback will retrain the computer vision model.
            </p>
            <textarea
              rows={3}
              value={dismissReason}
              onChange={(e) => setDismissReason(e.target.value)}
              placeholder="e.g. Authorized temporary crop shade awning verified under Panchayat sanction #912..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDismissModalOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDismissConfirm}
                disabled={!dismissReason.trim()}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg"
              >
                Confirm Dismissal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
