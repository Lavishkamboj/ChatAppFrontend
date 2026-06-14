import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth';

export default function Logout() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://chat-app-backend-five-murex.vercel.app/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      console.log("Logout response:", data);
      sessionStorage.removeItem('reloaded');
      setUser(false);
      navigate('/login');
    } catch (err) {
      console.log("Logout error:", err);
      setLoading(false);
    }
  };

  return (
    <>
   
    <div style={s.page}>
      <h2 style={s.heading}>Logout</h2>
      <p style={s.text}>Are you sure you want to logout?</p>

      <div style={s.btnRow}>
        <button onClick={() => navigate(-1)} style={s.cancelBtn}>Cancel</button>
        <button onClick={handleLogout} disabled={loading} style={s.logoutBtn}>
          {loading ? 'Logging out...' : 'Yes, logout'}
        </button>
      </div>
    </div>
    </>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#141414',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 20px',
    boxSizing: 'border-box',
  },
  heading: {
    color: '#fff',
    fontSize: '22px',
    fontWeight: '600',
    margin: '0 0 8px 0',
  },
  text: {
    color: '#666',
    fontSize: '15px',
    margin: '0 0 32px 0',
  },
  btnRow: {
    display: 'flex',
    gap: '12px',
  },
  cancelBtn: {
    padding: '10px 24px',
    backgroundColor: 'transparent',
    color: '#888',
    border: '1px solid #2a2a2a',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  logoutBtn: {
    padding: '10px 24px',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
};