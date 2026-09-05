import { Client } from "@stomp/stompjs";

let client = null;

export function connectPresence(roomCode, onPresence) {
  if (client && client.connected) {
    client.deactivate();
  }

  client = new Client({
    brokerURL: "ws://localhost:8080/ws",
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("Presence Socket Connected");

      client.subscribe(`/topic/presences/${roomCode}`, (message) => {
        onPresence(JSON.parse(message.body));
      });
    },
  });

  client.activate();
}

export function disconnectPresence() {
  if (client) {
    client.deactivate();
    client = null;
  }
}

export function sendPresence(data) {
  if (!client || !client.connected) return;

  client.publish({
    destination: "/app/presence",
    body: JSON.stringify(data),
  });
}
