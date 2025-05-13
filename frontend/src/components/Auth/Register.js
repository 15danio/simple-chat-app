import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/api';
import '../../styles/Register.css'; // à créer

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await register({
        fullName: formData.fullName,
        username: formData.username,
        password: formData.password,
      });
      navigate('/login');
    } catch (error) {
      alert("Échec de l'inscription : " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="register-container">
      <div className="left-panel">
        <h1>Chat <br /> MeMo</h1>
        <div className="bubble-icons">● ●</div>
      </div>
      <div className="right-panel">
        <h2>S’inscrire</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Entrer votre nom et prénom"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Entrer votre pseudo"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Mot de passer"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="confirmation"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn">S’inscrire</button>
        </form>
        <p><Link to="/">Se connecter</Link></p>
      </div>
    </div>
  );
};

export default Register;
