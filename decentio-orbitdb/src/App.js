import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { SingUpPage } from "./pages/signup/SignUpPage.jsx";
import { ContentColorLight } from "./constants/constants.js";
// import { initDatabase } from "./data/database/database.js";
function App() {
  // initDatabase();
  return (
    <div className="App">
      <SingUpPage></SingUpPage>
      {/* <HomePage></HomePage> */}
      {/* <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
      <Route path="/chat"></Route> */}
    </div>
  );
}

export default App;
