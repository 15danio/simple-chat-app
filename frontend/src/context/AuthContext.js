import { createContext, useContext, useState } from 'react';
import { login as apiLogin } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (credentials) => {
    try {
      const userData = await apiLogin(credentials);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Échec de la connexion');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
