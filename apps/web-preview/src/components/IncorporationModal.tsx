import React, { useState } from 'react';
import { GameSimulation } from '@tycoon/core-simulation';
import { Building, Sparkles, Check, X } from 'lucide-react';

interface IncorporationModalProps {
  isOpen: boolean;
  onClose: () => void;
  sim: GameSimulation;
  onIncorporated: () => void;
}

export const IncorporationModal: React.FC<IncorporationModalProps> = ({
  isOpen,
  onClose,
  sim,
  onIncorporated
}) => {
  const [name, setName] = useState('Apex Dynamics Group');
  const [ticker, setTicker] = useState('APEX');

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !ticker.trim()) return;
    const success = sim.incorporateBusiness(name.trim(), ticker.trim());
    if (success) {
      onIncorporated();
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'rgba(10, 14, 22, 0.96)',
          border: '1px solid rgba(245, 158, 11, 0.5)',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                padding: '10px',
                borderRadius: '12px',
                background: 'rgba(245, 158, 11, 0.2)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                color: '#f59e0b'
              }}
            >
              <Building style={{ width: '24px', height: '24px' }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontFamily: "'Chakra Petch', sans-serif", fontWeight: 'bold', fontSize: '18px', color: '#fff' }}>
                Incorporate Your Business LLC
              </h3>
              <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>
                Fee: $2,500 Legal Filing • State Registration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <X style={{ width: '18px', height: '18px' }} />
          </button>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontFamily: 'monospace', color: '#94a3b8', marginBottom: '6px' }}>
              Corporation Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Apex Dynamics Group"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                background: '#070a10',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                fontFamily: "'Chakra Petch', sans-serif",
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontFamily: 'monospace', color: '#94a3b8', marginBottom: '6px' }}>
              Stock Ticker Symbol (3-5 Letters)
            </label>
            <input
              type="text"
              maxLength={5}
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="e.g. APEX"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                background: '#070a10',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#00f0ff',
                fontFamily: 'monospace',
                fontSize: '14px',
                fontWeight: 'bold',
                outline: 'none'
              }}
            />
          </div>

          <div
            style={{
              padding: '12px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontSize: '11px',
              color: '#94a3b8',
              lineHeight: '1.5'
            }}
          >
            ? Unlocks C-Suite executive hiring.<br />
            ? Unlocks automated ASIC hardware & AI compute pipelines.<br />
            ? Prepares your enterprise for Wall Street IPO listing.
          </div>

          <button
            type="submit"
            style={{
              padding: '12px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              border: '1px solid #fef08a',
              color: '#000',
              fontWeight: 'bold',
              fontFamily: "'Chakra Petch', sans-serif",
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)'
            }}
          >
            <Sparkles style={{ width: '16px', height: '16px' }} />
            <span>Pay $2,500 & Incorporate LLC</span>
          </button>
        </form>
      </div>
    </div>
  );
};
