import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  Search, 
  MapPin, 
  Layers, 
  Compass, 
  Crosshair, 
  FileText, 
  ChevronRight
} from 'lucide-react';
import { 
  GANDHINAGAR_CENTER, 
  DEFAULT_ZOOM, 
  BASEMAP_OPTIONS, 
  LAND_CATEGORIES 
} from '../data/gandhinagarParcels';

// Helper component for smooth camera flight and auto-resizing
function MapController({ selectedParcel }) {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (selectedParcel && selectedParcel.coordinates) {
      const lats = selectedParcel.coordinates.map(c => c[0]);
      const lngs = selectedParcel.coordinates.map(c => c[1]);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);

      map.flyToBounds(
        [
          [minLat, minLng],
          [maxLat, maxLng]
        ],
        {
          padding: [90, 90],
          maxZoom: 17,
          duration: 1.4
        }
      );
    }
  }, [selectedParcel, map]);

  return null;
}

export default function GandhinagarGisMap({
  parcels,
  selectedParcel,
  onSelectParcel,
  onOpenDossier
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL', 'Agricultural', 'Industrial', 'Utility', 'Residential', 'FLAGGED'
  const [activeBasemapId, setActiveBasemapId] = useState('positron'); // 'street', 'satellite', 'positron'

  // Active basemap object
  const currentBasemap = useMemo(() => {
    return BASEMAP_OPTIONS.find(b => b.id === activeBasemapId) || BASEMAP_OPTIONS[2];
  }, [activeBasemapId]);

  // Filtered parcels based on search input & category tab
  const filteredParcels = useMemo(() => {
    return parcels.filter(p => {
      const q = searchQuery.toLowerCase();
      const isShared = Boolean(p.isSharedOwnership || p.ownershipType === 'Joint');
      const matchesSearch = 
        p.ulpin.toLowerCase().includes(q) ||
        p.holderName.toLowerCase().includes(q) ||
        p.sector.toLowerCase().includes(q) ||
        p.landCategory.toLowerCase().includes(q) ||
        (isShared && ('joint'.includes(q) || 'shared'.includes(q) || 'khata'.includes(q) || 'co-owned'.includes(q)));

      if (!matchesSearch) return false;

      if (activeFilter === 'ALL') return true;
      if (activeFilter === 'FLAGGED') return p.status === 'Flagged';
      if (activeFilter === 'JOINT') return isShared;
      return p.landCategory === activeFilter;
    });
  }, [parcels, searchQuery, activeFilter]);

  const handleParcelSelect = (parcel) => {
    onSelectParcel(parcel);
  };

  const handleParcelDossierClick = (parcel) => {
    onSelectParcel(parcel);
    onOpenDossier(parcel);
  };

  const handleResetCenter = () => {
    onSelectParcel(null);
  };

  return (
    <div className="relative w-full h-[calc(100vh-13rem)] min-h-[560px] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex">
      
      {/* ==================================================================== */}
      {/* 1. FLOATING SEARCH & CADASTRAL PARCEL SIDEBAR (LEFT) */}
      {/* ==================================================================== */}
      <div className="absolute top-4 left-4 z-20 w-80 sm:w-96 max-h-[calc(100%-2rem)] flex flex-col bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Sidebar Header & Search Input */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/90">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Cadastral Parcels</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {filteredParcels.length} of {parcels.length}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Gandhinagar DPI</span>
          </div>

          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="input-cadastral-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ULPIN (e.g. GJ06, MH26)..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Pills for 4 Categories + Flagged */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 text-[10px] font-bold scrollbar-none">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'ALL'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('Agricultural')}
              className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'Agricultural'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              🟢 Agri
            </button>
            <button
              onClick={() => setActiveFilter('Residential')}
              className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'Residential'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              🔵 Resi
            </button>
            <button
              onClick={() => setActiveFilter('Industrial')}
              className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'Industrial'
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              🟣 Ind
            </button>
            <button
              onClick={() => setActiveFilter('Utility')}
              className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'Utility'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              🟡 Utility
            </button>
            <button
              onClick={() => setActiveFilter('JOINT')}
              className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'JOINT'
                  ? 'bg-amber-600 text-white shadow-2xs font-bold'
                  : 'bg-white border border-amber-200 text-amber-800 hover:bg-amber-50'
              }`}
            >
              👥 Joint ({parcels.filter(p => p.isSharedOwnership || p.ownershipType === 'Joint').length})
            </button>
            <button
              onClick={() => setActiveFilter('FLAGGED')}
              className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'FLAGGED'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              🔴 Risk ({parcels.filter(p => p.status === 'Flagged').length})
            </button>
          </div>
        </div>

        {/* Parcels List */}
        <div className="p-2 overflow-y-auto space-y-1.5 max-h-[420px]">
          {filteredParcels.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No matching parcels found for "{searchQuery}".
            </div>
          ) : (
            filteredParcels.map((parcel) => {
              const isSelected = selectedParcel?.id === parcel.id;
              const isFlagged = parcel.status === 'Flagged';
              const categoryDef = LAND_CATEGORIES[parcel.landCategory] || LAND_CATEGORIES.Residential;

              return (
                <div
                  key={parcel.id}
                  id={`parcel-card-${parcel.ulpin}`}
                  onClick={() => handleParcelSelect(parcel)}
                  className={`group p-3 rounded-xl border text-xs cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-blue-50/90 border-blue-400 shadow-xs ring-2 ring-blue-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <div className="flex items-center space-x-1.5 min-w-0">
                      <span 
                        className="w-2.5 h-2.5 rounded-full shrink-0" 
                        style={{ backgroundColor: isFlagged ? '#ef4444' : categoryDef.color }} 
                      />
                      <span className="font-mono font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {parcel.ulpin}
                      </span>
                    </div>

                    {parcel.isSharedOwnership ? (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold border shrink-0 bg-amber-50 text-amber-800 border-amber-300 flex items-center space-x-1 shadow-2xs">
                        <span>👥</span>
                        <span>Joint Khata</span>
                      </span>
                    ) : (
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border shrink-0 ${
                        isFlagged
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : categoryDef.badgeClass
                      }`}>
                        {isFlagged ? 'Flagged' : parcel.landCategory}
                      </span>
                    )}
                  </div>

                  <div className="mt-1.5 flex items-center justify-between text-slate-600 text-[11px]">
                    <span className="font-medium truncate max-w-[190px]">
                      {parcel.holderName}
                    </span>
                    <span className="font-bold text-slate-800 shrink-0">
                      {parcel.areaSqM.toLocaleString()} m² ({parcel.areaAcres} Ac)
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{parcel.sector}</span>
                    </span>
                    <span className="font-mono font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      Khasra #{parcel.khasraNo}
                    </span>
                  </div>

                  {/* Direct Action Link */}
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600 group-hover:text-blue-700">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleParcelDossierClick(parcel);
                      }}
                      className="flex items-center space-x-1 hover:underline"
                    >
                      <FileText className="w-3 h-3" />
                      <span>View Property Dossier</span>
                    </button>
                    <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Click plot to trace boundary</span>
          <button
            onClick={handleResetCenter}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
          >
            <Crosshair className="w-3 h-3" />
            <span>Center Map</span>
          </button>
        </div>

      </div>

      {/* ==================================================================== */}
      {/* CENTERED KPI SUMMARY BAR (TOP OF MAP CANVAS) */}
      {/* ==================================================================== */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 hidden xl:flex items-center space-x-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-slate-200 text-xs">
        <div className="flex items-center space-x-1.5 font-bold text-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Total Parcels:</span>
          <span className="font-mono text-blue-700 font-extrabold">{parcels.length}</span>
        </div>
        <span className="text-slate-300">|</span>
        <div className="flex items-center space-x-1.5 font-bold text-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Total Land Area:</span>
          <span className="font-mono text-slate-900 font-extrabold">48,250 sq. m (11.9 Acres)</span>
        </div>
        <span className="text-slate-300">|</span>
        <div className="flex items-center space-x-1.5 font-bold text-rose-700">
          <span className="text-[10px] text-rose-500 uppercase tracking-wider">AI Risk Flags:</span>
          <span className="font-mono font-extrabold px-1.5 py-0.5 rounded bg-rose-50 border border-rose-200">
            {parcels.filter(p => p.status === 'Flagged').length}
          </span>
        </div>
        <span className="text-slate-300">|</span>
        <div className="flex items-center space-x-1.5 font-bold text-emerald-700">
          <span className="text-[10px] text-emerald-500 uppercase tracking-wider">Completed Mutations:</span>
          <span className="font-mono font-extrabold px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200">
            4
          </span>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. BASEMAP LAYER SWITCHER (TOP RIGHT CONTROL PANEL) */}
      {/* ==================================================================== */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end space-y-2">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 p-2.5">
          <div className="flex items-center justify-between space-x-3 mb-2 px-1">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Basemap Engine</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-semibold">
              No API Key
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {BASEMAP_OPTIONS.map((basemap) => {
              const isActive = activeBasemapId === basemap.id;

              return (
                <button
                  key={basemap.id}
                  id={`btn-basemap-${basemap.id}`}
                  onClick={() => setActiveBasemapId(basemap.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all text-center flex flex-col items-center justify-center ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/30'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <span className="text-[11px]">{basemap.name.split(' ')[0]}</span>
                  <span className="text-[9px] opacity-80">{basemap.name.includes('Satellite') ? 'Imagery' : basemap.name.includes('Positron') ? 'Light' : 'OSM'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Parcel Badge (Quick Floating Indicator) */}
        {selectedParcel && (
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-blue-200 px-3.5 py-2 flex items-center space-x-2.5 text-xs animate-in slide-in-from-right-3 duration-200">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-blue-700">{selectedParcel.ulpin}</span>
                <span className="text-slate-400">|</span>
                <span className="font-semibold text-slate-800">{selectedParcel.holderName}</span>
              </div>
              <p className="text-[10px] text-slate-500">
                Boundary circumference traced • {selectedParcel.areaSqM.toLocaleString()} m²
              </p>
            </div>
            <button
              id="btn-open-dossier-quick"
              onClick={() => onOpenDossier(selectedParcel)}
              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[10px] shadow-xs"
            >
              Dossier
            </button>
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* 3. GIS LEAFLET MAP VIEWPORT WITH preferCanvas={true} */}
      {/* ==================================================================== */}
      <div className="w-full h-full relative">
        <MapContainer
          center={GANDHINAGAR_CENTER}
          zoom={DEFAULT_ZOOM}
          preferCanvas={true}
          scrollWheelZoom={true}
          className="w-full h-full z-10"
        >
          {/* Active Open Basemap Layer */}
          <TileLayer
            key={currentBasemap.id}
            attribution={currentBasemap.attribution}
            url={currentBasemap.url}
            maxZoom={currentBasemap.maxZoom}
          />

          <MapController selectedParcel={selectedParcel} />

          {/* Render All 12+ Gandhinagar Parcel Polygons */}
          {parcels.map((parcel) => {
            const isSelected = selectedParcel?.id === parcel.id;
            const isFlagged = parcel.status === 'Flagged';
            const isShared = Boolean(parcel.isSharedOwnership || parcel.ownershipType === 'Joint');
            const categoryDef = LAND_CATEGORIES[parcel.landCategory] || LAND_CATEGORIES.Residential;

            // Base styling: Special styling rule for Shared Land Parcels
            // Amber/Gold outline (#D97706), dashed perimeter border (dashArray: '6, 6'), soft translucent fill (fillColor: '#F59E0B', fillOpacity: 0.35)
            const defaultCategoryStyle = isShared
              ? {
                  color: '#D97706', // Amber/Gold outline
                  weight: 2.5,
                  opacity: 0.95,
                  fillColor: '#F59E0B', // Soft translucent fill
                  fillOpacity: 0.35,
                  dashArray: '6, 6' // Dashed perimeter border
                }
              : {
                  color: isFlagged ? '#ef4444' : categoryDef.borderColor,
                  weight: isFlagged ? 2.5 : 2,
                  opacity: 0.95,
                  fillColor: isFlagged ? '#fee2e2' : categoryDef.fillColor,
                  fillOpacity: isFlagged ? 0.65 : 0.6,
                  dashArray: isFlagged ? '5, 5' : null
                };

            // Selected styling: thick glowing stroke with prominent outline
            const selectedStyle = {
              color: isShared ? '#b45309' : '#ea580c', // Prominent amber/orange circumference
              weight: 5,
              opacity: 1,
              fillColor: isShared ? '#fde68a' : '#fef08a', // Soft bright amber fill
              fillOpacity: 0.8,
              dashArray: isShared ? '6, 6' : null,
              className: 'selected-parcel-boundary-glow'
            };

            return (
              <React.Fragment key={parcel.id}>
                
                {/* Secondary Animated Glowing Halo Polygon when selected */}
                {isSelected && (
                  <Polygon
                    positions={parcel.coordinates}
                    pathOptions={{
                      color: isShared ? '#d97706' : '#f59e0b',
                      weight: 14,
                      opacity: 0.45,
                      fill: false,
                      interactive: false,
                      className: 'glowing-boundary-halo'
                    }}
                  />
                )}

                {/* Visual Badge Indicator on top of Shared Parcel (Centroid Marker) */}
                {isShared && parcel.centroid && (
                  <Marker
                    position={parcel.centroid}
                    icon={L.divIcon({
                      className: 'joint-parcel-badge-container',
                      html: `
                        <div style="
                          display: inline-flex;
                          align-items: center;
                          gap: 4px;
                          background: #d97706;
                          color: #ffffff;
                          font-size: 10px;
                          font-weight: 800;
                          padding: 3px 9px;
                          border-radius: 9999px;
                          box-shadow: 0 4px 10px rgba(217, 119, 6, 0.45), 0 1px 3px rgba(0, 0, 0, 0.2);
                          border: 1.5px solid #fef3c7;
                          white-space: nowrap;
                          transform: translate(-50%, -50%);
                          cursor: pointer;
                          pointer-events: auto;
                          letter-spacing: 0.02em;
                          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
                        ">
                          <span style="font-size: 11px;">👥</span>
                          <span>Joint (2+ Owners)</span>
                        </div>
                      `,
                      iconSize: [0, 0],
                      iconAnchor: [0, 0]
                    })}
                    eventHandlers={{
                      click: () => {
                        onSelectParcel(parcel);
                        onOpenDossier(parcel);
                      }
                    }}
                  />
                )}

                {/* Primary Cadastral Parcel Polygon */}
                <Polygon
                  positions={parcel.coordinates}
                  pathOptions={isSelected ? selectedStyle : defaultCategoryStyle}
                  eventHandlers={{
                    click: () => {
                      onSelectParcel(parcel);
                      onOpenDossier(parcel);
                    },
                    mouseover: (e) => {
                      if (!isSelected) {
                        const layer = e.target;
                        layer.setStyle({
                          weight: 3.5,
                          color: isShared ? '#b45309' : '#2563eb',
                          fillOpacity: isShared ? 0.55 : 0.8
                        });
                      }
                    },
                    mouseout: (e) => {
                      if (!isSelected) {
                        const layer = e.target;
                        layer.setStyle(defaultCategoryStyle);
                      }
                    }
                  }}
                >
                  <Popup className="material-map-popup">
                    <div className="p-1 space-y-1.5 text-xs min-w-[200px]">
                      <div className="flex items-center justify-between space-x-2">
                        <span className="font-mono font-bold text-blue-700">{parcel.ulpin}</span>
                        <div className="flex items-center space-x-1">
                          {isShared && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
                              👥 Joint
                            </span>
                          )}
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                            isFlagged ? 'bg-rose-100 text-rose-700' : categoryDef.badgeClass
                          }`}>
                            {parcel.landCategory}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="font-bold text-slate-900">{parcel.holderName}</p>
                        <p className="text-[11px] text-slate-500">
                          {parcel.areaSqM.toLocaleString()} sq. m ({parcel.areaAcres} Acres)
                        </p>
                      </div>

                      <div className="text-[11px] text-slate-600 bg-slate-50 p-1.5 rounded-lg border border-slate-200/80">
                        <span className="block font-medium">Khasra #{parcel.khasraNo} • {parcel.sector}</span>
                        <span className="text-[10px] text-slate-400">{parcel.locality}</span>
                      </div>

                      <button
                        id={`btn-open-dossier-popup-${parcel.ulpin}`}
                        onClick={() => onOpenDossier(parcel)}
                        className="w-full mt-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                      >
                        Open Property Dossier
                      </button>
                    </div>
                  </Popup>
                </Polygon>
              </React.Fragment>
            );
          })}
        </MapContainer>

        {/* Cadastral Legend Overlay (Bottom Right) */}
        <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-200 shadow-lg text-xs space-y-2">
          <div className="font-bold text-slate-900 text-[11px] uppercase tracking-wider border-b border-slate-100 pb-1 flex items-center justify-between">
            <span>Land Category Legend</span>
            <span className="text-[10px] text-slate-400 font-mono">GUDA</span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded bg-emerald-200 border-2 border-emerald-600 inline-block" />
              <span className="text-slate-700 font-medium">Agricultural</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded bg-sky-200 border-2 border-sky-600 inline-block" />
              <span className="text-slate-700 font-medium">Residential</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded bg-purple-200 border-2 border-purple-600 inline-block" />
              <span className="text-slate-700 font-medium">Industrial</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded bg-amber-200 border-2 border-amber-600 inline-block" />
              <span className="text-slate-700 font-medium">Utility Infra</span>
            </div>
          </div>

          <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-amber-400/35 border-2 border-dashed border-amber-600 inline-block" />
              <span className="text-amber-900 font-bold">👥 Joint Khata</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-rose-100 border border-dashed border-rose-500 inline-block" />
              <span>Risk Flagged</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-amber-300 border-2 border-orange-500 inline-block" />
              <span>Glowing Glow</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
