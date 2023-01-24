import React from 'react'
import { Notes } from './Notes';
import { useContext } from "react";
import { noteContext } from "../context/noteContext";


function Noteitems(props) {
  const context = useContext(noteContext); 
  const {deleteNote} = context ;
    const{note , updateNote} = props ; 
  return (
    <div className='col-md-3'>
   <div className="card my-3" >
  <div className="card-body">
    <div className="d-flex align-items-center">
    <h5 className="card-title">{note.title}</h5>    
    <i className="fa-sharp fa-solid fa-trash mx-4 " onClick={()=>{deleteNote(note._id) ; props.showAlert("note deleted successfully " , "primary")}}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}} ></i>
    </div>

    <p className="card-text">{note.description}</p>

 
  </div>
</div>


    </div>

    
  )
}

export default Noteitems