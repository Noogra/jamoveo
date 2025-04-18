export default function SongLyrics({ content, isSinger }) {
  return content.map((line, i) => (
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
  ))
}
