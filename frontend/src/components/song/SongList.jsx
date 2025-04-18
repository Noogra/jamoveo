import React from "react"
import "./SongList.css"

export default function SongList({ results, onSelect }) {
  return results.length > 0 ? (
    <div className="results-list">
      {results.map((song) => (
        <div
          className="song-card"
          key={song.id}
          onClick={() => onSelect(song.id)}
        >
          <img src={song.image} alt={song.title} className="song-card-image" />
          <div className="song-info">
            <div className="song-title">{song.title}</div>
            <div className="song-artist">{song.artist}</div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="no-results">No songs found.</p>
  )
}
