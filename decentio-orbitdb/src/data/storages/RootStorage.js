import React from "react";
import MainStorage from "../database/MainStorage.js";
import SessionStorage from "./SessionStorage.js";

export default class RootStorage {
  constructor() {
    this.sessionStorage = new SessionStorage(this);
    this.mainStorage = new MainStorage(this.sessionStorage);
  }
}
const StoresContext = React.createContext(new RootStorage());
export const useStores = () => React.useContext(StoresContext);
