import React,{useState,useEffect} from 'react'
import "./index.css"
import { Button ,TextField,TableContainer,Table,TableBody,TableHead,TableRow,TableCell,Paper,AppBar } from '@material-ui/core'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';




function Completed(props) {
  const [data,setdata]=useState([])

  useEffect(() => {
   axios.get("http://localhost:8000/complete").then((res)=>{setdata(res.data)} )
  }, [])

  const handledelete=(value,index)=>{
    axios.delete(`http://localhost:8000/complete/${value.id}`).then((res)=>console.log(res))
    const deletevalue=[...data]
    deletevalue.splice(index,1)
    setdata(deletevalue)
 
  }
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
 


    return (<div className="completepagecontainer">
            <AppBar>
        <Button component={NavLink} to="/todo" style={{color:"white"}} >backlog</Button>
        <Button component={NavLink} to="/ongoing" style={{color:"white"}} >ongoing</Button>

       </AppBar> 

    <div className="backlogcontainer">
    <Button component={NavLink} to="/" style={{float:"right"}}>Logout</Button>
              <div className="heading">
              <h1>Finished</h1>
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
    data.map((value,index)=>{return <TableRow>
            <TableCell>{index+1}</TableCell>
            <TableCell>{value.name}</TableCell> 
            <TableCell>{value.date}</TableCell> 
            <TableCell>{value.time}</TableCell> 
            <span onClick={()=>handledelete(value,index)}><DeleteIcon/></span>
            <span onClick={()=>handlebackward(value,index)} ><ArrowLeftIcon/></span>
          

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

export default Completed
