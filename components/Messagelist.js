// MessageList.jsx
import React, { useEffect, useState } from 'react';

export default function MessageList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const addReaction = (id, type) => {
    // Placeholder logic: you can connect this to a backend later
    setMessages(prev =>
      prev.map(msg =>
        msg._id === id
          ? {
              ...msg,
              [type]: (msg[type] || 0) + 1,
            }
          : msg
      )
    );
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) return <p>Loading messages...</p>;
  if (!messages.length) return <p>Oops ! Something went wrong..</p>;

  return (
    <div>
      {messages.map((msg) => (
        <div className="message-row" key={msg._id || `${msg.name}-${msg.text}`}>
          <div className="message-content">
            <strong className="message-name">{msg.name}</strong>
            <span className="message-text">: {msg.text}</span>
          </div>
          <div className="reactions">
            <button onClick={() => addReaction(msg._id, 'likes')}>
              👍 <span>{msg.likes || 0}</span>
            </button>
            <button onClick={() => addReaction(msg._id, 'loves')}>
              ❤️ <span>{msg.loves || 0}</span>
            </button>
            <button onClick={() => addReaction(msg._id, 'laughs')}>
              😂 <span>{msg.laughs || 0}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
