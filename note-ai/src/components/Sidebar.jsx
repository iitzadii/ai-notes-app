import React from 'react';

// Simple inline SVG icons for a premium feel without external deps
const Icons = {
  AllNotes: () => (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14-7a2 2 0 012 2v6a2 2 0 01-2 2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2m4 0V4a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
    </svg>
  ),
  Folder: () => (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  Logo: () => (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
};

function Sidebar({ notes, onSelectCategory, selectedCategory, isOpen, toggleSidebar }) {
  const categories = Array.from(new Set(notes.map(note => note.category || 'General')));

  return (
    <aside className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="brand-container">
          <span className="brand-icon"><Icons.Logo /></span>
          <h2 className="app-brand">Note AI</h2>
        </div>
        <button className="toggle-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
          {isOpen ? <Icons.ChevronLeft /> : <Icons.ChevronRight />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <div
          className={`nav-item ${selectedCategory === 'All Notes' ? 'active' : ''}`}
          onClick={() => onSelectCategory('All Notes')}
        >
          <span className="icon"><Icons.AllNotes /></span>
          <span className="label">All Notes</span>
        </div>

        <div className="categories-section">
          <h3>Categories</h3>
          <ul>
            {categories.map((cat) => (
              <li
                key={cat}
                className={selectedCategory === cat ? 'active' : ''}
                onClick={() => onSelectCategory(cat)}
              >
                <span className="icon"><Icons.Folder /></span>
                <span className="label">{cat}</span>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
