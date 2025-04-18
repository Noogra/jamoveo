import { Navigate } from "react-router-dom"

export default function AdminOnlyRoute({ children }) {
  const user = JSON.parse(sessionStorage.getItem("user"))

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />
  }

  return children
}
