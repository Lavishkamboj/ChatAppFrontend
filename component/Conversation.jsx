import React, { useEffect, useState, useRef } from 'react'
import socket from '../socket.js'

const Conversation = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [me, setMe] = useState('')
  const [user1, setUser1] = useState(null);
  const [user2, setUser2] = useState(null);
  const [otherUser, setOtherUser] = useState('');
  const bottomRef = useRef(null);
//to reload page once bcz thir is a bug when we do ffresh signup and message some at that time conversation id is just created and to reflect that change our frontend have to refresh once otherwise it cant store message in mongo db and can only show meesage usin socket which disaaper after reload
  useEffect(() => {
  if (!sessionStorage.getItem('reloaded')) {
    sessionStorage.setItem('reloaded', 'true')
    window.location.reload()
  }
}, [])
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data])
    })
    return () => { socket.off('receive_message') }
  }, [])

  const conv_id = localStorage.getItem("conv_id");

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch('https://chat-app-backend-five-murex.vercel.app/data', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conv_id: conv_id })
      })
      const data = await res.json()
      setUser1(data.user1);
      setUser2(data.user2);
      setMe(data.me)
      setMessages(data.messages || [])
      if (data.me === data.user1) setOtherUser(data.user2);
      else setOtherUser(data.user1);
    }
    fetchMessages()
  }, [])

  useEffect(() => {
    if (!user1 || !user2) return;
    socket.emit("join_private_room", { myId: user1, otherId: user2 });
  }, [user1, user2]);

  const sendMessage = () => {
    if (!input.trim()) return
    socket.emit('message', input)
    setMessages((prev) => [...prev, {
      senderId: me,
      content: input,
      createdAt: new Date().toISOString()
    }])
    setInput('')
  }

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  )

  return (
    <div style={s.page}>

      <div style={s.topBar}>
        <h3 style={s.name}>{otherUser || '...'}</h3>
      </div>

      <div style={s.msgArea}>
        <div style={s.msgInner}>
          {sortedMessages.map((msg, i) => {
            const isMine = msg.senderId === me;
            return (
              <div key={i} style={{ display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start' }}>
                <div style={{ ...s.bubble, backgroundColor: isMine ? '#a78bfa' : '#1e1e1e' }}>
                  <p style={s.msgText}>{msg.content}</p>
                </div>
              </div>
            )
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      <div style={s.inputOuter}>
        <div style={s.inputInner}>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder='Type a message...'
            style={s.input}
          />
          <button onClick={sendMessage} style={s.sendBtn}>Send</button>
        </div>
      </div>

    </div>
  )
}

const s = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#141414',
  },
  topBar: {
    padding: '14px 20px',
    borderBottom: '1px solid #222',
    display: 'flex',
    justifyContent: 'center',
  },
  name: {
    margin: 0,
    color: '#fff',
    fontSize: '16px',
    fontWeight: '500',
    width: '100%',
    maxWidth: '680px',
  },
  msgArea: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
  msgInner: {
    width: '100%',
    maxWidth: '680px',
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  bubble: {
    padding: '9px 14px',
    borderRadius: '12px',
    // key fix: maxWidth as % of parent + wordBreak so long words wrap
    maxWidth: '65%',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
  },
  msgText: {
    margin: 0,
    color: '#fff',
    fontSize: '15px',
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap',
  },
  inputOuter: {
    borderTop: '1px solid #222',
    display: 'flex',
    justifyContent: 'center',
  },
  inputInner: {
    width: '100%',
    maxWidth: '680px',
    display: 'flex',
    gap: '10px',
    padding: '14px 20px',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    backgroundColor: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
  },
  sendBtn: {
    padding: '10px 20px',
    backgroundColor: '#a78bfa',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
  },
}

export default Conversation