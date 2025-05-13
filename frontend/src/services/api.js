import axios from 'axios';

const API_URL = 'https://symmetrical-happiness-jjrqv56pw7p93j6jw-9090.app.github.dev/api';

// Fonction de login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error('Échec de la connexion');
  }
};

// Fonction d'inscription
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Échec de l\'inscription');
  }
};

// Récupérer les conversations
export const getConversations = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/messages/conversations/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des conversations');
  }
};

// Envoyer un message
export const sendMessage = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/messages`, message);
    return response.data;
  } catch (error) {
    throw new Error('Échec de l\'envoi du message');
  }
};