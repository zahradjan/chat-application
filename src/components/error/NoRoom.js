import { ContentColorLight } from "../../constants/constants.js";
import DecentioLogo from "../../icons/decentioLogoLight.png";

export const NoRoom = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ContentColorLight,
      }}
    >
      <div>
        <img alt="logo" width={350} height={250} src={DecentioLogo}></img>
        <h3>You have no selected room</h3>
      </div>
    </div>
  );
};
