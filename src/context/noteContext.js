import React from "react";
require('dotenv').config()
import { createContext } from "react";
import { useState } from "react";


export const noteContext = createContext();

// const NoteState = (props) => {
//   const host = "http://localhost:5000";

//   const initialNotes = [];
//   const [notes, setNotes] = useState(initialNotes);


//   const getNotes = async (title , description , tag ) =>{
//     //TODO API CALL
//     const response = await fetch(`${host}/api/notes/fetchallnotes` , {
//      mehtod:'GET' , 
//      header : {//        'Content-Type' : 'application/json', 
//        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhMWE2ZjkzNjk4MDVkNmY2ZTBkZjM2In0sImlhdCI6MTY3MTUzODQ2NH0.3tZzXnIUDR9LIaqjLJkRYNyvx76mpw7cYR2I2dW7Upc"
//      }
//    }); 
//       const json = await response.json()
//      console.log(json);
//    }

//   //ADD A NOTE
//   // const addNote = async (title, description, tag) => {
//   //   //TODO API CALl
//   //   const response = await fetch(`${host}/api/notes/addnote`, {
//   //     mehtod: "POST",
//   //     header: {
//   //       "Content-Type": "application/json",
//   //       "auth-token":
//   //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5YzYyZDAyZGRlYmQxNDAxNzliZTMxIn0sImlhdCI6MTY3MTE5MzMzMX0.joo10bwTd04lh6ED6MKuaEEXlZ7yH8IXZC8Git6Yj6I",
//   //     },
//   //     body: JSON.stringify({ title, description, tag }),
//   //   });

//   //   console.log("adding a new note ");
//   //   const note = { 
//   //     _id: "639c63452ddebd14179be35",
//   //     user: "639c62d02ddebd140179be31",
//   //     title: title,
//   //     description: description,
//   //     tag: "personal motivation",
//   //     date: "2022-12-16T12:23:33.794Z",
//   //     __v: 0,
//   //   };
//   //   setNotes(notes.concat(note));
//   //   console.log(note);
//   // };
//   const addNote = async (title, description, tag) => {
//     // TODO: API Call

//   }

//   // DELETE A NOTE
//   const deleteNote = (id) => {
//     console.log("deletinh the note with id " + id);
//     //TODO API CALL
//     const newNotes = notes.filter((notes) => notes._id !== id);
//     setNotes(newNotes);
//   };

//   // EDIT A NOTE
//   const editNote = async (id, title, description, tag) => {

//   };
 

//   return (
//     <noteContext.Provider value={{ notes, addNote, deleteNote, editNote , getNotes }}>
//       {props.children}
//     </noteContext.Provider>
//   );
// };

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  const atoken =  localStorage.getItem('token')
  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": process.env.AUTH_TOKEN 
      }
    });
    
    const json = await response.json() ;
    setNotes(json); 
    console.log(json);  
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": process.env.AUTH_TOKEN 
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": process.env.AUTH_TOKEN 
      }
    });
    const json =await response.json(); 
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": process.env.AUTH_TOKEN 
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )

}
export default NoteState;
