import "./Sidebar.css";

function Sidebar({ mode, setMode, leftPanel, setLeftPanel }) {
  const togglePanel = (panel) => {
    setLeftPanel((prev) => (prev === panel ? null : panel));
  };

  return (
    <div className="activity-bar">
      {/* Workspaces */}

      <button
        className={mode === "editor" ? "activity-btn active" : "activity-btn"}
        title="Editor"
        onClick={() => setMode("editor")}
      >
        💻
      </button>

      <button
        className={mode === "chat" ? "activity-btn active" : "activity-btn"}
        title="Chat"
        onClick={() => setMode("chat")}
      >
        💬
      </button>

      <div className="sidebar-divider"></div>

      {/* Tools */}

      <button
        className={
          leftPanel === "files" ? "activity-btn active" : "activity-btn"
        }
        title="Files"
        onClick={() => togglePanel("files")}
      >
        📁
      </button>

      <button
        className={
          leftPanel === "activity" ? "activity-btn active" : "activity-btn"
        }
        title="Activity"
        onClick={() => togglePanel("activity")}
      >
        📋
      </button>

      <button
        className={leftPanel === "ai" ? "activity-btn active" : "activity-btn"}
        title="AI Assistant"
        onClick={() => togglePanel("ai")}
      >
        🤖
      </button>
    </div>
  );
}

export default Sidebar;
