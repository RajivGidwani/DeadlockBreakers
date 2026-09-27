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
  BarChart3, 
  TrendingUp, 
  MapPin, 
  FileCheck2, 
  ShieldAlert, 
  IndianRupee, 
  Layers, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download,
  Calendar,
  CheckCircle2,
  Building,
  TreePine,
  Wheat,
  Factory
} from 'lucide-react';
import { 
  GOVERNANCE_METRICS, 
  MONTHLY_MUTATION_DATA, 
  LAND_USE_DISTRIBUTION, 
  REVENUE_COLLECTION_TRENDS, 
  VILLAGE_WARD_METRICS 
} from '../data/mockData';

export default function AnalyticsDashboard({ currentRole }) {
  const [timeHorizon, setTimeHorizon] = useState('12M');
  const [selectedVillageSort, setSelectedVillageSort] = useState('revenue');

  // Sort village metrics
  const sortedVillages = [...VILLAGE_WARD_METRICS].sort((a, b) => {
    if (selectedVillageSort === 'revenue') {
      return parseFloat(b.revenueCr.replace('₹ ', '')) - parseFloat(a.revenueCr.replace('₹ ', ''));
    }
    if (selectedVillageSort === 'pending') {
      return b.pendingMutations - a.pendingMutations;
    }
    if (selectedVillageSort === 'parcels') {
      return b.totalParcels - a.totalParcels;
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Executive Command Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">
                Executive District Land Governance & Revenue Analytics
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Collectorate Level Command
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive DPI KPIs across 1.42M cadastral parcels, revenue yields, SLA resolution velocities, and spatial compliance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-xs">
            {['30D', '90D', '12M', 'ALL'].map((h) => (
              <button
                key={h}
                onClick={() => setTimeHorizon(h)}
                className={`px-3 py-1 rounded-md font-semibold transition ${
                  timeHorizon === h ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                {h}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert('Generating Comprehensive Executive DPI Land Governance Dossier (PDF/CSV)...')}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5 border border-slate-700"
          >
            <Download className="w-4 h-4" />
            <span>Export Briefing</span>
          </button>
        </div>
      </div>

      {/* 4 High-Density Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Georeferenced Parcels */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 relative overflow-hidden group hover:border-emerald-500/50 transition">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Total Georeferenced Parcels</span>
            <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white tracking-tight">
              {GOVERNANCE_METRICS.totalGeoreferencedParcels}
            </span>
            <span className="text-xs font-bold text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
              {GOVERNANCE_METRICS.georeferencePercent}
            </span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
            <span>Bhu-Aadhaar ULPIN Seeded</span>
            <span className="text-emerald-400 font-mono font-semibold">100% Cadastral Vector</span>
          </div>
        </div>

        {/* Card 2: Active Pending Mutations */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 relative overflow-hidden group hover:border-blue-500/50 transition">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Active Mutation Queue</span>
            <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white tracking-tight font-mono">
              {GOVERNANCE_METRICS.activePendingMutations}
            </span>
            <span className="text-xs font-semibold text-blue-400">
              Avg SLA: {GOVERNANCE_METRICS.avgSettlementDays} Days
            </span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
            <span>Statutory SLA Compliance</span>
            <span className="text-blue-400 font-mono font-semibold">{GOVERNANCE_METRICS.slaCompliancePercent}%</span>
          </div>
        </div>

        {/* Card 3: Fiscal Revenue Collected */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 relative overflow-hidden group hover:border-amber-500/50 transition">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Stamp Duty & Property Tax</span>
            <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white tracking-tight">
              {GOVERNANCE_METRICS.totalRevenueCollected}
            </span>
            <span className="text-xs font-bold text-amber-400 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
              {GOVERNANCE_METRICS.revenueYoYGrowth} YoY
            </span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
            <span>e-Challan Treasury Gateway</span>
            <span className="text-amber-400 font-mono font-semibold">Instant Settlement</span>
          </div>
        </div>

        {/* Card 4: AI Encroachment Alerts */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 relative overflow-hidden group hover:border-red-500/50 transition">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Active Encroachment Violations</span>
            <div className="p-1.5 bg-red-500/10 text-red-400 rounded-lg">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white tracking-tight font-mono">
              {GOVERNANCE_METRICS.activeEncroachmentAlerts}
            </span>
            <span className="text-xs font-semibold text-red-400">
              {GOVERNANCE_METRICS.highSeverityAlerts} Critical Priority
            </span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
            <span>Historical Remediations</span>
            <span className="text-emerald-400 font-mono font-semibold">+{GOVERNANCE_METRICS.resolvedAlertsCount} Cleared</span>
          </div>
        </div>
      </div>

      {/* Interactive Charts Row: Bar Chart & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chart: Monthly Mutation Settlement Rates (Bar Chart: Received vs Approved vs Rejected) */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>Monthly Mutation Settlement Rates (Velocity & Backlog)</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Received vs. Approved vs. Rejected applications across 12-month timeline
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              Clearance Velocity: 95.6%
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_MUTATION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} 
                  itemStyle={{ padding: '2px 0' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="received" name="Applications Received" fill="#6366f1" radius={[3, 3, 0, 0]} />
                <Bar dataKey="approved" name="Sanctioned / Approved" fill="#10b981" radius={[3, 3, 0, 0]} />
                <Bar dataKey="rejected" name="Rejected / Contested" fill="#ef4444" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Land Use Classification Breakdown (Pie / Donut Chart) */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>District Land Use Classification (Master Plan 2031)</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Breakdown by agricultural, residential, commercial, industrial & forest zones
            </p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={LAND_USE_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {LAND_USE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}% Total Area`, 'Share']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Badges */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {LAND_USE_DISTRIBUTION.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.name}:</span>
                <span className="font-mono font-bold text-white ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Collection Trends (Line / Area Chart over 12 Months) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-amber-400" />
              <span>Revenue Yield Trajectory: Stamp Duty vs. Municipal Property Taxes</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Monthly collections in ₹ Crores directly deposited via Sub-Registrar & ULB integration
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/40">
            Annual Cumulative: ₹ 229.6 Cr
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_COLLECTION_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="stampDutyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="propTaxGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip 
                formatter={(val) => [`₹ ${val} Cr`, '']}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} 
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="stampDutyCr" name="e-Stamp Duty & Registration (₹ Cr)" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#stampDutyGrad)" />
              <Area type="monotone" dataKey="propertyTaxCr" name="Municipal Property Tax (₹ Cr)" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#propTaxGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* District Map Heatmap & Sub-Division / Ward Performance Matrix */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Tehsil / Sub-Division & Ward Performance Matrix</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Cadastral settlement efficiency, tax compliance, and spatial risk indices across jurisdictions
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Sort by:</span>
            <select
              value={selectedVillageSort}
              onChange={(e) => setSelectedVillageSort(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs px-2.5 py-1 rounded-lg focus:outline-none"
            >
              <option value="revenue">Highest Revenue Yield</option>
              <option value="pending">Highest Pending Mutations</option>
              <option value="parcels">Largest Parcel Count</option>
            </select>
          </div>
        </div>

        {/* Heatmap Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-3 px-4">Sub-Division / Ward</th>
                <th className="py-3 px-4">Georeferenced Parcels</th>
                <th className="py-3 px-4">Active Pending Queue</th>
                <th className="py-3 px-4">Avg Settlement SLA</th>
                <th className="py-3 px-4">Fiscal Revenue (Cr)</th>
                <th className="py-3 px-4">Tax Compliance Rate</th>
                <th className="py-3 px-4 text-center">Spatial Risk Index</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {sortedVillages.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>{item.name}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono">{item.totalParcels.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-amber-400">{item.pendingMutations}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">{item.avgSettlementDays} Days</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{item.revenueCr}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full" 
                          style={{ width: item.complianceRate }}
                        />
                      </div>
                      <span className="font-mono text-xs">{item.complianceRate}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      item.riskIndex === 'HIGH'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : item.riskIndex === 'MEDIUM'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {item.riskIndex} RISK
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
