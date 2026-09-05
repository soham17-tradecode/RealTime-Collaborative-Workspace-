import "./FloatingPanel.css";

function FloatingPanel({ title, children, onClose }) {
  return (
    <div className="floating-panel">
      <div className="floating-header">
        <span>{title}</span>

        <button className="floating-close" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="floating-content">{children}</div>
    </div>
  );
}

export default FloatingPanel;
