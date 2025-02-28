import React, { useState, useContext } from "react";
import axios from "axios";
import "../css/assignedtaskdetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { usercontext } from "../Context";

const count = 3;
const msg =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed";
const header = "Dummy Header";
const user = "Dummy User";
const deadline = "22/22/22";
const btntype = "Messages";
const priority = "High";
const msgfromdoer =
  "dsfvgbhnyjuiyjtgredsxdcfgtyuj fgtryujttgfv gtyhutjbgfv rty67u yrgf";
const statusfromdoer = "In Progress";
const AssignedTaskDetails = () => {
  const { taskid } = useParams();
  //  console.log(taskid);

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

  const navigate = useNavigate();

  const assignedtaskdetailsgetting = assignedtasks.find(
    (each) => each._id == taskid
  );
  //  console.log(assignedtaskdetailsgetting);
  // const assignedtaskdetails= assignedtasks.find((each) => each._id == taskid);

  const [assignedtaskdetails, setAssignedtaskdetails] = useState(
    assignedtaskdetailsgetting || {
      assignedtogmail: "",
      assignedtoname: "",
      assignergmail: "",
      assignername: "",
      createdAt: "",
      deadline: "",
      header: "",
      msgfromdoer: "",
      msgstatusforassigner: "",
      priority: "",
      seen: "",
      status: "",
      taskcontent: "",
      updatedAt: "",
    }
  );
  const [loading, setLoading] = useState({
    status: false,
    msg: "",
    messagedisplayerbtn: "",
  });
  //  console.log(assignedtaskdetails);
  function btnshandler() {
    const statusbtns = document.getElementById("statusbtns");
    const inprogressbtn = document.getElementById("inprogressbtn");
    const completedbtn = document.getElementById("completedbtn");
    statusbtns.style.visibility = "visible";
    inprogressbtn.style.left = "-275px";
    completedbtn.style.right = "-400px";
    //    console.log(1234);
  }

  const deleteTask = (_id) => {
    setLoading({
      status: true,
      msg: "Deleting task. Please wait..",
      messagedisplayerbtn: "",
    });
    axios
      .post(`${url}/deleteTask`, { _id })
      .then((resdata) => {
        setLoading({
          status: true,
          msg: "Task Deleted Successfully",
          messagedisplayerbtn: "Ok",
        });
        //    console.log(resdata.data);
      })
      .catch((err) => {
        //    console.log(err);
        setLoading({
          status: true,
          msg: "Something went wrong. Please Try Again",
          messagedisplayerbtn: "Try Again",
        });
      });
  };

  const updateprogress = (_id, status) => {
    setLoading({
      status: true,
      msg: "Updating Progress. Please wait..",
      messagedisplayerbtn: "",
    });
    axios
      .post(`${url}/updateprogressofselftask`, { _id: _id, status: status })
      .then((resdata) => {
        setLoading({
          status: true,
          msg: "Task Updated Successfully",
          messagedisplayerbtn: "Ok",
        });
        //    console.log(resdata.data);
      })
      .catch((err) => {
        //    console.log(err);
        setLoading({
          status: true,
          msg: "Something went wrong. Please Try Again",
          messagedisplayerbtn: "Try Again",
        });
      });
  };
  //   function btnshandler(){
  //     const statusbtns=document.getElementById("statusbtns")
  //   const inprogressbtn=document.getElementById("inprogressbtn")
  //   const completedbtn=document.getElementById("completedbtn")
  //     statusbtns.style.visibility="visible";
  //     inprogressbtn.style.left="-275px";
  //     completedbtn.style.right="-400px";
  //     console.log(1234)
  //   }

  return (
    <div id="taskdetails">
      <div id="taskdetailsheader">
        <div>
          • Task Details
          <br />
          <hr />
        </div>
        <div id="prioritydiv">
          <span id="priority">Priority</span>
          <span
            className={`priorityind ${
              priority == "Low" ? "low" : priority == "High" ? "high" : "medium"
            }`}
          >
            {assignedtaskdetails.priority}
          </span>
        </div>
        <div id="byuser">
          <span id="by">To :- </span>
          <span id="user">{assignedtaskdetails.assignedtoname}</span>
        </div>
      </div>
      <div id="taskmatter">
        <div id="taskdetailsheading">
          <span>Header :- {assignedtaskdetails.header}</span>
          <span>
            Deadline:-{" "}
            {assignedtaskdetails.deadline.slice(0, 10).replaceAll("-", "/")}
          </span>
        </div>
        <div id="taskcontent">
          <span style={{ textDecoration: "underline" }}>Task Content</span> :-{" "}
          {assignedtaskdetails.taskcontent}
        </div>
        <div id="msgfromdoer">
          <div>Message from assignee:-</div>
          <h3 type="text" id="msgfromdoerinput">
            {assignedtaskdetails.msgfromdoer
              ? assignedtaskdetails.msgfromdoer
              : "No Message Yet..."}
          </h3>
        </div>
        <div id="infoforassigner">
          <h3>Status from employee :- {assignedtaskdetails.status}</h3>
          <button
            style={{ width: "10%" }}
            id="selfbtnpostmsgfprediting"
            onClick={
              // () => editselftask(assignedtaskdetails._id)
              () => {
                // console.log({
                //   ...assignedtaskdetails,
                //   deadline:
                //     assignedtaskdetails.deadline.slice(0, 8) +
                //     (Number(assignedtaskdetails.deadline.slice(8, 10)) + 1),
                // });
                setEditingtasks({
                  status: true,
                  task: {
                    ...assignedtaskdetails,
                    deadline: assignedtaskdetails.deadline.slice(0, 10),
                  },
                });
                navigate("/assigningtasks");
              }
            }
          >
            edit Task
          </button>
          <button
            id="btndel"
            onClick={
              // () => deleteTask(assignedtaskdetails._id)
              () => {
                setLoading({
                  status: true,
                  msg: "Are you sure you want delete this task ??",
                  messagedisplayerbtn: "Yes",
                });
              }
            }
          >
            Delete Task
          </button>
        </div>
      </div>
      {loading ? (
        <div
          id="selftaskdetailsloadmessage"
          style={{ display: loading.status ? "flex" : "none" }}
        >
          <div>
            <h3>{loading.msg}</h3>
            {loading.messagedisplayerbtn ? (
              //
              loading.messagedisplayerbtn == "Ok" ? (
                <button
                  id="selftaskdetailsloadmessagebtnloadokthatnavigatestotodos"
                  onClick={() => navigate("/assingedtasks")}
                >
                  {loading.messagedisplayerbtn}
                </button>
              ) : loading.messagedisplayerbtn == "Try Again" ? (
                <button
                  id="selftaskdetailsloadmessagebtnloadok"
                  onClick={() => {
                    setLoading({
                      status: false,
                      msg: "",
                      messagedisplayerbtn: "",
                    });
                  }}
                >
                  Ok
                </button>
              ) : (
                <div id="selftaskdetailsloaderbtns">
                  <button
                    id="selftaskdetailsloadmessagebtnloadok"
                    onClick={() => deleteTask(assignedtaskdetails._id)}
                  >
                    {/* // */}
                    {loading.messagedisplayerbtn}
                  </button>
                  <button
                    id="selftaskdetailsloadmessagebtnloadok"
                    onClick={() => {
                      setLoading({
                        status: false,
                        msg: "",
                        messagedisplayerbtn: "",
                      });
                    }}
                  >
                    No
                  </button>
                </div>
              )
            ) : (
              //
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AssignedTaskDetails;
