import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import { login } from '../../services/api';
import '../../styles/Login.css'; // à créer ou réutiliser pour le style


const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { login } =  useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      
      navigate('/conversations');
    } catch (error) {
      alert("Échec de la connexion : " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <h1>Chat <br /> MeMo</h1>
        <div className="bubble-icons">● ●</div>
      </div>
      <div className="right-panel">
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Entrer votre id ou pseudo"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Mot de passer"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn">Se connecter</button>
        </form>
        <p><Link to="/register">S'inscrire</Link></p>
      </div>
    </div>
  );
};

export default Login;
