import React,{useEffect, useState} from 'react'
import { Button ,TextField,TableContainer,Table,TableBody,TableHead,TableRow,TableCell,Paper,AppBar } from '@material-ui/core'
import axios from 'axios'
import "./index.css"
import { NavLink } from 'react-router-dom'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';



function Ongoing() {
    const [data,setdata]=useState([])
    const [tooday,setday]=useState('')

 useEffect(() => {
 
    axios.get("http://localhost:8000/tododata").then((res)=>{setdata(res.data)})
    const date=new Date();
const day=date.getDate();
const month=date.getMonth();
const year=date.getFullYear()
const today=`${year}-${month+1}-${day}`
setday(today)

 }, [])
 console.log(tooday);


 const handlebackward=(data,index)=>{
    const done={
        name:data.name,
        date:data.date,
        time:data.time
     }
   let one=`http://localhost:8000/tododata`
   let two=`http://localhost:8000/complete/${data.id}`
   
  axios.post(one,done);
  axios.delete(two);  
  deleted(index)
   
 }
 const deleted =(index)=>{
    const deletevalue=[...data]
    deletevalue.splice(index,1)
    setdata(deletevalue)
 
  }
 

    return (<div className="ongoingcontainer">
           <AppBar>
        <Button component={NavLink} to="/complete" style={{color:"white"}} >completed</Button>
        <Button component={NavLink} to="/todo" style={{color:"white"}} >Backlog</Button>

       </AppBar> 
    <div className="backlogcontainer">
    <Button component={NavLink} to="/">Logout</Button>
              <div className="heading">
              <h1>OnGoing</h1>
              </div>
              <div id="todocontainer">

<TableContainer  component={Paper} className="tablecontainer">
<Table  style={{width:"700px"}} aria-label="simple table"  >
<TableHead>
<TableRow  >
 <TableCell>Stage</TableCell>
 <TableCell>Name</TableCell>
 <TableCell>date</TableCell>
 <TableCell>time</TableCell>

</TableRow>
</TableHead>
<TableBody>
    {
    data.filter((x)=>{
        if(x.date===tooday){
            return x
        }
     }).map((value,index)=>{return <TableRow>
            <TableCell>{index+1}</TableCell>
            <TableCell>{value.name}</TableCell> 
            <TableCell>{value.date}</TableCell> 
            <TableCell>{value.time}</TableCell> 
            <span onClick={()=>handlebackward(value,index)}><ArrowLeftIcon/></span>


          </TableRow>

        })


    }

</TableBody>
</Table>
</TableContainer>

</div>
</div>
</div>)
}

export default Ongoing
