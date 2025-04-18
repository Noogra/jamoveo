import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import socket from "../sockets/socket"
import { SocketSignals } from "../utils/socketSignals.js"
import Button from "../components/button/Button"
import LogoutButton from "../components/logoutButton/LogoutButton"

export default function PlayerMain() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [joined, setJoined] = useState(false)
  const navigate = useNavigate()

  const handleJoinSession = () => {
    socket.emit(SocketSignals.JOIN_SESSION)
    setJoined(true)
  }

  useEffect(() => {
    socket.on(SocketSignals.SESSION_STARTED, () => {
      setSessionStarted(true)
    })

    socket.on(SocketSignals.LIVE_SONG, (songId) => {
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
