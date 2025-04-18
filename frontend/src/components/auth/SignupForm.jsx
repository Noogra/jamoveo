import React from "react"
import Button from "../button/Button"
import Input from "../input/Input"

export default function SignupForm({ userData, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        name="username"
        placeholder="Username"
        onChange={onChange}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        onChange={onChange}
        required
      />
      <select
        name="instrument"
        value={userData.instrument}
        onChange={onChange}
        required
        className="my-input"
      >
        <option value="">Choose your instrument</option>
        <option value="vocals">Vocals</option>
        <option value="guitar">Guitar</option>
        <option value="bass">Bass</option>
        <option value="keyboard">Keyboard</option>
        <option value="drums">Drums</option>
      </select>
      <Button type="submit">Sign Up</Button>
    </form>
  )
}
