import "./ActivityBar.css";

const items = [
  { id: "files", icon: "📁", title: "Files" },
  { id: "chat", icon: "💬", title: "Chat" },
  { id: "ai", icon: "🤖", title: "AI" },
  { id: "activity", icon: "📜", title: "Activity" },
  { id: "members", icon: "👥", title: "Members" },
];

export default function ActivityBar({
  activeTab,
  sidebarOpen,
  setSidebarOpen,
  setActiveTab,
}) {
  const handleClick = (tab) => {
    if (activeTab === tab) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setActiveTab(tab);
      setSidebarOpen(true);
    }
  };

  return (
    <div className="activity-bar">
      {items.map((item) => (
        <button
          key={item.id}
          title={item.title}
          className={`activity-btn ${activeTab === item.id ? "active" : ""}`}
          onClick={() => handleClick(item.id)}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}
