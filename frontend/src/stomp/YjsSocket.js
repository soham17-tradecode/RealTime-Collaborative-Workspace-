import { Client } from "@stomp/stompjs";

let client = null;

export function connectYjs(roomCode, fileName, onUpdate) {
  client = new Client({
    brokerURL: "ws://localhost:8080/ws",
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("Yjs Connected");

      client.subscribe(`/topic/editor/${roomCode}/${fileName}`, (message) => {
        onUpdate(JSON.parse(message.body));
      });
    },
  });

  client.activate();
}

export function disconnectYjs() {
  if (client) {
    client.deactivate();
    client = null;
  }
}

export function sendYjsUpdate(update) {
  if (!client || !client.connected) return;

  client.publish({
    destination: "/app/yjs.sync",
    body: JSON.stringify(update),
  });
}
