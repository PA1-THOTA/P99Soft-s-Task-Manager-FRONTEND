import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { usercontext } from "../Context";
import "../css/messages.css";
import { Link, useNavigate, NavLink } from "react-router-dom";

const count = 3;
const msg =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed";
const header = "Dummy Header";
const user = "Dummy User";
const deadline = "22/22/22";
const btntype = "Messages";

const Messages = () => {
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

  useEffect(() => {
    if (messagestasks.length) {
      axios
        .post(`${url}/setmsgstatusforassignertoempty`, {
          assignergmail: userdetails.gmail,
        })
        .then((response) => {
          // console.log(response);
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  });

  const { username, gmail, designation } = userdetails;

  const navigate = useNavigate();

  return (
    <div>
      <div id="messagesbox">
        <div id="childbox">
          <div id="headerpart">
            <div id="headertodopart">
              <div id="dot">
                <img src="https://pngimg.com/d/dot_PNG4.png" />
              </div>
              <h3>{btntype}</h3>
              <h4>{messagestasks.length ? messagestasks.length : 0}</h4>
            </div>
          </div>

          <hr id="assignedtaskshr" />

          <div id="taskchilds">
            {username ? (
              messagestasks.length ? (
                messagestasks.map((each) => {
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
                    <Messagespreview
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
                  <h1>You Don't have any New Messages as of Now</h1>
                </div>
              )
            ) : (
              /* <Messagespreview />
            <Messagespreview />
            <Messagespreview />
            <Messagespreview />
            <Messagespreview />
            <Messagespreview />*/ <div
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

const Messagespreview = ({
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
    <Link to={`/assignedtaskdetails/${_id}`} id="taskspreview">
      <div id="msgbyuser">
        <h3 className="from">from :- {assignedtoname}</h3>
        <h3>{header}</h3>
        <h4>Message from assignee:- :- {msgfromdoer}</h4>
      </div>
      <div>
        <button className="button" id="btntm">
          Task Details
        </button>
      </div>
    </Link>
  );
};

export default Messages;
