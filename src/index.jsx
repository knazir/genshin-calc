import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";

import App from "./App";
import "./index.css";

// Analytics
// try {
//   ReactGA.initialize("G-SZJNJJP2JP");
//   ReactGA.pageview(`${window.location.pathname}${window.location.search}`);
// } catch { }

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
