export default function EditorToolbar({ onRun, running }) {
  return (
    <div className="editor-toolbar">
      <button onClick={onRun} disabled={running}>
        {running ? "Running..." : "▶ Run"}
      </button>
    </div>
  );
}
