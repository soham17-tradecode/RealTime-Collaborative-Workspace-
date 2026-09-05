import { registerJavaCompletionProvider } from "./completion/javaCompletion";
import { registerPythonCompletionProvider } from "./completion/pythonCompletion";
import { registerCCompletionProvider } from "./completion/cCompletion";
import { registerCppCompletionProvider } from "./completion/cppCompletion";
let initialized = false;

export function registerCompletionProviders(monaco) {
  if (initialized) return;

  initialized = true;

  registerJavaCompletionProvider(monaco);
  registerPythonCompletionProvider(monaco);
  registerCCompletionProvider(monaco);
  registerCppCompletionProvider(monaco);
}
