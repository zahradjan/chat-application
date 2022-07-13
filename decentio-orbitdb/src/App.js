import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/main/MainPage.js";
import React, { useEffect, useState } from "react";
import RootStore, { StoresContext, useStores } from "./data/store/RootStore.js";
import { Provider, Observer } from "mobx-react";
import "./themes/default/main.scss";
function AppView() {
  const { sessionStore: sessionStorage, mainStore: mainStorage } = useStores();
  // mainStorage.init();
  useEffect(() => {
    const initStorages = async () => {
      await mainStorage.init();
    };
    initStorages();
  });
  if (!sessionStorage._user) sessionStorage.loadFromCache();
  //TODO: USER from database if it is possible not simply from cookies
  // console.log(rootStorage.sessionStorage.isAuthenticated());
  // console.log(rootStorage.sessionStorage.loadFromCache());
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
      <Provider store={useStores}>
        <BrowserRouter>{<Observer>{() => <AppView></AppView>}</Observer>}</BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
