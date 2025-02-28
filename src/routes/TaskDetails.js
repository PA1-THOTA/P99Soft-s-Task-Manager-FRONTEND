import React, { useState, useContext } from "react";
import axios from "axios";
import "../css/taskdetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { usercontext } from "../Context";

const count = 3;
const msg =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed";
const header = "Dummy Header";
const user = "Dummy User";
const deadline = "22/22/22";
const btntype = "Messages";
const priority = "Low";

const TaskDetails = () => {
  const { taskid } = useParams();
  // console.log(taskid);

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
  ] = useContext(usercontext);

  const navigate = useNavigate();

  const taskdetailsgetting = taskstodo.find((each) => each._id == taskid);
  // console.log(taskdetailsgetting);
  // const selftaskdetails= selftasks.find((each) => each._id == taskid);

  const [taskdetails, setTaskdetails] = useState(
    taskdetailsgetting || {
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
  // console.log(taskdetails);
  function btnshandler() {
    const statusbtns = document.getElementById("statusbtns");
    const inprogressbtn = document.getElementById("inprogressbtn");
    const completedbtn = document.getElementById("completedbtn");
    statusbtns.style.visibility = "visible";
    inprogressbtn.style.left = "-275px";
    completedbtn.style.right = "-400px";
    // console.log(1234)
  }

  const updateprogress = (_id, status) => {
    setLoading({
      status: true,
      msg: "Updating Progress. Please wait..",
      messagedisplayerbtn: "",
    });
    axios
      .post(`${url}/updateprogressoftask`, { _id: _id, status: status })
      .then((resdata) => {
        setLoading({
          status: true,
          msg: "Task Updated Successfully",
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
    
  const postmsg = (_id) => {
    setLoading({
      status: true,
      msg: "Updating Progress. Please wait..",
      messagedisplayerbtn: "",
    });
    axios
      .post(`${url}/updatemsgoftask`, {
        _id: _id,
        msgfromdoer: taskdetails.msgfromdoer,
        msgstatusforassigner:false
      })
      .then((resdata) => {
        setLoading({
          status: true,
          msg: "Message Posted Successfully",
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
              taskdetails.priority == "Low"
                ? "low"
                : taskdetails.priority == "High"
                ? "high"
                : "medium"
            }`}
          >
            {taskdetails.priority}
          </span>
        </div>
        <div id="byuser">
          <span id="by">By :- </span>
          <span id="user">{taskdetails.assignername}</span>
        </div>
      </div>
      <div id="taskmatter">
        <div id="taskdetailsheading">
          <span>Header :- {taskdetails.header}</span>
          <span>
            Deadline:-{" "}
            {taskdetails.deadline.slice(0, 10).replaceAll("-", "/")}
          </span>
        </div>
        <div id="taskcontent">
          <span style={{ textDecoration: "underline" }}>Task Content</span> :-{" "}
          {taskdetails.taskcontent}
        </div>
        <div id="msgtoassigner">
          <div>Message to assigner:-</div>
          <div id="msggiving">
            <input
              type="text"
              id="msgtoassignerinput"
              placeholder="Enter Message Here"
              value={taskdetails.msgfromdoer}
              onChange={(e) => {
                setTaskdetails({ ...taskdetails, msgfromdoer: e.target.value });
              }}
            />
            <button id="btnpostmsg" onClick={() => postmsg(taskdetails._id)}>
              Post Msg
            </button>
          </div>
        </div>
        <div id="msgtoassigner">
          <h3>Status :- {taskdetails.status}</h3>
        </div>
        <div id="btnsarea">
          <button className="button" id="updatestatus" onClick={btnshandler}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/12515/12515693.png"
              alt="updatestatus"
            />
            Update Status
          </button>
          <div id="statusbtns">
            <button
              className="button"
              id="inprogressbtn"
              onClick={() => {
                updateprogress(taskdetails._id, "In Progress");
              }}
            >
              In&nbsp;Progress
            </button>
            <button
              className="button"
              id="completedbtn"
              onClick={() => {
                updateprogress(taskdetails._id, "Completed");
              }}
            >
              Completed
            </button>
          </div>
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
                  onClick={() => {
                    setLoading({
                      status: false,
                      msg: "",
                      messagedisplayerbtn: "",
                    });
                  }}
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
                    onClick={() => {
                      setLoading({
                        status: false,
                        msg: "",
                        messagedisplayerbtn: "",
                      });
                    }}
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

export default TaskDetails;
