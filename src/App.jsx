import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    fetch("http://localhost:3000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Error fetching notes:", err));
  };

  const changeHandler = (e) => {
    setNoteTitle(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (noteTitle.trim() === "") {
      alert("Please fill in the field");
      return;
    }
    edit ? updateNotes() : createNotes();
  };

  const createNotes = () => {
    const newNote = { id: Date.now(), title: noteTitle };

    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    }).then(() => fetchNotes());

    setNoteTitle("");
  };

  const updateNotes = () => {
    fetch(`http://localhost:3000/notes/${edit}`, {
      method: "PUT", // or PATCH if only updating part of the data
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: noteTitle }),
    })
      .then(() => {
        fetchNotes();
        setEdit(null);
        setNoteTitle("");
      })
      .catch((err) => console.error("Error updating note:", err));
  };

  const deleteHandler = (noteId) => {
    fetch(`http://localhost:3000/notes/${noteId}`, {
      method: "DELETE",
    })
      .then(() => fetchNotes())
      .catch((err) => console.error("Error deleting note:", err));
  };

  const editHandler = (note) => {
    setEdit(note.id);
    setNoteTitle(note.title);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" value={noteTitle} onChange={changeHandler} />
        <button type="submit">{edit ? "Update Note" : "Add Note"}</button>
      </form>
      <h1>All Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <span>{note.title}</span>
            <button onClick={() => editHandler(note)}>Edit</button>
            <button onClick={() => deleteHandler(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
