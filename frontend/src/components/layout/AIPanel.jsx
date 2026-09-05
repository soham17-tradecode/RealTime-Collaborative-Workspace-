import { useState } from "react";
import { chatWithAI } from "./aiapi";
import "./AIPanel.css";

function AIPanel({ roomCode, selectedFile, fileContents }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      setResponse("");

      const fileName = selectedFile || "";

      const extension = fileName.includes(".")
        ? fileName.split(".").pop().toLowerCase()
        : "";

      let language = "text";

      switch (extension) {
        case "java":
          language = "java";
          break;

        case "js":
          language = "javascript";
          break;

        case "jsx":
          language = "javascript";
          break;

        case "ts":
          language = "typescript";
          break;

        case "tsx":
          language = "typescript";
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

        case "html":
          language = "html";
          break;

        case "css":
          language = "css";
          break;

        case "sql":
          language = "sql";
          break;

        case "json":
          language = "json";
          break;

        default:
          language = "text";
      }

      const currentFile = fileName;

      const selectCode = selectedFile ? fileContents[selectedFile] || "" : "";

      const result = await chatWithAI({
        prompt,
        language,
        currentFile,
        selectCode,
        roomCode,
      });

      setResponse(result.data.answer || "No response received.");
    } catch (error) {
      console.error("AI Error:", error);

      if (error.response) {
        setResponse(
          error.response.data?.message ||
            "AI request failed. Check the backend.",
        );
      } else {
        setResponse("Unable to connect to AI backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-panel">
      <div className="ai-header">
        <span>🤖 AI Assistant</span>
      </div>

      <div className="ai-context">
        {selectedFile ? (
          <>
            <div>
              <strong>File:</strong> {selectedFile}
            </div>

            <div>
              <strong>Code:</strong>{" "}
              {fileContents[selectedFile] ? "Attached" : "No code loaded"}
            </div>
          </>
        ) : (
          <div>No file selected</div>
        )}
      </div>

      <div className="ai-response">
        {loading ? (
          <div className="ai-loading">🤖 Thinking...</div>
        ) : response ? (
          <pre>{response}</pre>
        ) : (
          <div className="ai-empty">
            Ask the AI something about your workspace.
          </div>
        )}
      </div>

      <div className="ai-input-area">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAskAI();
            }
          }}
        />

        <button onClick={handleAskAI} disabled={loading || !prompt.trim()}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default AIPanel;
