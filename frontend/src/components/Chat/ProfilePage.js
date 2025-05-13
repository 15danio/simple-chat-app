// src/Components/Chat/ProfilePage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  // Exemple de données utilisateur (à remplacer par les vraies données depuis le contexte ou le backend)
  const user = {
    name: "John Doe",
    id: "25252399",
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // ou autre méthode selon ton auth
    navigate("/");
  };

  return (
    <div style={{ backgroundColor: "#300047", height: "100vh", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ backgroundColor: "white", color: "#300047", borderRadius: 20, padding: 30, textAlign: "center", width: 300 }}>
        <div style={{ backgroundColor: "#B89ACD", borderRadius: "50%", width: 80, height: 80, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>
          {user.name.charAt(0)}
        </div>
        <h2 style={{ marginTop: 10 }}>{user.name.toUpperCase()}</h2>
        <p>ID : {user.id}</p>
        <button onClick={handleLogout} style={{ marginTop: 20, backgroundColor: "#B89ACD", border: "none", padding: 10, borderRadius: 10, color: "white", cursor: "pointer" }}>
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
