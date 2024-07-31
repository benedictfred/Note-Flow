import { useState } from "react";

function App() {
  const [openNote, setOpenNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState(null);

  function handleModal() {
    setOpenNote(!openNote);
  }

  function handleAddNote(note) {
    setNotes((notes) => [...notes, note]);
  }

  function handleSelectedNote(note) {
    setNoteId(note);
  }

  function handleDeleteNote(id) {
    setNotes((notes) => notes.filter((note) => note.id !== id));
  }
  return (
    <div className="app">
      {openNote && <Modal onModal={handleModal} notes={noteId} />}
      <Header />
      <NoteList
        onModal={handleModal}
        notes={notes}
        onSelectedNote={handleSelectedNote}
        onDeleteNote={handleDeleteNote}
      />
      <Form onAddNote={handleAddNote} />
    </div>
  );
}

function Header() {
  return (
    <header>
      {" "}
      <h1>NOTE FLOW</h1>
    </header>
  );
}

function NoteList({ notes, onModal, onSelectedNote, onDeleteNote }) {
  if (notes.length === 0) return <h1 className="prefix">ADD NOTE</h1>;
  return (
    <ul className="notes">
      {notes.map((notes) => (
        <Note
          onModal={onModal}
          notes={notes}
          key={notes.id}
          onSelectedNote={onSelectedNote}
          onDeleteNote={onDeleteNote}
        />
      ))}
    </ul>
  );
}

function Note({ notes, onModal, onSelectedNote, onDeleteNote }) {
  function handleClicks(e) {
    if (e.target.closest("button")) return;
    onModal();
    onSelectedNote(notes);
  }
  return (
    <>
      <li onClick={handleClicks}>
        <p>{notes.note}</p>
        <button onClick={() => onDeleteNote(notes.id)}>❌</button>
      </li>
    </>
  );
}

function Modal({ notes, onModal }) {
  return (
    <>
      <div className="overlay" onClick={onModal}></div>
      <div className="modal">
        <p>{notes?.note}</p>
        <p className="cancel" onClick={onModal}>
          {" "}
          &times;{" "}
        </p>
      </div>
    </>
  );
}

function Form({ onAddNote }) {
  const [note, setNote] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newNote = {
      note,
      id: Date.now(),
    };

    onAddNote(newNote);

    setNote("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={note}
        placeholder="Add your note here"
        rows="10"
        cols="30"
        onChange={(e) => setNote(e.target.value)}
      />
      <button>Add Note</button>
    </form>
  );
}

export default App;
