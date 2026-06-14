import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={s.page}>
      <h1 style={s.heading}>ChatApp</h1>
      <p style={s.sub}>talk to people, simply.</p>
      <button
        onClick={() => navigate('/users')}
        style={s.btn}
        onMouseEnter={e => (e.target.style.backgroundColor = '#8b6ef5')}
        onMouseLeave={e => (e.target.style.backgroundColor = '#a78bfa')}
      >
        Start Chatting
      </button>
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
    gap: '12px',
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
    margin: '0 0 24px 0',
  },
  btn: {
    padding: '12px 32px',
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