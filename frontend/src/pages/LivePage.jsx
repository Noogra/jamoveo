import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import socket from "../sockets/socket"
import { songList } from "../songs/songList"
import "./LivePage.css"

import Button from "../components/button/Button"
import SongHeader from "../components/song/SongHeader"

export default function LivePage() {
  const location = useLocation()
  const navigate = useNavigate()

  const songId = location.state?.songId || null
  const [songContent, setSongContent] = useState(null)
  const [autoScroll, setAutoScroll] = useState(false)
  const songInfo = songList.find((song) => song.id === songId)

  const user = JSON.parse(localStorage.getItem("user"))
  const instrument = user?.instrument
  const isSinger = instrument === "vocals"
  const isAdmin = user?.role === "admin"

  const handleQuitButton = () => {
    socket.emit("end-session") // send to server
    navigate("/")
  }

  useEffect(() => {
    let interval = null

    if (autoScroll) {
      interval = setInterval(() => {
        window.scrollBy({ top: 0.4, behavior: "smooth" })
      })
    }
    return () => {
      clearInterval(interval)
    }
  }, [autoScroll])

  // SOCKET
  // listening
  useEffect(() => {
    socket.on("session-ended", () => {
      navigate("/")
    })

    return () => {
      socket.off("session-ended") // to not listen twice
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
    <div className="livepage-container">
      <h2>Live Page</h2>
      <SongHeader song={songInfo} />
      {songContent.map((line, i) => (
        <div className="livepage-line" key={i}>
          {line.map((word, j) => (
            <span className="livepage-word" key={j} style={{ marginRight: 6 }}>
              {word.lyrics}
              {word.chords && !isSinger && (
                <span className="livepage-chord">({word.chords})</span>
              )}
            </span>
          ))}
        </div>
      ))}
      <button
        className="floating-toggle"
        onClick={() => setAutoScroll(!autoScroll)}
      >
        {autoScroll ? "Stop Scrolling" : "Start Scrolling"}
      </button>
      {isAdmin && <Button onClick={handleQuitButton}>Quit</Button>}
    </div>
  )
}
