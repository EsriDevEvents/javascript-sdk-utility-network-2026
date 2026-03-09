import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import esriConfig from "@arcgis/core/config.js";
esriConfig.portalUrl = "https://myHostName.esri.com/arcgis";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App webmapId={"471eb0bf37074b1fbb972b1da70fb310"}></App>
  </StrictMode>,
);
