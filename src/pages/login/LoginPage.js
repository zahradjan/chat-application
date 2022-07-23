import { observer } from "mobx-react";
import React, { useCallback, useRef } from "react";
import { useStores } from "../../data/store/RootStore.js";
import DecentioLogo from "../../icons/decentioLogoLight.png";

export const LoginPage = observer(() => {
<<<<<<< HEAD:src/pages/login/LoginPage.js
  const { userStore, sessionStore } = useStores();
=======
  const { userStore, sessionStore, dataStore, channelStore } = useStores();
>>>>>>> 3a1368f (Channel store with orbitdb message store):decentio-orbitdb/src/pages/login/LoginPage.js
  const userNameRef = useRef(null);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const userName = userNameRef.current.value;
      console.log(userName);
      if (userName !== "") {
        await sessionStore.login(userName);
<<<<<<< HEAD:src/pages/login/LoginPage.js
=======
        await dataStore.init();
        await userStore.init();
        await channelStore.init();
>>>>>>> 3a1368f (Channel store with orbitdb message store):decentio-orbitdb/src/pages/login/LoginPage.js
        await userStore.updateUserField("username", userName);
        console.log(userStore.getAllProfileFields());
      }
    },
<<<<<<< HEAD:src/pages/login/LoginPage.js
    [sessionStore, userStore]
=======
    [sessionStore, userStore, dataStore, channelStore]
>>>>>>> 3a1368f (Channel store with orbitdb message store):decentio-orbitdb/src/pages/login/LoginPage.js
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
        <form onSubmit={onSubmit}>
          <div>
            <input ref={userNameRef} name="Username"></input>
          </div>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
});
// export default inject("store")(observer(LoginPage));
