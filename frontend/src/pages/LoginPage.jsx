import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from "../components/button/Button"
import Input from "../components/input/Input"

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
      const response = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      })

      const result = await response.json()

      if (response.ok) {
        setStatusMsg("Login successful!")
        localStorage.setItem("user", JSON.stringify(result.user))
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
    <div>
      <h2>Login</h2>
      <form onSubmit={attemptLogin}>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleInput}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInput}
          required
        />
        <div className="login-button-wrapper">
          <Button type="submit">Log In</Button>
        </div>
      </form>

      <div className="link-wrapper">
        <span className="line-text" onClick={() => navigate("/register")}>
          Create account
        </span>
      </div>

      {statusMsg && <p className="status-message">{statusMsg}</p>}
    </div>
  )
}
