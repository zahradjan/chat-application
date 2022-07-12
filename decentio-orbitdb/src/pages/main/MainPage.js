import { Observer } from "mobx-react";
import { useState } from "react";
import { HomePage } from "../home/HomePage.js";
import { useStores } from "../../data/storages/RootStorage.js";
import { LoginPage } from "../login/LoginPage.js";
export function MainPage() {
  //TODO: mobx set user way
  const [userName, setUserName] = useState("");
  const { sessionStorage } = useStores();
  console.log("SessionUser: " + sessionStorage._user);
  const onSubmit = async (e) => {
    // e.preventDefault();
    console.log(userName);
    if (userName !== "") {
      console.log("jsem tu ");
      await sessionStorage.login(userName);
    }
    console.log("SessionUser: " + sessionStorage._user);
    // console.log(rootStorage.sessionStorage.isAuthenticated());
  };

  // console.log(sessionStorage.isAuthenticated);
  return (
    <Observer>
      {() => (!sessionStorage.isAuthenticated() ? <LoginPage onSubmit={onSubmit} setUserName={setUserName} /> : <HomePage></HomePage>)}
    </Observer>
  );
}
