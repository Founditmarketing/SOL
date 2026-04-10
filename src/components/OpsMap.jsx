import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Zap, RadioTower, CheckCircle2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// ═══ CUSTOM PULSING MARKERS ═══
function createIcon(color, size = 14) {
  return L.divIcon({
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `
      <div style="position:relative;width:${size}px;height:${size}px;">
        <div style="position:absolute;inset:-8px;background:${color};border-radius:50%;opacity:0.4;animation:ops-pulse 2s infinite;"></div>
        <div style="width:${size}px;height:${size}px;background:#fff;border-radius:50%;box-shadow:0 0 12px ${color}, 0 0 24px ${color};position:relative;z-index:2;"></div>
      </div>
    `,
  });
}

const icons = {
  STAGED: createIcon('#00a8ff', 16),
  SEVERE: createIcon('#e61e25', 18),
  ACTIVE: createIcon('#F5A623', 14)
};

// ═══ OPERATIONS DATA ═══
const nodes = [
  { id: 'houston', pos: [29.7604, -95.3698], label: 'HOUSTON', status: 'SEVERE', color: '#e61e25', icon: <ShieldAlert size={18} color="#e61e25" />, desc: 'Predictive Hurricane Staging. 15+ Advanced Teams Deployed.' },
  { id: 'hq', pos: [31.3113, -92.4451], label: 'ALEXANDRIA HQ', status: 'STAGED', color: '#00a8ff', icon: <RadioTower size={18} color="#00a8ff" />, desc: 'Central Logistics & Staging Area. Crews on standby 24/7.' },
  { id: 'mobile', pos: [30.6954, -88.0399], label: 'MOBILE', status: 'ACTIVE', color: '#F5A623', icon: <Zap size={18} color="#F5A623" />, desc: 'Emergency underground vault rehab in progress. Urban core.' },
];

const polyline = nodes.map(n => n.pos);

// ═══ MAP CONTROLLER COMPONENT ═══
// Handles smooth programmatic panning
function MapController({ activeNodeId }) {
  const map = useMap();
  
  useEffect(() => {
    if (activeNodeId === 'all') {
      map.flyTo([30.5, -91.5], 6, { duration: 1.5 });
    } else {
      const node = nodes.find(n => n.id === activeNodeId);
      if (node) {
        // Offset latitude slightly so Popup fits nicely
        map.flyTo([node.pos[0] + 0.5, node.pos[1]], 8, { duration: 1.5 });
      }
    }
  }, [activeNodeId, map]);

  return null;
}

export default function OpsMap() {
  const [activeNode, setActiveNode] = useState('all');

  return (
    <div className="ops-dashboard" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      width: '100%', 
      borderRadius: '16px', 
      overflow: 'hidden', 
      border: '1px solid var(--ghost-border)',
      background: '#0a0c10',
      boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
      position: 'relative'
    }}>
      
      {/* ═══ MAP CONTAINER ═══ */}
      <div style={{ height: '500px', width: '100%', position: 'relative' }}>
        <MapContainer
          center={[30.5, -91.5]}
          zoom={6}
          scrollWheelZoom={false}
          dragging={true}
          zoomControl={false}
          attributionControl={false}
          style={{ width: '100%', height: '100%', background: '#0a0c10', zIndex: 1 }}
        >
          {/* Base Dark Map Layer */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            zIndex={1}
          />
          
          {/* LIVE WEATHER RADAR LAYER (Iowa Environmental Mesonet Nexrad Base Reflectivity) */}
          <TileLayer
            url="https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/{z}/{x}/{y}.png"
            opacity={0.6}
            zIndex={2}
          />

          <MapController activeNodeId={activeNode} />
          
          <Polyline 
            positions={polyline} 
            pathOptions={{ color: '#00a8ff', weight: 2, opacity: 0.25, dashArray: '6 8' }} 
          />

          {nodes.map(node => (
            <Marker key={node.id} position={node.pos} icon={icons[node.status]} 
              eventHandlers={{ click: () => setActiveNode(node.id) }}>
              <Popup closeButton={false}>
                <div style={{ fontFamily: 'Inter', color: '#fff', minWidth: '180px' }}>
                  <div style={{ fontFamily: 'Barlow Condensed', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.1em', color: node.color, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {node.icon} {node.label}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(240,240,250,0.7)', lineHeight: 1.4 }}>
                    {node.desc}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* ═══ TOP HUD (Desktop Only) ═══ */}
        <div className="desktop-only" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10, background: 'rgba(10, 12, 16, 0.85)', padding: '0.8rem 1.2rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00e676', boxShadow: '0 0 10px #00e676', animation: 'ops-pulse 2s infinite' }} />
            <div style={{ fontFamily: 'Bebas Neue', color: '#fff', fontSize: '1.2rem', letterSpacing: '0.05em', lineHeight: 1 }}>SYSTEMS NOMINAL</div>
          </div>
          <div style={{ color: '#00a8ff', fontSize: '0.75rem', fontFamily: 'Barlow Condensed', letterSpacing: '0.1em', fontWeight: 600, marginTop: '0.2rem', textAlign: 'right' }}>GULF SOUTH GRID • LIVE</div>
        </div>
      </div>

      {/* ═══ INTERACTIVE CONTROL PANEL (Integrated below map on mobile, alongside on desktop if layout allows, here it's below but highly styled) ═══ */}
      <div style={{ 
        background: 'linear-gradient(to bottom, #11141c, #0a0c10)', 
        borderTop: '1px solid var(--ghost-border)',
        padding: '1.5rem',
        zIndex: 2
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontFamily: 'Barlow Condensed', fontSize: '1rem', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(240,240,250,0.6)', textTransform: 'uppercase' }}>
            Active Operations Panel
          </h3>
          <button 
            onClick={() => setActiveNode('all')}
            style={{ background: 'transparent', border: '1px solid var(--ghost-border)', color: '#fff', padding: '0.4rem 1rem', fontSize: '0.75rem', fontFamily: 'Barlow Condensed', letterSpacing: '0.1em', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s' }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--amber)'; e.currentTarget.style.color = 'var(--amber)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--ghost-border)'; e.currentTarget.style.color = '#fff'; }}
          >
            RESET VIEW
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {nodes.map((node) => {
            const isActive = activeNode === node.id;
            return (
              <motion.div 
                key={node.id}
                whileHover={{ y: -2 }}
                onClick={() => setActiveNode(node.id)}
                style={{
                  background: isActive ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.3)',
                  border: `1px solid ${isActive ? node.color : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '8px',
                  padding: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? `0 0 20px ${node.color}20` : 'none'
                }}
              >
                <div style={{ background: `${node.color}15`, padding: '0.6rem', borderRadius: '8px' }}>
                  {node.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'Barlow Condensed', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.1em', color: '#f0f0fa', marginBottom: '2px' }}>
                    {node.label}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontFamily: 'Barlow Condensed', letterSpacing: '0.1em', color: node.color }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: node.color, animation: isActive ? 'ops-pulse 1.5s infinite' : 'none' }} />
                    {node.status}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes ops-pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(2.2); opacity: 0; }
        }
        .leaflet-popup-content-wrapper {
          background: rgba(10,12,16,0.95) !important;
          color: #fff !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
          border-radius: 8px !important;
          box-shadow: 0 10px 40px rgba(0,0,0,0.6) !important;
          backdrop-filter: blur(10px);
        }
        .leaflet-popup-tip {
          background: rgba(10,12,16,0.95) !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
          border-top: none !important; border-left: none !important;
        }
        @media(max-width: 900px) {
          .desktop-only { display: none !important; }
        }
      `}</style>
    </div>
  );
}

