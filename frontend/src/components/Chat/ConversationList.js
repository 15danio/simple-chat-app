
import React, { useEffect, useState } from 'react';
import { getConversations } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ConversationList = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();
   const goToProfile = () => {
    navigate("/profile");
  };
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await getConversations(user.id);
        setConversations(data);
      } catch (error) {
        console.error('Erreur :', error.message);
      }
    };

    fetchConversations();
  }, [user.id]);

  const handleNewConversation = () => {
    navigate('/new-conversation'); // Page ou modal à créer
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Liste des conversations</h2>
        <button style={styles.settingsButton}>⚙️</button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#300047", color: "white" }}>
        <button onClick={goToProfile} style={{ background: "none", border: "none", color: "white", fontSize: 20, cursor: "pointer" }}>
          ☰
        </button>
        <h3>Conversations</h3>
        <div style={{ width: 30 }}></div> {/* Pour équilibrer l’espace */}
      </div>
      <div style={styles.list}>
        {conversations.length === 0 ? (
          <p style={styles.noConversation}>Aucune conversation pour le moment.</p>
        ) : (
          conversations.map((conv) => (
            <div key={conv.id} style={styles.conversationCard}>
              <div style={styles.avatar}>J</div>
              <div>
                <div style={styles.name}>{conv.username || 'John Doe'}</div>
                <div style={styles.preview}>{conv.lastMessage || '...'}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <button style={styles.floatingButton} onClick={handleNewConversation}>
        +
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#2e003e',
    height: '100vh',
    color: 'black',
    padding: '1rem',
    position: 'relative',
  },
  header: {
    backgroundColor: '#d1c0d8',
    padding: '0.5rem 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  list: {
    marginTop: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1rem',
  },
  noConversation: {
    textAlign: 'center',
    color: '#666',
  },
  conversationCard: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '0.5rem',
  },
  avatar: {
    backgroundColor: '#ccc',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '1rem',
    fontWeight: 'bold',
  },
  name: {
    fontWeight: 'bold',
  },
  preview: {
    color: '#777',
  },
  floatingButton: {
    position: 'absolute',
    bottom: '2rem',
    right: '2rem',
    backgroundColor: '#6a0dad',
    color: 'white',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '1.5rem',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ConversationList;
