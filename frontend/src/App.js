import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import AdminMain from './pages/AdminMain';
import PlayerMain from './pages/PlayerMain';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/main/admin" element={<AdminMain />} />
      <Route path="/main/player" element={<PlayerMain />} />
    </Routes>
  </Router>
  );
}

export default App;
