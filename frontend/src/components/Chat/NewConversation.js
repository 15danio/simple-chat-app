import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const API_URL = 'https://symmetrical-happiness-jjrqv56pw7p93j6jw-9090.app.github.dev/api';

const NewConversation = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Récupère tous les utilisateurs sauf celui connecté
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`);
        const filtered = response.data.filter(u => u.id !== user.id);
        setUsers(filtered);
      } catch (err) {
        console.error("Erreur lors du chargement des utilisateurs", err);
      }
    };

    fetchUsers();
  }, [user]);

  const handleStartConversation = async (receiverId) => {
    try {
      const response = await axios.post(`${API_URL}/messages/conversations`, {
        senderId: user.id,
        receiverId: receiverId
      });

      navigate('/conversations');
    } catch (err) {
      console.error("Erreur lors de la création de la conversation", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <button style={styles.backButton} onClick={() => navigate('/conversations')}>←</button>
      </div>
      <div style={styles.userList}>
        {users
          .filter((u) => u.username.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((u) => (
            <div key={u.id} style={styles.userItem} onClick={() => handleStartConversation(u.id)}>
              <div style={styles.avatar}>{u.username.charAt(0).toUpperCase()}</div>
              <span>{u.username}</span>
            </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#2c0042',
    height: '100vh',
    padding: '1rem',
    color: 'black',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  searchInput: {
    flexGrow: 1,
    padding: '0.5rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  backButton: {
    marginLeft: '0.5rem',
    backgroundColor: '#800080',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '2.5rem',
    height: '2.5rem',
    fontSize: '1.2rem',
  },
  userList: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1rem',
  },
  userItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 0',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
  },
  avatar: {
    backgroundColor: '#ddd',
    borderRadius: '50%',
    width: '2rem',
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '1rem',
    fontWeight: 'bold',
  }
};

export default NewConversation;
