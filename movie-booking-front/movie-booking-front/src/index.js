import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {GlobalContext} from './contexApi/changeContex'
import App from './App';
ReactDOM.render(
  <GlobalContext>
  <App/>
  </GlobalContext>,
  document.getElementById("root")
  );