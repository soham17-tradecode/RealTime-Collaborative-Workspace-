import { useEffect, useRef } from "react";
import { sendPresence } from "../../stomp/PresenceSocket";

export default function useEditorPresence({
  roomCode,
  selectedFile,
  user,
  editorRef,
}) {
  const editingTimer = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;
    if (!selectedFile) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    const disposable = model.onDidChangeContent(() => {
      sendPresence({
        roomCode,
        sender: user,
        fileName: selectedFile,
        status: "EDITING",
      });

      clearTimeout(editingTimer.current);

      editingTimer.current = setTimeout(() => {
        sendPresence({
          roomCode,
          sender: user,
          fileName: selectedFile,
          status: "VIEWING",
        });
      }, 2000);
    });

    return () => {
      disposable.dispose();
      clearTimeout(editingTimer.current);
    };
  }, [roomCode, selectedFile, user, editorRef]);
}
