import DecentioLogo from "../../icons/decentioLogoLight.png";

export function SingUpPage() {
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <div>
        <img alt="logo" width={550} height={450} src={DecentioLogo}></img>
        <form>
          <input name="Username"></input>
        </form>
        <button>Sign in</button>
      </div>
    </div>
  );
}
