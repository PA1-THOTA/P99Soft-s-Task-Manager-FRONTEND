import React, { useState, useContext } from "react";
import axios from "axios";
import "../css/selftaskdetails.css";
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
const selftaskstatus = "In Progress";

const SelfTaskDetails = () => {
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
  ] = useContext(usercontext);

  const navigate = useNavigate();

  const selftaskdetailsgetting = selftasks.find((each) => each._id == taskid);
  // console.log(selftaskdetailsgetting);
  // const selftaskdetails= selftasks.find((each) => each._id == taskid);

  const [selftaskdetails, setSelftaskdetails] = useState(
    selftaskdetailsgetting || {
      category: "",
      createdAt: "",
      deadline: "",
      header: "",
      priority: "",
      selfgmail: "",
      status: "",
      taskcontent: "",
      updatedAt: "",
      __v: "",
      _id: "",
    }
  );
  const [loading, setLoading] = useState({
    status: false,
    msg: "",
    messagedisplayerbtn: "",
  });
  // console.log(selftaskdetails);
  function btnshandler() {
    const statusbtns = document.getElementById("statusbtns");
    const inprogressbtn = document.getElementById("inprogressbtn");
    const completedbtn = document.getElementById("completedbtn");
    statusbtns.style.visibility = "visible";
    inprogressbtn.style.left = "-275px";
    completedbtn.style.right = "-400px";
    // console.log(1234);
  }

  const deleteselftask = (_id) => {
    setLoading({
      status: true,
      msg: "Deleting task. Please wait..",
      messagedisplayerbtn: "",
    });
    axios
      .post(`${url}/deleteselftask`, { _id })
      .then((resdata) => {
        setLoading({
          status: true,
          msg: "Task Deleted Successfully",
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
    <div id="selftaskdetails">
      <div id="selftaskdetailsheader">
        <div>
          • Task Details
          <br />
          <hr />
        </div>
        <div id="selfprioritydiv">
          <span id="selfpriority">Priority</span>
          <span
            className={`selfpriorityind ${
              selftaskdetails.priority == "Low"
                ? "low"
                : selftaskdetails.priority == "High"
                ? "high"
                : "medium"
            }`}
          >
            {selftaskdetails.priority}
          </span>
        </div>
      </div>
      <div id="selftaskmatter">
        <div id="selftaskdetailsheading">
          <span>Header :- {selftaskdetails.header}</span>
          <span>
            Deadline:-
            {selftaskdetails.deadline.slice(0, 10).replaceAll("-", "/")}
            {/* {new Date(selftaskdetails.deadline).getFullYear() +
              "/" +
              (new Date(selftaskdetails.deadline).getMonth() + 1) +
              "/" +
              (Number(new Date(selftaskdetails.deadline).getDate()) - 1)} */}
          </span>
        </div>
        <div id="selftaskcontent">
          <span style={{ textDecoration: "underline" }}>Task Content</span> :-{" "}
          {selftaskdetails.taskcontent}
        </div>
        <div id="selfmsgtoassigner">
          <div>Status :- {selftaskdetails.status}</div>
          <div id="selfmsggiving">
            <button
              id="selfbtnpostmsgfprediting"
              onClick={
                // () => editselftask(selftaskdetails._id)
                () => {
                  // console.log({
                  //   ...selftaskdetails,
                  //   deadline:
                  //     selftaskdetails.deadline.slice(0, 8) +
                  //     (Number(selftaskdetails.deadline.slice(8, 10)) + 1),
                  // });
                  setEditingselftasks({
                    status: true,
                    selftask: {
                      ...selftaskdetails,
                      deadline: selftaskdetails.deadline.slice(0, 10),
                    },
                  });
                  navigate("/assigningmytasks");
                }
              }
            >
              edit Task
            </button>
          </div>
          <div id="selfmsggiving">
            <button
              id="selfbtnpostmsg"
              onClick={
                // () => deleteselftask(selftaskdetails._id)
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
                updateprogress(selftaskdetails._id, "In Progress");
              }}
            >
              In&nbsp;Progress
            </button>
            <button
              className="button"
              id="completedbtn"
              onClick={() => {
                updateprogress(selftaskdetails._id, "Completed");
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
                  onClick={() =>
                    navigate(
                      selftaskdetails.category == "personal"
                        ? "/personaltodo"
                        : "/professionaltodo"
                    )
                  }
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
                    onClick={() => deleteselftask(selftaskdetails._id)}
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

export default SelfTaskDetails;
