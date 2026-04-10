import { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Zap, RadioTower, CheckCircle2, AlertTriangle, CloudRain, RefreshCw } from 'lucide-react';
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

// ═══ STAGING BASES ═══
const bases = [
  { id: 'houston', pos: [29.76, -95.37], label: 'HOUSTON', status: 'STAGED', color: '#00a8ff', icon: <RadioTower size={18} color="#00a8ff" />, desc: 'Forward staging base — 24 crew trucks pre-positioned' },
  { id: 'alexandria', pos: [31.31, -92.45], label: 'ALEXANDRIA HQ', status: 'ACTIVE', color: '#F5A623', icon: <Zap size={18} color="#F5A623" />, desc: 'Headquarters — command center operational' },
  { id: 'mobile', pos: [30.69, -88.04], label: 'MOBILE', status: 'STAGED', color: '#00a8ff', icon: <CheckCircle2 size={18} color="#00a8ff" />, desc: 'Eastern staging — ready for Gulf Coast deployment' },
];

const polyline = bases.map(b => b.pos);

// ═══ NWS ALERT SEVERITY COLORS ═══
const alertColors = {
  Extreme: '#ff1744',
  Severe: '#ff9100',
  Moderate: '#ffd600',
  Minor: '#00e676',
};

// ═══ RELATIVE TIME ═══
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ═══ MAP CONTROLLER ═══
function MapController({ activeNodeId }) {
  const map = useMap();
  useEffect(() => {
    if (activeNodeId === 'all') {
      map.flyTo([30.5, -91.5], 6, { duration: 1 });
    } else {
      const node = bases.find(n => n.id === activeNodeId);
      if (node) map.flyTo(node.pos, 8, { duration: 1 });
    }
  }, [activeNodeId, map]);
  return null;
}

// ═══ RADAR REFRESH COMPONENT ═══
function RadarLayer({ refreshKey }) {
  return (
    <TileLayer
      key={`radar-${refreshKey}`}
      url={`https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/{z}/{x}/{y}.png?_=${refreshKey}`}
      opacity={0.55}
      zIndex={2}
    />
  );
}

