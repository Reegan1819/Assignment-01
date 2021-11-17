import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import AddIcon from "@material-ui/icons/Add";
import {
  Button,
  TextField,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Modal,
  Box,
  AppBar,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Update from "../update/index";
import ForwardIcon from "@material-ui/icons/Forward";
import { NavLink } from "react-router-dom";

function Startup() {
  const [data, setdata] = useState([]);
  const [addopen, setopen] = useState(false);
  const [updateopen, setupdateOpen] = React.useState(false);
  const [edit, setedit] = useState({
    name: "",
    index: "",
    id: "",
    date: "",
    time: "",
  });
  const [addnew, setaddnew] = useState({
    name: "",
    date: "",
    time: "",
  });

  const [error, seterror] = useState(undefined);

  useEffect(() => {
    axios.get("http://localhost:8000/tododata").then((res) => {
      setdata(res.data);
    });
  }, []);
  const handleaddopen = () => {
    setopen(!addopen);
  };
  const handleupdate = (mapdata, mapindex) => {
    setedit({
      name: mapdata.name,
      index: mapindex,
      id: mapdata.id,
      time: mapdata.time,
      date: mapdata.date,
    });
    setupdateOpen(true);
    console.log(edit);
  };
  const updateclose = () => {
    setupdateOpen(false);
  };
  const handleupdateclose = (updateddata) => {
    setupdateOpen(false);
    const oldvalue = [...data];
    oldvalue[updateddata.index].name = updateddata.name;
    setdata(oldvalue);
  };
  const handledelete = (value, index) => {
    axios
      .delete(`http://localhost:8000/tododata/${value.id}`)
      .then((res) => console.log(res));
    const deletevalue = [...data];
    deletevalue.splice(index, 1);
    setdata(deletevalue);
  };
  const addnewhandlechange = (e) => {
    setaddnew({ ...addnew, [e.target.name]: e.target.value });
  };
  const addnewhandlesubmit = () => {
    const adddata = {
      name: addnew.name,
      date: addnew.date,
      time: addnew.time,
    };
    axios
      .post(` http://localhost:8000/tododata`, adddata)
      .then((res) => console.log(res));
    data.push(adddata);
  };
  var handleforward = async (data, index) => {
    const done = {
      name: data.name,
      date: data.date,
      time: data.time,
    };
    let one = `http://localhost:8000/complete`;
    let two = `http://localhost:8000/tododata/${data.id}`;

    await axios.post(one, done);
    await axios.delete(two);
    deleted(index);
  };
  const deleted = (index) => {
    const deletevalue = [...data];
    deletevalue.splice(index, 1);
    setdata(deletevalue);
  };

  return (
    <div className="totalcontainer">
      <AppBar>
        <Button component={NavLink} to="/complete" style={{color:"white"}} >
          completed
        </Button>
        <Button component={NavLink} to="/ongoing" style={{color:"white"}}>
          ongoing
        </Button>
      </AppBar>
      <div className="backlogcontainer">
      <Button component={NavLink} to="/">Logout</Button>

        <div className="heading">
          <h1>Backlog</h1>
        </div>
        <div id="todocontainer">
          <TableContainer component={Paper} className="tablecontainer">
            <Table
              style={{ width: "700px" }}
              aria-label="simple table"
              className="table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Stage</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>date</TableCell>
                  <TableCell>time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="body">
                {data.map((value, index) => {
                  return (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{value.name}</TableCell>
                      <TableCell>{value.date}</TableCell>
                      <TableCell>{value.time}</TableCell>

                      <span onClick={() => handleupdate(value, index)}>
                        <EditIcon />
                      </span>
                      <span onClick={() => handledelete(value, index)}>
                        <DeleteIcon />
                      </span>
                      <span onClick={() => handleforward(value, index)}>
                        <ForwardIcon />
                      </span>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="tododiv">
            <div className="btn">
              <span onClick={handleaddopen}>
                <AddIcon />
              </span>
            </div>
            {addopen ? (
              <div className="todopage">
                <div className="page">
                  <form>
                    <TextField
                      label="Event"
                      name="name"
                      size="small"
                      focused
                      onChange={addnewhandlechange}
                    ></TextField>
                    <TextField
                      label="Date"
                      name="date"
                      size="small"
                      focused
                      type="date"
                      onChange={addnewhandlechange}
                    ></TextField>
                    <TextField
                      label="Time"
                      name="time"
                      size="small"
                      focused
                      type="time"
                      onChange={addnewhandlechange}
                    ></TextField>

                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={addnewhandlesubmit}
                    >
                      add task
                    </Button>
                  </form>
                </div>
              </div>
            ) : null}
          </div>
          <div>
            <Modal
              open={updateopen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box>
                <Update
                  close={updateclose}
                  updatedata={edit}
                  callbackvalue={handleupdateclose}
                ></Update>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Startup;
