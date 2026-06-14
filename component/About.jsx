import React from 'react';

const About = () => {
  return (
    <div style={s.page}>
      <div style={s.box}>

        <div style={s.topRow}>
          <div style={s.avatar}>LK</div>
          <div>
            <h2 style={s.name}>Lavish Kamboj</h2>
            <p style={s.tag}>ECE @ DCRUST, Murthal · 4th Year</p>
          </div>
        </div>

        <p style={s.bio}>
          Hey! I'm Lavish, from Haryana, India. I'm an ECE student whose interest
          somehow drifted into computers -and honestly, no regrets. I enjoy building
          things that fascinate me, one project at a time. This chat app is one of them.Note: In frontend i have taken some help from Claude to make it more beautiful.
        </p>

        <div style={s.links}>
          <a href="https://www.linkedin.com/in/lavish-kamboj-993b74347" target="_blank" rel="noreferrer" style={s.btn}>
            LinkedIn
          </a>
          <a href="https://github.com/Lavishkamboj" target="_blank" rel="noreferrer" style={s.btn}>
            GitHub
          </a>
          <a href="https://lavishkamboj.github.io/portfolio/" target="_blank" rel="noreferrer" style={{...s.btn, ...s.btnPurple}}>
            Portfolio
          </a>
        </div>

      </div>
    </div>
  );
};

const s = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#141414',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 20px',
    boxSizing: 'border-box',
  },
  box: {
    width: '100%',
    maxWidth: '420px',
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
  },
  avatar: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    backgroundColor: '#a78bfa22',
    border: '1px solid #a78bfa55',
    color: '#a78bfa',
    fontSize: '16px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  name: {
    margin: '0 0 4px 0',
    color: '#fff',
    fontSize: '20px',
    fontWeight: '600',
  },
  tag: {
    margin: 0,
    color: '#666',
    fontSize: '13px',
  },
  bio: {
    color: '#999',
    fontSize: '15px',
    lineHeight: '1.7',
    marginBottom: '32px',
    borderLeft: '2px solid #a78bfa',
    paddingLeft: '16px',
  },
  links: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  btn: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    color: '#aaa',
    border: '1px solid #333',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  btnPurple: {
    backgroundColor: '#a78bfa',
    color: '#fff',
    border: '1px solid #a78bfa',
  },
};

export default About;