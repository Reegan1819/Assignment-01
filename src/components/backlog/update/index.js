
import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import "./index.css"
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';


function Update(props) {

    const [data,setdata]=useState(props.updatedata)
    console.log(data);
    const handlechange=(e)=>{
     setdata({...data,name:e.target.value})
     console.log(data);
    }
    const handlesubmit=()=>{
        const updateddata={
            name:data.name,
            id:data.id,
            date:data.date,
            time:data.time
        }
axios.put(`http://localhost:8000/tododata/${data.id}`,updateddata).then((res)=>console.log(res))
props.callbackvalue(data)

    }
    
    return (
        <div className="updatepagebox">
        <div className="container" >
            <div className="page">
                <span className="closebtn" onClick={()=>{props.close()}} ><CloseIcon/></span>
                <form onSubmit={handlesubmit} >
                <TextField label="Event" required  name="name" value={data.name} onChange={handlechange}></TextField>
                <Button variant="contained" color='primary' type="submit"  >update</Button>
                </form>
            </div>

        </div>
        </div>
    )
}

export default Update
