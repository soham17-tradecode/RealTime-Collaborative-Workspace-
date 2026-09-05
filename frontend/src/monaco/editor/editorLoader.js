import { useEffect } from "react";
import { openFile } from "../../Api/editorApi";

export default function useEditorLoader({
  editorRef,
  roomCode,
  selectedFile,
  firstLoad,
  setDirtyFiles,
}) {
  useEffect(() => {
    if (!selectedFile) return;

    let cancelled = false;

    const loadFile = async () => {
      while (!editorRef.current && !cancelled) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      if (cancelled) return;

      try {
        const response = await openFile(roomCode, selectedFile);

        if (cancelled || !editorRef.current) return;

        const model = editorRef.current.getModel();
        if (!model) return;

        // Only initialize an empty model.
        // If the model already has content, leave it alone.
        if (model.getValue() === "") {
          model.setValue(response.data ?? "");
        }

        setDirtyFiles((prev) => ({
          ...prev,
          [selectedFile]: false,
        }));
      } catch (err) {
        console.error("Failed to load file:", err);
      } finally {
        firstLoad.current = false;
      }
    };

    loadFile();

    return () => {
      cancelled = true;
    };
  }, [roomCode, selectedFile]);
}
