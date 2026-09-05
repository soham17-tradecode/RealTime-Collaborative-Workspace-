import "./ChatPanel.css";
import MembersPanel from "./MembersPanel";
import { sendPresence } from "../stomp/PresenceSocket";

function ChatPanel({
  roomCode,
  user,
  members,
  presence,
  leaveRoom,
  messages,
  messageText,
  setMessageText,
  handleSend,
  handleFileSelect,
  downloadFile,
  chatRef,
}) {
  return (
    <div className="chat-layout">
      <div className="chat-section">
        <div className="chat-header">Team Chat</div>

        <div className="chat-messages" ref={chatRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === user ? "message-row mine" : "message-row other"
              }
            >
              <div
                className={
                  msg.sender === user
                    ? "message my-message"
                    : "message other-message"
                }
              >
                <div className="message-header">
                  {msg.sender === user ? `${msg.sender} (You)` : msg.sender}
                </div>

                <div className="message-content">
                  {msg.messageType === "TEXT" && <span>{msg.content}</span>}

                  {msg.messageType === "FILE" && (
                    <div className="file-message">
                      <div className="file-icon">📄</div>

                      <div className="file-name">{msg.fileName}</div>

                      <button
                        className="download-file-btn"
                        onClick={() => downloadFile(msg.fileId, msg.fileName)}
                      >
                        Download
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-container">
          <button
            className="upload-btn"
            onClick={() => document.getElementById("fileInput").click()}
          >
            +
          </button>

          <input
            id="fileInput"
            type="file"
            hidden
            onChange={handleFileSelect}
          />

          <input
            className="chat-input"
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value);

              sendPresence({
                roomCode,
                sender: user,
                status: "CHAT",
                fileName: "",
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message..."
          />

          <button className="send-btn" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>

      <MembersPanel
        members={members}
        presence={presence}
        user={user}
        leaveRoom={leaveRoom}
        mode="chat"
      />
    </div>
  );
}

export default ChatPanel;
