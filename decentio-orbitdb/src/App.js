import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { store, StoresContext, useStores } from "./data/store/RootStore.js";
import "./themes/default/main.scss";
import { inject, observer, Provider } from "mobx-react";
import MainPage from "./pages/main/MainPage.js";
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

inject("store")(observer(AppView));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>{<AppView></AppView>}</Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
