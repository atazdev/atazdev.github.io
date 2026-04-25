import React, { useState, useEffect } from 'react'
import { Activity, Shield, Terminal, Layers } from 'lucide-react'

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/assets/data/dashboard.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch dashboard data:", err);
        setLoading(false);
      });
  }, []);

  const totalPosts = data?.site_stats?.total_posts || 0;
  const totalTags = data?.site_stats?.total_tags || 0;

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
            <div style={{ fontSize: '0.6rem', color: 'var(--accent-green)', opacity: 0.6 }}>
              SYSTEM_STATUS: {loading ? 'FETCHING...' : 'NOMINAL'} // LINK_ESTABLISHED
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
          <div>Last Build: <span style={{ color: 'var(--accent-green)' }}>{data?.site_stats?.last_build || '00:00:00'}</span></div>
          <div>Location: <span style={{ color: 'var(--accent-blue)' }}>ATAKUZI_COM_V2</span></div>
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
                <span style={{ fontFamily: 'var(--font-mono)' }}>ATAZ_DEV</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>ROLE:</span>
                <span>SEC_OPS_ARCHITECT</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>MISSION:</span>
                <span style={{ color: 'var(--accent-blue)' }}>MODERN_EDITORIAL_V2</span>
              </div>
            </div>
          </section>

          <section className="glass-panel" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>// VIBE_ANALYSIS_DENSITY</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {data?.site_stats?.top_tags?.map((tag, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.7rem' }}>
                    <span style={{ textTransform: 'uppercase' }}>{tag.name}</span>
                    <span style={{ color: idx % 2 === 0 ? 'var(--accent-green)' : 'var(--accent-blue)' }}>{tag.count}</span>
                  </div>
                  <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px' }}>
                    <div style={{ 
                      width: `${Math.min((tag.count / totalPosts) * 100, 100)}%`, 
                      height: '100%', 
                      background: idx % 2 === 0 ? 'var(--accent-green)' : 'var(--accent-blue)',
                      boxShadow: `0 0 10px ${idx % 2 === 0 ? 'rgba(0,255,136,0.3)' : 'rgba(0,170,255,0.3)'}`
                    }}></div>
                  </div>
                </div>
              ))}
              {!data?.site_stats?.top_tags && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CALCULATING_DENSITY...</div>}
            </div>
          </section>
        </div>

        {/* MIDDLE COLUMN: TACTICAL MAP & OVERVIEW */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className="glass-panel" style={{ flex: 1, padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <h2 style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>// TACTICAL_GRID_VIEW</h2>
            
            {/* RADAR EFFECT */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '150%',
              height: '150%',
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(0, 255, 136, 0.1) 2%, transparent 10%)',
              animation: 'radar-spin 4s linear infinite',
              transformOrigin: 'center',
              pointerEvents: 'none',
              zIndex: 0
            }}></div>

            <div style={{ 
              height: 'calc(100% - 3rem)', 
              background: 'linear-gradient(rgba(0,255,136,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.05) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1
            }}>
              <style>{`
                @keyframes radar-spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
                .intel-card:hover { border-color: var(--accent-blue) !important; background: rgba(0, 170, 255, 0.05) !important; transform: translateY(-2px); }
                .transmission-link:hover { border-left-color: var(--accent-blue) !important; color: var(--accent-blue) !important; }
              `}</style>
              
              <Activity size={120} color="var(--accent-green)" style={{ opacity: 0.1 }} />
              
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '80%' }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--accent-green)', letterSpacing: '0.5em', marginBottom: '1.5rem', opacity: 0.8 }}>SYSTEM_SCAN_IN_PROGRESS...</div>
                
                {data?.latest_posts?.[0] && (
                  <a href={data.latest_posts[0].url} style={{ 
                    display: 'block', 
                    textDecoration: 'none', 
                    border: '1px solid var(--accent-green)', 
                    padding: '1.5rem', 
                    background: 'rgba(0,0,0,0.8)', 
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                  }} className="intel-card">
                    <div style={{ fontSize: '0.6rem', color: 'var(--accent-green)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>// PRIORITY_TRANSMISSION</div>
                    <div style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 'bold', lineHeight: '1.4' }}>{data.latest_posts[0].title}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '1rem' }}>SOURCE: {data.latest_posts[0].url.split('/').pop()}</div>
                  </a>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: MISSION LOGS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className="glass-panel" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--accent-blue)' }}>// DATA_FEED_STREAMS</h2>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.2rem', overflowY: 'auto', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              {data?.latest_posts?.map((post, idx) => (
                <a key={idx} href={post.url} style={{ 
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  borderLeft: `2px solid ${idx === 0 ? 'var(--accent-green)' : 'var(--border)'}`, 
                  paddingLeft: '0.8rem',
                  transition: 'all 0.2s ease',
                  opacity: 0.9 - (idx * 0.1)
                }} className="transmission-link">
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem', marginBottom: '0.2rem' }}>{post.date}</div>
                  <div style={{ lineHeight: '1.4' }}>{post.title}</div>
                </a>
              ))}
              {!data?.latest_posts && <div style={{ color: 'var(--text-muted)' }}>NO_TRANSMISSIONS_FOUND...</div>}
            </div>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <a href="/" className="glass-panel" style={{ padding: '1rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', textDecoration: 'none', color: 'inherit' }}>
              <Shield size={16} color="var(--accent-green)" />
              <span style={{ fontSize: '0.7rem' }}>DE-AUTH_HOME</span>
            </a>
            <a href="/projects" className="glass-panel" style={{ padding: '1rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', textDecoration: 'none', color: 'inherit' }}>
              <Layers size={16} color="var(--accent-blue)" />
              <span style={{ fontSize: '0.7rem' }}>SEC_PROJECTS</span>
            </a>
          </div>
        </div>

      </div>

      {/* FOOTER STATS */}
      <footer style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        <div>CORE_V.2.6.0_STABLE // SYSTEM_UPTIME: 99.9%</div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span>TOTAL_ESSAYS: {totalPosts}</span>
          <span>DENSITY_SCORE: {((totalTags / totalPosts) * 10).toFixed(1)}</span>
          <span style={{ color: 'var(--accent-green)' }}>SYNC_STATUS: ACTIVE</span>
        </div>
      </footer>
    </div>
  )
}

export default App
