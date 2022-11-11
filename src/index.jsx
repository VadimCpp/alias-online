import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import GlobalStyle from "./utils/globalStyle";

ReactDOM.render(
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
