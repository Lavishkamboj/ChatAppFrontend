import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    { emoji: '⚡', text: 'Real-time messaging' },
    { emoji: '🔒', text: 'Secure login' },
    { emoji: '🎨', text: 'Clean & simple UI' },
  ];

  return (
    <div style={s.page}>

      {/* decorative bubbles in background */}
      <div style={s.bubble1} />
      <div style={s.bubble2} />

      <div style={s.content}>
        <span style={s.emoji}>💬</span>
        <h1 style={s.heading}>ChatApp</h1>
        <p style={s.sub}>talk to people, simply.</p>

        <div style={s.features}>
          {features.map((f, i) => (
            <div key={i} style={s.featureItem}>
              <span style={s.featureEmoji}>{f.emoji}</span>
              <span style={s.featureText}>{f.text}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/users')}
          style={s.btn}
          onMouseEnter={e => (e.target.style.backgroundColor = '#8b6ef5')}
          onMouseLeave={e => (e.target.style.backgroundColor = '#a78bfa')}
        >
          Start Chatting
        </button>
      </div>

    </div>
  );
};

const s = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#141414',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '24px 20px',
    boxSizing: 'border-box',
  },
  bubble1: {
    position: 'absolute',
    top: '-80px',
    left: '-80px',
    width: '220px',
    height: '220px',
    borderRadius: '50%',
    backgroundColor: '#a78bfa',
    opacity: 0.08,
  },
  bubble2: {
    position: 'absolute',
    bottom: '-100px',
    right: '-100px',
    width: '280px',
    height: '280px',
    borderRadius: '50%',
    backgroundColor: '#a78bfa',
    opacity: 0.06,
  },
  content: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  emoji: {
    fontSize: '48px',
    marginBottom: '8px',
  },
  heading: {
    color: '#fff',
    fontSize: '42px',
    fontWeight: '700',
    margin: '0',
    letterSpacing: '-1px',
  },
  sub: {
    color: '#666',
    fontSize: '15px',
    margin: '8px 0 32px 0',
  },
  features: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '36px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '20px',
  },
  featureEmoji: {
    fontSize: '16px',
  },
  featureText: {
    color: '#aaa',
    fontSize: '13px',
  },
  btn: {
    padding: '13px 36px',
    backgroundColor: '#a78bfa',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default Home;
