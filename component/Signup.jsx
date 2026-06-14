import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth';

const Signup = () => {
  const { user, setUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const formData = new FormData(e.target);
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    try {
      const res = await fetch('http://localhost:8000/sign-up', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
if(!res.ok){
  alert("Username already taken");
  return;
}
      const result = await res.json();
      console.log('Response:', result);
      navigate('/users');
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.box}>
        <h2 style={s.heading}>Create account</h2>

        <form onSubmit={handleSubmit}>
          <div style={s.group}>
            <label style={s.label}>Username</label>
            <input
              name="username"
              type="text"
              required
              style={s.input}
              onFocus={e => (e.target.style.borderBottomColor = '#a78bfa')}
              onBlur={e => (e.target.style.borderBottomColor = '#333')}
            />
          </div>

          <div style={s.group}>
            <label style={s.label}>Password</label>
            <input
              name="password"
              type="password"
              required
              style={s.input}
              onFocus={e => (e.target.style.borderBottomColor = '#a78bfa')}
              onBlur={e => (e.target.style.borderBottomColor = '#333')}
            />
          </div>

          {error && <p style={s.error}>{error}</p>}

          <button type="submit" disabled={submitting} style={s.btn}>
            {submitting ? 'Creating...' : 'Sign up'}
          </button>
        </form>

        <p style={s.footer}>
          Already have an account?{' '}
          <span style={s.link} onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
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
    maxWidth: '360px',
  },
  heading: {
    color: '#fff',
    fontSize: '26px',
    fontWeight: '600',
    marginBottom: '32px',
  },
  group: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    color: '#888',
    fontSize: '12px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #333',
    padding: '8px 0',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-bottom-color 0.2s',
    borderRadius: '0',
    WebkitAppearance: 'none',
  },
  btn: {
    marginTop: '12px',
    width: '100%',
    padding: '14px',
    backgroundColor: '#a78bfa',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    WebkitAppearance: 'none',
  },
  error: {
    color: '#f87171',
    fontSize: '13px',
    marginBottom: '12px',
  },
  footer: {
    marginTop: '24px',
    color: '#666',
    fontSize: '14px',
    textAlign: 'center',
  },
  link: {
    color: '#a78bfa',
    cursor: 'pointer',
  },
};

export default Signup;