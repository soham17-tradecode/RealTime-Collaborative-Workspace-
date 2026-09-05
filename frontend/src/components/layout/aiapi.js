import api from "../../Api/axiosInstance";

export const chatWithAI = async ({
  prompt,
  language,
  currentFile,
  selectCode,
  roomCode,
}) => {
  return api.post("/api/ai/chat", {
    prompt,
    language,
    currentFile,
    selectCode,
    roomCode,
  });
};
