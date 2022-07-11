import DecentioLogo from "../../icons/decentioLogoLight.png";
import { Observer } from "mobx-react";
import { useState } from "react";
import { HomePage } from "../home/HomePage.js";
import { useStores } from "../../data/storages/RootStorage.js";
export function SingUpPage() {
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
  const onChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setUserName(e.target.value);
  };
  // console.log(sessionStorage.isAuthenticated);
  return (
    <Observer>
      {() =>
        !sessionStorage.isAuthenticated() ? (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <div>
              <img alt="logo" width={550} height={450} src={DecentioLogo}></img>
              <form onSubmit={onSubmit}>
                <div>
                  <input name="Username" onChange={onChange}></input>
                </div>
                <button type="submit">Sign in</button>
              </form>
            </div>
          </div>
        ) : (
          <HomePage></HomePage>
        )
      }
    </Observer>
  );
}
