import api from "./axiosInstance";

export const createFile = (roomCode, fileName) => {
  return api.post(
    `/room/${roomCode}/files`,

    {
      fileName,
    },
  );
};

export const getFiles = (roomCode) => {
  return api.get(`/room/${roomCode}/allFiles`);
};

export const openFile = (roomCode, fileName) => {
  return api.get(`/room/${roomCode}/workspace/${fileName}`);
};

export const saveFile = (roomCode, fileName, content) => {
  return api.post(
    `/room/${roomCode}/workspace/${fileName}`,

    {
      content,
    },
  );
};

export const renameFile = (roomCode, oldFileName, newFileName) => {
  return api.put(
    `/room/${roomCode}/workspace/rename`,

    {
      oldFileName,
      newFileName,
    },
  );
};

export const deleteFile = (roomCode, fileName) => {
  return api.delete(`/room/${roomCode}/workspace/${fileName}`);
};

export const copyFile = (roomCode, sourceFile, targetFile = "") => {
  return api.post(`/room/${roomCode}/workspace/copy`, {
    sourceFile,
    targetFile,
  });
};

export const moveFile = (roomCode, sourceFile, targetFile) => {
  return api.put(`/room/${roomCode}/workspace/move`, {
    sourceFile,
    targetFile,
  });
};
