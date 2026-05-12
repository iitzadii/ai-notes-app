import './App.css';
import { useState, useEffect } from "react";
import Sidebar from './components/Sidebar';
import NotesPage from "./pages/NotesPage";


function App() {
  const [notes, setNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Notes");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fetch initial notes
  useEffect(() => {
    fetch("https://backend-2-yncz.onrender.com/notes")
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error("Failed to fetch notes", err));
  }, []);

  const handleAddNote = (newNote) => {
    fetch("https://backend-2-yncz.onrender.com/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    })
      .then(res => res.json())
      .then((savedNote) => {
        // Use savedNote if server returns it (often has ID), else fall back to local
        setNotes((prevNotes) => [savedNote, ...prevNotes]);
      })
      .catch((err) => {
        console.error("Failed to add note:", err);
        // Optimistic update fallback? Or just alert.
        // For now, let's assuming fetch failure means no add.
      });
  };

  const handleUpdateNote = (updatedNote) => {
    fetch(`https://backend-2-yncz.onrender.com/notes/${updatedNote.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNote),
    })
      .then((res) => res.json())
      .then((updatedNoteFromServer) => {
        setNotes((prev) =>
          prev.map((n) => (n.id === updatedNoteFromServer.id ? updatedNoteFromServer : n))
        );
      })
      .catch((err) => console.error("Failed to update note", err));
  };

  const handleDeleteNote = (noteToDelete) => {
    fetch(`https://backend-2-yncz.onrender.com/notes/${noteToDelete.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setNotes((prev) => prev.filter((n) => n.id !== noteToDelete.id));
      })
      .catch((err) => console.error("Failed to delete note", err));
  };

  return (
    <div className="app-container">
      <Sidebar
        notes={notes}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main className={`main-content ${isSidebarOpen ? 'shifted' : 'full'}`}>
        <NotesPage
          notes={notes}
          selectedCategory={selectedCategory}
          onAddNote={handleAddNote}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
        />
      </main>
    </div>
  );
}

export default App;