export default function OpsMap() {
  const [activeNode, setActiveNode] = useState('all');
  const [alerts, setAlerts] = useState([]);
  const [alertCount, setAlertCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [radarKey, setRadarKey] = useState(Date.now());

  // Fetch NWS alerts
  const fetchAlerts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('https://api.weather.gov/alerts/active?area=LA,TX,MS,AL&severity=Severe,Extreme,Moderate', {
        headers: { 'User-Agent': 'SolPowerlines/1.0 (info@solpowerlines.com)' }
      });
      const data = await res.json();
      const features = data.features || [];
      
      // Parse alerts with geometry
      const parsed = features
        .filter(f => f.geometry && f.geometry.coordinates)
        .slice(0, 15) // Cap at 15 for performance
        .map(f => ({
          id: f.id,
          event: f.properties.event,
          severity: f.properties.severity,
          headline: f.properties.headline,
          area: f.properties.areaDesc,
          color: alertColors[f.properties.severity] || '#ffd600',
          coords: f.geometry.type === 'Polygon' 
            ? f.geometry.coordinates[0].map(([lng, lat]) => [lat, lng])
            : [],
          sent: f.properties.sent,
          expires: f.properties.expires,
          senderName: f.properties.senderName,
        }));
      
      setAlerts(parsed);
      setAlertCount(features.length);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      console.warn('NWS API unavailable:', err);
    }
    setIsLoading(false);
  }, []);

  // Initial fetch + 5-minute refresh
  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(() => {
      fetchAlerts();
      setRadarKey(Date.now()); // refresh radar tiles too
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchAlerts]);

  return (
    <div style={{
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
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            zIndex={1}
          />
          
          {/* LIVE RADAR — auto-refreshes every 5 min */}
          <RadarLayer refreshKey={radarKey} />

          <MapController activeNodeId={activeNode} />
          
          <Polyline 
            positions={polyline} 
            pathOptions={{ color: '#00a8ff', weight: 2, opacity: 0.25, dashArray: '6 8' }} 
          />

          {/* LIVE NWS ALERT POLYGONS */}
          {alerts.map((alert, idx) => (
            alert.coords.length > 0 && (
              <Polygon
                key={idx}
                positions={alert.coords}
                pathOptions={{
                  color: alert.color,
                  weight: 1.5,
                  opacity: 0.7,
                  fillColor: alert.color,
                  fillOpacity: 0.15,
                }}
              >
                <Popup closeButton={false}>
                  <div style={{ fontFamily: 'Inter', color: '#fff', minWidth: '200px', maxWidth: '300px' }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', color: alert.color, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertTriangle size={12} /> {alert.event}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(240,240,250,0.8)', lineHeight: 1.5, marginBottom: '4px' }}>
                      {alert.area}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(240,240,250,0.4)', fontFamily: "'JetBrains Mono', monospace" }}>
                      {alert.senderName} · {alert.sent ? timeAgo(alert.sent) : ''}
                    </div>
                  </div>
                </Popup>
              </Polygon>
            )
          ))}

          {/* STAGING BASE MARKERS */}
          {bases.map(node => (
            <Marker key={node.id} position={node.pos} icon={icons[node.status]} 
              eventHandlers={{ click: () => setActiveNode(node.id) }}>
              <Popup closeButton={false}>
                <div style={{ fontFamily: 'Inter', color: '#fff', minWidth: '180px' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', color: node.color, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
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

        {/* ═══ LIVE HUD OVERLAY ═══ */}
        <div className="desktop-only" style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(10, 12, 16, 0.85)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(0,168,255,0.15)', backdropFilter: 'blur(8px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00e676', boxShadow: '0 0 10px #00e676', animation: 'ops-pulse 2s infinite' }} />
            <div style={{ fontFamily: "'JetBrains Mono', monospace", color: '#00e676', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em' }}>LIVE</div>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", color: 'rgba(240,240,250,0.4)', fontSize: '0.5rem', letterSpacing: '0.08em' }}>
            {alertCount > 0 
              ? `${alertCount} NWS ALERT${alertCount > 1 ? 'S' : ''} · GULF SOUTH`
              : 'NO ACTIVE ALERTS · ALL CLEAR'
            }
          </div>
          {lastUpdated && (
            <div style={{ fontFamily: "'JetBrains Mono', monospace", color: 'rgba(240,240,250,0.2)', fontSize: '0.45rem', letterSpacing: '0.08em', marginTop: '2px' }}>
              UPDATED {timeAgo(lastUpdated).toUpperCase()}
            </div>
          )}
        </div>

        {/* Alert count badge (mobile) */}
        {alertCount > 0 && (
          <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', zIndex: 10, background: 'rgba(255,145,0,0.15)', border: '1px solid rgba(255,145,0,0.3)', borderRadius: '6px', padding: '0.4rem 0.6rem', backdropFilter: 'blur(8px)' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.08em', color: '#ff9100', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertTriangle size={10} /> {alertCount} LIVE ALERT{alertCount > 1 ? 'S' : ''}
            </div>
          </div>
        )}
      </div>

      {/* ═══ OPERATIONS PANEL ═══ */}
      <div style={{ 
        background: 'linear-gradient(to bottom, #11141c, #0a0c10)', 
        borderTop: '1px solid var(--ghost-border)',
        padding: '1.25rem 1.5rem',
        zIndex: 2
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(240,240,250,0.4)', textTransform: 'uppercase', margin: 0 }}>
              STAGING BASES & LIVE WEATHER
            </h3>
            {lastUpdated && (
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.45rem', color: 'rgba(240,240,250,0.2)', letterSpacing: '0.08em', marginTop: '2px' }}>
                Radar & alerts refresh every 5 min · Updated {timeAgo(lastUpdated)}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => { fetchAlerts(); setRadarKey(Date.now()); }}
              disabled={isLoading}
              style={{ background: 'transparent', border: '1px solid rgba(0,168,255,0.2)', color: '#00a8ff', padding: '0.35rem 0.7rem', fontSize: '0.55rem', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, letterSpacing: '0.08em', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '4px', opacity: isLoading ? 0.5 : 1 }}
            >
              <RefreshCw size={10} className={isLoading ? 'spin' : ''} /> REFRESH
            </button>
            <button 
              onClick={() => setActiveNode('all')}
              style={{ background: 'transparent', border: '1px solid var(--ghost-border)', color: 'rgba(240,240,250,0.5)', padding: '0.35rem 0.7rem', fontSize: '0.55rem', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, letterSpacing: '0.08em', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s' }}
            >
              RESET
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {bases.map((node) => {
            const isActive = activeNode === node.id;
            return (
              <motion.div 
                key={node.id}
                whileHover={{ y: -2 }}
                onClick={() => setActiveNode(node.id)}
                style={{
                  background: isActive ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.3)',
                  border: `1px solid ${isActive ? node.color + '40' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '10px',
                  padding: '1rem',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ background: `${node.color}10`, padding: '0.5rem', borderRadius: '8px', lineHeight: 0 }}>
                  {node.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', color: '#f0f0fa', marginBottom: '2px' }}>
                    {node.label}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.55rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em', color: node.color }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: node.color, animation: 'ops-pulse 1.5s infinite' }} />
                    {node.status}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live alerts summary */}
        {alerts.length > 0 && (
          <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '0.75rem' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.12em', color: '#ff9100', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CloudRain size={10} /> ACTIVE NWS ALERTS IN SERVICE TERRITORY
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {alerts.slice(0, 5).map((alert, idx) => (
                <div key={idx} style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem',
                  color: 'rgba(240,240,250,0.4)', display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: alert.color, flexShrink: 0 }} />
                  <span style={{ color: alert.color, fontWeight: 600 }}>{alert.event}</span>
                  <span>— {alert.area?.split(';')[0]}</span>
                  {alert.sent && <span style={{ color: 'rgba(240,240,250,0.2)', marginLeft: 'auto' }}>{timeAgo(alert.sent)}</span>}
                </div>
              ))}
              {alertCount > 5 && (
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.45rem', color: 'rgba(240,240,250,0.2)', letterSpacing: '0.08em' }}>
                  + {alertCount - 5} more alerts
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes ops-pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(2.2); opacity: 0; }
        }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
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
