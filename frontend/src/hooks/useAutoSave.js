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
    if (!selectedFile) return;

    const yText = yTextRef.current;
    if (!yText) return;

    const listener = () => {
      setDirtyFiles((prev) => ({
        ...prev,
        [selectedFile]: true,
      }));

      clearTimeout(autoSaveTimer.current);

      autoSaveTimer.current = setTimeout(() => {
        saveFile(roomCode, selectedFile, yText.toString())
          .then(() => {
            console.log("Auto Saved");

            setDirtyFiles((prev) => ({
              ...prev,
              [selectedFile]: false,
            }));
          })
          .catch(console.error);
      }, 2000);
    };

    yText.observe(listener);

    return () => {
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

    const yText = yTextRef.current;
    if (!yText) return;

    saveFile(roomCode, selectedFile, yText.toString())
      .then(() => {
        console.log("Saved Successfully");

        setDirtyFiles((prev) => ({
          ...prev,
          [selectedFile]: false,
        }));
      })
      .catch(console.error);
  }, [saveTrigger, roomCode, selectedFile]);
}
