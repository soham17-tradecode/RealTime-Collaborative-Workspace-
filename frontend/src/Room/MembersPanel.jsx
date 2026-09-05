import "./MembersPanel.css";

function MembersPanel({ members, user, leaveRoom, presence, mode, roomCode }) {
  return (
    <div
      className={
        mode === "editor" ? "members-panel editor" : "members-panel chat"
      }
    >
      {/* ROOM CODE */}
      <div className="room-code-section">
        <div className="room-code-label">ROOM CODE</div>
        <div className="room-code-value">{roomCode}</div>
      </div>

      <div className="members-header">Members</div>

      <div className="member-list">
        {members.length === 0 ? (
          <div className="no-members">No members online</div>
        ) : (
          members.map((member, index) => {
            const info = presence?.[member];

            return (
              <div
                key={index}
                className={member === user ? "member current-user" : "member"}
              >
                <div className="member-top">
                  <div className="member-left">
                    <span className="online-dot"></span>

                    <span className="member-name">
                      {member === user ? `${member} (You)` : member}
                    </span>
                  </div>

                  <div className="member-status">
                    {!info && <>🟢 Online</>}

                    {info?.status === "CHAT" && <>💬 Chatting</>}

                    {info?.status === "VIEWING" && (
                      <>
                        👀 Viewing
                        <br />
                        <span className="status-file">{info.fileName}</span>
                      </>
                    )}

                    {info?.status === "EDITING" && (
                      <>
                        📝 Editing
                        <br />
                        <span className="status-file">{info.fileName}</span>
                      </>
                    )}

                    {info?.status === "TYPING" && (
                      <>
                        ⌨ Typing...
                        <br />
                        <span className="status-file">{info.fileName}</span>
                      </>
                    )}

                    {info?.status === "IDLE" && <>🟢 Online</>}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <button className="leave-btn" onClick={leaveRoom}>
        Leave Room
      </button>
    </div>
  );
}

export default MembersPanel;
