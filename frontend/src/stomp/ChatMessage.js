import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWebSocket = (
    roomCode,
    onMessage
) => {

    stompClient = new Client({

        brokerURL: "ws://localhost:8080/ws",

        reconnectDelay: 5000,

        debug: (str) => {
            // console.log(str);
        },

        onConnect: () => {

            console.log("✅ WebSocket Connected");

            stompClient.subscribe(
                `/topic/room/${roomCode}`,
                (message) => {

                    const receivedMessage =
                        JSON.parse(message.body);

                    onMessage(receivedMessage);
                }
            );
        },

        onStompError: (frame) => {

            console.error(
                "❌ STOMP ERROR",
                frame.headers["message"]
            );

            console.error(
                frame.body
            );
        },

        onWebSocketError: (event) => {

            console.error(
                "❌ WebSocket Error",
                event
            );
        }
    });

    stompClient.activate();
};

export const sendMessage = (
    sender,
    roomCode,
    content
) => {

    if (
        stompClient &&
        stompClient.connected
    ) {

        stompClient.publish({

            destination:
                "/app/chat.send",

            body: JSON.stringify({

                sender: sender,

                roomCode: roomCode,

                content: content
            })
        });
    }
};

export const disconnectWebSocket = () => {

    if (stompClient) {

        stompClient.deactivate();

        console.log(
            "🔌 WebSocket Disconnected"
        );
    }
};