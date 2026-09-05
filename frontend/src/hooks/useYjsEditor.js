import { useEffect } from "react";

import { getDocument, getText } from "../yjs/documentManager";
import { createBinding, destroyBinding } from "../yjs/bindingManager";

import {
  observeDocument,
  unobserveDocument,
  applyRemoteUpdate,
} from "../yjs/syncManager";

import { connectYjs, disconnectYjs } from "../stomp/YjsSocket";

export default function useYjsEditor({
  roomCode,
  selectedFile,
  editorRef,
  yDocRef,
  yTextRef,
  bindingRef,
}) {
  function initializeYjs() {
    if (!selectedFile) return;
    if (!editorRef.current) return;

    const doc = getDocument(roomCode, selectedFile);
    const text = getText(roomCode, selectedFile);

    yDocRef.current = doc;
    yTextRef.current = text;

    bindingRef.current = createBinding(
      roomCode,
      selectedFile,
      text,
      editorRef.current,
    );

    observeDocument(doc, roomCode, selectedFile);

    connectYjs(roomCode, selectedFile, (message) => {
      applyRemoteUpdate(doc, message.update);
    });

    console.log("Yjs Initialized:", roomCode, selectedFile);
  }

  useEffect(() => {
    return () => {
      if (!selectedFile) return;

      const doc = yDocRef.current;

      destroyBinding(roomCode, selectedFile);

      if (doc) {
        unobserveDocument(doc);
      }

      disconnectYjs();
    };
  }, [roomCode, selectedFile]);

  return {
    initializeYjs,
  };
}
