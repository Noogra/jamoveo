import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from "../components/button/Button"
import Input from "../components/input/Input"

export default function AdminMain() {
  const [searchText, setSearchText] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    if (searchText.trim() === "") return
    navigate(`/main/admin/results?query=${encodeURIComponent(searchText)}`)
  }

  return (
    <div className="container">
      <h2>Search any song...</h2>
      <Input
        type="text"
        placeholder="Type song or artist"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  )
}
