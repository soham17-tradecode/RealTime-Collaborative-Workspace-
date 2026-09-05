import api from "./axiosInstance";

// Existing function (keep this name)
export const executeCode = async (request) => {
  const response = await api.post("/api/run", request);
  return response.data; // executionId
};

// New function
export const getExecutionResult = async (executionId) => {
  return await api.get(`/api/run/result/${executionId}`);
};

// New function
export const stopExecution = async (executionId) => {
  const response = await api.post(`/api/run/stop/${executionId}`);
  return response.data;
};
