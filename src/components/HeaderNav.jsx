import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Layers, 
  FileText, 
  ChevronDown, 
  Check,
  LogOut,
  UserCheck,
  FileCheck,
  ShieldAlert,
  BarChart3
} from 'lucide-react';
import { OFFICER_PROFILES } from '../data/gandhinagarParcels';

export default function HeaderNav({ 
  userRole = 'government', // 'government' or 'citizen'
  activeTab, 
  setActiveTab, 
  currentOfficer, 
  onSelectOfficer,
  onSwitchPortal 
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

  // Government Navigation Tabs
  const govTabs = [
    { id: 'map', label: 'Land Registry Map', icon: Layers },
    { id: 'queue', label: 'Citizen Application Queue', icon: FileCheck },
    { id: 'disputes', label: 'Dispute & Legal Resolution', icon: ShieldAlert },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'audit', label: 'Official Audit Trail', icon: FileText }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* ================================================================ */}
          {/* LEFT: Logo & Civic Location Badge */}
          {/* ================================================================ */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm ring-4 ${
              userRole === 'citizen'
                ? 'bg-gradient-to-tr from-emerald-700 to-teal-600 ring-emerald-50'
                : 'bg-gradient-to-tr from-blue-700 to-indigo-600 ring-blue-50'
            }`}>
              {userRole === 'citizen' ? (
                <UserCheck className="w-6 h-6" />
              ) : (
                <ShieldCheck className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                  LandStack OneView
                </h1>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                  userRole === 'citizen'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  {userRole === 'citizen' ? 'Citizen Portal' : 'Government Official'}
                </span>
              </div>
              <div className="flex items-center space-x-1.5 mt-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="text-[11px] text-slate-500 font-medium truncate max-w-[210px] sm:max-w-none">
                  Gandhinagar Sector 21 / 22 • Gujarat Revenue Administration
                </span>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* CENTER: Navigation Tabs (For Government Portal) */}
          {/* ================================================================ */}
          {userRole === 'government' && (
            <nav className="hidden lg:flex items-center justify-center space-x-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
              {govTabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    id={`nav-tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
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
          )}

          {/* ================================================================ */}
          {/* RIGHT: Profile Info & Switch Portal / Logout Action */}
          {/* ================================================================ */}
          <div className="flex items-center space-x-2.5">
            
            {/* If Government Official: Interactive Profile Switcher */}
            {userRole === 'government' ? (
              <div className="relative shrink-0" ref={dropdownRef}>
                <button
                  id="btn-officer-profile-dropdown"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100/80 transition-all text-left shadow-2xs group focus:outline-none"
                >
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-lg ${currentOfficer?.avatarBg || 'bg-blue-600'} flex items-center justify-center text-white text-sm shadow-xs`}>
                      {currentOfficer?.icon || '👨‍💼'}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>

                  <div className="hidden sm:block">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {currentOfficer?.name || 'Rajesh Kumar'}
                      </span>
                      <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-200 text-slate-700 font-semibold">
                        {currentOfficer?.badgeId || '#8821'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium leading-none mt-0.5 truncate max-w-[130px]">
                      {currentOfficer?.title?.split('/')[0] || 'Tehsildar'}
                    </p>
                  </div>

                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform duration-150 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Switcher Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Switch Government Official Profile
                      </p>
                    </div>

                    <div className="mt-1 space-y-1">
                      {OFFICER_PROFILES.map((profile) => {
                        const isCurrent = currentOfficer?.id === profile.id;

                        return (
                          <button
                            key={profile.id}
                            type="button"
                            onClick={() => {
                              onSelectOfficer(profile);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full p-2 rounded-xl text-left transition-colors flex items-center space-x-2 text-xs ${
                              isCurrent
                                ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <span className="text-sm">{profile.icon}</span>
                            <div className="truncate flex-1">
                              <span className="block truncate">{profile.name}</span>
                              <span className="text-[10px] text-slate-400 block truncate">{profile.title}</span>
                            </div>
                            {isCurrent && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* If Citizen: Citizen Persona Pill */
              <div className="flex items-center space-x-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 bg-slate-50/80">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  RP
                </div>
                <div className="hidden sm:block">
                  <span className="text-xs font-bold text-slate-900 block leading-tight">Ramesh Patel</span>
                  <span className="text-[10px] text-slate-500 font-medium">Citizen Owner (Sec 21)</span>
                </div>
              </div>
            )}

            {/* Universal Switch Portal / Logout Action */}
            <button
              id="btn-switch-portal"
              onClick={onSwitchPortal}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors shadow-2xs"
              title="Switch Portal or Return to Landing Page"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Switch Portal / Logout</span>
            </button>

          </div>

        </div>

        {/* Mobile Navigation Tabs for Government Portal */}
        {userRole === 'government' && (
          <div className="lg:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-100 scrollbar-none">
            {govTabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}

      </div>
    </header>
  );
}
