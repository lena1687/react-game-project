import React from "react";
import ReactDOM from "react-dom";
import "./index.sass";
import { HashRouter } from "react-router-dom";
import { App } from "./App";

ReactDOM.render(
  <HashRouter basename={window.location.pathname || ""}>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
