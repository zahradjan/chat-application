import { inject, Observer, observer, useObserver } from "mobx-react";
import { useState } from "react";
import { useStores } from "../../data/store/RootStore.js";
import HomePage from "../home/HomePage.js";
import LoginPage from "../login/LoginPage.js";
function MainPage() {
  //TODO: mobx set user way

  const { userStore, sessionStore } = useStores();

  return <Observer>{() => (!sessionStore.isAuthenticated() ? <LoginPage /> : <HomePage></HomePage>)}</Observer>;
}

export default inject("store")(observer(MainPage));
