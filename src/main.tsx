import React from "react";
import ReactDOM from "react-dom/client";
import "./design-system/tokens/tokens.css";
import "./design-system/tokens/global.css";
import LeadPage from "./features/lead/LeadPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LeadPage />
  </React.StrictMode>
);
