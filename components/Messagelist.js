import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MessageList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/messages');
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) return <p style={styles.loading}>Loading messages...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Messages</h2>
      {messages.length === 0 ? (
        <p style={styles.noMessages}>No messages yet.</p>
      ) : (
        messages.map((msg, idx) => (
          <div key={idx} style={styles.card}>
            <h4 style={styles.name}>{msg.name}</h4>
            <p style={styles.text}>{msg.text}</p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '2rem auto',
    padding: '1.5rem',
    backgroundColor: '#fefefe',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  heading: {
    fontSize: '22px',
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#222',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    marginTop: '2rem',
  },
  noMessages: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#666',
  },
  card: {
    backgroundColor: '#e3f2fd',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  name: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#0d47a1',
    marginBottom: '0.3rem',
  },
  text: {
    fontSize: '15px',
    color: '#333',
    lineHeight: '1.5',
  },
};
