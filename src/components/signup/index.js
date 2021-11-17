import React, { useState } from 'react'
import {  TextField,Button,Typography } from '@material-ui/core'
import "./index.css"
import axios from 'axios'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'




function Signuppage(props) {

const [message,setmessage]=useState(false)


const formik=useFormik({
    initialValues:{
      name:"",
      email:"",
      username:"",
      password:""
    },
    onSubmit:values=>{
        
        const sentdata={
            name:values.name,
            username:values.username,
            email:values.email,
            password:values.password
        }
           axios.post(" http://localhost:8000/data",sentdata).then((res)=>console.log(res))
          
        setmessage(true)
     
    },
    validate:values=>{
      const err={};
      if(!values.name){
        err.name="required"
      }
      if(!values.email){
        err.email="required"
      }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        err.email = 'Invalid email address';
      }
    
      if (!values.password){
        err.password="required"
      }else if (!/^[a-zA-Z0-9!@#$%^&*]{6,16}$/i.test(values.password)) {
        err.password = 'Invalid  password';
      }
      if(!values.username){
          err.username="required"
      }
  
  
  
      return err
    }
  
  })
  


    return (
        <div className="box">
          <Typography align='right'>
          <Button variant="contained" component={NavLink} to="/login" style={{backgroundColor:"green"}}  >login</Button>
          </Typography>
        <div className="container" >
            <div className="page">
<form onSubmit={formik.handleSubmit} >
    <div className="formcontainer">
      <div className="field">
        <div>
          <h1>Sign up</h1>
          </div>
       
        <div>
        <TextField 
        type="text"
        name="name"
        id="name" 
        label="Name"
        value={formik.values.name} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
        className="input"
        >
       
        </TextField></div>
        {formik.touched.name&&formik.errors.name?<div className="error"> {formik.errors.name} </div>:null}
      </div>

      <div className="field">
     
        <div>
        <TextField 
        type="text"
        name="username"
        id="username" 
        label="Username"
        value={formik.values.username} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
        className="input"
        >
        </TextField></div>
        {formik.touched.username&&formik.errors.username?<div className="error"> {formik.errors.username} </div>:null}
      </div>


      <div className="field">
      
        <div>
        <TextField 
        type="text" 
        name="email" 
        id="email" 
        label="Email"
        value={formik.values.email} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
        className="input"
        >
        </TextField></div>
        {formik.touched.email&&formik.errors.email?<div className="error"> {formik.errors.email} </div>:null}
      </div>

      <div className="field">
     
        <div>
        <TextField 
        type="password" 
        name="password" 
        id="password" 
        label="Password"
        value={formik.values.password} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
        className="input"
        ></TextField></div>
        {formik.touched.password&&formik.errors.password?<div className="error"> {formik.errors.password} </div>:null}
      </div>
        <Button type="submit" variant="contained" color='primary'>submit</Button>
        </div>
      </form>
      {
          message?<span>Registed successfully <NavLink to="/login">login</NavLink></span>:null
      }
     </div>

        </div>
        </div>
    )
}

export default Signuppage
