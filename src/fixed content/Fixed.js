import React, { useEffect, useContext } from "react";
import { usercontext } from "../Context";
import "../css/fixed.css";
import { Link,useNavigate } from "react-router-dom";

const Fixed = () => {
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
    messagestasks,
    setMessagestasks,
    notificationstasks,
    setNotificationstasks,
  ] = useContext(usercontext);

  const navigate = useNavigate()
  
  const { username, designation } = userdetails;

  return (
    <div id="fixed">
      <div>
        <h1>Task Manager</h1>
        <img src="https://cdn-icons-png.flaticon.com/512/1860/1860115.png" />
      </div>
      <div>
        <Link to="/assigningtasks" onClick={()=>{setEditingtasks({
          status: false,
          selftask: {},
        });}}>
          <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/fountain_pen.png" />
          <h2 id="assignatasklink">
            {" "}
            <span style={{ visibility: "hidden" }}>fer</span> ASSIGN A TASK
          </h2>
        </Link>
      </div>
      {username ? (
        <div id="filter">
          <img
            src="https://cdn-icons-png.flaticon.com/512/107/107799.png"
            alt="filtersymbol"
          />
          <h3>TASKS</h3>
          <img
            src="https://cdn-icons-png.flaticon.com/256/339/339851.png"
            alt="down arrow"
          />
        </div>
      ) : (
        <div id="dummymsg">
          <h1>
            You Have To
            <button className="button" id="btnf" onClick={()=>{navigate("/login")}}>
              Login
            </button>
            To Use The Actual Functionality Of This Website
          </h1>
        </div>
      )}
    </div>
  );
};

export default Fixed;
