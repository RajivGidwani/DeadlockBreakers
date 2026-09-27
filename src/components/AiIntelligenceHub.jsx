import React, { useState } from 'react';
import { 
  Sparkles, 
  Radio, 
  Search, 
  Sliders,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { AI_ENCROACHMENT_INCIDENTS, INITIAL_MUTATION_QUEUE } from '../data/gandhinagarParcels';

export default function AiIntelligenceHub({
  onInspectEncroachment,
  onViewParcelMap,
  currentOfficer
}) {
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIncidents = AI_ENCROACHMENT_INCIDENTS.filter(inc => {
    if (selectedSeverity !== 'ALL' && inc.severity !== selectedSeverity) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        inc.ulpin.toLowerCase().includes(q) ||
        inc.holderName.toLowerCase().includes(q) ||
        inc.sector.toLowerCase().includes(q) ||
        inc.deviationText.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top AI Command Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 text-white shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-inner">
            <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-extrabold tracking-tight">
                AI Spatial Intelligence & Cadastral Risk Hub
              </h2>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase">
                Cartosat-3 & Sentinel-2 AI Stream
              </span>
            </div>
            <p className="text-xs text-blue-100 max-w-2xl mt-1 leading-relaxed">
              Automated multi-spectral change detection, satellite temporal NDVI boundary variance scanning, and cross-registry mismatch discovery across Gandhinagar cadastre.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold">
          <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20">
            ISRO Bhuvan Sync: <strong className="text-emerald-300 font-mono">14.8 ms</strong>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20">
            Active Alerts: <strong className="text-rose-300 font-mono">3 Critical</strong>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards for AI Risk Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">High-Risk Parcels Flagged</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          </div>
          <div className="text-2xl font-black text-rose-600">3 Parcels</div>
          <p className="text-[11px] text-slate-500 font-medium">
            Encroachments onto public reserves & unapproved warehouses
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Registry Mismatch Detection</span>
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">2 Discrepancies</div>
          <p className="text-[11px] text-slate-500 font-medium">
            RoR vs SRO deed area variance & agricultural zoning deviations
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Overall AI Accuracy SLA</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600">94.2%</div>
          <p className="text-[11px] text-slate-500 font-medium">
            Validated against Gujarat Land Revenue Ground Truth
          </p>
        </div>
      </div>

      {/* Automated Mismatch Scanners Panel */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                Automated Registry Mismatch Scanners
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Live cross-checking between AnyRoR (Revenue), e-Garvi (Sub-Registrar), and Satellite Orthomosaics
              </p>
            </div>
          </div>

          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            Real-Time Integrity Audit
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Mismatch Card 1 */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-700">MH26DISP000008</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                🔴 Spatial Area Mismatch
              </span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">
              High-Tension Buffer Zone Variance (142 sq. m)
            </h4>
            <p className="text-[11px] text-slate-600">
              Revenue 7/12 records 5,120 sq. m. High-res satellite boundary tracing reveals physical perimeter fenced to 5,262 sq. m with 2.4m encroachment into the public drainage easement.
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Holder: Vikramaditya Solanki</span>
              <button
                onClick={() => {
                  const record = INITIAL_MUTATION_QUEUE.find(q => q.ulpin === 'MH26DISP000008');
                  if (record) onInspectEncroachment(record);
                }}
                className="text-blue-600 hover:text-blue-800 font-bold flex items-center space-x-1"
              >
                <span>Launch Satellite Split-View</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mismatch Card 2 */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-700">GJ06GND000110</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                🟡 Zoning Use Mismatch
              </span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">
              Commercial Activity Detected on Agricultural Land
            </h4>
            <p className="text-[11px] text-slate-600">
              Land recorded as Agricultural (Krishi) in AnyRoR. Temporal NDVI vegetation-loss algorithm detected 340 sq. m pre-engineered industrial warehouse structure erected without NA (Section 65) clearance.
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Holder: Bhanumati R. Vaghela</span>
              <button
                onClick={() => {
                  const record = INITIAL_MUTATION_QUEUE.find(q => q.ulpin === 'GJ06GND000110');
                  if (record) onInspectEncroachment(record);
                }}
                className="text-blue-600 hover:text-blue-800 font-bold flex items-center space-x-1"
              >
                <span>Launch Satellite Split-View</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* AI Encroachment Incidents Feed */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Active Encroachment & Spatial Deviation Dockets
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Comparative satellite delta feeds verified by ISRO Bhuvan Multi-Spectral algorithms
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ULPIN or holder..."
                className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none font-mono shadow-2xs"
              />
            </div>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none"
            >
              <option value="ALL">All Severities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
            </select>
          </div>
        </div>

        {/* Table of Incidents */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Docket ID</th>
                <th className="py-3 px-4">ULPIN / Sector</th>
                <th className="py-3 px-4">Recorded Holder</th>
                <th className="py-3 px-4">Detected Deviation</th>
                <th className="py-3 px-4">AI Confidence</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredIncidents.map((incident) => {
                const isCritical = incident.severity === 'CRITICAL';
                const isHigh = incident.severity === 'HIGH';

                return (
                  <tr key={incident.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {incident.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => onViewParcelMap && onViewParcelMap(incident.ulpin)}
                        className="font-mono font-bold text-blue-700 hover:underline flex items-center space-x-1"
                        title="Locate on Cadastral GIS Map"
                      >
                        <span>{incident.ulpin}</span>
                        <ArrowUpRight className="w-3 h-3 text-slate-400" />
                      </button>
                      <div className="text-[10px] text-slate-400">{incident.sector}</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-800 font-bold">
                      {incident.holderName}
                    </td>

                    <td className="py-3.5 px-4 text-rose-700 font-semibold max-w-xs truncate">
                      {incident.deviationText}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                        <Sparkles className="w-3 h-3 text-purple-600" />
                        <span>{incident.confidence}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                        isCritical
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : isHigh
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {incident.severity}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          const record = INITIAL_MUTATION_QUEUE.find(q => q.ulpin === incident.ulpin) || {
                            ulpin: incident.ulpin,
                            applicantName: incident.holderName,
                            encroachmentDetails: {
                              historicalYear: 2022,
                              currentYear: 2026,
                              boundaryDeviation: incident.deviationText,
                              deviationAreaSqM: incident.deviationAreaSqM,
                              aiConfidence: incident.confidence + ' AI Confidence Score',
                              zoneType: incident.locality,
                              sensorSource: 'ISRO Cartosat-3 & Sentinel-2 Stream'
                            }
                          };
                          onInspectEncroachment(record);
                        }}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-all active:scale-95"
                      >
                        <Sliders className="w-3 h-3" />
                        <span>Split-View Inspector</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Reporting Officer: <strong>{currentOfficer?.name || 'Rajesh Kumar'} ({currentOfficer?.title || 'Tehsildar'})</strong></span>
          <span className="font-mono text-emerald-700 font-bold">● High-Resolution Satellite Sensor Stream Live</span>
        </div>
      </div>

    </div>
  );
}
