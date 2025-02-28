import React, { useState, useEffect, useContext } from "react";
import '../css/assignedtasks.css'
import { Link,useNavigate } from 'react-router-dom'
import axios from "axios";
import { usercontext } from "../Context";


    const count=3
    const priority="low"
    const header="Dummy Header"
    const user="Dummy User"
    const deadline="22/22/22"
    const btntype="Assigned Tasks" 

const AssignedTasks = () => {

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

    const [loading, setLoading] = useState({
      status: false,
      msg: "",
      messagedisplayerbtn: "",
    });
    const [errormessage, setErrormessage] = useState({
      msg: "",
    });

    const { username, gmail, designation } = userdetails;

    // console.log(loading);

    const navigate = useNavigate();
  
    useEffect(() => {
        // console.log(userdetails);
      if (username) {
        setassignedTasks([]);
        setLoading({
          status: true,
          msg: "Fetching Tasks. Please wait...",
          messagedisplayerbtn: "",
        });
      axios
        .post(`${url}/getassignedtasks`, {assignergmail:userdetails.gmail})
        .then((resdata) => {
          // console.log(resdata.data);
          
          setLoading({
            status: false,
            msg: "",
            messagedisplayerbtn: "",
          });
          setassignedTasks(resdata.data);
        })
        .catch((err) => {
          // console.log(err);
          setLoading({
            status: false,
            msg: "Something went wrong. Please Try Again",
            messagedisplayerbtn: "Try Again",
          });
        });}
    }, []);
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
              <h4>{assignedtasks.length}</h4>
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
                gridTemplateColumns: assignedtasks.length
                  ? "repeat(3,calc(calc(100vw - 400px) / 3))"
                  : "repeat(1,1fr)",
              }}
            >
              {assignedtasks.length ? (
                assignedtasks.map((each) => {
                  const {
                    deadline,
                    header,
                    priority,
                    status,
                    taskcontent,
                    _id,
                    assignedtoname,
                  } = each;
                  return (
                    <Taskspreview
                      deadline={deadline}
                      header={header}
                      priority={priority}
                      status={status}
                      taskcontent={taskcontent}
                      _id={_id}
                      assignedtoname={assignedtoname}
                    />
                  );
                })
              ) : (
                <div id="youdonthaveatasktodo">
                  <h1>
                    You Don't Have Any Tasks Assigned.{" "}
                    <button
                      id="btntla"
                      onClick={() => {
                        setEditingtasks({
                          status: false,
                          selftask: {},
                        });
                        navigate("/assigningtasks");
                      }}
                    >
                      Assign
                    </button>
                    A Task
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
  assignedtoname,
  _id,
}) => {
  return (
    <div id="adttaskspreview" key={_id}>
      <Link to={`/assignedtaskdetails/${_id}`}>
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
          <h4>to</h4>
          <h3>{assignedtoname}</h3>
        </div>
        <div id="adtdeadline">
          <h4>Deadline :- {deadline.slice(0, 10).replaceAll("-", "/")}</h4>
        </div>
      </Link>
    </div>
  );
};

export default AssignedTasks
