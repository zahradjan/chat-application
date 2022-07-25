import { Grid } from "react-loader-spinner";
import { PrimaryColor } from "../constants/constants.js";

export function Loader() {
  return (
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
}
