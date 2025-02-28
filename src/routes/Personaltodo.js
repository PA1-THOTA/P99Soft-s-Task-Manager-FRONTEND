import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/personaltodo.css";
import { usercontext } from "../Context";
import { useNavigate } from "react-router-dom";

const count = 3;
const priority = "low";
const header = "Dummy Header";
const user = "Dummy User";
const deadline = "22/22/22";
const btntype = "Professional ToDo";

const Personaltodo = () => {
  // const [selftasks, setSelftasks] = useState([]);
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

  const { username, designation, gmail } = userdetails;

  const [loading, setLoading] = useState({
    status: false,
    msg: "",
    messagedisplayerbtn: "",
  });
  // console.log(loading);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log(gmail);
    //make this to gmail before sending to perduction
    if (username) {
      setSelftasks([]);
      setLoading({
        status: true,
        msg: "Fetching Tasks, Please wait",
        messagedisplayerbtn: "",
      });
      axios
        .post(`${url}/getselftasksbygmail`, {
          gmail: gmail,
          category: "personal",
        })
        .then((response) => {
          setLoading({
            status: false,
            msg: "",
            messagedisplayerbtn: "",
          });
          // console.log(response.data);
          setSelftasks(response.data);
        })
        .catch((err) => {
          setLoading({
            status: true,
            msg: "Something went wrong. Please Try Again",
            messagedisplayerbtn: "Try Again",
          });
          // console.log(err);
        });
    }
  }, []);

  return (
    <div>
      <div id="perbox">
        <div id="perchildbox">
          <div id="headerpart">
            <div id="headertodopart">
              <div id="dot">
                <img src="https://pngimg.com/d/dot_PNG4.png" />
              </div>
              <h3>Personal ToDo</h3>
              <h4>{selftasks.length}</h4>
            </div>
            <Link
              to="/assigningmytasks"
              onClick={() => {
                setEditingselftasks({
                  status: false,
                  selftask: {},
                });
              }}
            >
              <h2 id="assigningmytaskslink">ASSIGN SELF TASK</h2>
            </Link>
            <div id="tickmark">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5290/5290982.png"
                alt="tick mark"
              />
            </div>
          </div>

          <hr id="assignedtaskshr" />

          {loading.status ? (
            <div
              id="assigningmytasksloadmessage"
              style={{ display: loading.status ? "flex" : "none" }}
            >
              <div>
                <h3>{loading.msg}</h3>
                {/* <button id="assigningmytasksbtnloadok" onClick={()=>{}}>
                {loading.messagedisplayerbtn}
              </button> */}
              </div>
            </div>
          ) : username ? (
            <div
              id="pertaskchilds"
              style={{
                gridTemplateColumns: selftasks.length
                  ? "repeat(3,calc(calc(100vw - 400px) / 3))"
                  : "repeat(1,1fr)",
              }}
            >
              {selftasks.length ? (
                selftasks.map((each) => {
                  const {
                    deadline,
                    header,
                    priority,
                    status,
                    taskcontent,
                    _id,
                  } = each;
                  return (
                    <Taskspreview
                      deadline={deadline}
                      header={header}
                      priority={priority}
                      status={status}
                      taskcontent={taskcontent}
                      _id={_id}
                    />
                  );
                })
              ) : (
                <div id="youdonthaveatasktodo">
                  <h1>
                    You Don't Have Any Tasks To Do{" "}
                    <button
                      id="btntla"
                      onClick={() => {
                        navigate("/assigningmytasks");
                      }}
                    >
                      Assign
                    </button>
                    A ToDo
                  </h1>
                </div>
              )}
            </div>
          ) : (
            <div id="youhavetologintoaccessthispage">
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
  );
};

const Taskspreview = ({
  deadline,
  header,
  priority,
  status,
  taskcontent,
  _id,
}) => {
  return (
    <div id="pertaskspreview">
      <Link to={`/selftaskdetails/personal/${_id}`}>
        <div id="pertasksheader">
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
        <div id="perheaderbyuser">
          <h3>{header}</h3>
          <h4>status</h4>
          <h3>{status}</h3>
        </div>
        <div id="perdeadline">
          <h4>
            Deadline :-{deadline.slice(0,10).replaceAll("-","/")}
            {/* {new Date(deadline).getFullYear() +
              "/" +
              (new Date(deadline).getMonth() + 1) +
              "/" +
              (new Date(deadline).getDate())} */}
          </h4>
        </div>
      </Link>
    </div>
  );
};

export default Personaltodo;

// import React, { useContext } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "../css/personaltodo.css";
// import { usercontext } from "../Context";

// const count = 3;
// const priority = "low";
// const header = "Dummy Header";
// const user = "Dummy User";
// const deadline = "22/22/22";
// const btntype = "Personal ToDo";

// const Personaltodo = () => {
//   const [
//     userdetails,
//     setUserdetails,
//     signinuserdetails,
//     setSigninuserdetails,
//     selftaskstodo,
//     setSelftaskstodo,
//     taskstodo,
//     setTaskstodo,
//     url,
//   ] = useContext(usercontext);

//   const { username, designation, gmail } = userdetails;

//   return (
//     <div>
//       <div id="perbox">
//         <div id="perchildbox">
//           <div id="headerpart">
//             <div id="headertodopart">
//               <div id="dot">
//                 <img src="https://pngimg.com/d/dot_PNG4.png" />
//               </div>
//               <h3>{btntype}</h3>
//               <h4>{count}</h4>
//             </div>
//             <Link to="/assigningmytasks">
//               <h2 id="assigningmytaskslink">ASSIGN SELF TASK</h2>
//             </Link>
//             <div id="tickmark">
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/5290/5290982.png"
//                 alt="tick mark"
//               />
//             </div>
//           </div>

//           <hr id="assignedtaskshr" />

//           {username ? (
//             <div id="pertaskchilds">
//               <Taskspreview />
//               <Taskspreview />
//               <Taskspreview />
//               <Taskspreview />
//               <Taskspreview />
//               <Taskspreview />
//               <Taskspreview />
//               <Taskspreview />
//               <Taskspreview />
//             </div>
//           ) : (
//               <div id="youhavetologintoaccessthispage">
//                 <h1>You Have To <button id="btntla">Login</button> to Access this page</h1>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const Taskspreview = () => {
//   return (
//     <div id="pertaskspreview">
//       <Link to="/selftaskdetails">
//         <div id="pertasksheader">
//           <span id="mpriority">Priority :- </span>
//           <span
//             className={`mpriorityind ${
//               priority == "Low"
//                 ? "mlow"
//                 : priority == "High"
//                 ? "mhigh"
//                 : "mmedium"
//             }`}
//           >
//             {priority}
//           </span>
//           <h2>...</h2>
//         </div>
//         <div id="perheaderbyuser">
//           <h3>{header}</h3>
//           <h4>by</h4>
//           <h3>{user}</h3>
//         </div>
//         <div id="perdeadline">
//           <h4>Deadline :- {deadline}</h4>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default Personaltodo;
