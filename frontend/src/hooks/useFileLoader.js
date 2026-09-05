import { useEffect, useRef } from "react";
import { saveFile } from "../Api/editorApi";

export default function useAutoSave({
  roomCode,
  selectedFile,
  yTextRef,
  setDirtyFiles,
  saveTrigger,
}) {
  const autoSaveTimer = useRef(null);

  // =========================
  // Auto Save
  // =========================

  useEffect(() => {
    console.log("========== AutoSave Hook ==========");

    if (!selectedFile) {
      console.log("No selected file");
      return;
    }

    console.log("Selected File:", selectedFile);

    const yText = yTextRef.current;

    console.log("YText:", yText);

    if (!yText) {
      console.log("YText is NULL");
      return;
    }

    console.log("Observer Attached");

    const listener = () => {
      console.log("Yjs Changed");

      setDirtyFiles((prev) => ({
        ...prev,
        [selectedFile]: true,
      }));

      clearTimeout(autoSaveTimer.current);

      autoSaveTimer.current = setTimeout(() => {
        console.log("Saving to backend...");

        saveFile(roomCode, selectedFile, yText.toString())
          .then(() => {
            console.log("✅ Auto Saved");

            setDirtyFiles((prev) => ({
              ...prev,
              [selectedFile]: false,
            }));
          })
          .catch((err) => {
            console.error("Save Failed:", err);
          });
      }, 2000);
    };

    yText.observe(listener);

    return () => {
      console.log("Observer Removed");

      clearTimeout(autoSaveTimer.current);
      yText.unobserve(listener);
    };
  }, [roomCode, selectedFile]);

  // =========================
  // Manual Save
  // =========================

  useEffect(() => {
    if (!selectedFile) return;
    if (saveTrigger === 0) return;

    console.log("Manual Save Clicked");

    const yText = yTextRef.current;

    console.log("Manual Save YText:", yText);

    if (!yText) {
      console.log("Manual Save Failed - YText NULL");
      return;
    }

    saveFile(roomCode, selectedFile, yText.toString())
      .then(() => {
        console.log("✅ Manual Save Success");

        setDirtyFiles((prev) => ({
          ...prev,
          [selectedFile]: false,
        }));
      })
      .catch((err) => {
        console.error("Manual Save Failed:", err);
      });
  }, [saveTrigger, roomCode, selectedFile]);
}
