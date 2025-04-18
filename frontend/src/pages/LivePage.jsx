import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import socket from "../sockets/socket"
import { songList } from "../songs/songList"
import "./LivePage.css"
import { SocketSignals } from "../utils/socketSignals"

import SongLyrics from "../components/song/SongLyrics"
import Button from "../components/button/Button"
import SongHeader from "../components/song/SongHeader"
import LogoutButton from "../components/logoutButton/LogoutButton"

export default function LivePage() {
  const location = useLocation()
  const navigate = useNavigate()

  const [songContent, setSongContent] = useState(null)
  const [autoScroll, setAutoScroll] = useState(false)

  const songId = location.state?.songId || null
  const songInfo = songList.find((song) => song.id === songId)

  const user = JSON.parse(sessionStorage.getItem("user"))
  const instrument = user?.instrument
  const isSinger = instrument === "vocals"
  const isAdmin = user?.role === "admin"

  const handleQuitButton = () => {
    socket.emit(SocketSignals.END_SESSION) // send to server
    sessionStorage.removeItem("joinedSession")
    localStorage.removeItem("sessionStarted")
    navigate("/")
  }

  useEffect(() => {
    const alreadyJoined = sessionStorage.getItem("joinedSession") === "true"
    if (alreadyJoined) {
      socket.emit(SocketSignals.JOIN_SESSION)
    }
  })

  useEffect(() => {
    let interval = null

    if (autoScroll) {
      interval = setInterval(() => {
        window.scrollBy({ top: 1, behavior: "smooth" })
      }, 100)
    }
    return () => {
      clearInterval(interval)
    }
  }, [autoScroll])

  // SOCKET
  // listening
  useEffect(() => {
    socket.on(SocketSignals.SESSION_ENDED, () => {
      localStorage.removeItem("sessionStarted")
      sessionStorage.removeItem("joinedSession")
      navigate("/")
    })

    return () => {
      socket.off(SocketSignals.SESSION_ENDED) // to not listen twice
    }
  }, [navigate])

  useEffect(() => {
    if (!songId) return
    import(`../songs/${songId}.json`)
      .then((module) => {
        setSongContent(module.default)
      })
      .catch((err) => {
        console.error("Failed to load song file:", err)
      })
  }, [songId])

  if (!songId) {
    return <p>No song selected.</p>
  }

  if (!songContent) {
    return <p>Loading song...</p>
  }

  return (
    <>
      <LogoutButton />
      <div className="livepage-container">
        <SongHeader song={songInfo} />
        <SongLyrics content={songContent} isSinger={isSinger} />
        <Button
          className="floating-toggle"
          onClick={() => setAutoScroll(!autoScroll)}
        >
          {autoScroll ? "Stop Scrolling" : "Start Scrolling"}
        </Button>
        {isAdmin && <Button onClick={handleQuitButton}>Quit</Button>}
      </div>
    </>
  )
}
