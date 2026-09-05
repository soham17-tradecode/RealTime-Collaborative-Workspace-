import api from "./axiosInstance";

const CHUNK_SIZE = 1024 * 1024;

export const  uploadFile = async (file,roomCode)=>
{

    const totalChunks = Math.ceil(file.size/CHUNK_SIZE);

    const initResponse = await api.post("/upload/init",{
        roomCode,
        fileName:file.name,
        fileSize:file.size,
        totalChunks
    });

    const fileId = initResponse.data.fileId;

    for(let i=0;i<totalChunks;i++)
    {
        const start = i * CHUNK_SIZE;

        const end = Math.min(start+CHUNK_SIZE,file.size);
        const chunk = file.slice(start,end);
        const formData = new FormData();

        formData.append("fileId",fileId);

        formData.append("chunkIndex",i);

        formData.append("file",chunk ,file.name);

        await api.post("/upload/chunk",formData);
    }

    await api.post(`/upload/complete/${fileId}`);
    return fileId;




}
export const downloadFile = async (fileId,fileName)=>{

    const response = await api.get(`/download/${fileId}`,{
        responseType:"blob"
    });


    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    link.remove();
}