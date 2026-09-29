import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  Layers, 
  FileText, 
  Crosshair,
  Compass
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
  const [activeBasemapId, setActiveBasemapId] = useState('street'); // 'street' (OpenStreetMap), 'satellite', 'positron'

  // Active basemap object
  const currentBasemap = useMemo(() => {
    return BASEMAP_OPTIONS.find(b => b.id === activeBasemapId) || BASEMAP_OPTIONS[0];
  }, [activeBasemapId]);

  const handleResetCenter = () => {
    onSelectParcel(null);
  };

  return (
    <div className="relative w-full h-[540px] sm:h-[620px] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-xs flex">
      
      {/* Top Left Civic Title Badge (Clean & Non-Obtrusive) */}
      <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
        <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-200 flex items-center space-x-2 text-xs font-bold text-slate-800">
          <Compass className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Land Boundary Map</span>
          <span className="text-slate-300 font-normal">|</span>
          <span className="text-slate-500 font-medium">Gandhinagar Sectors 21 & 22</span>
        </div>

        {selectedParcel && (
          <button
            onClick={handleResetCenter}
            className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center space-x-1.5 transition-colors"
            title="Reset Map Center"
          >
            <Crosshair className="w-3.5 h-3.5 text-blue-600" />
            <span>Reset Focus</span>
          </button>
        )}
      </div>

      {/* Top Right: Basemap Layer Switcher */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end space-y-2">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 p-2.5">
          <div className="flex items-center space-x-1.5 mb-2 px-1 text-xs font-bold text-slate-800">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Map Layers</span>
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
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/30 font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <span className="text-[11px]">{basemap.name.split(' ')[0]}</span>
                  <span className="text-[9px] opacity-80">{basemap.name.includes('Satellite') ? 'Satellite' : basemap.name.includes('Positron') ? 'Light' : 'Street'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Parcel Badge (Quick Floating Indicator) */}
        {selectedParcel && (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-blue-200 px-3.5 py-2 flex items-center space-x-3 text-xs animate-in slide-in-from-right-3 duration-200">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-blue-700">{selectedParcel.ulpin}</span>
                <span className="text-slate-300">|</span>
                <span className="font-semibold text-slate-800 truncate max-w-[140px]">{selectedParcel.holderName}</span>
              </div>
              <p className="text-[10px] text-slate-500">
                Land Detail Record #{selectedParcel.khasraNo} • {selectedParcel.areaSqM.toLocaleString()} m²
              </p>
            </div>
            <button
              id="btn-open-dossier-quick"
              onClick={() => onOpenDossier(selectedParcel)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center space-x-1"
            >
              <FileText className="w-3 h-3" />
              <span>Dossier</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Full-Size Map Viewport with Leaflet (preferCanvas={true}) */}
      <div className="w-full h-full relative">
        <MapContainer
          center={GANDHINAGAR_CENTER}
          zoom={DEFAULT_ZOOM}
          preferCanvas={true}
          scrollWheelZoom={true}
          className="w-full h-full z-10"
        >
          {/* Active Basemap Layer */}
          <TileLayer
            key={currentBasemap.id}
            attribution={currentBasemap.attribution}
            url={currentBasemap.url}
            maxZoom={currentBasemap.maxZoom}
          />

          <MapController selectedParcel={selectedParcel} />

          {/* Render All Gandhinagar Parcel Polygons */}
          {parcels.map((parcel) => {
            const isSelected = selectedParcel?.id === parcel.id;
            const isFlagged = parcel.status === 'Flagged';
            const isShared = Boolean(parcel.isSharedOwnership || parcel.ownershipType === 'Joint');
            const categoryDef = LAND_CATEGORIES[parcel.landCategory] || LAND_CATEGORIES.Residential;

            const defaultCategoryStyle = isShared
              ? {
                  color: '#D97706',
                  weight: 2.5,
                  opacity: 0.95,
                  fillColor: '#F59E0B',
                  fillOpacity: 0.35,
                  dashArray: '6, 6'
                }
              : {
                  color: isFlagged ? '#ef4444' : categoryDef.borderColor,
                  weight: isFlagged ? 2.5 : 2,
                  opacity: 0.95,
                  fillColor: isFlagged ? '#fee2e2' : categoryDef.fillColor,
                  fillOpacity: isFlagged ? 0.65 : 0.6,
                  dashArray: isFlagged ? '5, 5' : null
                };

            const selectedStyle = {
              color: isShared ? '#b45309' : '#ea580c',
              weight: 5,
              opacity: 1,
              fillColor: isShared ? '#fde68a' : '#fef08a',
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

                {/* Marker for Joint Khata */}
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
                          <span>Joint Khata</span>
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

                {/* Primary Land Parcel Polygon */}
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
                    <div className="p-1 space-y-1.5 text-xs min-w-[210px]">
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
                          {parcel.areaSqM.toLocaleString()} m² ({parcel.areaAcres} Acres)
                        </p>
                      </div>

                      <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                        <span className="block font-medium">Land Detail Record #{parcel.khasraNo} • {parcel.sector}</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{parcel.locality}</span>
                        <span className={`text-[10px] font-bold block mt-1 ${isFlagged ? 'text-rose-600' : 'text-emerald-700'}`}>
                          Property Claims: {isFlagged ? '⚠️ Active Claim Registered' : '✓ Clear Title (No Liens)'}
                        </span>
                      </div>

                      <button
                        id={`btn-open-dossier-popup-${parcel.ulpin}`}
                        onClick={() => onOpenDossier(parcel)}
                        className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center space-x-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Open Property Dossier</span>
                      </button>
                    </div>
                  </Popup>
                </Polygon>
              </React.Fragment>
            );
          })}
        </MapContainer>

        {/* Land Boundary Map Legend (Bottom Right) */}
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

          <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 gap-3">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-amber-400/35 border-2 border-dashed border-amber-600 inline-block" />
              <span className="text-amber-900 font-bold">👥 Joint Khata</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-rose-100 border border-dashed border-rose-500 inline-block" />
              <span>Risk Flagged</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
