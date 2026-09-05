import "./StatusBar.css";

export default function StatusBar({ selectedFile, cursor }) {
  const getLanguage = () => {
    if (!selectedFile) return "Plain Text";

    const ext = selectedFile.split(".").pop().toLowerCase();

    switch (ext) {
      case "java":
        return "☕ Java";
      case "js":
        return "🟨 JavaScript";
      case "ts":
        return "🔷 TypeScript";
      case "py":
        return "🐍 Python";
      case "cpp":
      case "cc":
        return "💙 C++";
      case "c":
        return "C";
      case "html":
        return "🌐 HTML";
      case "css":
        return "🎨 CSS";
      case "json":
        return "{} JSON";
      default:
        return "Plain Text";
    }
  };

  return (
    <div className="status-bar">
      <div className="status-left">
        <span>{getLanguage()}</span>
        <span>UTF-8</span>
        <span>main</span>
        <span className="status-connected">Connected ●</span>
      </div>

      <div className="status-right">
        Ln {cursor.line}, Col {cursor.column}
      </div>
    </div>
  );
}
