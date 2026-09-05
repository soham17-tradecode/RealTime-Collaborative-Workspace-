import { useEffect, useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { openFile, saveFile } from "../Api/editorApi";
import {
  connectEditor,
  disconnectEditor,
  sendEditorChange,
} from "../stomp/EditorSocket";
import { registerCompletionProviders } from "../monaco/registerCompletion";
import {
  connectCursor,
  disconnectCursor,
  sendCursor,
} from "../stomp/CursorSocket";
import useEditorLoader from "../monaco/editor/editorLoader";
// import useEditorModel from "../monaco/editor/editorModel";
import useEditorAutoSave from "../monaco/editor/editorAutoSave";
import "./RemoteCursor.css";
import useEditorPresence from "../monaco/editor/editorPresence";

import { sendPresence } from "../stomp/PresenceSocket";
import useEditorSync from "../monaco/editor/editorSync";
import useEditorCursor from "../monaco/editor/editorCursor";

export default function MonacoEditorPanel({
  roomCode,
  selectedFile,
  fileContents,
  setFileContents,
  // dirtyFiles,
  setDirtyFiles,
  saveTrigger,
  user,
  // cursor,
  // setCursor,
}) {
  const firstLoad = useRef(true);
  const editorRef = useRef(null);

  const monacoRef = useRef(null);
  useEditorCursor({
    roomCode,
    selectedFile,
    user,
    editorRef,
    monacoRef,
  });

  useEffect(() => {
    firstLoad.current = true;
  }, [selectedFile]);

  //presence
  useEditorPresence({
    roomCode,
    selectedFile,
    user,
    editorRef,
  });

  // =========================
  // Load File hook
  // =========================
  useEditorLoader({
    editorRef,
    roomCode,
    selectedFile,
    firstLoad,
    setDirtyFiles,
  });

  // =========================
  // Auto Save hook
  // =========================

  useEditorAutoSave({
    editorRef,
    roomCode,
    selectedFile,
    firstLoad,
    setDirtyFiles,
  });
  // useEffect(() => {
  //   if (!selectedFile) return;

  //   if (firstLoad.current) return;

  //   clearTimeout(autoSaveTimer.current);

  //   setDirtyFiles((prev) => ({
  //     ...prev,
  //     [selectedFile]: true,
  //   }));

  //   autoSaveTimer.current = setTimeout(() => {
  //     saveFile(roomCode, selectedFile, fileContents[selectedFile] || "")
  //       .then(() => {
  //         console.log("Auto Saved");

  //         setDirtyFiles((prev) => ({
  //           ...prev,
  //           [selectedFile]: false,
  //         }));
  //       })
  //       .catch(console.error);
  //   }, 2000);

  //   return () => clearTimeout(autoSaveTimer.current);
  // }, [fileContents, selectedFile, roomCode]);

  // =========================
  // Manual Save
  // =========================

  useEffect(() => {
    if (!selectedFile) return;
    if (saveTrigger === 0) return;
    if (!editorRef.current) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    const fileName = model.uri.path.startsWith("/")
      ? model.uri.path.substring(1)
      : model.uri.path;

    saveFile(roomCode, fileName, model.getValue())
      .then(() => {
        console.log("Saved Successfully");

        setDirtyFiles((prev) => ({
          ...prev,
          [fileName]: false,
        }));
      })
      .catch(console.error);
  }, [saveTrigger, roomCode, selectedFile]);

  // =========================
  // Live WebSocket hook
  // =========================

  useEditorSync({
    roomCode,
    selectedFile,
    user,
    editorRef,
  });

  // useEffect(() => {
  //   if (!selectedFile) return;

  //   connectEditor(roomCode, selectedFile, (message) => {
  //     if (message.sender === user) return;

  //     setFileContents((prev) => ({
  //       ...prev,
  //       [selectedFile]: message.content,
  //     }));
  //   });

  //   return () => {
  //     disconnectEditor();
  //   };
  // }, [roomCode, selectedFile, user]);

  // =========================
  // Language
  // =========================

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ flex: 1 }}>
        <Editor
          height="100%"
          // language={getLanguage(selectedFile)}
          path={selectedFile}
          defaultLanguage={getLanguage(selectedFile)}
          theme="vs-dark"
          // value={fileContents[selectedFile] || ""}
          // defaultValue=""
          onMount={(editor, monaco) => {
            editorRef.current = editor;
            monacoRef.current = monaco;

            registerCompletionProviders(monaco);

            if (selectedFile) {
              firstLoad.current = true;
            }
          }}
          onChange={(value = "") => {
            const model = editorRef.current?.getModel();

            if (!model) return;

            const fileName = model.uri.path.startsWith("/")
              ? model.uri.path.substring(1)
              : model.uri.path;

            setFileContents((prev) => ({
              ...prev,
              [fileName]: value,
            }));

            sendEditorChange({
              roomCode,
              fileName,
              sender: user,
              content: value,
            });
          }}
          options={{
            fontSize: 15,
            minimap: {
              enabled: true,
            },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            tabSize: 4,
            insertSpaces: true,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            renderLineHighlight: "all",
          }}
        />
      </div>
    </div>
  );
}
