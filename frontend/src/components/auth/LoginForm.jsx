import React from "react"
import Input from "../input/Input"
import Button from "../button/Button"

export default function LoginForm({ onSubmit, onChange }) {
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
      <div className="login-button-wrapper">
        <Button type="submit">Log In</Button>
      </div>
    </form>
  )
}
