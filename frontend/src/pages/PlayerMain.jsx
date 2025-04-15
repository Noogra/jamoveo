import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import socket from "../sockets/socket"

export default function PlayerMain() {
  const navigate = useNavigate()

  useEffect(() => {
    socket.on("live-song", (songId) => {
      navigate("/main/live", { state: { songId } })
    })

    return () => {
      socket.off("live-song")
    }
  }, [navigate])
  return (
    <div>
      <h2>Waiting for next song...</h2>
    </div>
  )
}
