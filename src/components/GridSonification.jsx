import { useState, useRef, useCallback } from 'react';
import { useGrid } from '../context/GridContext';
import { Volume2, VolumeX } from 'lucide-react';

export default function GridSonification() {
  const { stressLevel } = useGrid();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainRef = useRef(null);

  const startAudio = useCallback(() => {
    if (audioCtxRef.current) return;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
    masterGain.connect(ctx.destination);
    gainRef.current = masterGain;

    // 60Hz fundamental — the literal sound of AC power
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(60, ctx.currentTime);
    const gain1 = ctx.createGain();
    gain1.gain.setValueAtTime(0.5, ctx.currentTime);
    osc1.connect(gain1).connect(masterGain);
    osc1.start();

    // 120Hz second harmonic
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(120, ctx.currentTime);
    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.2, ctx.currentTime);
    osc2.connect(gain2).connect(masterGain);
    osc2.start();

    // 180Hz third harmonic — adds "thickness"
    const osc3 = ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(180, ctx.currentTime);
    const gain3 = ctx.createGain();
    gain3.gain.setValueAtTime(0.08, ctx.currentTime);
    osc3.connect(gain3).connect(masterGain);
    osc3.start();

    // Stress-reactive: higher stress = higher pitch buzz
    const stressBuzz = ctx.createOscillator();
    stressBuzz.type = 'sawtooth';
    const buzzFreq = 60 + (stressLevel * 8); // 68Hz at level 1, 140Hz at level 10
    stressBuzz.frequency.setValueAtTime(buzzFreq, ctx.currentTime);
    const buzzGain = ctx.createGain();
    buzzGain.gain.setValueAtTime(Math.min(stressLevel * 0.008, 0.06), ctx.currentTime);
    stressBuzz.connect(buzzGain).connect(masterGain);
    stressBuzz.start();

    oscillatorsRef.current = [
      { osc: osc1, gain: gain1 },
      { osc: osc2, gain: gain2 },
      { osc: osc3, gain: gain3 },
      { osc: stressBuzz, gain: buzzGain }
    ];

    setIsPlaying(true);
  }, [stressLevel]);

  const stopAudio = useCallback(() => {
    if (!audioCtxRef.current) return;

    // Gentle fade out
    if (gainRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.5);
    }

    setTimeout(() => {
      oscillatorsRef.current.forEach(({ osc }) => {
        try { osc.stop(); } catch(e) {}
      });
      oscillatorsRef.current = [];
      audioCtxRef.current.close();
      audioCtxRef.current = null;
      gainRef.current = null;
      setIsPlaying(false);
    }, 600);
  }, []);

  const toggle = () => {
    if (isPlaying) stopAudio();
    else startAudio();
  };

  return (
    <button
      onClick={toggle}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: isPlaying ? 'rgba(0, 168, 255, 0.1)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${isPlaying ? 'rgba(0,168,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: '6px',
        padding: '0.5rem 1rem',
        color: isPlaying ? '#00a8ff' : 'rgba(240,240,250,0.5)',
        fontFamily: 'Barlow Condensed',
        fontSize: '0.7rem',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.3s',
      }}
    >
      {isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
      {isPlaying ? 'Grid Audio On' : 'Hear The Grid'}
    </button>
  );
}
