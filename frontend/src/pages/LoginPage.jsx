import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginForm from "../components/auth/LoginForm"

export default function LoginPage() {
  // import navigate to navigate between pages.
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  })

  const [statusMsg, setStatusMsg] = useState("")

  const handleInput = (event) => {
    const { name, value } = event.target
    setUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  const attemptLogin = async (event) => {
    event.preventDefault()

    try {
      const baseURL = process.env.REACT_APP_API_BASE_URL
      const response = await fetch(`${baseURL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      })

      const result = await response.json()

      if (response.ok) {
        setStatusMsg("Login successful!")
        sessionStorage.setItem("user", JSON.stringify(result.user))
        navigate("/")
      } else {
        setStatusMsg(result.message || "Login failed")
      }
    } catch (err) {
      console.error(err)
      setStatusMsg("Server error. Please try again.")
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <LoginForm onSubmit={attemptLogin} onChange={handleInput} />
      <div className="link-wrapper">
        <span className="line-text" onClick={() => navigate("/register")}>
          Create account
        </span>
      </div>

      {statusMsg && <p className="status-message">{statusMsg}</p>}
    </div>
  )
}
