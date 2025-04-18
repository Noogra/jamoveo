import { useNavigate } from "react-router-dom"
import "./LogoutButton.css"

export default function LogoutButton() {
  const navigate = useNavigate()
  const user = JSON.parse(sessionStorage.getItem("user"))

  const handleLogout = () => {
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("joinedSession")
    if (user.role === "admin") {
      localStorage.removeItem("sessionStarted")
    }
    navigate("/")
  }

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  )
}
