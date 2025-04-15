import "./Input.css"

export default function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  name,
  className = "",
  required = false,
}) {
  return (
    <input
      className={`my-input ${className}`}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  )
}
