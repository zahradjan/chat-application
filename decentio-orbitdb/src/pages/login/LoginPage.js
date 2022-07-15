import { inject, observer } from "mobx-react";
import React, { useRef } from "react";
import { useStores } from "../../data/store/RootStore.js";
import DecentioLogo from "../../icons/decentioLogoLight.png";

function LoginPage() {
  const { userStore, sessionStore } = useStores();
  const userNameRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const userName = userNameRef.current.value;
    console.log(userName);
    if (userName !== "") {
      await sessionStore.login(userName);
      await userStore.updateProfileField("username", userName);
      console.log(userStore.getAllProfileFields());
    }
  };
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
        <form onSubmit={onSubmit}>
          <div>
            <input ref={userNameRef} name="Username"></input>
          </div>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}
export default inject("store")(observer(LoginPage));
