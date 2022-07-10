import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { SingUpPage } from "./pages/signup/SignUpPage.jsx";
import SessionStorage from "./data/storages/SessionStorage.js";
import MainStorage from "./data/database/MainStorage.js";
import { useState } from "react";
const session = new SessionStorage();
const mainStorage = new MainStorage(session);
mainStorage.init();
function App() {
  if (mainStorage.ipfsNode) console.log(mainStorage.orbitDb.id);
  const [user, setUser] = useState("");
  //TODO: USER from database if it is possible not simply from cookies
  console.log(session.isAuthenticated());
  const onLogin = async (username) => {
    // e.preventDefault();
    console.log(username);
    if (user !== "") {
      console.log("jsem tu ");
      await session._setUser(user);
    }
    console.log("SessionUser: " + session._user);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={session.isAuthenticated ? <SingUpPage onSubmit={onLogin} setUser={setUser} /> : <HomePage session={session} />}
        ></Route>
        {/* <Route path="/home" element={<HomePage />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
