import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import AdminMain from "./pages/AdminMain"
import PlayerMain from "./pages/PlayerMain"
import AdminResults from "./pages/AdminResults"
import LivePage from "./pages/LivePage"
import HomePage from "./pages/HomePage"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminOnlyRoute from "./components/AdminOnlyRoute"

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
        <Route
          path="/admin"
          element={
            <AdminOnlyRoute>
              <AdminMain />
            </AdminOnlyRoute>
          }
        />
        <Route
          path="/player"
          element={
            <ProtectedRoute>
              <PlayerMain />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/results"
          element={
            <AdminOnlyRoute>
              <AdminResults />
            </AdminOnlyRoute>
          }
        />
        <Route
          path="/live"
          element={
            <ProtectedRoute>
              <LivePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
