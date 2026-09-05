import FileExplorer from "../FileExplorer/FileExplorer";
import ActivityFeed from "../components/ActivityFeed";
import AIPanel from "../components/layout/AIPanel";

import "./ToolPanel.css";

function ToolPanel({
  leftPanel,
  roomCode,
  selectedFile,
  onFileSelect,
  fileContents,
}) {
  return (
    <div
      className="tool-panel"
      style={{
        width: leftPanel ? "280px" : "0px",
        minWidth: leftPanel ? "280px" : "0px",
        overflow: "hidden",
        transition: "all 0.25s ease",
      }}
    >
      {/* FILES */}

      <div
        style={{
          display: leftPanel === "files" ? "block" : "none",
          height: "100%",
        }}
      >
        <FileExplorer
          roomCode={roomCode}
          selectedFile={selectedFile}
          onFileSelect={onFileSelect}
        />
      </div>

      {/* ACTIVITY */}

      <div
        style={{
          display: leftPanel === "activity" ? "block" : "none",
          height: "100%",
        }}
      >
        <ActivityFeed roomCode={roomCode} />
      </div>

      {/* AI */}

      <div
        style={{
          display: leftPanel === "ai" ? "block" : "none",
          height: "100%",
        }}
      >
        <AIPanel
          roomCode={roomCode}
          selectedFile={selectedFile}
          fileContents={fileContents}
        />
      </div>
    </div>
  );
}

export default ToolPanel;
