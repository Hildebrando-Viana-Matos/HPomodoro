import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Styles
import "./styles/global.scss";

// Firebase
import "./services/firebase";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
