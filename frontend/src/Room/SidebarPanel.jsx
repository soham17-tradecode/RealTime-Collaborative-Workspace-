import ActivityFeed from "../components/ActivityFeed";
import ChatPanel from "./ChatPanel";
import FileExplorer from "../FileExplorer/FileExplorer";

export default function SidebarPanel({
  activeTab,
  sidebarOpen,
  roomCode,

  // Chat props
  user,
  members,
  messages,
  messageText,
  setMessageText,
  handleSend,
  handleFileSelect,
  downloadFile,
  chatRef,

  // File Explorer props
  selectedFile,
  onFileSelect,
}) {
  if (!sidebarOpen) return null;

  return (
    <div className="sidebar-panel">
      {activeTab === "files" && (
        <FileExplorer
          roomCode={roomCode}
          selectedFile={selectedFile}
          onFileSelect={onFileSelect}
        />
      )}

      {activeTab === "chat" && (
        <ChatPanel
          user={user}
          members={members}
          messages={messages}
          messageText={messageText}
          setMessageText={setMessageText}
          handleSend={handleSend}
          handleFileSelect={handleFileSelect}
          downloadFile={downloadFile}
          chatRef={chatRef}
        />
      )}

      {activeTab === "ai" && (
        <div className="sidebar-placeholder">
          <h3>AI Assistant</h3>
          <p>AI panel coming soon.</p>
        </div>
      )}

      {activeTab === "activity" && <ActivityFeed roomCode={roomCode} />}

      {activeTab === "members" && (
        <div className="sidebar-placeholder">
          <h3>Members</h3>
          <p>Members panel coming soon.</p>
        </div>
      )}
    </div>
  );
}
