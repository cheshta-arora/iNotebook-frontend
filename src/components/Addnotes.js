import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { noteContext } from "../context/noteContext";

const Addnotes = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title:"", description:"", tag:""})
    console.log("inside click");
    
  props.showAlert("NOTE ADDED SUCCESSFULLY " , "SUCCESS") ; 
  };

  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    console.log("inside change");
  };

  return (
    <div>
      <div className="container my-3">
        <h2>Add Note</h2>
        <form className=" center my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={handleOnChange}
              minLength={5}
              required
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="desciption" className="form-label">
              Description{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="desciption"
              name="description"
              onChange={handleOnChange}
              minLength={5}
              required
              value={note.description}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={handleOnChange}
              value = {note.tag}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled= {note.title.length<5 || note.description.length<5}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnotes;
