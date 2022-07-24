import { observer } from "mobx-react";
import { Grid } from "react-loader-spinner";
import { PrimaryColor } from "../../constants/constants.js";
import { useStores } from "../../data/store/RootStore.js";
import { HomePage } from "../home/HomePage.js";
import { LoginPage } from "../login/LoginPage.js";
export const MainPage = observer(() => {
  const { sessionStore, userStore } = useStores();

  // console.log("JSEM TU");
  return userStore.isUserStoreReady() ? (
    sessionStore.isAuthenticated() ? (
      <HomePage />
    ) : (
      <LoginPage />
    )
  ) : (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Grid ariaLabel="loading-indicator" color={PrimaryColor} />
    </div>
  );
});
