import { Client } from "@stomp/stompjs";

let client = null;

export function connectCursor(roomCode, fileName, onCursor) {
  if (client && client.connected) {
    client.deactivate();
  }

  client = new Client({
    brokerURL: "ws://localhost:8080/ws",
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("Cursor Socket Connected");

      client.subscribe(`/topic/cursor/${roomCode}/${fileName}`, (message) => {
        onCursor(JSON.parse(message.body));
      });
    },
  });

  client.activate();
}

export function disconnectCursor() {
  if (client) {
    client.deactivate();
    client = null;
  }
}

export function sendCursor(message) {
  if (!client || !client.connected) return;

  client.publish({
    destination: "/app/cursor",
    body: JSON.stringify(message),
  });
}
