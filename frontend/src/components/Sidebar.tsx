export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">🎮</div>
        <span className="sidebar-title">GameShelf</span>
      </div>

      {/* NavBar content */}
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <a href="/shelf" className="sidebar-link">
            🕹️ Home Page
          </a>
          <a href="/add-game" className="sidebar-link">
            ➕ Add Game
          </a>
        </nav>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        GameShelfCollection
        <a href="/about" className="sidebar-link">
          ⓘ About
        </a>
      </div>
    </aside>
  );
}
