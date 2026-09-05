import { useState } from "react";
import "./createFileModel.css";

export default function CreateFileModal({ open, onClose, onCreate }) {
  const [fileName, setFileName] = useState("");

  if (!open) return null;

  const handleCreate = async () => {
    if (!fileName.trim()) return;

    try {
      await onCreate(fileName);

      setFileName("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="create-modal">
        <h2>Create New File</h2>

        <p className="modal-subtitle">
          Enter the name of your new workspace file.
        </p>

        <input
          className="file-input"
          placeholder="Example: Main.java"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreate();
            }
          }}
        />

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="create-btn" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
