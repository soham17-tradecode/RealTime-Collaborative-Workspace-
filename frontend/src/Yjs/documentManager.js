import * as Y from "yjs";

const docs = new Map();

function getKey(roomCode, fileName) {
  return `${roomCode}:${fileName}`;
}

export function getDocument(roomCode, fileName) {
  const key = getKey(roomCode, fileName);

  if (!docs.has(key)) {
    docs.set(key, new Y.Doc());
  }

  return docs.get(key);
}

export function destroyDocument(roomCode, fileName) {
  const key = getKey(roomCode, fileName);

  const doc = docs.get(key);

  if (doc) {
    doc.destroy();
    docs.delete(key);
  }
}

export function getText(roomCode, fileName) {
  return getDocument(roomCode, fileName).getText("monaco");
}

export function destroyAllDocuments() {
  docs.forEach((doc) => doc.destroy());
  docs.clear();
}
