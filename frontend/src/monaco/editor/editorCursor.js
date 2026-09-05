import { useEffect, useRef } from "react";
import { connectCursor, disconnectCursor } from "../../stomp/CursorSocket";

function getUserColor(username) {
  const colors = [
    "#3B82F6",
    "#22C55E",
    "#F97316",
    "#A855F7",
    "#EF4444",
    "#14B8A6",
    "#EAB308",
    "#EC4899",
  ];

  let hash = 0;

  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

export default function useEditorCursor({
  roomCode,
  selectedFile,
  user,
  editorRef,
  monacoRef,
}) {
  const decorationsRef = useRef({});
  const widgetsRef = useRef({});

  useEffect(() => {
    if (!selectedFile) return;

    connectCursor(roomCode, selectedFile, (message) => {
      if (message.sender === user) return;

      const editor = editorRef.current;
      const monaco = monacoRef.current;

      if (!editor || !monaco) return;

      decorationsRef.current[message.sender] = editor.deltaDecorations(
        decorationsRef.current[message.sender] || [],
        [
          {
            range: new monaco.Range(
              message.line,
              message.column,
              message.line,
              message.column,
            ),
            options: {
              className: `remote-cursor-${message.sender}`,
            },
          },
        ],
      );

      if (!widgetsRef.current[message.sender]) {
        const dom = document.createElement("div");

        const color = getUserColor(message.sender);

        const styleId = `cursor-style-${message.sender}`;

        if (!document.getElementById(styleId)) {
          const style = document.createElement("style");

          style.id = styleId;

          style.innerHTML = `
.remote-cursor-${message.sender}{
    border-left:3px solid ${color} !important;
}
`;

          document.head.appendChild(style);
        }

        dom.className = "cursor-user";
        dom.innerText = message.sender;
        dom.style.background = color;

        widgetsRef.current[message.sender] = {
          dom,

          getId: () => `cursor-${message.sender}`,

          getDomNode: () => dom,

          getPosition: () => ({
            position: new monaco.Position(message.line, message.column),
            preference: [monaco.editor.ContentWidgetPositionPreference.ABOVE],
          }),
        };

        editor.addContentWidget(widgetsRef.current[message.sender]);
      } else {
        widgetsRef.current[message.sender].getPosition = () => ({
          position: new monaco.Position(message.line, message.column),
          preference: [monaco.editor.ContentWidgetPositionPreference.ABOVE],
        });

        editor.layoutContentWidget(widgetsRef.current[message.sender]);
      }
    });

    return () => {
      disconnectCursor();

      Object.values(widgetsRef.current).forEach((widget) => {
        editorRef.current?.removeContentWidget(widget);
      });

      decorationsRef.current = {};
      widgetsRef.current = {};
    };
  }, [roomCode, selectedFile, user, editorRef, monacoRef]);
}
