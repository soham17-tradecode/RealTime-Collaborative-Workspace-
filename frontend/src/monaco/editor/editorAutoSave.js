import { useEffect, useRef } from "react";
import { saveFile } from "../../Api/editorApi";

export default function useEditorAutoSave({
  editorRef,
  roomCode,
  selectedFile,
  firstLoad,
  setDirtyFiles,
}) {
  const autoSaveTimer = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;
    if (!selectedFile) return;
    if (firstLoad.current) return;

    const editor = editorRef.current;
    const model = editor.getModel();

    if (!model) return;

    const disposable = model.onDidChangeContent(() => {
      const fileName = model.uri.path.startsWith("/")
        ? model.uri.path.substring(1)
        : model.uri.path;

      setDirtyFiles((prev) => ({
        ...prev,
        [fileName]: true,
      }));

      clearTimeout(autoSaveTimer.current);

      autoSaveTimer.current = setTimeout(async () => {
        try {
          // Ensure we're still saving the same model
          if (editor.getModel() !== model) return;

          await saveFile(roomCode, fileName, model.getValue());

          setDirtyFiles((prev) => ({
            ...prev,
            [fileName]: false,
          }));

          console.log("Auto Saved:", fileName);
        } catch (err) {
          console.error("Auto Save Failed", err);
        }
      }, 2000);
    });

    return () => {
      disposable.dispose();
      clearTimeout(autoSaveTimer.current);
    };
  }, [roomCode, selectedFile, firstLoad, setDirtyFiles]);
}
