import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./i18n";
import "./index.css";
import "./styles/rich-text.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Suspense fallback={<div className="suspense"></div>}>
    <App />
  </Suspense>
);
