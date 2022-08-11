import { observer } from "mobx-react";
import React, { useCallback, useRef } from "react";
import { ErrorColor } from "../../constants/constants.js";
import { store, useStores } from "../../data/store/RootStore.js";
import DecentioLogo from "../../icons/decentioLogoLight.png";
import "./LoginPageStyle.css";
const LoginPage = observer(() => {
  const { userStore, sessionStore, monitorStore } = useStores();
  const userNameRef = useRef(null);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const userName = userNameRef.current.value;
      console.log(userName);
      if (userName !== "") {
        if (!monitorStore.userAlreadyExist(userName)) {
          await sessionStore.login(userName);
          // await store.initDbStores();
          await userStore.createUser(userName);
        } else {
          monitorStore.userNameExist();
        }

        console.log(userStore.getAllProfileFields());
      }
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
