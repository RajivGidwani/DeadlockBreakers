import React, { useState } from 'react';
import { 
  Layers, 
  ShieldAlert, 
  BarChart3, 
  Search, 
  ArrowUpRight, 
  CheckCircle2, 
  PauseCircle, 
  XCircle, 
  Sparkles, 
  Check,
  Eye,
  Stamp
} from 'lucide-react';
import GandhinagarGisMap from './GandhinagarGisMap';
import AuditTrail from './AuditTrail';
import AgreementPreviewModal from './AgreementPreviewModal';
import { 
  LAND_CATEGORIES, 
  AI_ENCROACHMENT_INCIDENTS 
} from '../data/gandhinagarParcels';
import { 
  MONTHLY_MUTATION_DATA, 
  LAND_USE_DISTRIBUTION, 
  REVENUE_COLLECTION_TRENDS 
} from '../data/mockData';
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

export default function GovernmentPortal({
  activeTab = 'map',
  parcels = [],
  selectedParcel,
  onSelectParcel,
  onOpenDossier,
  mutationQueue = [],
  currentOfficer,
  onApproveMutation,
  onRejectMutation,
  onHoldMutation,
  onInspectEncroachment,
  onViewParcelMap,
  auditLogs = [],
  grievances = [],
  onIssueNotice,
  onResolveGrievance
}) {
  // Queue Search & Filter
  const [queueSearch, setQueueSearch] = useState('');
  const [queueFilter, setQueueFilter] = useState('ALL');

  // Registry Search & Filter
  const [registrySearch, setRegistrySearch] = useState('');
  const [registryCategory, setRegistryCategory] = useState('ALL');

  // Agreement Review Modal State
  const [previewAgreementItem, setPreviewAgreementItem] = useState(null);

  // Filtered Queue
  const filteredQueue = mutationQueue.filter((item) => {
    const q = queueSearch.toLowerCase();
    const matchesSearch = 
      item.id?.toLowerCase().includes(q) ||
      item.ulpin?.toLowerCase().includes(q) ||
      item.applicantName?.toLowerCase().includes(q) ||
      (item.landCategory && item.landCategory.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (queueFilter === 'PENDING') return item.status === 'Pending Review' || item.status === 'Under Scrutiny';
    if (queueFilter === 'APPROVED') return item.status === 'Approved';
    if (queueFilter === 'REJECTED') return item.status === 'Rejected';
    if (queueFilter === 'HOLD') return item.status === 'On Hold';
    return true;
  });

  // Filtered Registry Parcels
  const filteredRegistryParcels = parcels.filter((p) => {
    const q = registrySearch.toLowerCase();
    const matchesSearch = 
      p.ulpin?.toLowerCase().includes(q) ||
      p.holderName?.toLowerCase().includes(q) ||
      p.sector?.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (registryCategory !== 'ALL' && p.landCategory !== registryCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* ==================================================================== */}
      {/* TAB 1: LAND REGISTRY MANAGEMENT */}
      {/* ==================================================================== */}
      {activeTab === 'map' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>Land Registry Management & Land Boundary Map</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Gandhinagar Sectors 21 & 22 vector boundary canvas with parcel polygon popups, basemap layers, and official registry ledger.
            </p>
          </div>

          {/* Interactive Leaflet Map (Clean Full Width/Height without overlay search bar or metric boxes) */}
          <GandhinagarGisMap
            parcels={parcels}
            selectedParcel={selectedParcel}
            onSelectParcel={onSelectParcel}
            onOpenDossier={onOpenDossier}
          />

          {/* Official Land Parcel Registry Ledger Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                  Official Land Parcel Registry Ledger
                </h3>
                <p className="text-xs text-slate-500">
                  Statutory record of recorded titleholders, Land Detail Record (Khasra) numbers, and property claims.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={registrySearch}
                    onChange={(e) => setRegistrySearch(e.target.value)}
                    placeholder="Search ULPIN, Owner..."
                    className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono"
                  />
                </div>

                <select
                  value={registryCategory}
                  onChange={(e) => setRegistryCategory(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="ALL">All Categories</option>
                  <option value="Residential">Residential</option>
                  <option value="Agricultural">Agricultural</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Utility">Utility</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-2.5 px-3">ULPIN (Bhu-Aadhaar)</th>
                    <th className="py-2.5 px-3">Recorded Titleholder</th>
                    <th className="py-2.5 px-3">Land Category</th>
                    <th className="py-2.5 px-3">Land Detail Record / Area Size</th>
                    <th className="py-2.5 px-3">Property Claims & Liabilities</th>
                    <th className="py-2.5 px-3 text-right">Dossier Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredRegistryParcels.map((parcel) => {
                    const categoryDef = LAND_CATEGORIES[parcel.landCategory] || LAND_CATEGORIES.Residential;
                    const isFlagged = parcel.status === 'Flagged';

                    return (
                      <tr key={parcel.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-blue-700">
                          {parcel.ulpin}
                        </td>
                        <td className="py-3 px-3 text-slate-900 font-bold">
                          {parcel.holderName}
                          <span className="block text-[10px] text-slate-400 font-normal">{parcel.sector}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold border ${categoryDef.badgeClass}`}>
                            <span>{categoryDef.icon}</span>
                            <span>{parcel.landCategory}</span>
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-700">
                          <span className="font-bold">{parcel.areaSqM.toLocaleString()} m²</span> ({parcel.areaAcres} Ac)
                          <span className="block text-[10px] text-slate-400 font-mono">Land Detail Record #{parcel.khasraNo}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold border ${
                            isFlagged 
                              ? 'bg-rose-50 text-rose-700 border-rose-200' 
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {isFlagged ? '⚠️ Active Claim Registered' : '✓ Clear Title (No Liens)'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => onOpenDossier(parcel)}
                            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold border border-blue-200 transition-colors"
                          >
                            Inspect Dossier
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: CITIZEN APPLICATION QUEUE & NOTARY REVIEW */}
      {/* ==================================================================== */}
      {activeTab === 'queue' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Table Header & Controls */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Citizen Application Processing & Notary Attestation Queue
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Review incoming citizen ownership transfer requests with attached Standard Sale Agreements ("Bana Paper") and Notary stamps. Verify legal compliance before granting official approval.
              </p>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={queueSearch}
                  onChange={(e) => setQueueSearch(e.target.value)}
                  placeholder="Search queue..."
                  className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono"
                />
              </div>

              <select
                value={queueFilter}
                onChange={(e) => setQueueFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none"
              >
                <option value="ALL">All Applications</option>
                <option value="PENDING">Pending Review</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
                <option value="HOLD">On Hold</option>
              </select>
            </div>
          </div>

          {/* Operational Queue Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Application ID</th>
                  <th className="py-3 px-4">ULPIN</th>
                  <th className="py-3 px-4">Request Type & Agreement</th>
                  <th className="py-3 px-4">Transferee / Applicant</th>
                  <th className="py-3 px-4">Status & Step</th>
                  <th className="py-3 px-4 text-right">Official Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredQueue.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-400">
                      No applications match the current filter.
                    </td>
                  </tr>
                ) : (
                  filteredQueue.map((item) => {
                    const isApproved = item.status === 'Approved';
                    const isRejected = item.status === 'Rejected';
                    const isHold = item.status === 'On Hold';
                    const hasAgreement = Boolean(item.agreementDocument || item.notaryRegNo);

                    return (
                      <tr 
                        key={item.id} 
                        className={`hover:bg-slate-50/80 transition-colors ${
                          isApproved ? 'bg-emerald-50/30' : isRejected ? 'bg-rose-50/30' : isHold ? 'bg-amber-50/30' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          {item.id}
                        </td>

                        <td className="py-3.5 px-4 font-mono text-blue-700 font-bold">
                          <button
                            onClick={() => onViewParcelMap(item.ulpin)}
                            className="hover:underline flex items-center space-x-1"
                            title="Locate on Land Boundary Map"
                          >
                            <span>{item.ulpin}</span>
                            <ArrowUpRight className="w-3 h-3 text-slate-400" />
                          </button>
                        </td>

                        <td className="py-3.5 px-4 text-slate-800">
                          <span className="font-bold block">{item.type || 'Ownership Transfer / Record Update'}</span>
                          {hasAgreement ? (
                            <div className="flex items-center space-x-1.5 mt-0.5">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 flex items-center space-x-1">
                                <Stamp className="w-3 h-3 text-amber-600" />
                                <span>Notary: {item.notaryRegNo || 'NOT-GJ-2026-8819'}</span>
                              </span>
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-400">{item.submissionDate || 'Today'}</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-slate-800">
                          <div className="font-bold">{item.applicantName}</div>
                          <div className="text-[10px] text-slate-400 font-medium">Consideration: {item.saleAmount || 'N/A'}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            isApproved
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : isRejected
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : isHold
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                            {item.status || 'Pending Review'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            
                            {/* Preview Agreement Button */}
                            {hasAgreement && (
                              <button
                                onClick={() => setPreviewAgreementItem(item)}
                                className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-bold border border-amber-200 flex items-center space-x-1"
                                title="Preview attached Sale Agreement & Notary Seal"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Preview Agreement</span>
                              </button>
                            )}

                            {!isApproved && !isRejected && (
                              <>
                                <button
                                  onClick={() => onApproveMutation(item)}
                                  className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center space-x-1"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Approve</span>
                                </button>

                                <button
                                  onClick={() => onRejectMutation(item)}
                                  className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold border border-rose-200 flex items-center space-x-1"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>Reject</span>
                                </button>

                                <button
                                  onClick={() => onHoldMutation(item)}
                                  className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-xs font-bold border border-amber-200 flex items-center space-x-1"
                                >
                                  <PauseCircle className="w-3.5 h-3.5" />
                                  <span>Hold</span>
                                </button>
                              </>
                            )}

                            {isApproved && (
                              <span className="text-[11px] text-emerald-700 font-bold px-2 py-1 bg-emerald-50 rounded-md border border-emerald-200">
                                ✓ Title Transferred
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

          <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Official Signatory: <strong>{currentOfficer?.name || 'Rajesh Kumar'} ({currentOfficer?.title?.split('/')[0] || 'Tehsildar'})</strong></span>
            <span className="font-mono text-emerald-700 font-bold">● DigiLocker G2C Gateway Active</span>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: DISPUTE & LEGAL RESOLUTION */}
      {/* ==================================================================== */}
      {activeTab === 'disputes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <span>Dispute & Legal Resolution Center</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Oversee flagged property claims, overlapping boundaries, AI-detected boundary shifts, and citizen grievance filings.
              </p>
            </div>
          </div>

          {/* AI Encroachment & Boundary Shift Discrepancies */}
          <div className="space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Flagged Boundary Discrepancies & Encroachment Incidents ({AI_ENCROACHMENT_INCIDENTS.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AI_ENCROACHMENT_INCIDENTS.map((inc) => (
                <div 
                  key={inc.id}
                  className="bg-white rounded-3xl border border-rose-200 p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-extrabold text-rose-700">
                      {inc.ulpin}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      {inc.severity || 'CRITICAL'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{inc.holderName}</h4>
                    <p className="text-xs text-slate-600 mt-1">{inc.deviationText}</p>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-500 flex justify-between">
                    <span>{inc.sector}</span>
                    <span className="font-bold text-slate-800">{inc.confidence || '94.2% AI Confidence'}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => onInspectEncroachment(inc)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Open AI Inspector</span>
                    </button>

                    <button
                      onClick={() => onIssueNotice(inc, inc.deviationText)}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Issue Statutory Notice</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Citizen Filed Grievances */}
          {grievances.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                Citizen-Submitted Property Grievances ({grievances.length})
              </h3>

              <div className="space-y-3">
                {grievances.map((grv) => (
                  <div 
                    key={grv.id}
                    className="bg-white rounded-3xl border border-amber-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-extrabold text-amber-900">{grv.id}</span>
                        <span className="font-bold text-slate-900 text-sm">{grv.subject}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{grv.description}</p>
                      <div className="text-[10px] text-slate-400 mt-1 flex items-center space-x-2">
                        <span>Parcel: {grv.ulpin}</span>
                        <span>•</span>
                        <span>Category: {grv.category}</span>
                        <span>•</span>
                        <span>Filed: {grv.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => onResolveGrievance(grv.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Resolved</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: ANALYTICS & REGIONAL REPORTS */}
      {/* ==================================================================== */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>Analytics & Regional Reports</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Statistical breakdown of land registry transactions, approval times, and municipal revenue yields.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Chart 1: Monthly Settlement Rates */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Monthly Ownership Transfer Settlement Velocity & Backlog
                  </h4>
                  <p className="text-[11px] text-slate-500">Applications Received vs Sanctioned vs Contested</p>
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
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Bar dataKey="received" name="Received" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="approved" name="Sanctioned" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="rejected" name="Contested" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Land Use Distribution */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="border-b border-slate-100 pb-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Land Category Distribution
                </h4>
                <p className="text-[11px] text-slate-500">Parcel categorization across Gandhinagar administrative zones</p>
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
                    <Tooltip formatter={(value) => [`${value}% Total Area`, 'Share']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

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

          {/* Chart 3: Revenue Collection Trends */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Revenue Collection: e-Stamp Duty vs. Municipal Land Tax
                </h4>
                <p className="text-[11px] text-slate-500">Monthly fiscal yields in ₹ Crores deposited to State Exchequer</p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                Cumulative: ₹ 229.6 Cr
              </span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_COLLECTION_TRENDS.slice(-8)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="stampLight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="taxLight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(val) => [`₹ ${val} Cr`, '']} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area type="monotone" dataKey="stampDutyCr" name="Stamp Duty & Deed Fees (₹ Cr)" stroke="#f59e0b" strokeWidth={2.5} fill="url(#stampLight)" />
                  <Area type="monotone" dataKey="propertyTaxCr" name="Municipal Property Tax (₹ Cr)" stroke="#0284c7" strokeWidth={2.5} fill="url(#taxLight)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 5: OFFICIAL AUDIT TRAIL */}
      {/* ==================================================================== */}
      {activeTab === 'audit' && (
        <AuditTrail 
          auditLogs={auditLogs} 
          currentOfficer={currentOfficer} 
        />
      )}

      {/* ==================================================================== */}
      {/* MODAL: PREVIEW ATTACHED AGREEMENT & NOTARY */}
      {/* ==================================================================== */}
      {previewAgreementItem && (
        <AgreementPreviewModal
          isOpen={Boolean(previewAgreementItem)}
          onClose={() => setPreviewAgreementItem(null)}
          agreementData={previewAgreementItem}
          isOfficial={true}
          currentOfficer={currentOfficer}
          onApprove={onApproveMutation}
          onReject={onRejectMutation}
          onHold={onHoldMutation}
        />
      )}

    </div>
  );
}
