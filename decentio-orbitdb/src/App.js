import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
// import { initDatabase } from "./data/database/database.js";
function App() {
  // initDatabase();

  return (
    <div className="App">
      <HomePage></HomePage>
      {/* <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
      <Route path="/chat"></Route> */}
    </div>
  );
}

export default App;
