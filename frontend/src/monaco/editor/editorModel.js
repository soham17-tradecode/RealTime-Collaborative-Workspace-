import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import { openFile } from "../../Api/editorApi";

function getLanguage(fileName) {
  if (!fileName) return "plaintext";

  const ext = fileName.split(".").pop().toLowerCase();

  switch (ext) {
    case "js":
      return "javascript";

    case "ts":
      return "typescript";

    case "java":
      return "java";

    case "py":
      return "python";

    case "cpp":
    case "cc":
    case "cxx":
      return "cpp";

    case "c":
      return "c";

    case "cs":
      return "csharp";

    case "html":
      return "html";

    case "css":
      return "css";

    case "json":
      return "json";

    case "xml":
      return "xml";

    case "sql":
      return "sql";

    case "md":
      return "markdown";

    default:
      return "plaintext";
  }
}

export default function useEditorModel({
  editorRef,
  roomCode,
  selectedFile,
  firstLoad,
  setDirtyFiles,
}) {
  const modelsRef = useRef(new Map());

  useEffect(() => {
    if (!selectedFile) return;

    let cancelled = false;

    async function loadModel() {
      // Wait until Monaco editor is mounted
      while (!editorRef.current && !cancelled) {
        await new Promise((resolve) => setTimeout(resolve, 30));
      }

      if (cancelled) return;

      const editor = editorRef.current;

      // Already loaded
      if (modelsRef.current.has(selectedFile)) {
        const model = modelsRef.current.get(selectedFile);

        editor.setModel(model);

        monaco.editor.setModelLanguage(model, getLanguage(selectedFile));

        firstLoad.current = false;
        return;
      }

      try {
        const response = await openFile(roomCode, selectedFile);

        if (cancelled) return;

        const model = monaco.editor.createModel(
          response.data ?? "",
          getLanguage(selectedFile),
          monaco.Uri.parse(`file:///${selectedFile}`),
        );

        modelsRef.current.set(selectedFile, model);

        editor.setModel(model);

        setDirtyFiles((prev) => ({
          ...prev,
          [selectedFile]: false,
        }));

        firstLoad.current = false;
      } catch (err) {
        console.error("Failed to load model", err);
      }
    }

    loadModel();

    return () => {
      cancelled = true;
    };
  }, [roomCode, selectedFile, editorRef, firstLoad, setDirtyFiles]);

  useEffect(() => {
    return () => {
      modelsRef.current.forEach((model) => model.dispose());
      modelsRef.current.clear();
    };
  }, []);
}
