import React, { useState } from 'react';
import { 
  FileCheck2, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  ExternalLink, 
  Eye, 
  FileText, 
  ShieldCheck, 
  Building, 
  MapPin, 
  User, 
  ArrowRight,
  Sparkles,
  ChevronRight,
  Calendar,
  Layers,
  Scale,
  Hash
} from 'lucide-react';
import DocumentViewerModal from './DocumentViewerModal';
import MutationOrderModal from './MutationOrderModal';

export default function MutationManager({ 
  applications, 
  onApproveMutation, 
  onFlagDispute, 
  onRejectMutation,
  currentRole,
  selectedAppId,
  onClearSelectedApp
}) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchFilter, setSearchFilter] = useState('');
  const [inspectingApp, setInspectingApp] = useState(
    selectedAppId ? applications.find(a => a.id === selectedAppId) || null : null
  );
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [generatedOrderApp, setGeneratedOrderApp] = useState(null);

  // Reject remarks modal state
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionComments, setRejectionComments] = useState('');

  // Dispute remarks modal state
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');

  // Handle selected app passed from parent if changed
  React.useEffect(() => {
    if (selectedAppId) {
      const match = applications.find(a => a.id === selectedAppId);
      if (match) setInspectingApp(match);
    }
  }, [selectedAppId, applications]);

  const categories = [
    { id: 'ALL', label: 'All Applications' },
    { id: 'Mutation Requests', label: 'Mutation Requests (Conveyance & Virasat)' },
    { id: 'Boundary Surveys', label: 'Boundary Surveys & Demarcation' },
    { id: 'Building Permits', label: 'Building Permits & Zoning NOC' },
    { id: 'Dispute Complaints', label: 'Dispute & Encroachment Complaints' }
  ];

  const filteredApps = applications.filter((app) => {
    if (activeCategory !== 'ALL' && app.category !== activeCategory) return false;
    if (statusFilter !== 'ALL' && app.status !== statusFilter) return false;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      const matchUlpin = app.landDetails.ulpin.toLowerCase().includes(q);
      const matchName = app.applicantName.toLowerCase().includes(q);
      const matchId = app.id.toLowerCase().includes(q);
      const matchSurvey = app.landDetails.khasraNumber.toLowerCase().includes(q);
      const matchVillage = app.landDetails.village.toLowerCase().includes(q);
      return matchUlpin || matchName || matchId || matchSurvey || matchVillage;
    }
    return true;
  });

  const handleApprove = (app) => {
    onApproveMutation(app);
    setGeneratedOrderApp(app);
    setInspectingApp(null);
  };

  const handleConfirmReject = () => {
    if (inspectingApp && rejectionComments.trim()) {
      onRejectMutation(inspectingApp, rejectionComments);
      setRejectModalOpen(false);
      setRejectionComments('');
      setInspectingApp(null);
    }
  };

  const handleConfirmDispute = () => {
    if (inspectingApp && disputeReason.trim()) {
      onFlagDispute(inspectingApp, disputeReason);
      setDisputeModalOpen(false);
      setDisputeReason('');
      setInspectingApp(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Pills & Control Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Status Dropdown & Filter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none"
            >
              <option value="ALL" className="bg-slate-900 text-slate-200">All Statuses</option>
              <option value="Pending Verification" className="bg-slate-900 text-slate-200">Pending Verification</option>
              <option value="Approved" className="bg-slate-900 text-slate-200">Approved</option>
              <option value="Flagged for Dispute Review" className="bg-slate-900 text-slate-200">Flagged for Dispute</option>
              <option value="Rejected" className="bg-slate-900 text-slate-200">Rejected</option>
            </select>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter queue..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="bg-slate-900/80 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-44"
            />
          </div>
        </div>
      </div>

      {/* Main Table Layout */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Applicant & Title Holder</th>
                <th className="py-3 px-4">Category / Instrument</th>
                <th className="py-3 px-4">Cadastral Parcel (ULPIN)</th>
                <th className="py-3 px-4 text-center">4-Tier Pre-Check</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No applications match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => {
                  const preChecks = app.preVerificationChecks;
                  const allPassed = preChecks.rorAuthenticity.passed && 
                                    preChecks.encumbranceStatus.passed && 
                                    preChecks.bankLoanLock.passed && 
                                    preChecks.zoningCompliance.passed;

                  return (
                    <tr 
                      key={app.id} 
                      className="hover:bg-slate-800/40 transition group cursor-pointer"
                      onClick={() => setInspectingApp(app)}
                    >
                      {/* Application ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-200">
                        <div className="flex items-center gap-1.5">
                          <span className="text-emerald-400">#</span>
                          <span>{app.id}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-sans mt-0.5">{app.applicationDate}</div>
                      </td>

                      {/* Applicant Profile */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white group-hover:text-emerald-300 transition">
                          {app.applicantName}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                          <span>e-KYC:</span>
                          <span className="text-emerald-400">{app.applicantAadhaarMasked}</span>
                          {app.coSharersCount > 0 && (
                            <span className="bg-slate-800 text-slate-300 px-1 rounded text-[9px]">
                              +{app.coSharersCount} Co-Heirs
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <div className="text-slate-200 font-medium">{app.category}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{app.type}</div>
                      </td>

                      {/* Target Land Parcel */}
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-emerald-400 font-semibold">{app.landDetails.ulpin}</div>
                        <div className="text-[10px] text-slate-400">
                          {app.landDetails.khasraNumber} • {app.landDetails.village}, {app.landDetails.district}
                        </div>
                      </td>

                      {/* Automated 4-Tier Pre-Check Indicators */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <span 
                            title={`RoR Authenticity: ${preChecks.rorAuthenticity.message}`}
                            className={`w-2.5 h-2.5 rounded-full ${preChecks.rorAuthenticity.passed ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-red-500'}`}
                          />
                          <span 
                            title={`Encumbrance 30-Year: ${preChecks.encumbranceStatus.message}`}
                            className={`w-2.5 h-2.5 rounded-full ${preChecks.encumbranceStatus.passed ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-red-500'}`}
                          />
                          <span 
                            title={`Banking Mortgage Lock: ${preChecks.bankLoanLock.message}`}
                            className={`w-2.5 h-2.5 rounded-full ${preChecks.bankLoanLock.passed ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-red-500'}`}
                          />
                          <span 
                            title={`Zoning Master Plan: ${preChecks.zoningCompliance.message}`}
                            className={`w-2.5 h-2.5 rounded-full ${preChecks.zoningCompliance.passed ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-red-500'}`}
                          />
                        </div>
                        <div className="text-[9px] text-center text-slate-500 mt-1 font-mono">
                          {allPassed ? '4/4 CLEARED' : 'FLAGS NOTED'}
                        </div>
                      </td>

                      {/* Priority */}
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          app.priority === 'HIGH' 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                            : app.priority === 'MEDIUM'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-slate-700/40 text-slate-300'
                        }`}>
                          {app.priority}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          app.status === 'Approved'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : app.status === 'Flagged for Dispute Review'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : app.status === 'Rejected'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {app.status === 'Approved' && <CheckCircle2 className="w-3 h-3" />}
                          {app.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                          {app.status === 'Flagged for Dispute Review' && <AlertTriangle className="w-3 h-3" />}
                          {app.status === 'Pending Verification' && <Clock className="w-3 h-3" />}
                          <span>{app.status}</span>
                        </span>
                      </td>

                      {/* Action Button */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setInspectingApp(app);
                          }}
                          className="px-3 py-1 bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 rounded-lg text-xs font-semibold transition flex items-center gap-1 ml-auto"
                        >
                          <span>Inspect</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Detail View Modal / Side Drawer */}
      {inspectingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white tracking-tight">
                      Application Review: <span className="font-mono text-emerald-400">{inspectingApp.id}</span>
                    </h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {inspectingApp.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Filed on {inspectingApp.applicationDate} • {inspectingApp.type}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setInspectingApp(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Top Banner: Status & Assigned Priority */}
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">Current Application State:</span>
                  <span className="font-bold text-white px-3 py-1 bg-slate-800 rounded-lg border border-slate-700">
                    {inspectingApp.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">Statutory SLA Window:</span>
                  <span className="font-mono font-bold text-emerald-400">Within Standard 7-Day Target</span>
                </div>
              </div>

              {/* Grid: Applicant Profile & Target Land Parcel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Applicant Profile */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-2">
                    <User className="w-4 h-4 text-indigo-400" />
                    <span>Applicant & Co-Sharer Profile</span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Primary Registered Party:</span>
                      <div className="text-white font-semibold text-sm">{inspectingApp.applicantName}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Aadhaar e-KYC:</span>
                        <div className="font-mono text-emerald-400 font-semibold">{inspectingApp.applicantAadhaarMasked}</div>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Mobile Contact:</span>
                        <div className="text-slate-300 font-mono">{inspectingApp.applicantPhone}</div>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Registered Residential Address:</span>
                      <div className="text-slate-300">{inspectingApp.applicantAddress}</div>
                    </div>
                    <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-2 border-t border-slate-800/60">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Biometric Iris/Fingerprint matched at Sub-Registrar Gateway</span>
                    </div>
                  </div>
                </div>

                {/* Target Land Parcel Details */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>Target Cadastral Parcel Metadata</span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Bhu-Aadhaar National ULPIN:</span>
                      <div className="font-mono text-emerald-400 font-bold text-sm bg-emerald-950/40 px-2 py-1 rounded border border-emerald-800/40 inline-block">
                        {inspectingApp.landDetails.ulpin}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Khasra / Gat / Survey No:</span>
                        <div className="font-semibold text-white">{inspectingApp.landDetails.khasraNumber}</div>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Khatauni / Patta Passbook:</span>
                        <div className="font-semibold text-white">{inspectingApp.landDetails.khatauniNumber}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Location Hierarchy:</span>
                        <div className="text-slate-300">
                          {inspectingApp.landDetails.village}, Tehsil {inspectingApp.landDetails.tehsil}, {inspectingApp.landDetails.district} ({inspectingApp.landDetails.state})
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Area in SI & Local Units:</span>
                        <div className="text-slate-200 font-semibold">
                          {inspectingApp.landDetails.areaHectares} Hectares ({inspectingApp.landDetails.areaLocalUnit})
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/60">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Declared Market Value:</span>
                        <div className="font-semibold text-amber-300">{inspectingApp.landDetails.marketValueInr}</div>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">e-Stamp Duty Deposited:</span>
                        <div className="font-semibold text-emerald-300">{inspectingApp.landDetails.stampDutyPaid}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Automated Pre-Verification Check (4-Tier Matrix) */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Automated DPI Pre-Verification Integrity Engine (Real-Time API Lookup)</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Algorithm: LandStack-AI v3.9</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* RoR Authenticity */}
                  <div className={`p-3.5 rounded-xl border ${
                    inspectingApp.preVerificationChecks.rorAuthenticity.passed
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                      : 'bg-red-950/30 border-red-500/30 text-red-300'
                  }`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs">1. RoR Authenticity</span>
                      {inspectingApp.preVerificationChecks.rorAuthenticity.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {inspectingApp.preVerificationChecks.rorAuthenticity.message}
                    </p>
                  </div>

                  {/* Encumbrance Status */}
                  <div className={`p-3.5 rounded-xl border ${
                    inspectingApp.preVerificationChecks.encumbranceStatus.passed
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                      : 'bg-red-950/30 border-red-500/30 text-red-300'
                  }`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs">2. 30-Year Encumbrance</span>
                      {inspectingApp.preVerificationChecks.encumbranceStatus.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {inspectingApp.preVerificationChecks.encumbranceStatus.message}
                    </p>
                  </div>

                  {/* Bank Loan Lock */}
                  <div className={`p-3.5 rounded-xl border ${
                    inspectingApp.preVerificationChecks.bankLoanLock.passed
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                      : 'bg-red-950/30 border-red-500/30 text-red-300'
                  }`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs">3. Bank Loan / Lien Lock</span>
                      {inspectingApp.preVerificationChecks.bankLoanLock.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {inspectingApp.preVerificationChecks.bankLoanLock.message}
                    </p>
                  </div>

                  {/* Zoning Compliance */}
                  <div className={`p-3.5 rounded-xl border ${
                    inspectingApp.preVerificationChecks.zoningCompliance.passed
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                      : 'bg-red-950/30 border-red-500/30 text-red-300'
                  }`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs">4. Master Plan Zoning</span>
                      {inspectingApp.preVerificationChecks.zoningCompliance.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {inspectingApp.preVerificationChecks.zoningCompliance.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Inspector */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Document Vault & Evidentiary Inspector (e-Signed Certificates)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {inspectingApp.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedDoc(doc)}
                      className="p-3 bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 rounded-xl cursor-pointer transition group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="p-2 bg-slate-900 rounded-lg text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{doc.size}</span>
                      </div>
                      <div className="font-semibold text-slate-200 mt-2 text-[11px] truncate group-hover:text-emerald-300 transition">
                        {doc.name}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                        <span>{doc.date}</span>
                        <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                          <Eye className="w-3 h-3" /> View
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Procedural History Timeline */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Audit History & Lifecycle
                </div>
                <div className="space-y-1.5">
                  {inspectingApp.timeline.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                      <span className="text-slate-600">[{step.timestamp}]</span>
                      <span className="text-slate-200 font-sans">{step.step}</span>
                      <span className="text-slate-500 ml-auto font-sans">By: {step.user}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Official Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>Exercising Quasi-Judicial Authority as: <strong className="text-white">{currentRole.title}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRejectModalOpen(true)}
                  className="px-4 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/60 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject with Comments</span>
                </button>

                <button
                  onClick={() => setDisputeModalOpen(true)}
                  className="px-4 py-2 bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-800/60 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Flag for Dispute Review</span>
                </button>

                <button
                  onClick={() => handleApprove(inspectingApp)}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve & Issue Sanction Order</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Modal */}
      {rejectModalOpen && inspectingApp && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              <span>Statutory Rejection Rationale</span>
            </h3>
            <p className="text-xs text-slate-400">
              Please enter the statutory ground for rejection under the Land Revenue Code. This statement will be served to the applicant.
            </p>
            <textarea
              rows={3}
              value={rejectionComments}
              onChange={(e) => setRejectionComments(e.target.value)}
              placeholder="e.g. Incomplete chain of title, Power of Attorney revoked, or encumbrance unaddressed..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-red-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectModalOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                disabled={!rejectionComments.trim()}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg"
              >
                Confirm Rejection & Log Audit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flag for Dispute Modal */}
      {disputeModalOpen && inspectingApp && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Refer to Revenue Dispute Tribunal</span>
            </h3>
            <p className="text-xs text-slate-400">
              Application will be moved to the Sub-Divisional Officer / Tehsildar Contested Hearing List. Provide objection details:
            </p>
            <textarea
              rows={3}
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              placeholder="e.g. Co-sharer filed formal caveat objection #OBJ-882 regarding undivided ancestral partition..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDisputeModalOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDispute}
                disabled={!disputeReason.trim()}
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg"
              >
                Flag for Dispute Hearing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Inspector Modal */}
      {selectedDoc && inspectingApp && (
        <DocumentViewerModal
          doc={selectedDoc}
          application={inspectingApp}
          isOpen={!!selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      )}

      {/* Mutation Order Modal */}
      {generatedOrderApp && (
        <MutationOrderModal
          application={generatedOrderApp}
          isOpen={!!generatedOrderApp}
          onClose={() => setGeneratedOrderApp(null)}
        />
      )}
    </div>
  );
}
