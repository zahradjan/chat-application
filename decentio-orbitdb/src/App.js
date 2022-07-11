import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { SingUpPage } from "./pages/signup/SignUpPage.jsx";
import React, { useState } from "react";
import RootStorage, { useStores } from "./data/storages/RootStorage.js";
import { Provider, Observer } from "mobx-react";

function AppView() {
  const { sessionStorage } = useStores();
  console.log(!sessionStorage._user);
  if (!sessionStorage._user) sessionStorage.loadFromCache();
  //TODO: USER from database if it is possible not simply from cookies
  // console.log(rootStorage.sessionStorage.isAuthenticated());
  // console.log(rootStorage.sessionStorage.loadFromCache());
  console.log(sessionStorage._user);
  return (
    <React.Suspense fallback={<p>Loading</p>}>
      <Routes>
        <Route path="/" element={<SingUpPage />}></Route>
      </Routes>
    </React.Suspense>
  );
}

function App() {
  return (
    <div className="App">
      <Provider store={useStores()}>
        <BrowserRouter>{<Observer>{() => <AppView></AppView>}</Observer>}</BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
