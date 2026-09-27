import React, { useState } from 'react';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  CheckCircle2 as CheckIcon, 
  Eye as EyeIcon, 
  Clock as ClockIcon, 
  Check as CheckSimple, 
  XCircle as XCircleIcon, 
  PauseCircle as PauseCircleIcon, 
  Activity as ActivityIcon, 
  ArrowUpRight as ArrowUpRightIcon, 
  BarChart3 as BarChart3Icon, 
  Layers as LayersIcon, 
  IndianRupee as IndianRupeeIcon, 
  Fingerprint as FingerprintIcon, 
  Search as SearchIcon,
  Sparkles as SparklesIcon
} from 'lucide-react';
import { 
  INTEROPERABILITY_APIS, 
  LAND_CATEGORIES 
} from '../data/gandhinagarParcels';
import { 
  MONTHLY_MUTATION_DATA, 
  LAND_USE_DISTRIBUTION, 
  REVENUE_COLLECTION_TRENDS 
} from '../data/mockData';

export default function OfficerControlPanel({
  mutationQueue,
  currentOfficer,
  onApproveMutation, // triggers eKYC -> welcome home
  onRejectMutation,  // opens rejection modal
  onHoldMutation,    // flags for field inspection
  onReviewMutation,  // opens property dossier
  onInspectEncroachment, // opens AI satellite encroachment inspector
  onViewParcelMap
}) {
  const [queueSearch, setQueueSearch] = useState('');
  const [queueFilter, setQueueFilter] = useState('ALL');

  // Filter queue items
  const filteredQueue = mutationQueue.filter((item) => {
    const q = queueSearch.toLowerCase();
    const matchesSearch = 
      item.id.toLowerCase().includes(q) ||
      item.ulpin.toLowerCase().includes(q) ||
      item.applicantName.toLowerCase().includes(q) ||
      (item.landCategory && item.landCategory.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (queueFilter === 'PENDING') return item.status === 'Pending Review' || item.status === 'Under Scrutiny';
    if (queueFilter === 'APPROVED') return item.status === 'Approved';
    if (queueFilter === 'REJECTED') return item.status === 'Rejected';
    if (queueFilter === 'HOLD') return item.status === 'On Hold';
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* ==================================================================== */}
      {/* 1. APPLICATION QUEUE WITH 3 ACTION CONTROLS */}
      {/* ==================================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Table Header & Controls */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="text-base font-bold text-slate-800 tracking-tight">
                Operational Mutation Application Queue
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {filteredQueue.length} Records
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Active dockets awaiting Tehsildar & Town Planning endorsement under Gandhinagar Revenue Circle.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <SearchIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={queueSearch}
                onChange={(e) => setQueueSearch(e.target.value)}
                placeholder="Search queue..."
                className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs font-mono"
              />
            </div>

            {/* Filter */}
            <select
              value={queueFilter}
              onChange={(e) => setQueueFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none"
            >
              <option value="ALL">All Applications</option>
              <option value="PENDING">Pending Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="HOLD">On Hold</option>
            </select>
          </div>
        </div>

        {/* Operational Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">ULPIN (Bhu-Aadhaar)</th>
                <th className="py-3 px-4">Land Category</th>
                <th className="py-3 px-4">Applicant Name</th>
                <th className="py-3 px-4">Submission</th>
                <th className="py-3 px-4">AI Risk & Scanners</th>
                <th className="py-3 px-4">Pre-Verification</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredQueue.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-slate-400">
                    No applications match the current filter.
                  </td>
                </tr>
              ) : (
                filteredQueue.map((item) => {
                  const isApproved = item.status === 'Approved';
                  const isRejected = item.status === 'Rejected';
                  const isHold = item.status === 'On Hold';
                  const categoryDef = LAND_CATEGORIES[item.landCategory] || LAND_CATEGORIES.Residential;

                  return (
                    <tr 
                      key={item.id} 
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isApproved ? 'bg-emerald-50/30' : isRejected ? 'bg-rose-50/30' : isHold ? 'bg-amber-50/30' : ''
                      }`}
                    >
                      {/* Application ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {item.id}
                      </td>

                      {/* ULPIN */}
                      <td className="py-3.5 px-4 font-mono text-blue-700 font-bold">
                        <button
                          onClick={() => onViewParcelMap(item.ulpin)}
                          className="hover:underline flex items-center space-x-1"
                          title="Locate on Cadastral GIS Map"
                        >
                          <span>{item.ulpin}</span>
                          <ArrowUpRightIcon className="w-3 h-3 text-slate-400" />
                        </button>
                      </td>

                      {/* Land Category */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${categoryDef.badgeClass}`}>
                          <span>{categoryDef.icon}</span>
                          <span>{item.landCategory || 'Residential'}</span>
                        </span>
                      </td>

                      {/* Applicant Name */}
                      <td className="py-3.5 px-4 text-slate-800">
                        <div className="font-bold">{item.applicantName}</div>
                        <div className="text-[10px] text-slate-400">{item.applicantPhone || '+91 98231 09841'}</div>
                      </td>

                      {/* Submission Date */}
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {item.submissionDate}
                      </td>

                      {/* AI Risk Level & Automated Scanners */}
                      <td className="py-3.5 px-4 min-w-[190px]">
                        <div className="flex flex-col space-y-1">
                          {item.aiRiskLevel === 'HIGH' && (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-200 w-fit">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                              <span>High Risk ({item.aiRiskScore}%)</span>
                            </span>
                          )}
                          {item.aiRiskLevel === 'MEDIUM' && (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200 w-fit">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              <span>Medium Risk ({item.aiRiskScore}%)</span>
                            </span>
                          )}
                          {(!item.aiRiskLevel || item.aiRiskLevel === 'LOW') && (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 w-fit">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                              <span>Low Risk / Clear</span>
                            </span>
                          )}

                          {/* Mismatch Scanners */}
                          {item.mismatchAlerts && (
                            <div className="space-y-0.5 mt-0.5">
                              {(Array.isArray(item.mismatchAlerts) ? item.mismatchAlerts : [item.mismatchAlerts]).map((m, idx) => (
                                <div key={idx} className="text-[9px] font-semibold text-rose-700 bg-rose-50/80 px-1.5 py-0.5 rounded border border-rose-100 flex items-center space-x-1">
                                  <span>⚠️</span>
                                  <span className="truncate max-w-[160px]" title={m}>{m}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Encroachment Alert Indicator */}
                          {item.hasEncroachment && (
                            <div className="mt-0.5">
                              <span className="inline-flex items-center space-x-1 text-[9px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                                <span>🛰️</span>
                                <span>Satellite Encroachment Flagged</span>
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Pre-Verification Status */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold">
                          <CheckIcon className="w-2.5 h-2.5 text-emerald-600" />
                          <span>{item.preVerification || 'SRO Verified'}</span>
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          isApproved
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : isRejected
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : isHold
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {isApproved ? (
                            <>
                              <CheckSimple className="w-3 h-3 text-emerald-600" />
                              <span>Approved</span>
                            </>
                          ) : isRejected ? (
                            <>
                              <XCircleIcon className="w-3 h-3 text-rose-600" />
                              <span>Rejected</span>
                            </>
                          ) : isHold ? (
                            <>
                              <PauseCircleIcon className="w-3 h-3 text-amber-600" />
                              <span>Inspection Hold</span>
                            </>
                          ) : (
                            <>
                              <ClockIcon className="w-3 h-3 text-blue-600" />
                              <span>Pending Review</span>
                            </>
                          )}
                        </span>
                      </td>

                      {/* Action Controls: AI Inspector, Review, Approve, Reject, Hold */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          
                          {/* AI Encroachment Satellite Inspector Button */}
                          {item.hasEncroachment && (
                            <button
                              id={`btn-ai-inspect-${item.id}`}
                              onClick={() => onInspectEncroachment && onInspectEncroachment(item)}
                              className="inline-flex items-center space-x-1 px-2 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 active:bg-indigo-200 text-indigo-700 border border-indigo-200 transition-colors text-xs font-bold shadow-2xs active:scale-95"
                              title="Open AI Encroachment Satellite Inspector"
                            >
                              <SparklesIcon className="w-3.5 h-3.5 text-indigo-600" />
                              <span>AI Inspector</span>
                            </button>
                          )}

                          {/* Review Dossier Button */}
                          <button
                            id={`btn-review-${item.id}`}
                            onClick={() => onReviewMutation(item)}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs"
                            title="Inspect Cadastral Dossier"
                          >
                            <EyeIcon className="w-3.5 h-3.5" />
                          </button>

                          {/* Control 1: 🟢 Approve (Triggers DigiLocker eKYC) */}
                          {!isApproved && !isRejected && (
                            <button
                              id={`btn-approve-queue-${item.id}`}
                              onClick={() => onApproveMutation(item)}
                              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white transition-all text-xs font-bold shadow-xs hover:shadow active:scale-95"
                              title="Approve via DigiLocker eKYC"
                            >
                              <FingerprintIcon className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                          )}

                          {/* Control 2: 🔴 Reject (Opens Rejection Modal with mandatory comment) */}
                          {!isApproved && !isRejected && (
                            <button
                              id={`btn-reject-queue-${item.id}`}
                              onClick={() => onRejectMutation(item)}
                              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors text-xs font-bold shadow-2xs active:scale-95"
                              title="Reject with Official Reason Comment"
                            >
                              <XCircleIcon className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          )}

                          {/* Control 3: 🔵 Review / Hold (Flags for field inspection) */}
                          {!isApproved && !isRejected && !isHold && (
                            <button
                              id={`btn-hold-queue-${item.id}`}
                              onClick={() => onHoldMutation(item)}
                              className="inline-flex items-center space-x-1 px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-xs font-semibold"
                              title="Flag for Field Demarcation / Hold"
                            >
                              <PauseCircleIcon className="w-3.5 h-3.5 text-amber-600" />
                              <span>Hold</span>
                            </button>
                          )}

                          {/* Completed Indicators */}
                          {isApproved && (
                            <span className="text-[11px] text-emerald-700 font-bold px-2 py-1 bg-emerald-50 rounded-md border border-emerald-200">
                              ✓ RoR Issued
                            </span>
                          )}

                          {isRejected && (
                            <span className="text-[11px] text-rose-700 font-bold px-2 py-1 bg-rose-50 rounded-md border border-rose-200">
                              ✕ Contested
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Official Signatory: <strong>{currentOfficer?.name || 'Rajesh Kumar'} ({currentOfficer?.title || 'Tehsildar'})</strong></span>
          <span className="font-mono text-emerald-700 font-bold">● DigiLocker G2C Gateway Active</span>
        </div>

      </div>

      {/* ==================================================================== */}
      {/* 2. RECHARTS ANALYTICS DASHBOARD (LIGHT MATERIAL UI THEME) */}
      {/* ==================================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
              <BarChart3Icon className="w-5 h-5 text-blue-600" />
              <span>DPI Cadastral & Revenue Analytics Dashboard</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Real-time statistical breakdown of settlement velocities, land distribution, and e-Challan yield
            </p>
          </div>

          <span className="text-xs font-bold text-slate-700 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
            FY 2025-26 Live Audit
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Chart 1: Monthly Mutation Settlement Rates (Bar Chart: Received vs Approved vs Rejected) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                  <CheckIcon className="w-4 h-4 text-emerald-600" />
                  <span>Monthly Mutation Settlement Rates (Velocity & Backlog)</span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  Applications Received vs. Approved vs. Rejected
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Clearance: 95.6%
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_MUTATION_DATA.slice(-6)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderColor: '#cbd5e1', 
                      borderRadius: '12px', 
                      fontSize: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)' 
                    }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="received" name="Received" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="approved" name="Sanctioned" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="rejected" name="Contested / Rejected" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Land Use Category Distribution (Pie Chart: 4 Specified Categories) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="border-b border-slate-100 pb-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <LayersIcon className="w-4 h-4 text-indigo-600" />
                <span>Land Use Category Distribution (Master Plan)</span>
              </h4>
              <p className="text-[11px] text-slate-500">
                Cadastral share across Gandhinagar administrative zones
              </p>
            </div>

            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={LAND_USE_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {LAND_USE_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}% Total Area`, 'Share']}
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderColor: '#cbd5e1', 
                      borderRadius: '12px', 
                      fontSize: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)' 
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              {LAND_USE_DISTRIBUTION.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-1.5 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate font-medium">{item.name}:</span>
                  <span className="font-bold text-slate-900 font-mono ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Chart 3: Revenue Collection Trends (Area/Line Chart: e-Stamp Duty vs Property Tax) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <IndianRupeeIcon className="w-4 h-4 text-amber-600" />
                <span>Revenue Collection Trends: Stamp Duty vs. Municipal Property Tax</span>
              </h4>
              <p className="text-[11px] text-slate-500">
                Monthly fiscal yields in ₹ Crores deposited via Sub-Registrar & ULB integration
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
              Cumulative Yield: ₹ 229.6 Cr
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_COLLECTION_TRENDS.slice(-8)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="stampDutyLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="propTaxLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip 
                  formatter={(val) => [`₹ ${val} Cr`, '']}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    borderColor: '#cbd5e1', 
                    borderRadius: '12px', 
                    fontSize: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)' 
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="stampDutyCr" name="e-Stamp Duty & Deed Fees (₹ Cr)" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#stampDutyLight)" />
                <Area type="monotone" dataKey="propertyTaxCr" name="Municipal Property Tax (₹ Cr)" stroke="#0284c7" strokeWidth={2.5} fillOpacity={1} fill="url(#propTaxLight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* ==================================================================== */}
      {/* 3. INTEROPERABILITY API STATUS PANEL (5 GATEWAYS) */}
      {/* ==================================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs">
              <ActivityIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                Interoperability API Status Panel
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Live Status of Federated Digital Public Infrastructure (DPI) Gateways
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>5 Core Gateways Online</span>
          </span>
        </div>

        {/* 5 Live Gateway Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {INTEROPERABILITY_APIS.map((api) => (
            <div
              key={api.id}
              className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-slate-400 truncate max-w-[120px]">
                    {api.protocol}
                  </span>
                  
                  {/* Green Connectivity Badge */}
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{api.status}</span>
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {api.name}
                </h4>

                <p className="text-[10px] font-mono text-slate-500 mt-1 truncate">
                  {api.endpoint}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Latency: <strong className="text-slate-800 font-mono">{api.latency}</strong></span>
                <span>SLA: <strong className="text-emerald-700 font-mono">{api.uptime}</strong></span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
