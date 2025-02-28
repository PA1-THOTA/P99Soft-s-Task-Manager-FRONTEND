import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../css/box.css";
import { Link, NavLink } from "react-router-dom";
import { usercontext } from "../Context";

const Box = () => {
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

  const [tasks_todo, setTasks_todo] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [done, setDone] = useState([]);

  const [loading, setLoading] = useState({
    status: false,
    msg: "",
    messagedisplayerbtn: "",
  });
  const [errormessage, setErrormessage] = useState({
    msg: "",
  });

  const { username, gmail, designation } = userdetails;

  useEffect(() => {
    // console.log(userdetails);
    if (username) {
      setLoading({
        status: true,
        msg: "Fetching Tasks. Please wait...",
        messagedisplayerbtn: "",
      });
      axios
        .post(`${url}/getassignedtotasks`, {
          assignedtogmail: userdetails.gmail,
        })
        .then((resdata) => {
          // console.log(resdata.data);
          setTaskstodo(resdata.data)
          
          const tasks_todo = resdata.data.filter(each => { return each.status === "Not Started Yet" })
          setTasks_todo(tasks_todo)
          const inprogress = resdata.data.filter(each => { return each.status === "In Progress"; })
          setInprogress(inprogress)
          const done = resdata.data.filter(each => { return each.status === "Completed"; })
          setDone(done)
          // const messagestasks = resdata.data.filter((each) => {
          //   return each.msgstatusforassigner === "false";
          // });
          // console.log(messagestasks)
          const notificationstasks = resdata.data.filter((each) => {
            return each.seen === "Not Seen";
          });
          // console.log(notificationstasks);
          switch (designation) {
            case "Manager":
              // setMessagestasks(messagestasks);
              setNotificationstasks([]);
              break;
            case "Team Lead":
              // setMessagestasks(messagestasks);
              setNotificationstasks(notificationstasks);
              break;
            case "Employee":
              // setMessagestasks([]);
              setNotificationstasks(notificationstasks);
              break;
          }
          
          setLoading({
            status: false,
            msg: "",
            messagedisplayerbtn: "",
          });
        })
        .catch((err) => {
          // console.log(err);
          setLoading({
            status: true,
            msg: "Something went wrong. Please Try Again",
            messagedisplayerbtn: "Try Again",
          });
        });
    }
  }, []);

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
        .post(`${url}/getassignedtasks`, { assignergmail: userdetails.gmail })
        .then((resdata) => {
          // console.log(resdata.data);
          const messagestasks = resdata.data.filter((each) => {
            return each.msgstatusforassigner === "false";
          });
          // console.log(messagestasks)
          switch (designation) {
            case "Manager":
              setMessagestasks(messagestasks);
              // setNotificationstasks([]);
              break;
            case "Team Lead":
              setMessagestasks(messagestasks);
              // setNotificationstasks(notificationstasks);
              break;
            case "Employee":
              setMessagestasks([]);
              // setNotificationstasks(notificationstasks);
              break;
          }
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
    <>
      {loading.status ? (
        <div
          id="boxloadmessage"
          style={{ display: loading.status ? "flex" : "none" }}
        >
          <div>
            <h3>{loading.msg}</h3>
            {loading.messagedisplayerbtn ? (
              <button id="boxbtnloadok" onClick={removeloadingbox}>
                {loading.messagedisplayerbtn}
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div id="box">
          <ChildBox
            btntype="Tasks_Todo"
            key="Tasks_Todo"
            taskstodisplay={tasks_todo}
            username={username}
          />
          <ChildBox
            btntype="InProgress"
            key="InProgress"
            taskstodisplay={inprogress}
            username={username}
          />
          <ChildBox
            btntype="Done"
            key="Done"
            taskstodisplay={done}
            username={username}
          />
        </div>
      )}
    </>
  );
};

const count = 3;
const priority = "Low";
const header = "Dummy Header";
const user = "Dummy User";
const deadline = "22/22/22";

const ChildBox = (props) => {
  return (
    <div id="bchildbox" key={props.btntype}>
      <div id="headerpart">
        <div id="headertodopart">
          <div id="dot">
            <img src="https://pngimg.com/d/dot_PNG4.png" />
          </div>
          <h3>{props.btntype}</h3>
          <h4>{props.taskstodisplay.length?props.taskstodisplay.length:props.username?props.taskstodisplay.length:count}</h4>
        </div>
        <div id={`tickmark` + props.btntype}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/5290/5290982.png"
            alt="tick mark"
          />
        </div>
      </div>
      <hr id={props.btntype} />
      {props.username && props.taskstodisplay.length == 0 && (
        <h3
          id="mtaskspreview"
          style={{
            height: "70%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          You Don't Have any{" "}
          {props.btntype == "Tasks_Todo"
            ? "Pending Todo"
            : props.btntype == "Done"
            ? "Completed"
            : props.btntype}{" "}
          Tasks.
          <br /> Enjoy Your Day
        </h3>
      )}
      {props.username ? (
        props.taskstodisplay.length > 2 ? (
          props.taskstodisplay.slice(0, 2).map((each) => {
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
              <div id="mtaskspreview">
                <Link to={`/taskdetails/${_id}`}>
                  <div id="mtasksheader">
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
                  <div id="mheaderbyuser">
                    <h3>{header}</h3>
                    <h4>by</h4>
                    <h3>{assignername}</h3>
                  </div>
                  <div id="mdeadline">
                    <h4>
                      Deadline :- {deadline.slice(0, 10).replaceAll("-", "/")}
                    </h4>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          props.taskstodisplay.map((each) => {
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
              <div id="mtaskspreview" key={_id}>
                <Link to={`/taskdetails/${_id}`}>
                  <div id="mtasksheader">
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
                  <div id="mheaderbyuser">
                    <h3>{header}</h3>
                    <h4>by</h4>
                    <h3>{assignername}</h3>
                  </div>
                  <div id="mdeadline">
                    <h4>
                      Deadline :- {deadline.slice(0, 10).replaceAll("-", "/")}
                    </h4>
                  </div>
                </Link>
              </div>
            );
          })
        )
      ) : (
        <>
          <div id="mtaskspreview">
            <Link to={`/taskdetails/5454`}>
              <div id="mtasksheader">
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
              <div id="mheaderbyuser">
                <h3>{header}</h3>
                <h4>by</h4>
                <h3>{user}</h3>
              </div>
              <div id="mdeadline">
                <h4>Deadline :- {deadline}</h4>
              </div>
            </Link>{" "}
          </div>
          <div id="mtaskspreview">
            <Link to={`/taskdetails/5454`}>
              <div id="mtasksheader">
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
              <div id="mheaderbyuser">
                <h3>{header}</h3>
                <h4>by</h4>
                <h3>{user}</h3>
              </div>
              <div id="mdeadline">
                <h4>Deadline :- {deadline}</h4>
              </div>
            </Link>
          </div>
        </>
      )}
      <div id="btn">
        <button id={props.btntype}>
          <Link to="/taskstodo">More....</Link>
        </button>
      </div>
    </div>
  );
};

export default Box;
