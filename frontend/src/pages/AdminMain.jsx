import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SocketSignals } from "../utils/socketSignals.js"
import socket from "../sockets/socket.js"
import Button from "../components/button/Button"
import Input from "../components/input/Input"
import LogoutButton from "../components/logoutButton/LogoutButton.jsx"

export default function AdminMain() {
  const [searchText, setSearchText] = useState("")
  const alreadyStarted = localStorage.getItem("sessionStarted") === "true"
  const [sessionStarted, setSessionStarted] = useState(alreadyStarted)
  const navigate = useNavigate()

  const handleSessionButton = () => {
    socket.emit(SocketSignals.START_SESSION)
    localStorage.setItem("sessionStarted", "true")
    //sessionStorage.setItem("joinedSession", "true")
    setSessionStarted(true)
  }

  const handleSearch = () => {
    if (searchText.trim() === "") return
    navigate(`/admin/results?query=${encodeURIComponent(searchText)}`)
  }

  return (
    <div className="container">
      <LogoutButton />
      <h2>Search any song...</h2>
      <Input
        type="text"
        placeholder="Type song or artist"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
      {!sessionStarted && (
        <Button onClick={handleSessionButton}>Create Rehearsal Session</Button>
      )}
    </div>
  )
}
