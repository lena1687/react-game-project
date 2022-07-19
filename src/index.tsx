import React from "react";
import ReactDOM from "react-dom";
import "./index.sass";
import { HashRouter } from "react-router-dom";
import { App } from "./App";
import { Provider } from "react-redux";
import { setupStore } from "./redux/store";

ReactDOM.render(
  <Provider store={setupStore()}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
