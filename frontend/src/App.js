import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import SignupPage from "./pages/SignupPage"
//import AdminSignupPage from "./pages/AdminSignupPage"
import LoginPage from "./pages/LoginPage"
import AdminMain from "./pages/AdminMain"
import PlayerMain from "./pages/PlayerMain"
import AdminResults from "./pages/AdminResults"
import LivePage from "./pages/LivePage"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route
          path="/register-admin"
          element={<SignupPage defaultRole="admin" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/player" element={<PlayerMain />} />
        <Route path="/admin/results" element={<AdminResults />} />
        <Route path="/live" element={<LivePage />} />
      </Routes>
    </Router>
  )
}

export default App
