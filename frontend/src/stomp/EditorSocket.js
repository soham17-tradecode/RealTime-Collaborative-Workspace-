import { Client } from "@stomp/stompjs";

let stompClient = null;

export function connectEditor(roomCode, fileName, onMessage) {
  stompClient = new Client({
    brokerURL: "ws://localhost:8080/ws",

    reconnectDelay: 5000,

    onConnect: () => {
      console.log("Editor Connected");

      stompClient.subscribe(
        `/topic/editor/${roomCode}/${fileName}`,

        (message) => {
          onMessage(JSON.parse(message.body));
        },
      );
    },
  });

  stompClient.activate();
}

export function disconnectEditor() {
  if (stompClient) {
    stompClient.deactivate();
  }
}

export function sendEditorChange(message) {
  if (stompClient?.connected) {
    stompClient.publish({
      destination: "/app/editor.change",

      body: JSON.stringify(message),
    });
  }
}
