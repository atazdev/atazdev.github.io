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
            </div>
          </section>

          <section className="glass-panel" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>// JOURNAL_METRICS</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.7rem' }}>
                  <span>PUBLISHED_ESSAYS</span>
                  <span style={{ color: 'var(--accent-green)' }}>{totalPosts}</span>
                </div>
                <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px' }}>
                  <div style={{ width: `${Math.min(totalPosts * 2, 100)}%`, height: '100%', background: 'var(--accent-green)' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.7rem' }}>
                  <span>TOPIC_INDEX_DENSITY</span>
                  <span style={{ color: 'var(--accent-blue)' }}>{totalTags}</span>
                </div>
                <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px' }}>
                  <div style={{ width: `${Math.min(totalTags * 4, 100)}%`, height: '100%', background: 'var(--accent-blue)' }}></div>
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
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '80%' }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--accent-green)', letterSpacing: '0.5em', marginBottom: '1rem' }}>SCANNING_INFRASTRUCTURE...</div>
                {data?.latest_posts?.[0] && (
                  <a href={data.latest_posts[0].url} style={{ display: 'block', textDecoration: 'none', border: '1px solid var(--accent-green)', padding: '1rem', background: 'rgba(0,0,0,0.5)', transition: 'all 0.2s ease' }} className="intel-card">
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>LATEST_INTEL:</div>
                    <div style={{ fontSize: '1rem', color: 'var(--text-primary)', marginTop: '0.5rem' }}>{data.latest_posts[0].title}</div>
                  </a>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: MISSION LOGS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className="glass-panel" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--accent-blue)' }}>// RECENT_TRANSMISSIONS</h2>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              {data?.latest_posts?.map((post, idx) => (
                <a key={idx} href={post.url} style={{ 
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  borderLeft: `2px solid ${idx === 0 ? 'var(--accent-green)' : 'var(--border)'}`, 
                  paddingLeft: '0.5rem',
                  transition: 'all 0.2s ease'
                }} className="transmission-link">
                  <span style={{ color: 'var(--text-muted)' }}>[{post.date}]</span> {post.title}
                </a>
              ))}
              {!data?.latest_posts && <div style={{ color: 'var(--text-muted)' }}>NO_TRANSMISSIONS_FOUND...</div>}
            </div>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <a href="/" className="glass-panel" style={{ padding: '1rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', textDecoration: 'none', color: 'inherit' }}>
              <Shield size={16} color="var(--accent-green)" />
              <span style={{ fontSize: '0.7rem' }}>SITE_HOME</span>
            </a>
            <a href="/projects" className="glass-panel" style={{ padding: '1rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', textDecoration: 'none', color: 'inherit' }}>
              <Layers size={16} color="var(--accent-blue)" />
              <span style={{ fontSize: '0.7rem' }}>PROJECTS</span>
            </a>
          </div>
        </div>

      </div>

      {/* FOOTER STATS */}
      <footer style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        <div>CORE_V.2.5.0_LIVE_SYNC_ENABLED</div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span>ESSAYS: {totalPosts}</span>
          <span>TOPICS: {totalTags}</span>
          <span style={{ color: 'var(--accent-green)' }}>DATA_LINK: ESTABLISHED</span>
        </div>
      </footer>
    </div>
  )
}

export default App
