import { useEffect } from "react";
import { connectEditor, disconnectEditor } from "../../stomp/EditorSocket";

export default function useEditorSync({
  roomCode,
  selectedFile,
  user,
  editorRef,
}) {
  useEffect(() => {
    if (!selectedFile) return;

    connectEditor(roomCode, selectedFile, (message) => {
      if (!editorRef.current) return;

      // Ignore our own edits
      if (message.sender === user) return;

      const editor = editorRef.current;
      const model = editor.getModel();

      if (!model) return;

      const currentFile = model.uri.path.startsWith("/")
        ? model.uri.path.substring(1)
        : model.uri.path;

      // Ignore updates for other files
      if (currentFile !== message.fileName) return;

      // Ignore identical content
      if (model.getValue() === message.content) return;

      const position = editor.getPosition();

      model.pushEditOperations(
        [],
        [
          {
            range: model.getFullModelRange(),
            text: message.content,
          },
        ],
        () => null,
      );

      if (position) {
        editor.setPosition(position);
      }
    });

    return () => {
      disconnectEditor();
    };
  }, [roomCode, selectedFile, user, editorRef]);
}
