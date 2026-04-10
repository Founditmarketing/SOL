import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, Users, Sunrise, Sun, Sunset, Moon, Truck, HardHat, Coffee, CloudLightning, Wrench } from 'lucide-react';

const TIMELINE_EVENTS = [
  {
    time: '4:45 AM',
    title: 'Alarm Goes Off',
    desc: 'While most of the world sleeps, linemen are already awake. Gear check. Steel-toes laced. Thermos filled.',
    icon: <Sunrise size={20} />,
    period: 'dawn',
  },
  {
    time: '5:30 AM',
    title: 'Crew Briefing & Tailboard',
    desc: 'Job Hazard Analysis reviewed. Every crew member signs off. Every risk identified. No shortcuts — ever.',
    icon: <Users size={20} />,
    period: 'dawn',
  },
  {
    time: '6:15 AM',
    title: 'Roll Out',
    desc: '8-ton bucket trucks convoy to the job site. Sometimes that\'s 20 minutes away. Sometimes it\'s 200 miles.',
    icon: <Truck size={20} />,
    period: 'morning',
  },
  {
    time: '7:00 AM',
    title: 'First Climb',
    desc: '40 feet up. Wind at 15mph. 7,200 volts inches from your hands. The work begins.',
    icon: <Zap size={20} />,
    period: 'morning',
  },
  {
    time: '10:30 AM',
    title: 'Hot Work — Energized Lines',
    desc: 'Rubber gloving at 34,500 volts. One wrong move isn\'t a mistake — it\'s a catastrophe. Focus is everything.',
    icon: <HardHat size={20} />,
    period: 'morning',
  },
  {
    time: '12:00 PM',
    title: 'Lunch in the Bucket',
    desc: 'Sandwich on the tailgate. 30 minutes. Then back up the pole. No office. No desk. The sky is the ceiling.',
    icon: <Coffee size={20} />,
    period: 'afternoon',
  },
  {
    time: '2:30 PM',
    title: 'Storm Watch Activated',
    desc: 'Dispatch radio crackles: "Category 2 making landfall in 6 hours." All crews switch to staging protocol.',
    icon: <CloudLightning size={20} />,
    period: 'afternoon',
  },
  {
    time: '5:00 PM',
    title: 'Normal Crews Clock Out. We Don\'t.',
    desc: 'While 9-to-5 workers head home, storm crews are loading extra transformers and cross-arms. It\'s about to get real.',
    icon: <Sunset size={20} />,
    period: 'evening',
  },
  {
    time: '9:00 PM',
    title: 'Landfall. Lights Out.',
    desc: '130mph gusts. Rain sideways. Poles snapping like toothpicks. Somewhere in the dark, families wait.',
    icon: <CloudLightning size={20} />,
    period: 'night',
  },
  {
    time: '11:30 PM',
    title: 'Still Working.',
    desc: 'Headlamps on. Bucket trucks positioned against the wind. One pole at a time. One span at a time. Lights come back on.',
    icon: <Wrench size={20} />,
    period: 'night',
  },
  {
    time: '2:00 AM',
    title: 'Grid Restored. Crew Secured.',
    desc: 'The neighborhood lights up. A family waves from a window. Nobody knows your name. You don\'t need them to.',
    icon: <Zap size={20} />,
    period: 'night',
  },
];

const PERIOD_COLORS = {
  dawn: { bg: 'rgba(245, 166, 35, 0.06)', border: 'rgba(245, 166, 35, 0.3)', accent: '#F5A623' },
  morning: { bg: 'rgba(0, 168, 255, 0.06)', border: 'rgba(0, 168, 255, 0.3)', accent: '#00a8ff' },
  afternoon: { bg: 'rgba(0, 168, 255, 0.06)', border: 'rgba(0, 168, 255, 0.25)', accent: '#00a8ff' },
  evening: { bg: 'rgba(245, 166, 35, 0.06)', border: 'rgba(245, 166, 35, 0.25)', accent: '#F5A623' },
  night: { bg: 'rgba(230, 30, 37, 0.04)', border: 'rgba(230, 30, 37, 0.25)', accent: '#e61e25' },
};

export default function LinemanTimeline() {
  return (
    <div style={{ position: 'relative' }}>
      {/* Vertical line */}
      <div style={{
        position: 'absolute',
        left: '28px',
        top: 0,
        bottom: 0,
        width: '2px',
        background: 'linear-gradient(to bottom, rgba(245,166,35,0.4), rgba(0,168,255,0.4), rgba(245,166,35,0.3), rgba(230,30,37,0.4))',
      }} />

      {TIMELINE_EVENTS.map((event, idx) => {
        const colors = PERIOD_COLORS[event.period];
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.05, duration: 0.5 }}
            style={{
              display: 'flex',
              gap: '1.5rem',
              marginBottom: '0.5rem',
              position: 'relative',
            }}
          >
            {/* Time node */}
            <div style={{
              width: '56px',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: '1.25rem',
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: colors.accent,
                boxShadow: `0 0 12px ${colors.accent}50`,
                zIndex: 2,
                position: 'relative',
              }} />
            </div>

            {/* Content card */}
            <div style={{
              flex: 1,
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: '10px',
              padding: '1.25rem 1.5rem',
              transition: 'all 0.3s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{ color: colors.accent, opacity: 0.8 }}>{event.icon}</div>
                <div style={{
                  fontFamily: 'Barlow Condensed',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: colors.accent,
                  textTransform: 'uppercase',
                }}>
                  {event.time}
                </div>
              </div>
              <h4 style={{
                fontFamily: 'Inter',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#f0f0fa',
                marginBottom: '0.4rem',
              }}>
                {event.title}
              </h4>
              <p style={{
                fontFamily: 'Inter',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'rgba(240,240,250,0.55)',
                margin: 0,
              }}>
                {event.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
