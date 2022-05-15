import {useCallback, useEffect, useState} from "react";
import {httpClient} from "../services/HttpService";
import {AuthContext, AuthContextProps, useAuth} from "../services/AuthService";
import React from "react";

export function Login() {


  const context = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitFailed, setSubmitFailed] = useState(false);

  const onSubmitLogin = useCallback(
    async () => {
      if (context) {
        console.log("OnSubmitLogin :", email, password);
        let loginSuccess = await context.handleLogin(email, password);
        if (!loginSuccess) {
          console.log("Setting submit failed");
          setSubmitFailed(true);
        }
      }
      else {
        console.log("Context is null");
      }
    }
    , [email, password, context, setSubmitFailed])


  return (
    <div>
      <div className="doggrcenter doggr-section-text">Login</div>
      <div>
        {submitFailed ? (
            <div className="doggr-warning">SUBMIT FAILED!</div>
          )
          : null}
      </div>
      <div>
        <label className="label" htmlFor="email">Email</label>

        <input
          className={"input input-bordered max-w-2xs"}
          type="text"
          id="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
        />
      </div>

      <div>
        <label className="label" htmlFor="password">Password</label>
        <input
          type="text"
          className={"input input-bordered max-w-2xs"}
          id="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          name="password"
        />
      </div>

      <div className={"doggrFlexCenter"}>
        {/*<button className={"doggrbtn mt-2"} onClick={async () => {*/}
        {/*  await onSubmitLogin();*/}
        {/*}}>*/}
        <button className={"doggrbtn mt-2"} onClick={onSubmitLogin}>
          Submit
        </button>
      </div>
    </div>
  );
}
