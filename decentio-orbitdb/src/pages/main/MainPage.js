import { observer } from "mobx-react";
import { useCallback, useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { PrimaryColor } from "../../constants/constants.js";
import { useStores } from "../../data/store/RootStore.js";
import { HomePage } from "../home/HomePage.js";
import { LoginPage } from "../login/LoginPage.js";
export const MainPage = observer(() => {
  const [loading, setLoading] = useState(true);
  const { sessionStore, userStore, dataStore } = useStores();
  useEffect(() => {
    const initStores = async () => {
      await dataStore.init();
      await userStore.init().then(() => setLoading(false));
    };
    initStores();
  }, [userStore, dataStore]);
  return !loading ? (
    !sessionStore.isAuthenticated() ? (
      <LoginPage />
    ) : (
      <HomePage />
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
