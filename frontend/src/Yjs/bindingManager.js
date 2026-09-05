import { MonacoBinding } from "y-monaco";
import { getAwareness } from "./awarenessManager";

const bindings = new Map();

function getKey(roomCode, fileName) {
  return `${roomCode}:${fileName}`;
}

export function createBinding(roomCode, fileName, yText, editor) {
  console.log("Editor =", editor);
  console.log("typeof =", typeof editor);
  console.log("constructor =", editor.constructor.name);
  console.log("getModel =", editor.getModel);

  debugger;

  const model = editor.getModel();

  console.log(model);

  const awareness = getAwareness(roomCode, fileName);

  const binding = new MonacoBinding(yText, model, new Set([editor]), awareness);

  return binding;
}

export function destroyBinding(roomCode, fileName) {
  const key = getKey(roomCode, fileName);

  const binding = bindings.get(key);

  if (binding) {
    binding.destroy();
    bindings.delete(key);
  }
}

export function getBinding(roomCode, fileName) {
  return bindings.get(getKey(roomCode, fileName));
}

export function destroyAllBindings() {
  bindings.forEach((binding) => binding.destroy());
  bindings.clear();
}
