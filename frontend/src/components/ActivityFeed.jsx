import { useEffect, useState } from "react";
import "./ActivityFeed.css";
import { connectActivity, disconnectActivity } from "../stomp/ActivitySocket";

const actionText = {
  CREATE_FILE: "created",
  DELETE_FILE: "deleted",
  RENAME_FILE: "renamed",
  COPY_FILE: "copied",
  MOVE_FILE: "moved",
  SAVE_FILE: "saved",
  JOIN_ROOM: "joined the workspace",
  LEAVE_ROOM: "left the workspace",
};

const actionIcon = {
  CREATE_FILE: "📄",
  DELETE_FILE: "🗑️",
  RENAME_FILE: "✏️",
  COPY_FILE: "📑",
  MOVE_FILE: "📂",
  SAVE_FILE: "💾",
  JOIN_ROOM: "🟢",
  LEAVE_ROOM: "🔴",
};

function ActivityFeed({ roomCode }) {
  const [activities, setActivities] = useState([]);

  //   useEffect(() => {
  //     fetch(`http://localhost:8080/activity/${roomCode}`, {
  //       credentials: "include",
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setActivities(data))
  //       .catch(console.error);
  //   }, [roomCode]);

  useEffect(() => {
    connectActivity(roomCode, (activity) => {
      setActivities((prev) => [activity, ...prev]);
    });

    return () => {
      disconnectActivity();
    };
  }, [roomCode]);

  return (
    <div className="activity-panel">
      <div className="activity-header">
        <h3>Workspace Activity</h3>
      </div>

      <div className="activity-list">
        {activities.length === 0 ? (
          <div className="activity-empty">No workspace activity yet.</div>
        ) : (
          activities.map((activity, index) => (
            <div className="activity-card" key={index}>
              <div className="activity-icon">
                {actionIcon[activity.action] || "📌"}
              </div>

              <div className="activity-content">
                <div className="activity-text">
                  <strong>{activity.username}</strong>{" "}
                  {actionText[activity.action]}{" "}
                  <span className="activity-file">{activity.target}</span>
                </div>

                <div className="activity-time">
                  {new Date(activity.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ActivityFeed;
