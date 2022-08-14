import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { store, StoresContext } from "./data/store/RootStore.js";
import "./themes/default/main.scss";
import { MainPage } from "./pages/main/MainPage.js";
import { ModalProvider } from "react-modal-hook";
// window.LOG = "orbit*";
function AppView() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <StoresContext.Provider value={store}>{<AppView></AppView>}</StoresContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
