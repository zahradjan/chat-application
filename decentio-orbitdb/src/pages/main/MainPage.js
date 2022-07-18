import { inject, observer } from "mobx-react";
import { useStores } from "../../data/store/RootStore.js";
import { HomePage } from "../home/HomePage.js";
import { LoginPage } from "../login/LoginPage.js";
export const MainPage = observer(() => {
  const { sessionStore } = useStores();

  return !sessionStore.isAuthenticated() ? <LoginPage /> : <HomePage />;
});
