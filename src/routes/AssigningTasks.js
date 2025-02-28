import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../css/assigningtasks.css";
import { usercontext } from "../Context";
import { useNavigate } from "react-router-dom";

const AssigningTasks = () => {
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
  const [allusers, setAllusers] = useState([]);
  const [loading, setLoading] = useState({
    status: false,
    msg: "",
    messagedisplayerbtn: "",
  });
  // console.log(loading);

  const [assigningtask, setAssigningtask] = useState({
    assignergmail: "",
    assignername: "",
    assignedtogmail: "",
    assignedtoname: "",
    header: "",
    taskcontent: "",
    priority: "",
    deadline: "",
    status: "Not Started Yet",
    msgfromdoer: "",
    msgstatusforassigner: "",
    seen: "Not Seen",
  });

  
  const [errormessage, setErrormessage] = useState({
    msg: "",
  });

  const removeerrorbox = () => {
    setErrormessage({
      msg: "",
    });
  };

  const removeloadingbox = () => {
    // console.log(loading);
    setLoading({
      status: false,
      msg: "",
      messagedisplayerbtn: "",
    });
    if (
      loading.messagedisplayerbtn == "Try Login?" ||
      loading.messagedisplayerbtn == "Login"
    ) {
      navigate("/login");
    }
  };

  const navigate = useNavigate();

  const enteringtaskdetails = (e, changingdetail) => {
    // console.log(assigningtask);
    setAssigningtask({
      ...assigningtask,
      [changingdetail]: e.target.value,
    });
  };

  useEffect(() => {
    if (username) {
      setLoading({
        status: true,
        msg: "Loading, Please wait...",
        messagedisplayerbtn: "",
      });
      setAssigningtask({
        ...assigningtask,
        assignergmail: gmail,
        assignername:username
      });
      axios
        .get(`${url}/getusers`)
        .then((resdata) => {
          // console.log(resdata.data);
          // if (resdata.data == "user Exists") {
          setAllusers(resdata.data);
          setLoading({
            status: false,
            msg: "",
            messagedisplayerbtn: "",
          });
          // } else {
          //   setLoading({
          //     status: false,
          //     msg: "Account Created Succesfully",
          //     messagedisplayerbtn: "Login",
          //   });
          // }
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

  useEffect(() => {
    // console.log("editingtasks", editingtasks);
    if (editingtasks.status) {
      // console.log("editingtasks", editingtasks.task);
      setAssigningtask(editingtasks.task);
      // setDate({
      //   year: new Date(editingselftasks.selftask.deadline).getFullYear(),
      //   month: new Date(editingselftasks.selftask.deadline).getMonth() + 1,
      //   day: Number(new Date(editingselftasks.selftask.deadline).getDate()-1),
      // });
    }
    // return setSelftask({
    //   selfgmail: gmail,
    //   header: "",
    //   category: "",
    //   taskcontent: "",
    //   deadline: "",
    //   priority: "",
    //   status: "Not Started Yet",
    // });
  }, []);

  const AssigningTask = () => {
    // console.log(assigningtask);
    if (assigningtask.header == "" || assigningtask.header.length < 3)
      setErrormessage({
        msg: "Header is required and it has to be minimum 3 characters long",
      });
    else if (
      assigningtask.assignedtoname == "select an employee" ||
      assigningtask.assignedtoname == ""
    )
      setErrormessage({
        msg: "Please select an Employee",
      });
    else if (
      assigningtask.taskcontent == "" ||
      assigningtask.taskcontent.length < 8
    )
      setErrormessage({
        msg: "Task Content is required and it has to be 8 characters long",
      });
    else if (assigningtask.deadline == "")
      setErrormessage({
        msg: "Please Select a Deadline",
      });
    else if (
      assigningtask.priority === "Select One" ||
      assigningtask.priority === ""
    )
      setErrormessage({
        msg: "Please select a Task Priority",
      });
    else {
      // console.log({
      //   ...assigningtask,
      //   deadline: assigningtask.deadline.replaceAll("-", "/"),
      // });
      setLoading({
        status: true,
        msg: "Creating Account. Please wait",
        messagedisplayerbtn: "",
      });
      const employeedetails = allusers.find(
        (each) => each.username === assigningtask.assignedtoname
      );

      const dateseparatedlist = assigningtask.deadline.split("-");
      // console.log("datebeforemodified", dateseparatedlist);
      dateseparatedlist[2] = Number(dateseparatedlist[2]) + 1;
      // console.log("dateaftermodified", dateseparatedlist);
      const sendingdate = dateseparatedlist.join("/");
      // console.log("employeedetails", {
      //   ...assigningtask,
      //   deadline: sendingdate,
      //   assignedtogmail: employeedetails.gmail,
      // });
      axios
        .post(`${url}/postTask`, {
          ...assigningtask,
          deadline: sendingdate,
          assignedtogmail: employeedetails.gmail,
        })
        .then((resdata) => {
          // console.log(resdata.data);
          setLoading({
            status: true,
            msg: "Task Assigned Succesfully",
            messagedisplayerbtn: "Ok",
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
  };

  const edittask = () => {
    setLoading({
      status: true,
      msg: "Editing Task. Please wait",
      messagedisplayerbtn: "",
    });
    axios
      .post(`${url}/editTask`, assigningtask)
      .then((resdata) => {
        setLoading({
          status: true,
          msg: "Task Edited Succesfully",
          messagedisplayerbtn: "Ok",
        });
        // console.log(resdata.data);
      })
      .catch((err) => {
        // console.log(err);
        setLoading({
          status: true,
          msg: "Something went wrong. Please Try Again",
          messagedisplayerbtn: "Try Again",
        });
      });
  };

  return (
    <div id="assigningtasks">
      <div id="assigningtasksheader">
        <div>
          • Task Assigning
          <br />
          <hr />
        </div>
        <div id="byuser">
          <span id="by">By :- </span>
          <span id="user">{username ? username : "User"}</span>
        </div>
      </div>
      {username ? (
        loading.status ? (
          <div
            id="loadmessageassigningtasks"
            style={{ display: loading.status ? "flex" : "none" }}
          >
            <div>
              <h3>{loading.msg}</h3>
              {loading.messagedisplayerbtn ? (
                <button id="btnloadok" onClick={removeloadingbox}>
                  {loading.messagedisplayerbtn}
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : designation != "Employee" ? (
          <div id="assigningtaskscontent">
            <div id="assigningtaskscontentfirst">
              <div id="assigningtaskscontentfirstth">
                <label>Task Header :-</label>
                <input
                  type="text"
                  id="taskheader"
                  placeholder="enter task header"
                  value={assigningtask.header}
                  onChange={(e) => enteringtaskdetails(e, "header")}
                />
              </div>
              <div id="assigningtaskscontentfirsttd">
                <div>Assign To:-</div>
                {/* {!editingtasks.status ? ( */}
                <select
                  id="selectfromemployees"
                  // selected={"select"}
                  value={assigningtask.assignedtoname}
                  onChange={(e) => enteringtaskdetails(e, "assignedtoname")}
                >
                  {assigningtask.assignedtoname ? (
                    <option>{assigningtask.assignedtoname} </option>
                  ) : (
                    <option>select an employee</option>
                  )}
                  {userdetails.designation == "Manager" ? (
                    allusers.map((each) => {
                      const { username, gmail, designation, _id } = each;
                      if (designation !== "Manager") {
                        return <option key={_id}>{username}</option>;
                      }
                    })
                  ) : userdetails.designation == "Team Lead" ? (
                    allusers.map((each) => {
                      const { username, gmail, designation, _id } = each;
                      if (designation == "Employee") {
                        return <option key={_id}>{username}</option>;
                      }
                    })
                  ) : (
                    <></>
                  )}
                </select>
                {/* ) : (
                <div>{assigningtask.assignedtoname}</div>
              )} */}
              </div>
            </div>
            <div id="assigningtaskscontentsecond">
              <div>Task Content :-</div>
              <textarea
                type="text"
                id="taskcontent"
                placeholder="enter task content"
                cols="100"
                rows="4"
                value={assigningtask.taskcontent}
                onChange={(e) => enteringtaskdetails(e, "taskcontent")}
              />
            </div>
            <div id="assigningtaskscontentthird">
              <div id="assigningtaskscontentthirdbt">
                <div>Task Deadline:-</div>
                <input
                  type="date"
                  id="taskdeadline"
                  placeholder="enter task deadline"
                  value={assigningtask.deadline}
                  onChange={(e) => enteringtaskdetails(e, "deadline")}
                />
              </div>
              {!editingtasks.status ? (
                <button id="btnassign" onClick={AssigningTask}>
                  Assign
                </button>
              ) : (
                <button id="btnassign" onClick={edittask}>
                  Edit Task
                </button>
              )}
              <div id="assigningtaskscontentthirdbh">
                <div>Task Priority:- </div>
                <select
                  id="selectfrompriorityoptions"
                  value={assigningtask.priority}
                  onChange={(e) => enteringtaskdetails(e, "priority")}
                >
                  <option>Select One</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
            {errormessage.msg ? (
              <div
                id="errormessageassigningtasks"
                style={{ display: errormessage.msg ? "flex" : "none" }}
              >
                <div>
                  <h3>{errormessage.msg}</h3>
                  <button id="btnerrokassigningtasks" onClick={removeerrorbox}>
                    Ok
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div
            id="youhavetologintoaccessthispage"
            style={{
              height: "300px",
              width: "90%",
              margin: "2.5% 5%",
              background: "white",
            }}
          >
            <h1>You Don't have Privilege to Assign tasks</h1>
          </div>
        )
      ) : (
        <div
          id="youhavetologintoaccessthispage"
          style={{
            height: "300px",
            width: "90%",
            margin: "2.5% 5%",
            background: "white",
          }}
        >
          <h1>You Don't have Privilege to Assign tasks</h1>
        </div>
      )}
    </div>
  );
};

export default AssigningTasks;
