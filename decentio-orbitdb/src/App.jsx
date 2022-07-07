import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { HomePage } from "./pages/HomePage.jsx";
function App() {
  return (
    <div className="App">
      <HomePage></HomePage>
      {/* <Router>
        <Route path="/" children={<HomePage></HomePage>}></Route>
        <Route path="/chat"></Route>
      </Router> */}
    </div>
  );
}

export default App;
