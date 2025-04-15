import "./SongHeader.css"

export default function SongHeader({ song }) {
  if (!song) return null

  return (
    <div className="song-header">
      <h1 className="song-full-title">
        {song.title} <span className="by">by</span> {song.artist}
      </h1>
    </div>
  )
}
