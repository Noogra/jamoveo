import { useNavigate } from "react-router-dom"
import "./LogoutButton.css"

export default function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  )
}
