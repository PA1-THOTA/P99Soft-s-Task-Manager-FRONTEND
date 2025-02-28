import React, { useEffect, useState,useContext } from 'react'
import { usercontext } from "../Context";
import {NavLink} from 'react-router-dom'
import "../css/sidebar.css"
import { Link, useNavigate } from "react-router-dom";

const messagecount=43
const Sidebar = () => {
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

  const navigate = useNavigate();
  
    return (
      <div id="sidenav">
        <div>
          <img
            id="logo"
            src="https://p99soft.com/wp-content/uploads/2023/03/logo-300x94.png"
            alt="p99soft logo"
          />
        </div>
        <div id="toponeinsidenav">
          <NavLink to="/home">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" />
            <h3>Home</h3>
          </NavLink>
          <NavLink to="/assingedtasks">
            <img src="https://static.vecteezy.com/system/resources/previews/025/638/355/non_2x/simple-task-icon-the-icon-can-be-used-for-websites-print-templates-presentation-templates-illustrations-etc-free-vector.jpg" />
            <h3>Assigned Tasks</h3>
          </NavLink>
          <NavLink to="/taskstodo">
            <img src="https://static-00.iconduck.com/assets.00/todo-icon-2048x2048-pij2pwiy.png" />
            <h3>Tasks To Do</h3>
          </NavLink>
          <NavLink to="/messages">
            <img src="https://static-00.iconduck.com/assets.00/message-icon-256x232-0r4sfe1o.png" />
            <h3>
              Messages{" "}
              <span
                style={{
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "5px",
                  border: "2px solid black",
                }}
              >
                {messagestasks.length?messagestasks.length:0}
              </span>
            </h3>
          </NavLink>
          <NavLink to="/about">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP2oNant9KWdXyhWn2PWAZF0wdjxYs0jt5dA&s" />
            <h3>About</h3>
          </NavLink>
        </div>

        <div id="mytasks">
          <h2 style={{ color: "black", textDecoration: "underline" }}>
            My ToDos
          </h2>
          <div>
            <li>
              <NavLink to="/personaltodo">Personal</NavLink>
            </li>
            <li>
              <NavLink to="/professionaltodo">Professional</NavLink>
            </li>
          </div>
        </div>
      </div>
    );
}

export default Sidebar
