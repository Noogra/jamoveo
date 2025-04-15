import "./Button.css"

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button className={`my-button ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  )
}
