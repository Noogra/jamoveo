import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import MainPage from "./pages/MainPage"
import AdminMain from "./pages/AdminMain"
import PlayerMain from "./pages/PlayerMain"
import AdminResults from "./pages/AdminResults"
import LivePage from "./pages/LivePage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/main/admin" element={<AdminMain />} />
        <Route path="/main/player" element={<PlayerMain />} />
        <Route path="/main/admin/results" element={<AdminResults />} />
        <Route path="/main/live" element={<LivePage />} />
      </Routes>
    </Router>
  )
}

export default App
