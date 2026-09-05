import { useRef } from "react";
import { sendPresence } from "../stomp/PresenceSocket";

export default function usePresence({ roomCode, selectedFile, user }) {
  const editingTimer = useRef(null);

  function notifyEditing() {
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
  }

  return {
    notifyEditing,
  };
}
