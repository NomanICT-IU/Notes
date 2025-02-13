import { useState } from "react";
import "./App.css";

const App = () => {
  const [notesTitle, setNotesTitle] = useState("");
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
  const [status, setStatus] = useState(false);

  const [editNotes, setEditNotes] = useState({});
  /**submit handler start here */
  const submitHandler = (e) => {
    e.preventDefault();
    if (notesTitle.trim() === "") {
      alert("Please fill in the input");
      return;
    }


    const newNotes = [...notes, { id: Date.now(), title: notesTitle }];
    setNotes(newNotes);
    setNotesTitle("");
  };
  /**submit handler end here */

  /**change handler start here */
  const changeHandler = (e) => {
    setNotesTitle(e.target.value);
  };
  // console.log(notesTitle);
  /**change handler end here */

  /**delete handler start here */
  const deleteHandler = (noteId) => {
    let reduceNotes = notes.filter((item) => item.id !== noteId);
    setNotes(reduceNotes);
  };
  /**delete handler end  here */

  /**update handler start here */
  const editHandler = (note) => {
    setEditNotes(note);

  };

  console.log(editNotes);
  /**update handler end here */
  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" value={notesTitle || editNotes.title } onChange={changeHandler} />
        <button type="submit">{status ? "Update Notes" : "Add Notes"}</button>
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
