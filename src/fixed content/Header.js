import React, { useContext } from 'react'
import axios from "axios";
import '../css/header.css'
import { Link, NavLink } from 'react-router-dom'
import {usercontext} from "../Context"

const Header = () => {
    // const data=useContext(usercontext)
    // console.log(data)
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
    const {username,designation} = userdetails;
    const notificationCount = 1;
    return (
      <>
        <div id="header">
          <div>
            <h1>Hello {username ? username : "User"} !</h1>
            <h3 style={{ color: "rgb(99, 99, 99)" }}>Have a nice day</h3>
          </div>
          <h3 id="notifications">
            <NavLink to="/notifications">
              <span id="bell">&#128276;</span>
              <span id="notificationcount">
                {username?notificationstasks.length ? notificationstasks.length : 0:0}
              </span>{" "}
              Notifications
            </NavLink>
          </h3>
          <Link to="/editinguserdetails" id="userinfo" title="Edit User Details">
            <div>
              <h2>{username ? username : "User"}</h2>
              <h4 style={{ color: "rgb(99, 99, 99)" }}>
                {!!designation ? designation : "Just user"}
              </h4>
            </div>
            <img
              src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
              alt="usericon"
              id="usericon"
            />
            {/* <img id="arrowicon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg9_Z2L5vrb4aL3WGKoVfZtW5J2MO_yUlfXz1qCBZQ7rklaZp83W8yHvTairJ_NpIw1NA&usqp=CAU" alt='usericon' /> */}
          </Link>
          <div>
            {username ? (
              <button className="button" id="btnh">
                <Link to="/logout">LogOut</Link>
              </button>
            ) : (
              <button className="button" id="btnd">
                <Link to="/login">LogIn</Link>
              </button>
            )}
          </div>
          <div>
            <button className="button" id="btnh">
              <Link to="/signin">SignUp</Link>
            </button>
          </div>
        </div>
        <hr />
      </>
    );
}

export default Header
