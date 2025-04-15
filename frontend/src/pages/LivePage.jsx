import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import socket from "../sockets/socket"
import { songList } from "../songs/songList"

import Button from "../components/button/Button"
import SongHeader from "../components/song/SongHeader"

export default function LivePage() {
  const location = useLocation()
  const navigate = useNavigate()

  const selectedSongId = location.state?.songId || null
  const [songId, setSongId] = useState(selectedSongId)
  const [songContent, setSongContent] = useState(null)
  const songInfo = songList.find((song) => song.id === songId)

  const user = JSON.parse(localStorage.getItem("user"))
  console.log("User in LivePage:", user)
  const instrument = user?.instrument
  const isSinger = instrument === "vocals"
  const isAdmin = user?.role === "admin"

  // SOCKET
  // listening
  useEffect(() => {
    socket.on("live-song", (newSongId) => {
      setSongId(newSongId)
      navigate("/main/live", { state: { sondId: newSongId } })
    })

    return () => {
      socket.off("live-song") // to not listen twice
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
    <div className="container">
      <h2>Live Page</h2>
      <SongHeader song={songInfo} />
      {songContent.map((line, i) => (
        <div className="line" key={i}>
          {line.map((word, j) => (
            <span className="word" key={j} style={{ marginRight: 6 }}>
              {word.lyrics}
              {word.chords && !isSinger && (
                <span className="chord">({word.chords})</span>
              )}
            </span>
          ))}
        </div>
      ))}
      {isAdmin && (
        <Button onClick={() => navigate("/main")} style={{ marginTop: "20px" }}>
          Quit
        </Button>
      )}
    </div>
  )
}
