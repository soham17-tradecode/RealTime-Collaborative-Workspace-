import { Client } from "@stomp/stompjs";

let client = null;

export function connectFileSocket(roomCode, onEvent) {
  if (client && client.connected) {
    client.deactivate();
  }

  client = new Client({
    brokerURL: "ws://localhost:8080/ws",
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("File Socket Connected");

      client.subscribe(`/topic/files/${roomCode}`, (message) => {
        onEvent(JSON.parse(message.body));
      });
    },
  });

  client.activate();
}

export function disconnectFileSocket() {
  if (client) {
    client.deactivate();
    client = null;
  }
}