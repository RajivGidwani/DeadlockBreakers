import React from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';
import { OFFICER_PROFILES } from '../data/gandhinagarParcels';

export default function LandingLogin({ 
  onLoginAsOfficial, 
  onLoginAsCitizen,
  selectedOfficer,
  onSelectOfficer 
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      
      {/* Top Banner / Gov Brand Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-sm ring-4 ring-blue-50">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                  LandStack OneView
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  GovTech DPI
                </span>
              </div>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                <span className="text-[11px] text-slate-500 font-medium truncate">
                  Gandhinagar Revenue Division • Sectors 21 & 22 Cadastre
                </span>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>OpenStreetMap Vector Engine • Standard Open Tile Servers</span>
          </div>
        </div>
      </header>

      {/* Main Hero & Dual Role Selection Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-center">
        
        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Unified Land Governance & Transparent Public Services</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Integrated Land Records, Boundary Maps & Transparent Public Services
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Choose your portal role to access either the official administrative governance suite or the citizen self-service land portal.
          </p>
        </div>

        {/* Dual Role Choice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto w-full">
          
          {/* ================================================================ */}
          {/* CARD 1: GOVERNMENT OFFICIAL */}
          {/* ================================================================ */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-200 p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full pointer-events-none" />

            <div>
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                  Administrative Access
                </span>
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
                Government Official
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                For Revenue Officers, Tehsildars, Town Planners, and District Collectors to oversee land records and citizen filings.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-3 mb-6 border-t border-slate-100 pt-5 text-xs text-slate-700 font-medium">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Notary Attestation & Registry Approval:</strong> Review incoming transfer requests with attached Sale Agreements ("Bana Paper") and Notary stamps.</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Land Registry Management:</strong> Inspect and update parcel records on the Land Boundary Map and official ledger.</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Dispute & Legal Resolution:</strong> Review flagged property claims, unauthorized boundary shifts, and issue digital notices.</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Analytics & Official Audit Trail:</strong> Real-time charts (Recharts) and immutable SHA-256 official audit logs.</span>
                </div>
              </div>

              {/* Officer Role Selection */}
              <div className="mb-6 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Select Official Profile:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {OFFICER_PROFILES.slice(0, 2).map((profile) => (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => onSelectOfficer(profile)}
                      className={`p-2 rounded-xl text-left border transition-all text-xs flex items-center space-x-2 ${
                        selectedOfficer?.id === profile.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-base">{profile.icon}</span>
                      <div className="truncate">
                        <span className="font-bold block truncate">{profile.name}</span>
                        <span className={`text-[10px] block truncate ${selectedOfficer?.id === profile.id ? 'text-blue-100' : 'text-slate-400'}`}>
                          {profile.title.split('/')[0]}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              id="btn-login-government"
              onClick={() => onLoginAsOfficial(selectedOfficer || OFFICER_PROFILES[0])}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-2 group-hover:ring-4 group-hover:ring-blue-500/20"
            >
              <span>Sign In as Government Official</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* ================================================================ */}
          {/* CARD 2: CITIZEN */}
          {/* ================================================================ */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-200 p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none" />

            <div>
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Citizen Services
                </span>
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <UserCheck className="w-6 h-6" />
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
                Citizen / Land Owner
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                For property buyers, land owners, and residents to look up land records, check property claims, execute agreements, and pay taxes.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-3 mb-6 border-t border-slate-100 pt-5 text-xs text-slate-700 font-medium">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Public Land Search (Pre-Purchase Lookup):</strong> Search any public land parcel by ID, Owner, or Location and check for active property claims & liabilities.</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>My Land Parcels:</strong> Portfolio view of owned properties, boundary maps, and downloadable digital deeds.</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Apply for Ownership Transfer:</strong> Download standard sale agreements ("Bana Paper"), upload signed agreements, and record notary details.</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Track Application Status:</strong> Visual 5-step tracker (*Submitted → Agreement Uploaded → Notary Review → Official Approval → Title Transferred*).</span>
                </div>
              </div>

              {/* Mock Citizen Profile Badge */}
              <div className="mb-6 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Pre-Authenticated Citizen Profile:
                </label>
                <div className="flex items-center space-x-3 p-2 bg-white rounded-xl border border-slate-200">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                    RP
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-xs text-slate-900 block truncate">Ramesh Patel</span>
                    <span className="text-[11px] text-slate-500 block truncate">
                      Sector 21 Resident • Land Parcel GJ06GND000101
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    Aadhaar Linked
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              id="btn-login-citizen"
              onClick={onLoginAsCitizen}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-2 group-hover:ring-4 group-hover:ring-emerald-500/20"
            >
              <span>Sign In as Citizen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </main>

      {/* Footer Credentials */}
      <footer className="border-t border-slate-200 bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center space-x-2 font-medium">
            <span className="font-bold text-slate-800">LandStack OneView DPI</span>
            <span>•</span>
            <span>Government of Gujarat Revenue Administration</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">DigiLocker Verified</span>
          </div>
          <div className="text-[11px] text-slate-400">
            OpenStreetMap Vector Tiles • SHA-256 Immutable Audit Trail
          </div>
        </div>
      </footer>

    </div>
  );
}
