import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useContext } from "react";
import { noteContext } from "../context/noteContext";
import Addnotes from './Addnotes';
import Noteitems from './Noteitems';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom' ;


export const Notes = (props) => {
    let navigate = useNavigate() ; 
    const context = useContext(noteContext); 
  const {notes , getNotes , editNote} = context ; 
  const [note  ,  setNote] = useState({id:"" , etitle:"" , edescription :"" , etag:""});
 
 useEffect(()=>{
  if(localStorage.getItem('token')){
    getNotes(); 
  }
  else{
 navigate('/')
  }
  
 }, [])
 const updateNote = (currentNote) =>{
    closeRef.current.click();  
    setNote({id:currentNote._id, etitle:currentNote.title , edescription :currentNote.description , etag:currentNote.tag }); 
 }
 const ref = useRef(null);
 const closeRef = useRef(null); 

 const handleClick = (e)=>{
  closeRef.current.click();
  editNote(note.id, note.etitle , note.edescription , note.etag);
  props.showAlert("NOTE ADDED  UPDATES SUCCESSFULLY " , "SUCCESS") ; 
}

const handleOnChange =(e) =>{
  setNote({...note , [e.target.name]:e.target.value})
  console.log("inside change");
}

  return (
     <>
     <Addnotes showAlert={props.showAlert}/>
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={handleOnChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleOnChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleOnChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button disabled= {note.etitle.length<5 || note.edescription.length<5} ref ={closeRef}type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


    <div className=' row my-3'>
        <h2>Your Notes</h2>
        <div className="container mx-2">
        { notes.length=== 0 &&  'No notes to  display'}
        </div>
        {notes.map((note)=>{
        return <Noteitems key={note._id} updateNote={updateNote} showAlert = {props.showAlert} note ={note}/>
      })}




      </div>
      </>
  )
}

export default Notes ; 


