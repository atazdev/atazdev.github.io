import React from 'react'
import { Activity, Shield, Terminal, Layers } from 'lucide-react'

function App() {
  return (
    <div style={{ width: '100vw', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* HEADER */}
      <header className="glass-panel" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--accent-green)', padding: '0.5rem', borderRadius: '4px' }}>
            <Terminal size={24} color="#0D1117" />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.2rem' }} className="cursor-blink">ATAZ_COMMAND_CENTER</h1>
            <div style={{ fontSize: '0.6rem', color: 'var(--accent-green)', opacity: 0.6 }}>SYSTEM_STATUS: NOMINAL // LINK_ESTABLISHED</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
          <div>Uptime: <span style={{ color: 'var(--accent-green)' }}>128:42:09</span></div>
          <div>Location: <span style={{ color: 'var(--accent-blue)' }}>NY_HUB_V4</span></div>
        </div>
      </header>

      {/* DASHBOARD GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '2rem', flex: 1 }}>
        
        {/* LEFT COLUMN: IDENTITY & STATUS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-green)' }}>
            <h2 style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--accent-green)' }}>// OPERATOR_PROFILE</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>ID:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>ATAC-01</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>ROLE:</span>
                <span>SEC_OPS_LEAD</span>
              </div>
            </div>
          </section>

          <section className="glass-panel" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>// SYSTEM_METRICS</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.7rem' }}>
                  <span>NEURAL_LOAD</span>
                  <span style={{ color: 'var(--accent-green)' }}>42%</span>
                </div>
                <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px' }}>
                  <div style={{ width: '42%', height: '100%', background: 'var(--accent-green)' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.7rem' }}>
                  <span>CRYPT_THROUGHPUT</span>
                  <span style={{ color: 'var(--accent-blue)' }}>89%</span>
                </div>
                <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px' }}>
                  <div style={{ width: '89%', height: '100%', background: 'var(--accent-blue)' }}></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* MIDDLE COLUMN: TACTICAL MAP & OVERVIEW */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className="glass-panel" style={{ flex: 1, padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <h2 style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>// TACTICAL_GRID_VIEW</h2>
            <div style={{ 
              height: 'calc(100% - 3rem)', 
              background: 'linear-gradient(rgba(0,255,136,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.05) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Activity size={120} color="var(--accent-green)" style={{ opacity: 0.1 }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--accent-green)', letterSpacing: '0.5em' }}>SCANNING_INFRASTRUCTURE...</div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: MISSION LOGS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className="glass-panel" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--accent-blue)' }}>// MISSION_LOGS</h2>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              <div style={{ borderLeft: '2px solid var(--accent-green)', paddingLeft: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>[17:14:02]</span> AUTH_SUCCESS: OPERATOR_VERIFIED
              </div>
              <div style={{ borderLeft: '2px solid var(--accent-blue)', paddingLeft: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>[17:10:45]</span> SYNC_COMPLETE: CLOUD_RESOURCES_FETCHED
              </div>
              <div style={{ borderLeft: '2px solid var(--accent-red)', paddingLeft: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>[16:55:12]</span> ALERT: ANOMALOUS_ACCESS_DETECTED_IP_82.1.X.X
              </div>
              <div style={{ borderLeft: '2px solid var(--border)', paddingLeft: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>[16:30:00]</span> BACKUP_SEQ: INITIALIZED
              </div>
            </div>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <button className="glass-panel" style={{ padding: '1rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              <Shield size={16} color="var(--accent-green)" />
              <span style={{ fontSize: '0.7rem' }}>SECURE</span>
            </button>
            <button className="glass-panel" style={{ padding: '1rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              <Layers size={16} color="var(--accent-blue)" />
              <span style={{ fontSize: '0.7rem' }}>DEPLOY</span>
            </button>
          </div>
        </div>

      </div>

      {/* FOOTER STATS */}
      <footer style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        <div>CORE_V.2.4.0_STITCH_ALIGNED</div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span>CPU_TEMP: 42°C</span>
          <span>NET_LATENCY: 12ms</span>
          <span style={{ color: 'var(--accent-green)' }}>ENCRYPTION: AES-256_ACTIVE</span>
        </div>
      </footer>
    </div>
  )
}

export default App
