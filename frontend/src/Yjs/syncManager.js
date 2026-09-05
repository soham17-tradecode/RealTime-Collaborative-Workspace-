import * as Y from "yjs";

import { sendYjsUpdate } from "../stomp/YjsSocket";

const observers = new Map();

function uint8ToBase64(uint8) {
  let binary = "";

  uint8.forEach((b) => {
    binary += String.fromCharCode(b);
  });

  return btoa(binary);
}

function base64ToUint8(base64) {
  const binary = atob(base64);

  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

export function observeDocument(doc, roomCode, fileName) {
  const listener = (update, origin) => {
    if (origin === "remote") return;

    sendYjsUpdate({
      roomCode,
      fileName,
      update: uint8ToBase64(update),
    });
  };

  doc.on("update", listener);

  observers.set(doc, listener);
}

export function unobserveDocument(doc) {
  const listener = observers.get(doc);

  if (listener) {
    doc.off("update", listener);
    observers.delete(doc);
  }
}

export function applyRemoteUpdate(doc, base64Update) {
  const update = base64ToUint8(base64Update);

  Y.applyUpdate(doc, update, "remote");
}
