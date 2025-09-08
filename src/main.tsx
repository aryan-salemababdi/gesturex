import React from "react";
import ReactDOM from "react-dom/client";
import { HandScroll } from "./lib";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HandScroll showStatus={false}>
      <div style={{height:"3500px"}}>
      hello wotld
      </div>
    </HandScroll>
  </React.StrictMode>
);