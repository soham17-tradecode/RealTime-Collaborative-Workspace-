import { useState } from "react";
import "./RunControls.css";

export default function RunControls({ running, onRun, onStop }) {
  return (
    <div className="run-controls">
      <button className="run-btn" disabled={running} onClick={onRun}>
        ▶ Run
      </button>

      <button className="stop-btn" disabled={!running} onClick={onStop}>
        ■ Stop
      </button>

      <span className="run-status">{running ? "Running..." : "Idle"}</span>
    </div>
  );
}
