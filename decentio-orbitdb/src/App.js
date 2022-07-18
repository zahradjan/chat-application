import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { store, StoresContext, useStores } from "./data/store/RootStore.js";
import "./themes/default/main.scss";
import { MainPage } from "./pages/main/MainPage.js";
function AppView() {
  //TODO: USER from database if it is possible not simply from cookies

  const { dataStore } = useStores();
  console.log(dataStore.ipfsNode);
  return (
    <React.Suspense fallback={<p>Loading</p>}>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
      </Routes>
    </React.Suspense>
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
