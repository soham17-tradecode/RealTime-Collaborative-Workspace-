import { useState } from "react";
import { executeCode } from "../Api/codeExecutionApi";

export default function useCodeExecution() {
  const [terminalOutput, setTerminalOutput] = useState("");
  const [running, setRunning] = useState(false);

  const runCode = async (selectedFile, editorRef) => {
    if (!selectedFile || !editorRef.current) {
      return;
    }

    try {
      setRunning(true);

      const request = {
        language: getLanguage(selectedFile),

        fileName: selectedFile,

        code: editorRef.current.getValue(),

        input: "",
      };

      const response = await executeCode(request);

      //   setTerminalOutput(response.data.output || response.data.error);
      const result = response.data;

      let text = "";

      text += "=====================================\n";
      text += "Execution Finished\n";
      text += "=====================================\n";
      text += `Exit Code      : ${result.exitCode}\n`;
      text += `Execution Time : ${result.executionTime} ms\n`;
      text += "-------------------------------------\n\n";

      if (result.output) {
        text += result.output;
      }

      if (result.error) {
        text += "\n\nErrors:\n";
        text += result.error;
      }

      setTerminalOutput(text);
    } catch (e) {
      setTerminalOutput("Execution Failed");
    } finally {
      setRunning(false);
    }
  };
  function getLanguage(fileName) {
    const ext = fileName.split(".").pop().toLowerCase();

    switch (ext) {
      case "java":
        return "java";

      case "py":
        return "python";

      case "cpp":
      case "cc":
      case "cxx":
        return "cpp";

      case "c":
        return "c";

      default:
        return "plaintext";
    }
  }

  return {
    terminalOutput,

    running,

    runCode,
  };
}
