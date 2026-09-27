import React, { useState } from 'react';
import { 
  Layers, 
  Activity, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRightLeft, 
  Code, 
  Copy, 
  Check, 
  ShieldCheck, 
  Globe, 
  Server, 
  Database, 
  Cpu, 
  Zap,
  BookOpen
} from 'lucide-react';
import { API_GATEWAY_SERVICES, STATE_UNIT_CONVERTERS } from '../data/mockData';

export default function InteroperabilityHub({ onLogApiEvent, currentRole }) {
  const [services, setServices] = useState(API_GATEWAY_SERVICES);
  const [selectedService, setSelectedService] = useState(API_GATEWAY_SERVICES[0]);
  const [pingingId, setPingingId] = useState(null);
  const [copiedJson, setCopiedJson] = useState(false);

  // Universal State Data Translator state
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const [inputLocalQuantity, setInputLocalQuantity] = useState('10');

  const activeConverter = STATE_UNIT_CONVERTERS[selectedStateIndex];
  const numQuantity = parseFloat(inputLocalQuantity) || 0;
  const calculatedHectares = (numQuantity * activeConverter.toHectaresFactor).toFixed(4);
  const calculatedSqMeters = (numQuantity * activeConverter.toSqMetersFactor).toFixed(2);
  const calculatedAcres = (parseFloat(calculatedHectares) * 2.47105).toFixed(4);
  const calculatedSqYards = (parseFloat(calculatedSqMeters) * 1.19599).toFixed(2);

  const sampleUlpinJson = {
    standard: "DPI-LANDSTACK-ULPIN-v4.2",
    ulpin: "IN-PB-12-3901928374",
    stateProvenance: activeConverter.state,
    localRegistryExtract: {
      nomenclature: activeConverter.terms.rorName,
      unitOfMeasurement: activeConverter.localUnitName,
      originalQuantity: numQuantity,
      cadastralIdentifier: activeConverter.terms.parcelRef + " #89//14/2"
    },
    normalizedGeodeticPayload: {
      areaHectares: parseFloat(calculatedHectares),
      areaSquareMeters: parseFloat(calculatedSqMeters),
      areaAcresStandard: parseFloat(calculatedAcres),
      crs: "EPSG:4326 (WGS 84 / UTM Zone 43N)",
      authoritySeal: "GOV-DPI-BHU-AADHAAR-INTEROP"
    }
  };

  const handlePing = (serviceId) => {
    setPingingId(serviceId);
    setTimeout(() => {
      setServices(prev => prev.map(s => {
        if (s.id === serviceId) {
          const newLatency = Math.floor(Math.random() * 25) + 20;
          return {
            ...s,
            latencyMs: newLatency,
            lastSync: 'Just now (Verified OK)'
          };
        }
        return s;
      }));
      setPingingId(null);

      if (onLogApiEvent) {
        const target = services.find(s => s.id === serviceId);
        onLogApiEvent({
          action: 'API_GATEWAY_HEALTH_CHECK',
          ulpin: target ? target.id.toUpperCase() : 'GATEWAY-NODE',
          details: `Manual ping & TLS integrity verification completed for ${target ? target.name : serviceId}. Latency normalized.`
        });
      }
    }, 800);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(sampleUlpinJson, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">
                Interoperability Hub & Universal State Data Translator (API Gateway)
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                National DPI Open Protocol
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live federated bridge connecting State Land Records, Sub-Registrars, CERSAI Banking Liens, Municipalities, and ISRO GIS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300 font-mono">Gateway Mesh: 6/6 Healthy</span>
        </div>
      </div>

      {/* SECTION 1: LIVE INTEROPERABILITY MATRIX (6 EXTERNAL API NODES) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Cross-Departmental Federated API Health Matrix
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Auto-Poll: 15s</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((srv) => {
            const isPinging = pingingId === srv.id;
            return (
              <div
                key={srv.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-3 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                        {srv.status}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {srv.latencyMs} ms
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white mt-2 leading-tight">
                    {srv.name}
                  </h4>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {srv.department}
                  </div>

                  <div className="mt-3 p-2 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-[10px] text-slate-300 truncate">
                    {srv.endpoint}
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                  <div className="space-y-0.5">
                    <div className="text-slate-400">Sync: <strong className="text-slate-300">{srv.lastSync}</strong></div>
                    <div className="text-slate-500 font-mono">Uptime: {srv.uptimePercent}%</div>
                  </div>

                  <button
                    onClick={() => handlePing(srv.id)}
                    disabled={isPinging}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 rounded-lg transition font-semibold flex items-center gap-1 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isPinging ? 'animate-spin' : ''}`} />
                    <span>{isPinging ? 'Pinging...' : 'Ping & Resync'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: UNIVERSAL STATE DATA TRANSLATOR & SCHEME NORMALIZER */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-indigo-400" />
              <span>Universal State Data Translator & Rosetta Stone</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Normalizes diverse vernacular state land measurements and nomenclature into the unified National Bhu-Aadhaar ULPIN Schema
            </p>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
            OpenBhuGov Data Specification v4.2
          </span>
        </div>

        {/* State Selection Bar */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2">
            Select Source State / Jurisdictional Land Code:
          </label>
          <div className="flex flex-wrap gap-2">
            {STATE_UNIT_CONVERTERS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedStateIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedStateIndex === idx
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {item.state}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Converter Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Input & Result Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-300">
                Enter Local Land Measurement in: <strong className="text-indigo-400">{activeConverter.localUnitName}</strong>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={inputLocalQuantity}
                  onChange={(e) => setInputLocalQuantity(e.target.value)}
                  className="w-36 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-base font-bold focus:outline-none focus:border-indigo-500"
                />
                <span className="text-sm font-semibold text-slate-300 font-mono">
                  {activeConverter.localUnitName} ({activeConverter.state})
                </span>
              </div>

              <div className="text-[11px] text-slate-400 font-mono bg-slate-900/60 p-2 rounded border border-slate-800">
                Formula: {activeConverter.formulaDesc}
              </div>
            </div>

            {/* Calculated Output Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/30">
                <span className="text-slate-400 block text-[10px]">Standard National:</span>
                <div className="text-base font-black text-emerald-300 font-mono mt-0.5">
                  {calculatedHectares} Ha
                </div>
                <span className="text-[10px] text-emerald-400/80">Hectares (SI Unit)</span>
              </div>

              <div className="bg-blue-950/40 p-3 rounded-xl border border-blue-500/30">
                <span className="text-slate-400 block text-[10px]">Metric Ground Area:</span>
                <div className="text-base font-black text-blue-300 font-mono mt-0.5">
                  {calculatedSqMeters} m²
                </div>
                <span className="text-[10px] text-blue-400/80">Square Meters</span>
              </div>

              <div className="bg-indigo-950/40 p-3 rounded-xl border border-indigo-500/30">
                <span className="text-slate-400 block text-[10px]">Imperial Equivalent:</span>
                <div className="text-base font-black text-indigo-300 font-mono mt-0.5">
                  {calculatedAcres} Ac
                </div>
                <span className="text-[10px] text-indigo-400/80">Standard Acres</span>
              </div>

              <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-500/30">
                <span className="text-slate-400 block text-[10px]">Survey Yards:</span>
                <div className="text-base font-black text-amber-300 font-mono mt-0.5">
                  {calculatedSqYards}
                </div>
                <span className="text-[10px] text-amber-400/80">Square Yards (Gaj)</span>
              </div>
            </div>

            {/* Nomenclature Rosetta Stone */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Vernacular Terminology Rosetta Stone ({activeConverter.state})</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">RoR Extract Title:</span>
                  <strong className="text-white">{activeConverter.terms.rorName}</strong>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Parcel Nomenclature:</span>
                  <strong className="text-white">{activeConverter.terms.parcelRef}</strong>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Sub-Division Level:</span>
                  <strong className="text-white">{activeConverter.terms.subDivision}</strong>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Field Revenue Officer:</span>
                  <strong className="text-white">{activeConverter.terms.villageOfficer}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Real-Time Normalized JSON Payload (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white font-mono">
                  Normalized JSON Schema Stream
                </span>
              </div>
              <button
                onClick={handleCopyJson}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-[11px] flex items-center gap-1 transition"
              >
                {copiedJson ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>

            <pre className="p-3 bg-slate-900/90 rounded-lg text-[10.5px] font-mono text-emerald-400 overflow-x-auto border border-slate-800 max-h-72 leading-relaxed">
              {JSON.stringify(sampleUlpinJson, null, 2)}
            </pre>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Standardized under the National Geospatial Policy for DPI interoperability.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
