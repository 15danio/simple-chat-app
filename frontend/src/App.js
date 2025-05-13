import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ConversationList from './components/Chat/ConversationList';
import { AuthProvider } from './context/AuthContext'; // si tu l’as bien exporté
import ProfilePage from "./components/Chat/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>         
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/conversations" element={<ConversationList />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
