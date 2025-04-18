import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import socket from "../sockets/socket"
import { SocketSignals } from "../utils/socketSignals.js"
import Button from "../components/button/Button"
import LogoutButton from "../components/logoutButton/LogoutButton"

export default function PlayerMain() {
  const alreadyStarted = localStorage.getItem("sessionStarted") === "true"
  const [sessionStarted, setSessionStarted] = useState(alreadyStarted)
  const [joined, setJoined] = useState(false)
  const navigate = useNavigate()

  const handleJoinSession = () => {
    socket.emit(SocketSignals.JOIN_SESSION)
    sessionStorage.setItem("joinedSession", "true")
    setJoined(true)
  }

  useEffect(() => {
    const alreadyJoined = sessionStorage.getItem("joinedSession") === "true"
    if (alreadyJoined) {
      setJoined(true)
      socket.emit(SocketSignals.JOIN_SESSION)
    }

    socket.on(SocketSignals.SESSION_STARTED, () => {
      setSessionStarted(true)
    })

    socket.on(SocketSignals.LIVE_SONG, (songId) => {
      sessionStorage.getItem("joinedSession") === "true" &&
        navigate("/live", { state: { songId } })
    })

    return () => {
      socket.off(SocketSignals.SESSION_STARTED)
      socket.off(SocketSignals.LIVE_SONG)
    }
  }, [navigate])

  return (
    <div className="container">
      <LogoutButton />
      <h2>Waiting for next song...</h2>
      {sessionStarted && !joined && (
        <Button onClick={handleJoinSession}>Join Rehearsal Session</Button>
      )}
    </div>
  )
}
