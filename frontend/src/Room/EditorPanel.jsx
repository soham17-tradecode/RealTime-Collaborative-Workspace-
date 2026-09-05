import { useState, useEffect, useRef } from "react";
import MonacoEditorPanel from "../Editor/MonacoEditorPanel";
// import MonacoEditorYjs from "../Editor/MonacoEditorYjs";
import FileExplorer from "../FileExplorer/FileExplorer";
import MembersPanel from "./MembersPanel";
import StatusBar from "../Editor/StatusBar";
import ActivityFeed from "../components/ActivityFeed";
import "./EditorPanel.css";
import { sendPresence } from "../stomp/PresenceSocket";
import RunControls from "../Editor/RunControls";
import {
  executeCode,
  getExecutionResult,
  stopExecution,
} from "../Api/codeExecutionApi";
import TerminalPanel from "../Editor/TerminalPanel";
function EditorPanel({
  roomCode,
  selectedFile,
  setSelectedFile,
  openTabs,
  setOpenTabs,
  fileContents,
  setFileContents,
  dirtyFiles,
  setDirtyFiles,
  members,
  presence,
  cursor,
  setCursor,
  user,
  leaveRoom,
}) {
  const [terminalOutput, setTerminalOutput] = useState("");
  const [programInput, setProgramInput] = useState("");

  const [running, setRunning] = useState(false);

  const [executionId, setExecutionId] = useState(null);
  const [saveTrigger, setSaveTrigger] = useState(0);
  const pollingRef = useRef(null);

  const handleRun = async () => {
    if (!selectedFile) return;

    try {
      setRunning(true);
      setTerminalOutput("Running...");

      const extension = selectedFile.split(".").pop().toLowerCase();

      let language = "";

      switch (extension) {
        case "java":
          language = "java";
          break;
        case "py":
          language = "python";
          break;
        case "cpp":
          language = "cpp";
          break;
        case "c":
          language = "c";
          break;
        default:
          setTerminalOutput("Unsupported language");
          setRunning(false);
          return;
      }

      console.log("Program Input =", programInput);

      const id = await executeCode({
        language,
        fileName: selectedFile,
        code: fileContents[selectedFile],
        input: programInput,
      });
      console.log("Execution ID:", id);

      setExecutionId(id);

      startPolling(id);
    } catch (err) {
      console.error(err);

      setRunning(false);

      setTerminalOutput("Execution Failed");
    }
  };

  const startPolling = (id) => {
    pollingRef.current = setInterval(async () => {
      try {
        const response = await getExecutionResult(id);

        if (response.status === 202) {
          return;
        }

        clearInterval(pollingRef.current);

        setRunning(false);

        setTerminalOutput(
          response.data.output || response.data.error || "Execution Finished",
        );
      } catch (err) {
        clearInterval(pollingRef.current);

        setRunning(false);

        console.error(err);
      }
    }, 500);
  };

  const handleStop = async () => {
    if (!executionId) return;

    try {
      await stopExecution(executionId);

      clearInterval(pollingRef.current);

      setRunning(false);

      setTerminalOutput("Execution Stopped");
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileSelect = (fileName) => {
    setSelectedFile(fileName);

    sendPresence({
      roomCode,
      sender: user,
      fileName,
      status: "VIEWING",
    });

    setOpenTabs((prev) => {
      if (prev.includes(fileName)) return prev;
      return [...prev, fileName];
    });
  };

  useEffect(() => {
    if (selectedFile) {
      sendPresence({
        roomCode,
        sender: user,
        status: "VIEWING",
        fileName: selectedFile,
      });
    } else {
      sendPresence({
        roomCode,
        sender: user,
        status: "EDITOR",
        fileName: "",
      });
    }
  }, [selectedFile, roomCode, user]);

  const closeTab = (fileName) => {
    const updated = openTabs.filter((tab) => tab !== fileName);

    setOpenTabs(updated);

    if (selectedFile === fileName) {
      setSelectedFile(updated.length ? updated[updated.length - 1] : null);
    }
  };

  useEffect(() => {
    if (selectedFile && !openTabs.includes(selectedFile)) {
      setOpenTabs((prev) => [...prev, selectedFile]);
    }
  }, [selectedFile, openTabs, setOpenTabs]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();

        if (!selectedFile) return;

        setSaveTrigger((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedFile]);

  return (
    <div className="editor-layout">
      {/* ================= LEFT ================= */}

      <div className="editor-left">
        {/* ================= TOP BAR ================= */}

        <div className="editor-topbar">
          <div className="editor-tabs">
            {openTabs.map((fileName) => (
              <div
                key={fileName}
                className={
                  selectedFile === fileName ? "editor-tab active" : "editor-tab"
                }
                onClick={() => setSelectedFile(fileName)}
              >
                <span className="tab-icon">
                  {dirtyFiles[fileName] ? "●" : "📄"}
                </span>

                <span className="tab-name">{fileName}</span>

                <span
                  className="close-tab"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(fileName);
                  }}
                >
                  ×
                </span>
              </div>
            ))}
          </div>

          <div className="editor-actions">
            <button
              className="save-btn"
              onClick={() => {
                if (!selectedFile) return;
                setSaveTrigger((prev) => prev + 1);
              }}
            >
              💾 Save
            </button>

            <RunControls
              running={running}
              onRun={handleRun}
              onStop={handleStop}
            />
          </div>
        </div>

        {/* ================= EDITOR ================= */}

        <div className="editor-body">
          {selectedFile ? (
            <MonacoEditorPanel
              roomCode={roomCode}
              selectedFile={selectedFile}
              fileContents={fileContents}
              setFileContents={setFileContents}
              // dirtyFiles={dirtyFiles}
              setDirtyFiles={setDirtyFiles}
              saveTrigger={saveTrigger}
              user={user}
              // cursor={cursor}
              // setCursor={setCursor}
            />
          ) : (
            <div className="editor-empty">
              <h2>👋 Welcome</h2>
              <p>Open a file from the explorer.</p>
            </div>
          )}
        </div>
        <div
          style={{
            borderTop: "1px solid #333",
            background: "#1e1e1e",
            padding: "10px",
          }}
        >
          <div
            style={{
              color: "white",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Program Input
          </div>

          <textarea
            value={programInput}
            onChange={(e) => setProgramInput(e.target.value)}
            placeholder="Enter input for your program..."
            rows={4}
            style={{
              width: "100%",
              background: "#252526",
              color: "white",
              border: "1px solid #555",
              padding: "8px",
              resize: "vertical",
              fontFamily: "monospace",
            }}
          />
        </div>

        <TerminalPanel output={terminalOutput} />

        {/* ================= STATUS BAR ================= */}

        <StatusBar
          selectedFile={selectedFile}
          cursor={cursor}
          connected={true}
        />
      </div>

      {/* ================= RIGHT ================= */}

      <div className="editor-right">
        <MembersPanel
          members={members}
          presence={presence}
          user={user}
          leaveRoom={leaveRoom}
          mode="editor"
          roomCode={roomCode}
        />

        {/* <div className="right-files">
          <FileExplorer
            roomCode={roomCode}
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
          />
        </div> */}
      </div>
    </div>
  );
}

export default EditorPanel;
