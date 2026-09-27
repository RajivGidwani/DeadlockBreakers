import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Layers, 
  LayoutDashboard, 
  Sparkles, 
  Fingerprint, 
  FileText, 
  ChevronDown, 
  Check
} from 'lucide-react';
import { OFFICER_PROFILES } from '../data/gandhinagarParcels';

export default function HeaderNav({ 
  activeTab, 
  setActiveTab, 
  currentOfficer, 
  onSelectOfficer 
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navTabs = [
    { id: 'map', label: 'GIS OneView Map', icon: Layers },
    { id: 'officer', label: 'Officer Control Panel', icon: LayoutDashboard },
    { id: 'ai-hub', label: 'AI Intelligence Hub', icon: Sparkles },
    { id: 'ekyc', label: 'eKYC Verification Hub', icon: Fingerprint },
    { id: 'audit', label: 'Audit Logs', icon: FileText }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* ================================================================ */}
          {/* LEFT: Logo & Civic Location Badge */}
          {/* ================================================================ */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-sm ring-4 ring-blue-50">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none">
                  LandStack OneView
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  DPI Portal
                </span>
              </div>
              <div className="flex items-center space-x-1.5 mt-1">
                <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                <span className="text-[11px] text-slate-600 font-medium truncate max-w-[210px] sm:max-w-none">
                  Gandhinagar Sector 21 / Sector 22 | 23.2156° N, 72.6369° E
                </span>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* CENTER: Centered Navigation Tabs */}
          {/* ================================================================ */}
          <nav className="hidden md:flex items-center justify-center space-x-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
            {navTabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-white text-blue-700 shadow-xs border border-slate-200/90 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ================================================================ */}
          {/* RIGHT: Interactive Officer Profile Switcher Dropdown */}
          {/* ================================================================ */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              id="btn-officer-profile-dropdown"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100/80 transition-all text-left shadow-2xs group focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {/* Officer Avatar with Active Pulse */}
              <div className="relative">
                <div className={`w-8 h-8 rounded-lg ${currentOfficer?.avatarBg || 'bg-blue-600'} flex items-center justify-center text-white text-sm shadow-xs`}>
                  {currentOfficer?.icon || '👨‍💼'}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>

              {/* Officer Details */}
              <div className="hidden lg:block">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {currentOfficer?.name || 'Rajesh Kumar'}
                  </span>
                  <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-200 text-slate-700 font-semibold">
                    {currentOfficer?.badgeId || '#8821'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium leading-none mt-0.5 truncate max-w-[150px]">
                  {currentOfficer?.title || 'Tehsildar / Revenue Officer'}
                </p>
              </div>

              <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-transform duration-150 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Government Officer Profile
                  </p>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    Select role to emulate quasi-judicial or planning authorities:
                  </p>
                </div>

                <div className="mt-1 space-y-1">
                  {OFFICER_PROFILES.map((profile) => {
                    const isCurrent = currentOfficer?.id === profile.id;

                    return (
                      <button
                        key={profile.id}
                        id={`profile-option-${profile.id}`}
                        onClick={() => {
                          onSelectOfficer(profile);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start space-x-3 ${
                          isCurrent
                            ? 'bg-blue-50/80 border border-blue-200 shadow-2xs'
                            : 'hover:bg-slate-50 border border-transparent'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-lg ${profile.avatarBg} flex items-center justify-center text-white text-base shrink-0 shadow-2xs`}>
                          {profile.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 truncate">
                              {profile.name}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-bold">
                              {profile.badgeId}
                            </span>
                          </div>

                          <div className="text-[11px] font-semibold text-blue-700 mt-0.5 leading-snug">
                            {profile.title}
                          </div>

                          <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                            {profile.designation}
                          </p>
                        </div>

                        {isCurrent && (
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 px-3 py-1.5 bg-slate-50/60 rounded-xl text-[10px] text-slate-500 flex items-center justify-between">
                  <span>DPI RBAC Session Active</span>
                  <span className="font-mono text-emerald-600 font-bold">● e-Pramaan Token #8821</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Mobile Navigation Tabs */}
        <div className="md:hidden flex items-center justify-between py-2 border-t border-slate-100 overflow-x-auto space-x-1">
          {navTabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
