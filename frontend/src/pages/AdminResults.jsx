import socket from "../sockets/socket.js"

import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { songList } from "../songs/songList"

export default function AdminResults() {
  const [searchParams] = useSearchParams()
  const [results, setResults] = useState([])
  const navigate = useNavigate()

  const query = searchParams.get("query") || ""

  useEffect(() => {
    const text = query.toLowerCase()
    const filtered = songList.filter(
      (song) =>
        song.title.toLowerCase().includes(text) ||
        song.artist.toLowerCase().includes(text)
    )
    setResults(filtered)
  }, [query])

  const handleSongSelect = (songId) => {
    socket.emit("live-song", songId) // send to server
    navigate("/main/live", { state: { songId } })
  }

  return (
    <div className="container">
      <h2>Results for: "{query}"</h2>
      {results.length > 0 ? (
        results.map((song) => (
          <div
            key={song.id}
            style={{
              padding: "10px",
              borderBottom: "1px solid #ccc",
              cursor: "pointer",
            }}
            onClick={() => handleSongSelect(song.id)}
          >
            <strong>{song.title}</strong> — {song.artist}
          </div>
        ))
      ) : (
        <p>No songs found.</p>
      )}
    </div>
  )
}
