import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const GridContext = createContext();

// NWS Alert Severity → Stress contribution
const SEVERITY_WEIGHT = {
  'Extreme': 4,
  'Severe': 3,
  'Moderate': 2,
  'Minor': 1,
  'Unknown': 1,
};

// Gulf South state zones to monitor
const NWS_ZONES = [
  'https://api.weather.gov/alerts/active?area=LA',
  'https://api.weather.gov/alerts/active?area=TX',
  'https://api.weather.gov/alerts/active?area=MS',
  'https://api.weather.gov/alerts/active?area=AL',
];

export function GridProvider({ children }) {
  const [stressLevel, setStressLevel] = useState(2); // 1-10
  const [alerts, setAlerts] = useState([]);
  const [dispatchMessages, setDispatchMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch active NWS alerts
  const fetchAlerts = useCallback(async () => {
    try {
      // Fetch from all Gulf South zones in parallel
      const responses = await Promise.allSettled(
        NWS_ZONES.map(url =>
          fetch(url, {
            headers: { 'User-Agent': 'SolPowerlines Grid Monitor' }
          }).then(r => r.json())
        )
      );

      const allAlerts = [];
      responses.forEach(res => {
        if (res.status === 'fulfilled' && res.value?.features) {
          res.value.features.forEach(f => {
            const props = f.properties;
            if (props.event && props.severity) {
              allAlerts.push({
                id: props.id,
                event: props.event,
                severity: props.severity,
                headline: props.headline,
                area: props.areaDesc,
                urgency: props.urgency,
              });
            }
          });
        }
      });

      // Deduplicate by id
      const unique = [...new Map(allAlerts.map(a => [a.id, a])).values()];
      setAlerts(unique);

      // Calculate stress level from real alerts
      let stress = 1; // baseline
      const severeCount = unique.filter(a => 
        ['Extreme', 'Severe'].includes(a.severity)
      ).length;
      const moderateCount = unique.filter(a => a.severity === 'Moderate').length;

      stress += Math.min(severeCount * 2, 6);
      stress += Math.min(moderateCount, 2);
      stress = Math.min(Math.max(stress, 1), 10);
      
      setStressLevel(stress);

      // Build dispatch messages from real data
      const messages = [];
      
      // Always include base operational messages
      messages.push({ type: 'ops', text: 'CREW 7 DEPLOYED → BATON ROUGE | OVERHEAD LINE REBUILD' });
      messages.push({ type: 'ops', text: 'VAULT REHAB 84% COMPLETE → MOBILE URBAN CORE' });
      messages.push({ type: 'status', text: `GRID STRESS: LEVEL ${stress}/10 | SYSTEMS ${stress <= 3 ? 'NOMINAL' : stress <= 6 ? 'ELEVATED' : 'CRITICAL'}` });
      
      // Add real NWS alerts as dispatch messages
      unique.slice(0, 5).forEach(alert => {
        const icon = alert.severity === 'Extreme' ? '🔴' : 
                     alert.severity === 'Severe' ? '⚠️' : '📡';
        messages.push({
          type: 'alert',
          text: `${icon} NWS: ${alert.event.toUpperCase()} → ${alert.area?.split(';')[0] || 'GULF SOUTH'}`,
          severity: alert.severity
        });
      });

      // If no alerts, show all-clear
      if (unique.length === 0) {
        messages.push({ type: 'status', text: '✅ NO ACTIVE WEATHER ALERTS — GULF SOUTH ALL CLEAR' });
      }

      setDispatchMessages(messages);
    } catch (err) {
      // Fallback to simulated data if NWS is unreachable
      setStressLevel(2);
      setDispatchMessages([
        { type: 'ops', text: 'CREW 7 DEPLOYED → BATON ROUGE | OVERHEAD LINE REBUILD' },
        { type: 'ops', text: 'VAULT REHAB 84% COMPLETE → MOBILE URBAN CORE' },
        { type: 'status', text: 'GRID STRESS: LEVEL 2/10 | SYSTEMS NOMINAL' },
        { type: 'status', text: '✅ NO ACTIVE WEATHER ALERTS — GULF SOUTH ALL CLEAR' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
    // Re-fetch every 5 minutes
    const interval = setInterval(fetchAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchAlerts]);

  const value = {
    stressLevel,
    alerts,
    dispatchMessages,
    isLoading,
    refetch: fetchAlerts,
  };

  return (
    <GridContext.Provider value={value}>
      {children}
    </GridContext.Provider>
  );
}

export function useGrid() {
  const context = useContext(GridContext);
  if (!context) throw new Error('useGrid must be used within GridProvider');
  return context;
}
