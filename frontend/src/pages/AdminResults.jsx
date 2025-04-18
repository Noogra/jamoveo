import socket from "../sockets/socket.js"
import { SocketSignals } from "../utils/socketSignals.js"
import "./AdminResults.css"

import { useEffect, useState } from "react"
import SongList from "../components/song/SongList.jsx"
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
    socket.emit(SocketSignals.SELECTED_SONG, songId) // send to server
    navigate("/live", { state: { songId } })
  }

  return (
    <div className="results-container">
      <h2 className="results-title">Results for: "{query}"</h2>
      <SongList results={results} onSelect={handleSongSelect} />
    </div>
  )
}
