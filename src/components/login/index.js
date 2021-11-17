import React, { useState,useEffect } from 'react'
import { Button, TextField } from '@material-ui/core'
import "./index.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'


function Login(props) {

 const [todopage,settodopage]=useState(false)
const [matcheddata,setmatcheddata]=useState(undefined);
const [errormes,setmes]=useState(false);
 const navigate=useNavigate();

 useEffect(() => {
   axios.get("http://localhost:8000/data").then((res)=>{setmatcheddata(res.data)})
 }, [])

 
const formik=useFormik({
    initialValues:{
      email:"",
      password:""
    },
    onSubmit:values=>{
        matcheddata.filter((value)=>{
            if(value.email===values.email&&value.password===values.password){
                return navigate("/todo")
            }
         })
      setmes(true)
    },
    validate:values=>{
      const err={};
   
      if(!values.email){
        err.email="required"
      }
      if (!values.password){
        err.password="required"
      }else if (!/^[a-zA-Z0-9!@#$%^&*]{6,16}$/i.test(values.password)) {
        err.password = 'Invalid  password';
      }
  
  
  
      return err
    }
  
  })
  


    return (
        <div className="logincontainer" style={{background:"lightgrey"}}>
            <div className="loginpage">
            <form onSubmit={formik.handleSubmit} >
    <div className="formcontainer">


      <div className="field">
      <div>
          <h1>Login</h1>
          {
         errormes?<p style={{color:"red",fontSize:"small",textTransform:"capitalize"}} >check the password and email</p>:null
        }

          </div>
       
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
        label="password"
        value={formik.values.password} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
        className="input"
        ></TextField></div>
        {formik.touched.password&&formik.errors.password?<div className="error"> {formik.errors.password} </div>:null}
      </div>
        <Button type="submit" variant="contained" color='primary'  className="btn">login</Button>
        </div>
      </form>
            </div>
        </div>
    )
}

export default Login
