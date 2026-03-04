import { whenOnce } from "@arcgis/core/core/reactiveUtils.js";
import VersioningState from "@arcgis/core/versionManagement/VersioningState.js";

import "@esri/calcite-components/components/calcite-action";
import "@esri/calcite-components/components/calcite-action-bar";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-shell-panel";

import { useEffect, useState } from "react";

export type ActiveTool =
  | "validateTopology"
  | "versionManagement"
  | "trace"
  | "traceAnalysis"
  | "editor"
  | "associations"
  | null;

type AppProps = { webmapId: string };

export default function App({ webmapId }: AppProps): React.JSX.Element {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [versioningState, setVersioningState] = useState<VersioningState | undefined>(undefined);

  useEffect(() => {
    if (activeTool !== "versionManagement") {
      return;
    }

    const arcgisVersionManagement = document.querySelector("arcgis-version-management");
    if (!arcgisVersionManagement) {
      return;
    }

    whenOnce(() => arcgisVersionManagement.state === "ready").then(() =>
      setVersioningState(arcgisVersionManagement.versioningStates.at(0)),
    );
  }, [activeTool]);

  const startEditing = async (): Promise<void> => {
    if (versioningState?.isDefault) {
      alert("Cannot perform edits on default version.");
      return;
    }

    try {
      const result = await versioningState?.startEditing();
      if (result?.success) {
        alert("Start editing was successful.");
        setIsEditing(true);
      } else {
        alert("Start editing failed.");
      }
    } catch (error) {
      alert(String(error));
    }
  };

  const saveEdits = async (): Promise<void> => {
    if (versioningState?.isDefault) {
      alert("Cannot perform edits on default version.");
      return;
    }

    try {
      const result = await versioningState?.stopEditing(true);
      if (result?.success) {
        alert("Stop editing was successful.");
        setIsEditing(false);
      } else {
        alert("Stop editing failed.");
      }
    } catch (error) {
      alert(String(error));
    }
  };

  const undo = async (): Promise<void> => {
    if (versioningState?.isDefault) {
      alert("Cannot perform edits on default version.");
      return;
    }

    await versioningState?.undo();
  };

  const redo = async (): Promise<void> => {
    if (versioningState?.isDefault) {
      alert("Cannot perform edits on default version.");
      return;
    }

    await versioningState?.redo();
  };

  return (
    <calcite-shell content-behind>
      <arcgis-map item-id={webmapId}>
        <arcgis-zoom slot="bottom-right"></arcgis-zoom>
        {renderActiveTool(activeTool)}
      </arcgis-map>

      <calcite-shell-panel slot="panel-start" display-mode="float-content">
        <calcite-action-bar slot="action-bar">
          <calcite-action
            onClick={() => setActiveTool("versionManagement")}
            icon="code-branch"
            text="Version Management"
          />
          <calcite-action
            onClick={() => setActiveTool("validateTopology")}
            icon="validate-utility-network-topology"
            text="Validate Topology"
          />
          <calcite-action onClick={() => setActiveTool("trace")} icon="utility-network-trace" text="Trace" />
          <calcite-action
            onClick={() => setActiveTool("traceAnalysis")}
            icon="geometric-network"
            text="Trace Analysis"
          />
          <calcite-action
            onClick={() => setActiveTool("associations")}
            icon="view-associations"
            text="View Associations"
          />
          <calcite-action onClick={() => setActiveTool("editor")} icon="pencil-square" text="Editor" />
          <calcite-action
            onClick={startEditing}
            id="start-edit-action"
            icon="edit-geometry"
            text="Start editing"
            disabled={isEditing || !versioningState}
          />
          <calcite-action onClick={saveEdits} icon="save-as" text="Stop editing" disabled={!isEditing} />
          <calcite-action onClick={undo} icon="undo" text="Undo" disabled={!isEditing} />
          <calcite-action onClick={redo} icon="redo" text="Redo" disabled={!isEditing} />
        </calcite-action-bar>
      </calcite-shell-panel>
    </calcite-shell>
  );
}

function renderActiveTool(toolName: ActiveTool): React.JSX.Element | null {
  const slot = "top-right";

  switch (toolName) {
    case "validateTopology":
      return <arcgis-utility-network-validate-topology slot={slot}></arcgis-utility-network-validate-topology>;
    case "versionManagement":
      return <arcgis-version-management slot={slot}></arcgis-version-management>;
    case "trace":
      return <arcgis-utility-network-trace slot={slot}></arcgis-utility-network-trace>;
    case "traceAnalysis":
      return <arcgis-utility-network-trace-analysis slot={slot}></arcgis-utility-network-trace-analysis>;
    case "associations":
      return <arcgis-utility-network-associations slot={slot}></arcgis-utility-network-associations>;
    case "editor":
      return <arcgis-editor slot={slot}></arcgis-editor>;
    default:
      return null;
  }
}
