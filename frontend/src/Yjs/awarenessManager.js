import { Awareness } from "y-protocols/awareness";
import { getDocument } from "./documentManager";

const awarenessMap = new Map();

function getKey(roomCode, fileName) {
  return `${roomCode}:${fileName}`;
}

export function getAwareness(roomCode, fileName) {
  const key = getKey(roomCode, fileName);

  if (!awarenessMap.has(key)) {
    const doc = getDocument(roomCode, fileName);
    awarenessMap.set(key, new Awareness(doc));
  }

  return awarenessMap.get(key);
}

export function destroyAwareness(roomCode, fileName) {
  const key = getKey(roomCode, fileName);

  const awareness = awarenessMap.get(key);

  if (awareness) {
    awareness.destroy();
    awarenessMap.delete(key);
  }
}
