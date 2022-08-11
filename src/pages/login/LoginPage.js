import { observer } from "mobx-react";
import React, { useCallback, useRef } from "react";
import { ErrorColor } from "../../constants/constants.js";
import { store, useStores } from "../../data/store/RootStore.js";
import DecentioLogo from "../../icons/decentioLogoLight.png";
import "./LoginPageStyle.css";
const LoginPage = observer(() => {
  const { userStore, sessionStore, monitorStore } = useStores();
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const userName = userNameRef.current.value;
      const password = passwordRef.current.value;
      console.log(userName);
      if (userName === "") return;
      if (password === "") return;
      const registeredUser = monitorStore.userAlreadyExist(userName);
      if (registeredUser) {
        if (password !== registeredUser.user.password) {
          monitorStore.setErrorMessage("Password incorrect!");
        } else {
          await sessionStore.login(userName);
          // await store.initDbStores();
          await userStore.createUser(userName, password);
        }
      } else {
        monitorStore.setErrorMessage("User not found!");
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
        <form onSubmit={onSubmit} className="loginForm">
          <div>
            <input ref={userNameRef} placeholder="Enter your name" className="loginFormInput" name="Username"></input>
          </div>
          <div>
            <input ref={passwordRef} placeholder="Enter your password" className="loginFormInput" name="Password" type={"password"}></input>
          </div>
          <button className="submitButton" type="submit">
            Sign in
          </button>
          {monitorStore.errorMessage ? <p style={{ color: ErrorColor }}>{monitorStore.errorMessage}</p> : null}
        </form>
      </div>
    </div>
  );
});
export default LoginPage;
