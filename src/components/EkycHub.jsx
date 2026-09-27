import React, { useState } from 'react';
import { 
  Fingerprint, 
  ShieldCheck, 
  Search, 
  CheckCircle2 
} from 'lucide-react';

export default function EkycHub({ 
  onTriggerEkyc,
  currentOfficer 
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const mockVerifiedCitizens = [
    {
      id: 'KYC-8810',
      name: 'Vikramaditya Singhania',
      ulpin: 'GJ06GND000101',
      vidMasked: '9102-XXXX-8842',
      status: 'VERIFIED',
      verificationSeal: 'DL-GOV-882194',
      timestamp: '09-Sep-2026 15:30 IST',
      docHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    },
    {
      id: 'KYC-8809',
      name: 'Meenakshi Dave',
      ulpin: 'GJ06GND000102',
      vidMasked: '9102-XXXX-1928',
      status: 'VERIFIED',
      verificationSeal: 'DL-GOV-771920',
      timestamp: '08-Sep-2026 11:20 IST',
      docHash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4'
    },
    {
      id: 'KYC-8808',
      name: 'Snehalata R. Varma',
      ulpin: 'GJ06GND000105',
      vidMasked: '9102-XXXX-5512',
      status: 'VERIFIED',
      verificationSeal: 'DL-GOV-661029',
      timestamp: '07-Sep-2026 16:45 IST',
      docHash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a'
    },
    {
      id: 'KYC-8807',
      name: 'Govindbhai N. Prajapati',
      ulpin: 'GJ06GND000106',
      vidMasked: '9102-XXXX-9014',
      status: 'VERIFIED',
      verificationSeal: 'DL-GOV-552011',
      timestamp: '06-Sep-2026 09:15 IST',
      docHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
    }
  ];

  const filteredRecords = mockVerifiedCitizens.filter(c => {
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.ulpin.toLowerCase().includes(q) || c.verificationSeal.toLowerCase().includes(q);
  });


  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-inner">
            <Fingerprint className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-extrabold tracking-tight">
                DigiLocker eKYC & Biometric Trust Hub
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-950">
                Aadhaar e-Pramaan Live
              </span>
            </div>
            <p className="text-xs text-emerald-100 max-w-xl mt-1">
              Zero-knowledge identity tokenization gateway ensuring zero title forgery and strict statutory eKYC verification prior to any land record mutation.
            </p>
          </div>
        </div>

        <button
          onClick={() => onTriggerEkyc({ ulpin: 'GJ06GND000101', holderName: 'Rajesh Patel' })}
          className="px-5 py-2.5 bg-white text-emerald-800 font-extrabold text-xs rounded-xl shadow-sm hover:shadow transition-all flex items-center space-x-2 hover:bg-emerald-50 active:scale-95"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Launch Direct eKYC Terminal</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Total eKYC Transactions</span>
          <div className="text-2xl font-black text-slate-900 mt-1">1,420,840</div>
          <div className="text-xs text-emerald-700 font-semibold flex items-center space-x-1 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Cryptographic Match</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Security Gating Enforcement</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">ACTIVE</div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            Mutation execution blocked if unverified
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">DigiLocker SLA Latency</span>
          <div className="text-2xl font-black text-blue-700 mt-1">29 ms</div>
          <div className="text-xs text-blue-600 font-medium mt-1">
            MeitY High-Speed Public DPI
          </div>
        </div>
      </div>

      {/* Verified Citizens Registry Table */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Authenticated Citizen Registry (Live Trust Log)
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Verified Virtual IDs, SHA-256 Hashes, and DigiLocker Certified Stamps
            </p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search citizen or ULPIN..."
              className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-2xs font-mono"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Verification ID</th>
                <th className="py-3 px-4">Citizen Name</th>
                <th className="py-3 px-4">Associated ULPIN</th>
                <th className="py-3 px-4">Virtual ID (Masked)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">DigiLocker Seal</th>
                <th className="py-3 px-4">SHA-256 Digest</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {record.id}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {record.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-blue-700 font-bold">
                    {record.ulpin}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {record.vidMasked}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{record.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {record.verificationSeal}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400" title={record.docHash}>
                    {record.docHash.substring(0, 10)}...{record.docHash.slice(-6)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                    {record.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Active Officer: <strong>{currentOfficer?.name || 'Rajesh Kumar'} ({currentOfficer?.title || 'Tehsildar'})</strong></span>
          <span className="text-emerald-700 font-bold">● UIDAI e-Authentication HSM Secured</span>
        </div>
      </div>

    </div>
  );
}
