import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../css/assigningmytasks.css";
import { usercontext } from "../Context";
import { useNavigate, useParams } from "react-router-dom";

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
  ] = useContext(usercontext);

  const navigate = useNavigate();

  const { username, designation, gmail } = userdetails;

  // const { taskid } = useParams();
  // console.log(taskid);

  // const selftaskdetailsgetting = selftasks.find((each) => each._id == taskid);
  // console.log(selftaskdetailsgetting);
  // const selftaskdetails= selftasks.find((each) => each._id == taskid);

  const [selftaskdetails, setSelftaskdetails] = useState({
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
  });

  // const [date, setDate] = useState({
  //   year: "",
  //   month: "",
  //   day: "",
  // });

  useEffect(() => {
    if (editingselftasks.status) {
      // console.log("editingselftasks",editingselftasks.selftask);
      setSelftask(editingselftasks.selftask);
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

  const [loading, setLoading] = useState({
    status: false,
    msg: "",
    messagedisplayerbtn: "",
  });
  const [errormessage, setErrormessage] = useState({
    msg: "",
  });

  const [selftask, setSelftask] = useState({
    selfgmail: gmail,
    header: "",
    category: "",
    taskcontent: "",
    deadline: "",
    priority: "",
    status: "Not Started Yet",
  });

  const enteringselftaskdetails = (e, changingdetail) => {
    // console.log(signinuserdetails);
    setSelftask({
      ...selftask,
      [changingdetail]: e.target.value,
    });
  };

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

  // const enteringdate = (e, changingvalue) => {
  //   console.log(date);
  //   console.log(typeof e.target.value);
  //   setDate({
  //     ...date,
  //     [changingvalue]: e.target.value,
  //   });
  //   setSelftask({
  //     ...selftask,
  //     deadline:
  //       (changingvalue == "year"
  //         ? e.target.value
  //         : date.year) + "/" + (changingvalue == "month"
  //         ? e.target.value
  //         : date.month )+ "/" + (changingvalue == "day"
  //         ? (Number(e.target.value)+1)
  //         : date.day),
  //   });
  // };

  const AssigningTodo = () => {
    // console.log(selftask);
    if (selftask.header == "" || selftask.header.length < 3)
      setErrormessage({
        msg: "Header is required and it has to be minimum 3 characters long",
      });
    else if (
      selftask.category == "Select a Category" ||
      selftask.category == ""
    )
      setErrormessage({
        msg: "Please select a Category",
      });
    else if (selftask.taskcontent == "" || selftask.taskcontent.length < 8)
      setErrormessage({
        msg: "Task Content is required and it has to be 8 characters long",
      });
    else if (selftask.deadline == "")
      setErrormessage({
        msg: "Please Select a Deadline",
      });
    else if (selftask.priority === "Select One" || selftask.priority === "")
      setErrormessage({
        msg: "Please select a Task Priority",
      });
    else {
      // console.log(selftask);
      setLoading({
        status: true,
        msg: "Assigning Task. Please wait",
        messagedisplayerbtn: "",
      });
      const dateseparatedlist = selftask.deadline.split("-");
      // console.log("datebeforemodified", dateseparatedlist);
      dateseparatedlist[2] = Number(dateseparatedlist[2]) + 1;
      // console.log("dateaftermodified", dateseparatedlist);
      const sendingdate = dateseparatedlist.join("/");
      // console.log("employeedetails", {
      //   ...selftask,
      //   deadline: sendingdate,
      // });
      axios
        .post(`${url}/postselftask`, selftask)
        .then((resdata) => {
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

  const editselftask = () => {
    setLoading({
      status: true,
      msg: "Editing Task. Please wait",
      messagedisplayerbtn: "",
    });
    axios
      .post(`${url}/editselftask`, selftask)
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
          • Self Task Assigning
          <br />
          <hr />
        </div>
      </div>
      <div id="assigningtaskscontent">
        <div id="assigningtaskscontentfirst">
          <div id="assigningtaskscontentfirstth">
            <label>Task Header :-</label>
            <input
              type="text"
              id="taskheader"
              placeholder="enter task header"
              value={selftask.header}
              onChange={(e) => enteringselftaskdetails(e, "header")}
            />
          </div>
          <div id="assigningtaskscontentfirsttd">
            <div>Category:-</div>
            <select
              id="selectfromemployees"
              value={selftask.category}
              onChange={(e) => enteringselftaskdetails(e, "category")}
            >
              <option>Select a Category</option>
              <option>personal</option>
              <option>professional</option>
            </select>
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
            value={selftask.taskcontent}
            onChange={(e) => enteringselftaskdetails(e, "taskcontent")}
          />
        </div>
        <div id="assigningtaskscontentthird">
          <div id="assigningtaskscontentthirdbt">
            <div>Task Deadline:-</div>
            {/* <input
              type="text"
              id="taskdeadline"
              placeholder="enter task deadline"
              value={selftask.deadline}
              onChange={(e) => enteringselftaskdetails(e, "deadline")}
            /> */}
            <input
              type="date"
              id="taskdeadline"
              placeholder="enter task deadline"
              value={selftask.deadline}
              onChange={(e) => enteringselftaskdetails(e, "deadline")}
            />
            {/* <div id="datediv">
              <select
                name=""
                id="datedivsyear"
                value={date.year}
                onChange={(e) => enteringdate(e, "year")}
              >
                <option>{date.year || "Year"}</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
              </select>
              <select
                name=""
                id="datedivsmonth"
                value={date.month}
                onChange={(e) => enteringdate(e, "month")}
              >
                <option>{date.month || "Month"}</option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
              </select>
              <select
                name=""
                id="datedivsday"
                value={date.day}
                onChange={(e) => enteringdate(e, "day")}
              >
                <option>{date.day || "Day"}</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </div> */}
          </div>
          {!editingselftasks.status ? (
            <button id="btnassign" onClick={AssigningTodo}>
              Assign Todo
            </button>
          ) : (
            <button id="btnassign" onClick={editselftask}>
              Edit Todo
            </button>
          )}
          <div id="assigningtaskscontentthirdbh">
            <div>Task Priority:- </div>
            <select
              id="selectfrompriorityoptions"
              value={selftask.priority}
              onChange={(e) => enteringselftaskdetails(e, "priority")}
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
            id="assigningmytaskserrormessage"
            style={{ display: errormessage.msg ? "flex" : "none" }}
          >
            <div>
              <h3>{errormessage.msg}</h3>
              <button id="assigningmytasksbtnerrok" onClick={removeerrorbox}>
                Ok
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
        {loading.status ? (
          <div
            id="assigningmytasksloadmessage"
            style={{ display: loading.status ? "flex" : "none" }}
          >
            <div>
              <h3>{loading.msg}</h3>

              {loading.messagedisplayerbtn ? (
                <button
                  id="assigningmytasksbtnloadok"
                  onClick={removeloadingbox}
                >
                  {loading.messagedisplayerbtn}
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AssigningTasks;
