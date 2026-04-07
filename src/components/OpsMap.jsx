import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom pulsing marker icons
function createIcon(color, size = 14) {
  return L.divIcon({
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `
      <div style="position:relative;width:${size}px;height:${size}px;">
        <div style="position:absolute;inset:-8px;background:${color};border-radius:50%;opacity:0.3;animation:ops-pulse 2s infinite;"></div>
        <div style="width:${size}px;height:${size}px;background:#fff;border-radius:50%;box-shadow:0 0 12px ${color}, 0 0 24px ${color};position:relative;z-index:2;"></div>
      </div>
    `,
  });
}

const hqIcon = createIcon('#00a8ff', 18);
const warningIcon = createIcon('#e61e25', 14);
const activeIcon = createIcon('#00a8ff', 10);

// Operation nodes
const nodes = [
  { pos: [31.3113, -92.4451], label: 'ALEXANDRIA HQ', status: 'STAGED', color: '#00a8ff' },
  { pos: [29.7604, -95.3698], label: 'HOUSTON', status: 'SEVERE', color: '#e61e25' },
  { pos: [30.6954, -88.0399], label: 'MOBILE', status: 'ACTIVE', color: '#00a8ff' },
];

// Dashed infrastructure line connecting all nodes
const polyline = nodes.map(n => n.pos);

export default function OpsMap() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
      <MapContainer
        center={[30.5, -91.5]}
        zoom={6}
        scrollWheelZoom={false}
        dragging={true}
        zoomControl={false}
        attributionControl={false}
        style={{ width: '100%', height: '100%', background: '#0a0c10' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Infrastructure connecting line */}
        <Polyline 
          positions={polyline} 
          pathOptions={{ color: '#00a8ff', weight: 2, opacity: 0.35, dashArray: '8 6' }} 
        />

        {/* HQ Node */}
        <Marker position={nodes[0].pos} icon={hqIcon}>
          <Popup>
            <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, letterSpacing: '0.1em' }}>
              ALEXANDRIA HQ<br />
              <span style={{ fontWeight: 400, fontSize: '0.85em' }}>Central Logistics & Staging</span>
            </div>
          </Popup>
        </Marker>

        {/* Houston Warning Node */}
        <Marker position={nodes[1].pos} icon={warningIcon}>
          <Popup>
            <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, letterSpacing: '0.1em' }}>
              HOUSTON: SEVERE<br />
              <span style={{ fontWeight: 400, fontSize: '0.85em' }}>Predictive Hurricane Staging</span>
            </div>
          </Popup>
        </Marker>

        {/* Mobile Active Node */}
        <Marker position={nodes[2].pos} icon={activeIcon}>
          <Popup>
            <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, letterSpacing: '0.1em' }}>
              MOBILE: ACTIVE<br />
              <span style={{ fontWeight: 400, fontSize: '0.85em' }}>Underground Vault Rehab</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Overlay HUD */}
      <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', zIndex: 1000, background: 'rgba(6, 11, 20, 0.9)', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', pointerEvents: 'none' }}>
        <div style={{ fontFamily: 'Bebas Neue', color: '#fff', fontSize: '1.1rem', letterSpacing: '0.05em', lineHeight: 1 }}>SYSTEMS NOMINAL</div>
        <div style={{ color: '#00a8ff', fontSize: '0.75rem', fontFamily: 'Barlow Condensed', letterSpacing: '0.1em', fontWeight: 600, marginTop: '0.2rem' }}>GULF SOUTH GRID • LIVE</div>
      </div>

      {/* Pulse keyframe injection */}
      <style>{`
        @keyframes ops-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(2.5); opacity: 0; }
        }
        .leaflet-popup-content-wrapper {
          background: rgba(10,12,16,0.95) !important;
          color: #fff !important;
          border: 1px solid rgba(0,168,255,0.3) !important;
          border-radius: 8px !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
        }
        .leaflet-popup-tip {
          background: rgba(10,12,16,0.95) !important;
        }
      `}</style>
    </div>
  );
}
