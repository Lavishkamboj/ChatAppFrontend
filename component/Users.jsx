import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(true);
  const [copied, setCopied] = useState(false);
  const [myUsername, setMyUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8000/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.log("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // fetch logged in user's username
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("http://localhost:8000/me", {
          credentials: "include",
        });
        const data = await res.json();
        setMyUsername(data.username);
      } catch (err) {
        console.log("Error fetching me:", err);
      }
    };
    fetchMe();
  }, []);

  const handleClick = async (name) => {
    try {
      const res = await fetch("http://localhost:8000/conversation", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name }),
      });

      if (!res.ok) {
        alert("please login first");
        navigate("/");
        return;
      }

      let data = await res.json();
      localStorage.setItem("conv_id", data.conv_id);
      navigate("/conversation");
    } catch (err) {
      console.log(err);
    }
  };

  const handleInvite = () => {
    const appUrl = window.location.origin;
    const text = `Hey! Join me on this chat app. URL: ${appUrl} — my username is: ${myUsername}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const filtered = users.filter(u =>
    u.toLowerCase().includes(search.toLowerCase()) && u !== myUsername
  );

  return (
    <div style={s.page}>

      <div style={s.topRow}>
        <h2 style={s.heading}>Users</h2>
        <button onClick={handleInvite} style={s.inviteBtn}>
          {copied ? '✓ copied!' : 'Invite'}
        </button>
      </div>

      {copied && <p style={s.copiedMsg}>info copied — now you can send it to anyone 🎉</p>}

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={s.search}
        onFocus={e => (e.target.style.borderBottomColor = '#a78bfa')}
        onBlur={e => (e.target.style.borderBottomColor = '#333')}
      />

      {showList && (
        <ul style={s.list}>
          {filtered.length > 0 ? (
            filtered.map((u, i) => (
              <li key={i} style={s.item} onClick={() => handleClick(u)}>
                {u}
              </li>
            ))
          ) : (
            <p style={s.empty}>no results</p>
          )}
        </ul>
      )}

      <button style={s.backBtn} onClick={() => setShowList(true)}>
        Back
      </button>

    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#141414',
    padding: '40px 24px',
    boxSizing: 'border-box',
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  heading: {
    color: '#fff',
    fontSize: '22px',
    fontWeight: '600',
    margin: 0,
  },
  inviteBtn: {
    padding: '8px 18px',
    backgroundColor: '#a78bfa',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  copiedMsg: {
    color: '#a78bfa',
    fontSize: '13px',
    margin: '0 0 12px 0',
  },
  search: {
    width: '100%',
    maxWidth: '360px',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #333',
    padding: '8px 0',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    marginBottom: '28px',
    marginTop: '16px',
    boxSizing: 'border-box',
    transition: 'border-bottom-color 0.2s',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    maxWidth: '360px',
  },
  item: {
    padding: '12px 4px',
    color: '#ccc',
    fontSize: '15px',
    borderBottom: '1px solid #222',
    cursor: 'pointer',
  },
  empty: {
    color: '#555',
    fontSize: '14px',
    marginTop: '16px',
  },
  backBtn: {
    marginTop: '28px',
    padding: '9px 18px',
    background: 'transparent',
    color: '#666',
    border: '1px solid #2a2a2a',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};
