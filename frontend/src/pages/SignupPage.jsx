import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from "../components/button/Button"
import Input from "../components/input/Input"

export default function SignupPage() {
  // import navigate to navigate between pages.
  const navigate = useNavigate()
  // initial user data
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    instrument: "",
  })

  // success or not message
  const [statusMsg, setStatusMsg] = useState("")

  // input field handle function
  const updateField = (event) => {
    const { name, value } = event.target
    setUserData((currentDataState) => ({ ...currentDataState, [name]: value }))
  }

  // handle submit button function
  const submitRegistration = async (event) => {
    event.preventDefault() // prevents from page to refresh.

    try {
      // trying to login
      const response = await fetch("http://localhost:5050/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
      // check the response from server
      const result = await response.json()
      if (response.ok) {
        setStatusMsg("Registration successful!")
        localStorage.setItem("user", JSON.stringify(result.user))
        navigate("/")
      } else {
        setStatusMsg(result.message || "Could not register.")
      }
    } catch (err) {
      console.error(err)
      setStatusMsg("Server error, Please try again")
    }
  }

  return (
    <div className="container">
      <h2>Create an Account</h2>
      <form onSubmit={submitRegistration}>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          onChange={updateField}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={updateField}
          required
        />
        <Input
          type="text"
          name="instrument"
          placeholder="Instrument"
          onChange={updateField}
          required
        />
        <Button type="submit">Sign Up</Button>
      </form>
      {statusMsg && <p className="status-message">{statusMsg}</p>}
    </div>
  )
}
