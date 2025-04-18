import socket from "../sockets/socket.js"
import "./AdminResults.css"

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
    socket.emit("selected-song", songId) // send to server
    navigate("/live", { state: { songId } })
  }

  return (
    <div className="results-container">
      <h2 className="results-title">Results for: "{query}"</h2>
      {results.length > 0 ? (
        <div className="results-list">
          {results.map((song) => (
            <div
              className="song-card"
              key={song.id}
              onClick={() => handleSongSelect(song.id)}
            >
              <div className="song-title">{song.title}</div>
              <div className="song-artist">{song.artist}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No songs found.</p>
      )}
    </div>
  )
}
