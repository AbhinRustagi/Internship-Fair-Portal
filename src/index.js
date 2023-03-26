import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/global.scss";
import { initialState, reducer, StateProvider } from "./utils";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
