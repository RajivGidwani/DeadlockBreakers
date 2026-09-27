import React, { useState } from 'react';
import { X, Navigation, CheckCircle } from 'lucide-react';

export default function SurveyorDispatchModal({ alert, isOpen, onClose, onConfirmDispatch }) {
  const [surveyorName, setSurveyorName] = useState('S. K. Nair (Lead Demarcation Surveyor)');
  const [equipmentType, setEquipmentType] = useState('Dual-Frequency DGPS RTK Rover & Aerial Lidar Drone');
  const [scheduledDate, setScheduledDate] = useState('2026-09-09');
  const [urgency, setUrgency] = useState('HIGH_PRIORITY');
  const [ticketCreated, setTicketCreated] = useState(false);

  if (!isOpen || !alert) return null;

  const ticketId = `GEO-SURVEY-TKT-${alert.id.replace('ALERT-AI-', '')}`;

  const handleDispatch = () => {
    setTicketCreated(true);
    if (onConfirmDispatch) {
      onConfirmDispatch({
        ticketId,
        alertId: alert.id,
        ulpin: alert.ulpin,
        surveyorName,
        equipmentType,
        scheduledDate,
        urgency,
        timestamp: new Date().toLocaleString('en-IN')
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg border border-indigo-500/30">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Field Surveyor Dispatch Command</h2>
              <p className="text-xs text-slate-400">High-Precision DGPS Cadastral Ground Ground-Truthing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-sm">
          {!ticketCreated ? (
            <>
              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60 text-xs space-y-1">
                <div className="text-slate-400">Target Georeferenced Parcel:</div>
                <div className="font-mono text-emerald-400 font-bold text-sm">{alert.ulpin}</div>
                <div className="text-slate-300">{alert.surveyNo} — {alert.village}, {alert.district} ({alert.state})</div>
                <div className="text-slate-400 font-mono pt-1 text-[11px]">
                  GPS Target Waypoints: Lat {alert.coordinates.lat}° N, Lng {alert.coordinates.lng}° E
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Assigned Field Surveyor / Demarcator</label>
                  <select
                    value={surveyorName}
                    onChange={(e) => setSurveyorName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="S. K. Nair (Lead Demarcation Surveyor)">S. K. Nair (Lead Demarcation Surveyor) - DGPS Certified</option>
                    <option value="Pooja Kulkarni (Town Planning Inspector)">Pooja Kulkarni (Town Planning Inspector) - Municipal Wing</option>
                    <option value="J. P. Singh (Forest Range Surveyor)">J. P. Singh (Forest Range Surveyor) - Eco-Buffer Wing</option>
                    <option value="R. V. Ramanathan (Revenue Cadastral Demarcator)">R. V. Ramanathan (Revenue Cadastral Demarcator)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Standard Geodetic Equipment Kit</label>
                  <select
                    value={equipmentType}
                    onChange={(e) => setEquipmentType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Dual-Frequency DGPS RTK Rover & Aerial Lidar Drone">Dual-Frequency DGPS RTK Rover & Aerial Lidar Drone (&lt;1cm accuracy)</option>
                    <option value="Total Station Electronic Distance Meter (EDM)">Total Station Electronic Distance Meter (EDM)</option>
                    <option value="Handheld GNSS Receiver & Geo-Tagged Tablet">Handheld GNSS Receiver & Geo-Tagged Tablet</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Scheduled Inspection Date</label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Tasking Priority Level</label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                    >
                      <option value="EMERGENCY_24H">Emergency 24-Hour Grounding</option>
                      <option value="HIGH_PRIORITY">High Priority (Within 48h)</option>
                      <option value="ROUTINE">Routine Weekly Verification</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-slate-950 p-5 rounded-lg border border-emerald-500/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Geo-Survey Mission Dispatched</h3>
              <div className="text-xs text-slate-400">
                Ticket <span className="font-mono text-emerald-400 font-bold">{ticketId}</span> has been provisioned and transmitted to the Surveyor's mobile terminal.
              </div>
              <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs text-left space-y-1">
                <div><span className="text-slate-400">Officer:</span> <strong className="text-slate-200">{surveyorName}</strong></div>
                <div><span className="text-slate-400">Equipment:</span> <strong className="text-slate-200">{equipmentType}</strong></div>
                <div><span className="text-slate-400">Target Date:</span> <strong className="text-indigo-300">{scheduledDate}</strong></div>
                <div><span className="text-slate-400">DGPS Task Payload:</span> <span className="font-mono text-[11px] text-emerald-300">GeoJSON Cadastral Boundary Linked</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950/90">
          {!ticketCreated ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDispatch}
                className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition shadow-lg shadow-indigo-600/30 flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Confirm & Transmit Ticket
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
            >
              Close Window
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
