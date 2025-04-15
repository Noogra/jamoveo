import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function MainPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // get user data from local storage
    const user = JSON.parse(localStorage.getItem("user"))

    if (!user) {
      // if user not logged in return to login page
      navigate("/login")
      return
    }

    // admin
    if (user.role === "admin") {
      navigate("/main/admin")
    } else {
      // user
      navigate("/main/player")
    }
  }, [navigate])

  return (
    <div>
      <h2>Redirecting...</h2>
    </div>
  )
}
