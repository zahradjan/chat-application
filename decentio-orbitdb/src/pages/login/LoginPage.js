import React from "react";
import DecentioLogo from "../../icons/decentioLogoLight.png";

export function LoginPage({ onSubmit, setUserName }) {
  const onChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setUserName(e.target.value);
  };
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
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
  );
}
