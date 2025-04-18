import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Button from "../components/button/Button"
import "./HomePage.css"

export default function HomePage() {
  const navigate = useNavigate()

  useEffect(() => {
    // get user data from local storage
    const storedUser = sessionStorage.getItem("user")

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        // admin
        if (user.role === "admin") {
          navigate("/admin")
        } else {
          // user
          navigate("/player")
        }
      } catch (err) {
        console.error("Error parsing user from sessionStorage:", err)
        sessionStorage.removeItem("user")
      }
    }
  }, [navigate])

  return (
    <div className="homepage">
      <h1 className="homepage-title">JaMoveo</h1>
      <p className="homepage-subtitle">Play music with friends</p>
      <Button onClick={() => navigate("/login")}>Sign In</Button>
    </div>
  )
}
