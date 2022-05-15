import {useEffect, useState} from "react";
import { httpClient} from  "../services/HttpService";
import {AuthContext, AuthContextProps, useAuth} from "../services/AuthService";
import React from "react";

export function Login() {


  const context = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitFailed, setSubmitFailed] = useState(false);

  async function onSubmitLogin() {
    if (context) {
      let loginSuccess = await context.handleLogin(email, password);
      if (!loginSuccess) {
        console.log("Setting submit failed")
        setSubmitFailed(true)
      }
    }
  }


  return (
    <>
      { submitFailed ? (
          <div><h3>SUBMIT FAILED</h3></div>
        )
        : null }

      <div>
        <label htmlFor="email">Email</label>

        <input
          type="text"
          id="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          name="password"
        />
      </div>

      <button onClick={async () => {await onSubmitLogin();}}>
        Submit
      </button>
    </>
  )
}
