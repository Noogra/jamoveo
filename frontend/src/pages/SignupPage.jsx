import { useState } from "react"
import { useNavigate } from "react-router-dom"

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
        navigate("/login")
      } else {
        setStatusMsg(result.message || "Could not register.")
      }
    } catch (err) {
      console.error(err)
      setStatusMsg("Server error, Please try again")
    }
  }

  return (
    <div>
      <h2>Create an Account</h2>
      <form onSubmit={submitRegistration}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={updateField}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={updateField}
          required
        />
        <input
          type="text"
          name="instrument"
          placeholder="Instrument"
          onChange={updateField}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {statusMsg && <p>{statusMsg}</p>}
    </div>
  )
}
