import { useState } from "react";
import "./App.css";

const App = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Notes 1",
    },
    {
      id: 2,
      title: "Notes 2",
    },
  ]);
  const [edit, setEdit] = useState("");
  const changeHandler = (e) => {
    setNoteTitle(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (noteTitle.trim() === "") {
      alert("Please fill in the filed");
      return;
    }
    !edit ? createNotes() : updateNotes();
  };

  const createNotes = () => {
    let newNotes = [...notes, { id: Date.now(), title: noteTitle }];
    setNotes(newNotes);
    setNoteTitle("");
  };

  const updateNotes = () => {
    let updatedNotes = notes.map((item) =>
      item.id === edit ? { ...item, title: noteTitle } : item
    );
    setNotes(updatedNotes);
    setEdit("");
    setNoteTitle("");
  };
  const deleteHandler = (noteId) => {
    let updateNotes = notes.filter((item) => item.id !== noteId);
    setNotes(updateNotes);
  };

  const editHandler = (note) => {
    setEdit(note.id);
    setNoteTitle(note.title);
    
  };

 // const {submitHandler,noteTitle,changeHandler,edit,notes,editHandler,deleteHandler}
  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" value={noteTitle} onChange={changeHandler} />
        <button type="submit">{edit ? "Update Notes" : "Add Notes"}</button>
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
