import React from 'react';
import { 
  X, 
  FileText, 
  AlertTriangle, 
  User, 
  Phone, 
  CreditCard, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  Fingerprint,
  Compass,
  Users
} from 'lucide-react';
import { LAND_CATEGORIES } from '../data/gandhinagarParcels';

export default function PropertyDossierModal({ 
  parcel, 
  onClose, 
  onInitiateMutation,
  onTriggerEkyc,
  onOpenAiInspector,
  onInitiateMultiOwnerConsent
}) {
  if (!parcel) return null;

  const isFlagged = parcel.status === 'Flagged' || parcel.hasEncroachment;
  const isMediumWarning = parcel.status === 'Under Scrutiny' || (parcel.encumbranceStatus && !parcel.encumbranceStatus.includes('Clear') && !parcel.encumbranceStatus.includes('Inalienable') && !isFlagged);
  const categoryDef = LAND_CATEGORIES[parcel.landCategory] || LAND_CATEGORIES.Residential;

  const isShared = Boolean(parcel.isSharedOwnership || parcel.ownershipType === 'Joint');
  const coOwners = parcel.coOwners || [];
  const verifiedCount = coOwners.filter(o => o.status === 'Verified').length;
  const totalCoOwners = coOwners.length || 2;
  const consentPercentage = totalCoOwners > 0 ? Math.round((verifiedCount / totalCoOwners) * 100) : 0;
  const allVerified = totalCoOwners > 0 && verifiedCount === totalCoOwners;

  const riskLabel = isFlagged ? 'High Encroachment Risk' : isMediumWarning ? 'Medium Warning' : 'Low Risk';

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Centered Modal Window */}
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                Property Dossier - Property Location & Details
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Gandhinagar Land Revenue & Boundary Database • Bhu-Aadhaar Registry
              </p>
            </div>
          </div>

          <button
            id="btn-close-dossier"
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shadow-2xs"
            title="Close Dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Key Details Grid */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          
          {/* ULPIN & High-Level Spatial Ribbon */}
          <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50/40 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Bhu-Aadhaar (ULPIN Code)
              </span>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className="text-lg font-mono font-extrabold text-blue-700">
                  {parcel.ulpin}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${categoryDef.badgeClass}`}>
                  {parcel.landCategory}
                </span>
                {isShared && (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs border border-amber-300">
                    <span>👥</span>
                    <span>Joint Khata / Co-Owned Parcel</span>
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Total Area
                </span>
                <span className="text-sm font-extrabold text-slate-900">
                  {parcel.areaSqM.toLocaleString()} sq. m ({parcel.areaAcres} Acres)
                </span>
              </div>

              {/* Status Badge */}
              <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                isFlagged 
                  ? 'bg-rose-50 text-rose-700 border-rose-200' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {isFlagged ? (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Risk Flagged</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Clear Title</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* AI Risk Card */}
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isFlagged 
              ? 'bg-rose-50/70 border-rose-200 text-rose-950' 
              : isMediumWarning 
              ? 'bg-amber-50/70 border-amber-200 text-amber-950' 
              : 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
          }`}>
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                isFlagged ? 'bg-rose-600 text-white' : isMediumWarning ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
              }`}>
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    AI Risk Assessment:
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${
                    isFlagged 
                      ? 'bg-rose-100 text-rose-800 border-rose-300' 
                      : isMediumWarning 
                      ? 'bg-amber-100 text-amber-800 border-amber-300' 
                      : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  }`}>
                    {isFlagged ? '🔴' : isMediumWarning ? '🟡' : '🟢'} {riskLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {isFlagged
                    ? parcel.statusNote || 'Satellite temporal scan flagged potential boundary shift or land-use discrepancy.'
                    : isMediumWarning
                    ? 'Zoning or minor property claim under administrative review.'
                    : 'Land boundaries match official Land Detail Records with zero detected encroachment.'}
                </p>
              </div>
            </div>

            <button
              id="btn-dossier-open-inspector"
              onClick={() => {
                onClose();
                onOpenAiInspector?.(parcel);
              }}
              className="inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold shadow-2xs transition-colors shrink-0"
            >
              <span>🛰️ Open AI Inspector</span>
            </button>
          </div>

          {/* ==================================================================== */}
          {/* CO-OWNER SHARE TABLE (MULTI-OWNER JOINT KHATA SECTION) */}
          {/* ==================================================================== */}
          {isShared && coOwners.length > 0 && (
            <div className="bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 border-2 border-amber-300 rounded-2xl p-5 shadow-xs space-y-3.5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/80 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm tracking-tight">
                        Co-Owner Land Share Distribution & DigiLocker Consent Registry
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                        Sec 135-D Quorum Rule
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      100% Quorum Consent Rule: All recorded co-owners must grant digital biometric consent prior to ownership transfer / record update.
                    </p>
                  </div>
                </div>

                {/* Quorum Progress Indicator */}
                <div className="text-right">
                  <div className="flex items-center space-x-2 justify-end">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Quorum Consent:</span>
                    <span className={`text-xs font-extrabold font-mono px-2.5 py-0.5 rounded-md border ${
                      allVerified 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                        : 'bg-amber-100 text-amber-900 border-amber-300'
                    }`}>
                      {consentPercentage}% ({verifiedCount} of {totalCoOwners} Verified)
                    </span>
                  </div>
                  <div className="w-40 h-2 bg-slate-200 rounded-full mt-1.5 overflow-hidden ml-auto">
                    <div 
                      className={`h-full transition-all duration-500 rounded-full ${
                        allVerified ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${consentPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Co-Owner Share Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="pb-2 pl-1">Co-Owner Titleholder</th>
                      <th className="pb-2">Allocated Share</th>
                      <th className="pb-2">Contact & Aadhaar</th>
                      <th className="pb-2">eKYC Verification Status</th>
                      <th className="pb-2 pr-1 text-right">DigiLocker Seal / Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {coOwners.map((owner, idx) => {
                      const isOwnerVerified = owner.status === 'Verified';

                      return (
                        <tr key={owner.id || idx} className="hover:bg-amber-50/50 transition-colors">
                          <td className="py-3 pl-1">
                            <div className="flex items-center space-x-2.5">
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-2xs ${
                                isOwnerVerified ? 'bg-emerald-600' : 'bg-amber-500'
                              }`}>
                                {owner.name.split(' ')[0][0]}
                              </div>
                              <div>
                                <span className="font-bold text-slate-900 block leading-tight">{owner.name}</span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {owner.relation || `Co-Owner #${idx + 1}`}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3">
                            <div className="flex items-center space-x-2">
                              <span className="font-extrabold text-slate-800 text-xs font-mono">{owner.share}</span>
                              <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${isOwnerVerified ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                                  style={{ width: owner.share || '50%' }} 
                                />
                              </div>
                            </div>
                            <span className="text-[10px] text-slate-400">Undivided Joint Interest</span>
                          </td>

                          <td className="py-3">
                            <div className="space-y-0.5 text-[11px] text-slate-600">
                              <span className="font-mono text-slate-500 block">{owner.aadhaarMasked}</span>
                              <span className="text-[10px] text-slate-400">{owner.mobile}</span>
                            </div>
                          </td>

                          <td className="py-3">
                            <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-2xs ${
                              isOwnerVerified 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                                : 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
                            }`}>
                              <span>{isOwnerVerified ? '🟢' : '🟡'}</span>
                              <span>{owner.statusLabel || (isOwnerVerified ? 'eKYC Verified (DigiLocker)' : 'Pending Consent (OTP Sent)')}</span>
                            </span>
                          </td>

                          <td className="py-3 pr-1 text-right">
                            {isOwnerVerified ? (
                              <div>
                                <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                                  {owner.verificationSealId || 'DL-GOV-981240'}
                                </span>
                                <span className="text-[9px] text-slate-400 block mt-0.5">{owner.timestamp || 'Verified'}</span>
                              </div>
                            ) : (
                              <div>
                                <span className="font-mono text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300 inline-block font-bold">
                                  OTP Dispatched
                                </span>
                                <span className="text-[9px] text-slate-400 block mt-0.5">Awaiting Digisign</span>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3 Main Governance & Spatial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 1. Property Location & Details */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-2.5">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs border-b border-slate-100 pb-2">
                <Compass className="w-4 h-4 text-blue-600" />
                <span>Property Location & Details</span>
              </div>
              
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Bhu-Aadhaar (ULPIN)</span>
                <span className="font-mono font-bold text-blue-700 text-xs">{parcel.ulpin}</span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Land Category</span>
                <span className="font-bold text-slate-800 text-xs flex items-center space-x-1">
                  <span>{categoryDef.icon}</span>
                  <span>{parcel.landCategory}</span>
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Area Size</span>
                <span className="font-bold text-slate-800 text-xs">
                  {parcel.areaSqM.toLocaleString()} sq. m ({parcel.areaAcres} Acres)
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Land Detail Record #</span>
                <span className="font-mono font-semibold text-slate-700 text-xs">Land Detail Record #{parcel.khasraNo}</span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Coordinates</span>
                <span className="font-mono text-slate-600 text-[11px]">
                  {parcel.centroid ? `${parcel.centroid[0].toFixed(4)}° N, ${parcel.centroid[1].toFixed(4)}° E` : '23.2156° N, 72.6369° E'}
                </span>
              </div>
            </div>

            {/* 2. Ownership Data */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-2.5">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs border-b border-slate-100 pb-2">
                <User className="w-4 h-4 text-blue-600" />
                <span>Ownership Data</span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Recorded Holder Name</span>
                <span className="font-bold text-slate-900 text-xs">{parcel.holderName}</span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Mobile Number</span>
                <span className="font-medium text-slate-700 text-xs flex items-center space-x-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{parcel.mobile}</span>
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Masked Aadhaar</span>
                <span className="font-mono text-slate-700 text-xs flex items-center space-x-1">
                  <CreditCard className="w-3 h-3 text-slate-400" />
                  <span>{parcel.aadhaarMasked}</span>
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Aadhaar Linkage Status</span>
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Linked & Verified</span>
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Property Location & Details</span>
                <span className="text-slate-600 text-[11px] font-medium leading-snug line-clamp-2">
                  {parcel.locality}
                </span>
              </div>
            </div>

            {/* 3. Registration & Fiscal */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-2.5">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs border-b border-slate-100 pb-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>Registration & Fiscal</span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Purchase Date</span>
                <span className="font-semibold text-slate-800 text-xs flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{parcel.purchaseDate}</span>
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Transaction Value</span>
                <span className="font-extrabold text-slate-900 text-xs">{parcel.transactionValue}</span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Previous Owner Name</span>
                <span className="font-medium text-slate-700 text-xs truncate block" title={parcel.previousOwner}>
                  {parcel.previousOwner}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Property Tax Status</span>
                <span className="font-bold text-emerald-700 text-xs flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{parcel.taxStatus}</span>
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Property Claims & Liabilities</span>
                <span className={`text-xs font-semibold ${isFlagged ? 'text-rose-600' : 'text-slate-700'}`}>
                  {parcel.encumbranceStatus}
                </span>
              </div>
            </div>

          </div>

          {/* Spatial / Geometry Footer Notice */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex flex-wrap items-center justify-between text-slate-600 gap-2">
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>{parcel.locality} (Sector {parcel.sector})</span>
            </div>
            <span className="text-slate-500 text-[11px] font-mono">
              GUDA Geometry: {parcel.shapeType}
            </span>
          </div>

        </div>

        {/* Action Bar with 3 Buttons */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3">
          <button
            id="btn-dossier-close"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            Close
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {/* Button 2: Run AI Encroachment Scan */}
            <button
              id="btn-dossier-scan"
              onClick={() => {
                onClose();
                onOpenAiInspector?.(parcel);
              }}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-bold rounded-xl shadow-2xs transition-all active:scale-[0.98]"
            >
              <span>🛰️</span>
              <span>[ Run AI Encroachment Scan ]</span>
            </button>

            {/* Dynamic Action Button Logic for Shared vs Standard Parcel */}
            {isShared ? (
              allVerified ? (
                /* When 100% Quorum Consent is reached */
                <button
                  id="btn-initiate-mutation-quorum"
                  onClick={() => onInitiateMutation(parcel)}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all ring-2 ring-emerald-400/30 active:scale-[0.98]"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Initiate Ownership Transfer (100% Consent Verified)</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
              ) : (
                /* When Pending Consent: Replace Initiate Mutation with Multi-Owner Consent */
                <button
                  id="btn-initiate-multi-owner-ekyc"
                  onClick={() => {
                    onClose();
                    onInitiateMultiOwnerConsent?.(parcel);
                  }}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 active:from-amber-800 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all ring-2 ring-amber-400/30 active:scale-[0.98]"
                >
                  <Users className="w-4 h-4" />
                  <span>Initiate Multi-Owner eKYC Consent</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
              )
            ) : (
              <>
                {/* Button 3: Verify via DigiLocker eKYC for single owner */}
                <button
                  id="btn-dossier-ekyc"
                  onClick={() => {
                    onClose();
                    onTriggerEkyc(parcel);
                  }}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold rounded-xl shadow-2xs transition-all active:scale-[0.98]"
                >
                  <Fingerprint className="w-4 h-4 text-emerald-600" />
                  <span>[ Verify via DigiLocker eKYC ]</span>
                </button>

                {/* Button 1: Standard Initiate Transfer */}
                <button
                  id="btn-initiate-mutation"
                  onClick={() => onInitiateMutation(parcel)}
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all ring-2 ring-blue-400/20 active:scale-[0.98]"
                >
                  <span>[ Initiate Ownership Transfer / Record Update ]</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
