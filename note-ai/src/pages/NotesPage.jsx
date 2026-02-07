import { useState } from "react";
import AddNote from "../components/AddNote";
import NotesGrid from "../components/NotesGrid";
import NoteModal from "../components/NoteModal";

function NotesPage({
  notes,
  selectedCategory,
  onAddNote,
  onUpdateNote,
  onDeleteNote
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  // Filter logic: Category + Search
  const filteredNotes = notes.filter(note => {
    // 1. Category Filter
    const noteCat = note.category || "General";
    const categoryMatch = selectedCategory === "All Notes" || noteCat === selectedCategory;

    // 2. Search Filter
    const searchLower = searchTerm.toLowerCase();
    const titleMatch = (note.title || "").toLowerCase().includes(searchLower);
    const contentMatch = (note.content || "").toLowerCase().includes(searchLower);

    return categoryMatch && (titleMatch || contentMatch);
  });

  return (
    <div className="notes-page">
      <header className="page-header">
        <h1>{selectedCategory}</h1>
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search your notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      <div className="page-content">
        <AddNote onAdd={onAddNote} />

        {filteredNotes.length > 0 ? (
          <NotesGrid
            notes={filteredNotes}
            onNoteClick={setSelectedNote}
          />
        ) : (
          <div className="empty-state">
            <p>No notes found in "{selectedCategory}"</p>
          </div>
        )}
      </div>

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onUpdate={(updated) => {
            onUpdateNote(updated);
            setSelectedNote(null);
          }}
          onDelete={(note) => {
            onDeleteNote(note);
            setSelectedNote(null);
          }}
        />
      )}
    </div>
  );
}

export default NotesPage;
