import { observer } from "mobx-react";
import React from "react";
import { Loader } from "../../components/Loader.js";
import { useStores } from "../../data/store/RootStore.js";
import { HomePage } from "../home/HomePage.js";
// import LoginPage from "../login/LoginPage.js";
// import { LoginPage } from "../login/LoginPage.js";

const LoginPage = React.lazy(() => import("../login/LoginPage.js"));

export const MainPage = observer(() => {
  const { sessionStore, userStore } = useStores();

  return sessionStore.isAuthenticated() ? (
    userStore.isUserStoreReady() ? (
      <HomePage></HomePage>
    ) : (
      <Loader></Loader>
    )
  ) : (
    <React.Suspense fallback={<Loader></Loader>}>
      <LoginPage></LoginPage>
    </React.Suspense>
  );
});
