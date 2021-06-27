import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router";
import reportWebVitals from "./reportWebVitals";
import { GlobalStyles } from "./global-styles";
import { App } from "./modules/app/app";
import 'bootstrap/dist/css/bootstrap.css';
const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <GlobalStyles />
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
