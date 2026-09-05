import api from "./axiosInstance";

export const saveWorkspace = (roomCode, selectedFile, openTabs) =>
  api.post("/workspace/state", {
    roomCode,
    selectedFile,
    openTabs,
  });

export const loadWorkspace = (roomCode) =>
  api.get(`/workspace/state/${roomCode}`);
