import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom' ;
// import {useHistory } from 'react-router-dom';

const Signup = (props) => {

   
    const[credentials , setCredentials ] = useState({name:"" , email:"" , password:"" }) ; 
 const navigate = useNavigate(); 
      const handleOnSubmit = async (e) =>{
        e.preventDefault(); 
        const {name , email , password } = credentials ; 
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method:'POST' ,  
            headers:{
                'Content-Type': 'application/json'
            }, 
            body:JSON.stringify({name , email, password})
        }); 
        const json = await response.json();
        console.log(json);
        if(json.success){
        // save the auth token ad redirect 
        localStorage.setItem('token', json.authtoken);
        navigate("/");
        props.showAlert("Account created in successfully" , "success")
        }
        else{
            alert("invalid credentials");
            props.showAlert("invalid credential" , "danger") 
        }
      }
      const handleOnChange = (e)=>{
        setCredentials({...credentials , [e.target.name]:e.target.value})
      }

  return (
    <div className='conatiner'>
     <form onSubmit={handleOnSubmit}>
  <div className="mb-3">

  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name = "name" onChange={handleOnChange}/>
  </div>
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name = "email" onChange={handleOnChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control"  name = "password" id="password" required minLength={5} onChange={handleOnChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">cPassword</label>
    <input type="password" className="form-control" id="cpassword" name = "cpassword"required minLength={5} onChange={handleOnChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default Signup