import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

import "./RemoteCursor.css";
import { openFile } from "../Api/editorApi";
// import { openFile } from "../Api/editorApi";
import {
  observeDocument,
  unobserveDocument,
  applyRemoteUpdate,
} from "../yjs/syncManager";

import { connectYjs, disconnectYjs } from "../stomp/YjsSocket";

import { getDocument, getText } from "../yjs/documentManager";
import { createBinding, destroyBinding } from "../yjs/bindingManager";

// function getUserColor(username) {
//   const colors = [
//     "#3B82F6", // Blue
//     "#22C55E", // Green
//     "#F97316", // Orange
//     "#A855F7", // Purple
//     "#EF4444", // Red
//     "#14B8A6", // Teal
//     "#EAB308", // Yellow
//     "#EC4899", // Pink
//   ];

//   let hash = 0;

//   for (let i = 0; i < username.length; i++) {
//     hash = username.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   return colors[Math.abs(hash) % colors.length];
// }

export default function MonacoEditorYjs({ roomCode, selectedFile }) {
  const autoSaveTimer = useRef(null);
  //   const editingTimer = useRef(null);
  //   const firstLoad = useRef(true);
  const editorRef = useRef(null);

  const monacoRef = useRef(null);
  const yDocRef = useRef(null);
  const yTextRef = useRef(null);
  const bindingRef = useRef(null);
  //   const decorationsRef = useRef({});
  //   const widgetsRef = useRef({});
  //   const lastCursorSent = useRef(0);
  //   const CURSOR_INTERVAL = 80;

  //   useEffect(() => {
  //     firstLoad.current = true;
  //   }, [selectedFile]);

  //   useEffect(() => {
  //     if (!selectedFile) return;

  //     connectCursor(roomCode, selectedFile, (message) => {
  //       if (message.sender === user) return;

  //       const editor = editorRef.current;
  //       const monaco = monacoRef.current;

  //       if (!editor || !monaco) return;

  //       // decoration
  //       decorationsRef.current[message.sender] = editor.deltaDecorations(
  //         decorationsRef.current[message.sender] || [],
  //         [
  //           {
  //             range: new monaco.Range(
  //               message.line,
  //               message.column,
  //               message.line,
  //               message.column,
  //             ),
  //             options: {
  //               className: `remote-cursor-${message.sender}`,
  //             },
  //           },
  //         ],
  //       );

  //       //----------------------------------------
  //       // USERNAME WIDGET
  //       //----------------------------------------

  //       if (!widgetsRef.current[message.sender]) {
  //         const dom = document.createElement("div");

  //         const color = getUserColor(message.sender);

  //         // Create dynamic CSS for this user (only once)
  //         const styleId = `cursor-style-${message.sender}`;

  //         if (!document.getElementById(styleId)) {
  //           const style = document.createElement("style");

  //           style.id = styleId;

  //           style.innerHTML = `
  //       .remote-cursor-${message.sender}{
  //           border-left:3px solid ${color} !important;
  //       }
  //   `;

  //           document.head.appendChild(style);
  //         }

  //         dom.className = "cursor-user";
  //         dom.innerText = message.sender;

  //         dom.style.background = color;

  //         widgetsRef.current[message.sender] = {
  //           dom,

  //           getId: () => `cursor-${message.sender}`,

  //           getDomNode: () => dom,

  //           getPosition: () => ({
  //             position: new monaco.Position(message.line, message.column),

  //             preference: [monaco.editor.ContentWidgetPositionPreference.ABOVE],
  //           }),
  //         };

  //         editor.addContentWidget(widgetsRef.current[message.sender]);
  //       } else {
  //         widgetsRef.current[message.sender].getPosition = () => ({
  //           position: new monaco.Position(message.line, message.column),

  //           preference: [monaco.editor.ContentWidgetPositionPreference.ABOVE],
  //         });

  //         editor.layoutContentWidget(widgetsRef.current[message.sender]);
  //       }
  //     });

  //     return () => {
  //       disconnectCursor();
  //     };
  //   }, [roomCode, selectedFile, user]);

  // =========================
  // Load File
  // =========================
  useEffect(() => {
    if (!selectedFile) return;

    const yText = yTextRef.current;

    if (!yText) return;

    const listener = () => {
      console.log("Document changed");

      clearTimeout(autoSaveTimer.current);

      autoSaveTimer.current = setTimeout(() => {
        console.log("Saving...");

        saveFile(roomCode, selectedFile, yText.toString())
          .then(() => {
            console.log("Saved");
          })
          .catch(console.error);
      }, 2000);
    };

    yText.observe(listener);

    return () => {
      clearTimeout(autoSaveTimer.current);
      yText.unobserve(listener);
    };
  }, [roomCode, selectedFile]);

  //   useEffect(() => {
  //     if (!selectedFile) return;
  //     if (!editorRef.current) return;

  //     openFile(roomCode, selectedFile)
  //       .then((response) => {
  //         editorRef.current?.getModel()?.setValue(response.data);

  //         setFileContents((prev) => ({
  //           ...prev,
  //           [selectedFile]: response.data,
  //         }));

  //         setDirtyFiles((prev) => ({
  //           ...prev,
  //           [selectedFile]: false,
  //         }));

  //         firstLoad.current = false;
  //       })
  //       .catch(console.error);
  //   }, [roomCode, selectedFile]);

  //   // =========================
  //   // Auto Save
  //   // =========================

  //   useEffect(() => {
  //     if (!selectedFile) return;

  //     if (firstLoad.current) return;

  //     clearTimeout(autoSaveTimer.current);

  //     setDirtyFiles((prev) => ({
  //       ...prev,
  //       [selectedFile]: true,
  //     }));

  //     autoSaveTimer.current = setTimeout(() => {
  //       saveFile(roomCode, selectedFile, fileContents[selectedFile] || "")
  //         .then(() => {
  //           console.log("Auto Saved");

  //           setDirtyFiles((prev) => ({
  //             ...prev,
  //             [selectedFile]: false,
  //           }));
  //         })
  //         .catch(console.error);
  //     }, 2000);

  //     return () => clearTimeout(autoSaveTimer.current);
  //   }, [fileContents, selectedFile, roomCode]);

  //   // =========================
  //   // Manual Save
  //   // =========================

  //   useEffect(() => {
  //     if (!selectedFile) return;

  //     if (saveTrigger === 0) return;

  //     saveFile(roomCode, selectedFile, fileContents[selectedFile] || "")
  //       .then(() => {
  //         console.log("Saved Successfully");

  //         setDirtyFiles((prev) => ({
  //           ...prev,
  //           [selectedFile]: false,
  //         }));
  //       })
  //       .catch(console.error);
  //   }, [saveTrigger, roomCode, selectedFile]);

  // =========================
  // Live WebSocket
  // =========================
  //   useEffect(() => {
  //     if (!selectedFile) return;

  //     connectEditor(roomCode, selectedFile, (message) => {
  //       if (message.sender === user) return;

  //       setFileContents((prev) => ({
  //         ...prev,
  //         [selectedFile]: message.content,
  //       }));
  //     });

  //     return () => {
  //       disconnectEditor();
  //     };
  //   }, [roomCode, selectedFile, user]);

  // =========================
  // Language
  // =========================
  useEffect(() => {
    return () => {
      if (!selectedFile) return;

      disconnectYjs();

      if (yDocRef.current) {
        unobserveDocument(yDocRef.current);
      }

      destroyBinding(roomCode, selectedFile);
    };
  }, [roomCode, selectedFile]);

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
  function initializeYjs(editor) {
    if (!selectedFile) return;

    const doc = getDocument(roomCode, selectedFile);
    const text = getText(roomCode, selectedFile);
    console.log("Editor received:", editor);
    console.log("getModel:", typeof editor?.getModel);

    yDocRef.current = doc;
    yTextRef.current = text;

    if (bindingRef.current) {
      destroyBinding(roomCode, selectedFile);
    }

    bindingRef.current = createBinding(roomCode, selectedFile, text, editor);

    observeDocument(doc, roomCode, selectedFile);

    connectYjs(roomCode, selectedFile, (message) => {
      applyRemoteUpdate(doc, message.update);
    });

    console.log("Yjs initialized");
  }

  useEffect(() => {
    if (!selectedFile) return;

    if (!yTextRef.current) return;

    openFile(roomCode, selectedFile)
      .then((response) => {
        const yText = yTextRef.current;

        if (yText.length === 0) {
          yText.insert(0, response.data);
        }

        console.log("File Loaded");
      })
      .catch(console.error);
  }, [roomCode, selectedFile]);

  return (
    <Editor
      height="100%"
      language={getLanguage(selectedFile)}
      theme="vs-dark"
      defaultValue=""
      onMount={(editor, monaco) => {
        console.log(editor);
        console.log(typeof editor.getModel);

        editorRef.current = editor;
        monacoRef.current = monaco;

        initializeYjs(editor);
      }}
      onChange={() => {}}
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

        // Suggestions
        quickSuggestions: {
          other: true,
          comments: false,
          strings: true,
        },
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: "on",
        wordBasedSuggestions: "currentDocument",
        parameterHints: {
          enabled: true,
        },
        snippetSuggestions: "inline",
        suggestSelection: "first",
      }}
    />
  );
}
