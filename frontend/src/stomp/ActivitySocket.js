import { Client } from "@stomp/stompjs";

let client = null;

export function connectActivity(roomCode, onMessage) {
  client = new Client({
    brokerURL: "ws://localhost:8080/ws",
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("Activity Connected");

      client.subscribe(`/topic/activity/${roomCode}`, (message) => {
        onMessage(JSON.parse(message.body));
      });
    },
  });

  client.activate();
}

export function disconnectActivity() {
  if (client) {
    client.deactivate();
    client = null;
  }
}
