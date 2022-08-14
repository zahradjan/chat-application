import { observer } from "mobx-react";
import React, { useCallback, useRef } from "react";
import { ErrorColor } from "../../constants/constants.js";
import { useStores } from "../../data/store/RootStore.js";
import DecentioLogo from "../../icons/decentioLogoLight.png";
import "./LoginPageStyle.css";
const LoginPage = observer(() => {
  const { userStore, sessionStore, monitorStore } = useStores();
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  const onLoginSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const userName = userNameRef.current.value;
      const password = passwordRef.current.value;
      console.log(userName);
      if (userName === "") return;
      if (password === "") return;
      const registeredUser = monitorStore.userAlreadyExist(userName);
      if (registeredUser) {
        if (password !== registeredUser.payload.value.data.user.password) {
          monitorStore.setErrorMessage("Password incorrect!");
        } else {
          await sessionStore.login(userName);
          //TODO: registeredUser save in userstore as this user
          await userStore.setUser(registeredUser.payload.value);
          await monitorStore.removeDuplicateUser(registeredUser);
          // await store.initDbStores();
        }
      } else {
        monitorStore.setErrorMessage("User not found!");
      }

      console.log(userStore.getAllProfileFields());
    },
    [sessionStore, userStore, monitorStore]
  );

  const onSingUpSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const userName = userNameRef.current.value;
      const password = passwordRef.current.value;
      console.log(userName);
      if (userName === "") return;
      if (password === "") return;
      const registeredUser = monitorStore.userAlreadyExist(userName);
      if (registeredUser) {
        monitorStore.setErrorMessage("User already exist!");
      } else {
        await sessionStore.login(userName);
        // await store.initDbStores();
        await userStore.createUser(userName, password);
      }

      console.log(userStore.getAllProfileFields());
    },
    [sessionStore, userStore, monitorStore]
  );
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div>
        <img alt="logo" width={550} height={450} src={DecentioLogo}></img>
        {monitorStore.isLoginForm() ? (
          <form onSubmit={onLoginSubmit} className="loginForm">
            <div>
              <input ref={userNameRef} placeholder="Enter your name" className="loginFormInput" name="Username"></input>
            </div>
            <div>
              <input ref={passwordRef} placeholder="Enter your password" className="loginFormInput" name="Password" type={"password"}></input>
            </div>
            <button className="submitButton" type="submit">
              Sign in
            </button>
            <p>
              New to Decentio?
              <button style={{ background: "none", border: "none" }} onClick={() => monitorStore.setSignUpForm()}>
                Sign up!
              </button>
            </p>
            {monitorStore.errorMessage ? <p style={{ color: ErrorColor }}>{monitorStore.errorMessage}</p> : null}
          </form>
        ) : (
          <form onSubmit={onSingUpSubmit} className="loginForm">
            <div>
              <input ref={userNameRef} placeholder="Enter your name" className="loginFormInput" name="Username"></input>
            </div>
            <div>
              <input ref={passwordRef} placeholder="Enter your password" className="loginFormInput" name="Password" type={"password"}></input>
            </div>
            <button className="submitButton" type="submit">
              Sign up
            </button>
            <p>
              Already registered?
              <button style={{ background: "none", border: "none" }} onClick={() => monitorStore.setLoginForm()}>
                Sign in!
              </button>
            </p>
            {monitorStore.errorMessage ? <p style={{ color: ErrorColor }}>{monitorStore.errorMessage}</p> : null}
          </form>
        )}
      </div>
    </div>
  );
});
export default LoginPage;
