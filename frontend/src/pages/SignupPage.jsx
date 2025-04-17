import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/button/Button"
import Input from "../components/input/Input"

export default function SignupPage({ defaultRole = "user" }) {
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
      const baseURL = process.env.REACT_APP_API_BASE_URL
      const endpoint = `${baseURL}/api/auth/register${defaultRole === "admin" ? "-admin" : ""}`
      // trying to signup
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData, role: defaultRole }),
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
      <h2>
        {defaultRole === "admin"
          ? "Create an admin account"
          : "Create an account"}
      </h2>
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
