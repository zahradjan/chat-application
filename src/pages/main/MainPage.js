import { observer } from "mobx-react";
import React from "react";
import { ModalProvider } from "react-modal-hook";
import { Loader } from "../../components/Loader.js";
import { useStores } from "../../data/store/RootStore.js";
import { HomePage } from "../home/HomePage.js";

const LoginPage = React.lazy(() => import("../login/LoginPage.js"));

export const MainPage = observer(() => {
  const { sessionStore, monitorStore } = useStores();

  return monitorStore.isMonitorReady() ? (
    sessionStore.isAuthenticated() ? (
      <ModalProvider>
        <HomePage></HomePage>
      </ModalProvider>
    ) : (
      <React.Suspense fallback={<Loader></Loader>}>
        <LoginPage></LoginPage>
      </React.Suspense>
    )
  ) : (
    <Loader></Loader>
  );
});
