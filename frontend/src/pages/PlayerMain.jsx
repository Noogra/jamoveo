import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import socket from "../sockets/socket"
import Button from "../components/button/Button"
import LogoutButton from "../components/logoutButton/LogoutButton"

export default function PlayerMain() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [joined, setJoined] = useState(false)
  const navigate = useNavigate()

  const handleJoinSession = () => {
    socket.emit("join-session")
    setJoined(true)
  }

  useEffect(() => {
    socket.on("session-started", () => {
      setSessionStarted(true)
    })

    socket.on("live-song", (songId) => {
      navigate("/live", { state: { songId } })
    })

    return () => {
      socket.off("session-started")
      socket.off("live-song")
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
