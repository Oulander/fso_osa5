import React from 'react'
import Notification from './Notification'

const Login = (props) => (
  <form onSubmit={props.login}>
    <div>
      Username
      <input
        type="text"
        name="username"
        value={props.username}
        onChange={props.onChange}
      />
    </div>
    <div>
      Password
      <input
        type="password"
        name="password"
        value={props.password}
        onChange={props.onChange}
      />
    </div>
    <button type="submit">Log in</button>
    <Notification message={props.failureMessageState} notifType="failure"/>
  </form>
)

export default Login
