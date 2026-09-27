import React from 'react';
import { Layers, Maximize2, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function KpiMetricsBar({ 
  totalParcelsCount = 12, 
  totalLandArea = '48,250 sq. m (11.9 Acres)',
  riskFlagsCount = 3, 
  completedMutationsCount = 4 
}) {
  const kpis = [
    {
      id: 'parcels',
      label: 'TOTAL PARCELS',
      value: totalParcelsCount,
      subtext: 'Gandhinagar Sec 21 & 22',
      badge: '100% Vectorized',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Layers,
      iconBg: 'bg-blue-50 border-blue-200 text-blue-600'
    },
    {
      id: 'area',
      label: 'TOTAL LAND AREA',
      value: totalLandArea,
      subtext: 'Cadastral Footprint',
      badge: 'Bhu-Aadhaar Seeded',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: Maximize2,
      iconBg: 'bg-indigo-50 border-indigo-200 text-indigo-600'
    },
    {
      id: 'risk',
      label: 'ACTIVE RISK FLAGS',
      value: riskFlagsCount,
      subtext: 'Disputes & Encroachments',
      badge: 'Action Required',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: AlertTriangle,
      iconBg: 'bg-rose-50 border-rose-200 text-rose-600'
    },
    {
      id: 'mutations',
      label: 'COMPLETED MUTATIONS',
      value: completedMutationsCount,
      subtext: '7/12 RoR Updated',
      badge: 'DigiLocker Verified',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 border-emerald-200 text-emerald-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
      {kpis.map((kpi) => {
        const IconComponent = kpi.icon;

        return (
          <div 
            key={kpi.id} 
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:shadow-sm transition-all duration-150 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3.5 min-w-0">
              <div className={`w-11 h-11 rounded-xl ${kpi.iconBg} border flex items-center justify-center shrink-0 shadow-2xs`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                  {kpi.label}
                </p>
                <div className="flex items-baseline space-x-1.5 mt-0.5">
                  <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight truncate">
                    {kpi.value}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium truncate">
                  {kpi.subtext}
                </p>
              </div>
            </div>

            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${kpi.badgeClass}`}>
              {kpi.badge}
            </span>
          </div>
        );
      })}
    </div>
  );
}
