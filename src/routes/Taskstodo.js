import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import '../css/assignedtasks.css'
import {Link} from 'react-router-dom'
import { usercontext } from "../Context";
import { useNavigate } from "react-router-dom";

    const count=3
    const priority="low"
    const header="Dummy Header"
    const user="Dummy User"
    const deadline="22/22/22"
    const btntype="Tasks To Do" 

const Taskstodo = () => {

    const [
      userdetails,
      setUserdetails,
      signinuserdetails,
      setSigninuserdetails,
      selftasks,
      setSelftasks,
      taskstodo,
      setTaskstodo,
      editingselftasks,
      setEditingselftasks,
      url,
      editingtasks,
      setEditingtasks,
      assignedtasks,
      setassignedTasks,
    ] = useContext(usercontext);

    const { username, designation, gmail } = userdetails;

    const [loading, setLoading] = useState({
      status: false,
      msg: "",
      messagedisplayerbtn: "",
    });
  
  const [errormessage, setErrormessage] = useState({
    msg: "",
  });

    // console.log(loading);

    const navigate = useNavigate();

    useEffect(() => {
      // console.log(gmail);
      //make this to gmail before sending to perduction
      if (username) {
        setTaskstodo([]);
        setLoading({
          status: true,
          msg: "Fetching Tasks, Please wait",
          messagedisplayerbtn: "",
        });
        axios
          .post(`${url}/getassignedtotasks`, {
            assignedtogmail: userdetails.gmail,
          })
          .then((response) => {
            setTaskstodo(response.data);
            setLoading({
              status: false,
              msg: "Fetching Tasks, Please wait",
              messagedisplayerbtn: "",
            });
            // console.log(response.data);
            // setSelftasks(response.data);
          })
          .catch((err) => {
            setLoading({
              status: true,
              msg: "Something went wrong. Please Try Again",
              messagedisplayerbtn: "",
            });
            // console.log(err);
          });
      }
    }, []);
  
  const removeloadingbox = () => {
    // console.log(loading);
    setLoading({
      status: false,
      msg: "",
      messagedisplayerbtn: "",
    });
  };
    
  return (
    <div>
      <div id="adtbox">
        <div id="adtchildbox">
          <div id="headerpart">
            <div id="headertodopart">
              <div id="dot">
                <img src="https://pngimg.com/d/dot_PNG4.png" />
              </div>
              <h3>{btntype}</h3>
              <h4>{taskstodo.length}</h4>
            </div>
            <div id="tickmark">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5290/5290982.png"
                alt="tick mark"
              />
            </div>
          </div>

          <hr id="assignedtaskshr" />
          {loading.status ? (
            <div
              id="assigningmytasksloadmessage"
              style={{ display: loading.status ? "flex" : "none" }}
            >
              <div>
                <h3>{loading.msg}</h3>
                {/* <button id="assigningmytasksbtnloadok" onClick={()=>{}}>
                {loading.messagedisplayerbtn}
              </button> */}
              </div>
            </div>
          ) : username ? (
            <div
              id="adttaskchilds"
              style={{
                gridTemplateColumns: taskstodo.length
                  ? "repeat(3,calc(calc(100vw - 400px) / 3))"
                  : "repeat(1,1fr)",
              }}
            >
              {taskstodo.length ? (
                taskstodo.map((each) => {
                  const {
                    deadline,
                    header,
                    priority,
                    status,
                    taskcontent,
                    _id,
                    assignername,
                  } = each;
                  return (
                    <Taskspreview
                      deadline={deadline}
                      header={header}
                      priority={priority}
                      status={status}
                      taskcontent={taskcontent}
                      _id={_id}
                      assignername={assignername}
                      key={_id}
                    />
                  );
                })
              ) : (
                <div id="youdonthaveatasktodo">
                  <h1>
                    You Don't Have Any Tasks Todo {designation=="Manager"?<>,Because you are a Manager</>:<></>}. Enjoy Your Day
                  </h1>
                </div>
              )}
            </div>
          ) : (
            <div id="youhavetologintoaccessthispage">
              <h1>
                You Have To{" "}
                <button id="btntla" onClick={() => navigate("/login")}>
                  Login
                </button>{" "}
                to Access this page
              </h1>
            </div>
          )}

          {/* <div id="adttaskchilds">
                    <Taskspreview/>
                    <Taskspreview/>
                    <Taskspreview/>
                    <Taskspreview/>
                    <Taskspreview/>
                    <Taskspreview/>
                    <Taskspreview/>
                    <Taskspreview/>
                    <Taskspreview/>
                </div> */}
        </div>
      </div>
    </div>
  );
}

const Taskspreview = ({
  deadline,
  header,
  priority,
  status,
  taskcontent,
  assignername,
  _id,
}) => {
  return (
    <div id="adttaskspreview" key={_id}>
      <Link to={`/taskdetails/${_id}`}>
        <div id="adttasksheader">
          <span id="mpriority">Priority :- </span>
          <span
            className={`mpriorityind ${
              priority == "Low"
                ? "mlow"
                : priority == "High"
                ? "mhigh"
                : "mmedium"
            }`}
          >
            {priority}
          </span>
          <h2>...</h2>
        </div>
        <div id="adtheaderbyuser">
          <h3>{header}</h3>
          <h4>by</h4>
          <h3>{assignername}</h3>
        </div>
        <div id="adtdeadline">
          <h4>Deadline :- {deadline.slice(0, 10).replaceAll("-", "/")}</h4>
        </div>
      </Link>
    </div>
  );
};

export default Taskstodo
