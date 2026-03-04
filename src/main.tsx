import "./index.css";

import esriConfig from "@arcgis/core/config.js";

import "@arcgis/map-components/components/arcgis-editor";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-utility-network-associations";
import "@arcgis/map-components/components/arcgis-utility-network-trace";
import "@arcgis/map-components/components/arcgis-utility-network-trace-analysis";
import "@arcgis/map-components/components/arcgis-utility-network-validate-topology";
import "@arcgis/map-components/components/arcgis-version-management";
import "@arcgis/map-components/components/arcgis-zoom";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

esriConfig.portalUrl = "https://myHostName.esri.com/arcgis";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App webmapId={"471eb0bf37074b1fbb972b1da70fb310"}></App>
  </StrictMode>,
);
