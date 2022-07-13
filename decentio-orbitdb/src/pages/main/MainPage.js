import { Observer } from "mobx-react";
import { useEffect, useState } from "react";
import { StoresContext, useStores } from "../../data/store/RootStore.js";
import { HomePage } from "../home/HomePage.js";
// import { useStores } from "../../data/storages/RootStorage.js";
import { LoginPage } from "../login/LoginPage.js";
export function MainPage() {
  //TODO: mobx set user way
  const [userName, setUserName] = useState("");

  const { sessionStore: sessionStorage, userStore: userStorage } = useStores();
  useEffect(() => {
    const initStorages = async () => {
      await userStorage.init();
    };

    initStorages();
    // console.log("OrbitDbUser: " + userStorage.getAllProfileFields());
  });
  // console.log("SessionUser: " + sessionStorage._user);
  const onSubmit = async (e) => {
    // e.preventDefault();
    console.log(userName);
    if (userName !== "") {
      console.log("jsem tu ");
      await sessionStorage.login(userName);
      await userStorage.updateProfileField("username", userName);
    }

    // console.log("SessionUser: " + sessionStorage._user);
    // console.log(rootStorage.sessionStorage.isAuthenticated());
  };

  // console.log(sessionStorage.isAuthenticated);
  return (
    <Observer>
      {() => (!sessionStorage.isAuthenticated() ? <LoginPage onSubmit={onSubmit} setUserName={setUserName} /> : <HomePage></HomePage>)}
    </Observer>
  );
}
