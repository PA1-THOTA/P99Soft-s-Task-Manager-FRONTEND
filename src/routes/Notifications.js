import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { usercontext } from "../Context";
import { NavLink } from "react-router-dom";
import "../css/notifications.css";
import { Link, useNavigate } from "react-router-dom";

const count = 3;
const msg =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed";
const header = "Dummy Header";
const user = "Dummy User";
const deadline = "22/22/22";
const btntype = "Notifications";

const Notifications = () => {
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

  const { username, gmail, designation } = userdetails;

  const navigate = useNavigate();

  useEffect(() => {
    if (notificationstasks.length) {
      axios
        .post(`${url}/setnotificationstatusforassignedtotoempty`, {
          assignedtogmail: userdetails.gmail,
        })
        .then((response) => {
          // console.log(response);
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  });

  return (
    <div>
      <div id="notificationsbox">
        <div id="childbox">
          <div id="headerpart">
            <div id="headertodopart">
              <div id="dot">
                <img src="https://pngimg.com/d/dot_PNG4.png" />
              </div>
              <h3>{btntype}</h3>
              <h4>
                {notificationstasks.length ? notificationstasks.length : 0}
              </h4>
            </div>
          </div>

          <hr id="assignedtaskshr" />

          <div id="taskchilds">
            {username ? (
              notificationstasks.length ? (
                notificationstasks.map((each) => {
                  const {
                    _id,
                    assignergmail,
                    assignername,
                    assignedtogmail,
                    assignedtoname,
                    header,
                    taskcontent,
                    priority,
                    deadline,
                    status,
                    msgfromdoer,
                    msgstatusforassigner,
                    seen,
                  } = each;
                  return (
                    <Notificationspreview
                      _id={_id}
                      assignergmail={assignergmail}
                      assignername={assignername}
                      assignedtogmail={assignedtogmail}
                      assignedtoname={assignedtoname}
                      header={header}
                      taskcontent={taskcontent}
                      priority={priority}
                      deadline={deadline}
                      status={status}
                      msgfromdoer={msgfromdoer}
                      msgstatusforassigner={msgstatusforassigner}
                      seen={seen}
                    />
                  );
                })
              ) : (
                <div
                  id="youhavetologintoaccessthispage"
                  style={{
                    height: "300px",
                    background: "white",
                  }}
                >
                  <h1>You Don't have any New Notifications as of Now</h1>
                </div>
              )
            ) : (
              /* <Notificationspreview/>
                    <Notificationspreview/>
                    <Notificationspreview/>
                    <Notificationspreview/>
                    <Notificationspreview/>
                    <Notificationspreview/> */ <div
                id="youhavetologintoaccessthispage"
                style={{
                  height: "300px",
                  background: "white",
                }}
              >
                <h1>
                  You Have To{" "}
                  <button id="btntla" onClick={() => navigate("/login")}>
                    Login
                  </button>{" "}
                  to Access this page
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Notificationspreview = ({
  _id,
  assignergmail,
  assignername,
  assignedtogmail,
  assignedtoname,
  header,
  taskcontent,
  priority,
  deadline,
  status,
  msgfromdoer,
  msgstatusforassigner,
  seen,
}) => {
  return (
    <Link to={`/taskdetails/${_id}`} id="taskspreview">
      <div id="msgbyuser">
        <h3 className="from">from :- {assignername}</h3>
        <h3>Header :- {header}</h3>
        <h4>Task Content :- {taskcontent}</h4>
      </div>
      <div>
        <button className="button" id="btnt">
          Task Details
        </button>
      </div>
    </Link>
  );
};

export default Notifications;
