import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom' ;


const Login = (props) => {
    let navigate = useNavigate();
const[credentials , setCredentials ] = useState({email:"" , password:"" }) ; 
// const[password,setPassword] = useState("");
  const handleOnSubmit = async (e) =>{
    e.preventDefault(); 
    const response = await fetch("http://localhost:5000/api/auth/login", {
        method:'POST' , 
        headers:{
            'Content-Type': 'application/json'
        }, 
        body:JSON.stringify({email:credentials.email, password:credentials.password})
    }); 
    const json = await response.json();
    console.log(json);
    if(json.success){
    // save the auth token ad redirect 
    localStorage.setItem('token', json.authtoken);
   props.showAlert("Logged in successfully" , "success");
   navigate("/"); 
    }
    else{
      props.showAlert("Wrong password" , "danger"); 
    }
  }
  const handleOnChange = (e)=>{
    setCredentials({...credentials , [e.target.name]:e.target.value})
  }

  return (
    <div className='conatiner'>

    <form  onSubmit={handleOnSubmit}>
  <div className=" mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} onChange={handleOnChange} id="email" name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password"  className="form-control" id="password" name='password'onChange={handleOnChange} value={credentials.password}/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default Login