import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../css/assigningmytasks.css";
import { usercontext } from "../Context";
import { useNavigate, useParams } from "react-router-dom";


const EditingUserDetails = () => {
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

  const [editingtasks, setEditingtasks] = useState({
    username: username,
    gmail: gmail,
    password: "",
    confirmpassword: "",
    designation: designation,
  });

  const editinguserdetails = (e, changingdetail) => {
    // console.log(editingtasks);
    setEditingtasks({
      ...editingtasks,
      [changingdetail]: e.target.value,
    });
  }

  const editaccountfunction = () => {
    if (
      editingtasks.password == "" ||
      editingtasks.password.length < 8
    )
      setErrormessage({
        msg: "Password is required and it has to be 8 characters long",
      });
    else if (editingtasks.confirmpassword !== editingtasks.password)
      setErrormessage({
        msg: "Password and confirm password must match",
      });
    else if (
      editingtasks.designation === "Select Designation Below" ||
      editingtasks.designation === ""
    )
      setErrormessage({
        msg: "Please select a Designation",
      });
    else {
      setLoading({
        status: true,
        msg: "Editing Details. Please wait",
        messagedisplayerbtn: "",
      });
      // console.log(url)
      axios
        .post(`${url}/edituser`, editingtasks)
        .then((resdata) => {
          // console.log(resdata.data);
            setLoading({
              status: true,
              msg: "Details Edited successfully",
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
    // console.log(editingtasks);
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

  return (
    <div id="assigningtasks">
      <div id="assigningtasksheader">
        <div>
          • Editing User Details
          <br />
          <hr />
        </div>
      </div>
      {username ? (
        <div id="assigningtaskscontent">
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <span className="signinlabel">Full Name</span>
              <br />
              <input
                // onChange={(e) => editinguserdetails(e, "username")}
                type="text"
                value={editingtasks.username}
                placeholder="Ex :- Leanne Graham"
                readOnly
                title="You can not change USERNAME"
              />
            </div>
            <div>
              <span className="signinlabel">E-mail Address</span>
              <br />
              <input
                // onChange={(e) => editinguserdetails(e, "gmail")}
                type="email"
                value={editingtasks.gmail}
                placeholder="Sincere@april.biz"
                readOnly
                title="You can not change EMAIL"
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <span className="signinlabel">Password</span>
              <br />
              <input
                onChange={(e) => editinguserdetails(e, "password")}
                type="password"
                value={editingtasks.password}
                placeholder="At least 8 characters"
                autoComplete="off"
              />
            </div>
            <div>
              <span className="signinlabel">Confirm Password</span>
              <br />
              <input
                onChange={(e) => editinguserdetails(e, "confirmpassword")}
                type="password"
                value={editingtasks.confirmpassword}
                placeholder="At least 8 characters"
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <span className="signinlabel">Designation</span>
              <br />
              <select
                value={editingtasks.designation}
                // onChange={(e) =>
                //   setEditingtasks({
                //     ...editingtasks,
                //     designation: e.target.value,
                //   })
                // }
                onChange={(e) => editinguserdetails(e, "designation")}
              >
                <option>Select Designation Below</option>
                <option>Manager</option>
                <option>Team Lead</option>
                <option>Employee</option>
              </select>
            </div>
          </div>
          <button
            id="btnl"
            onClick={editaccountfunction}
            style={{ margin: "20px auto", width: "20%" }}
          >
            Edit Self Details
          </button>
        </div>
      ) : (
        <></>
      )}
      {errormessage.msg ? (
        <div
          id="errormessage"
          style={{
            display: errormessage.msg ? "flex" : "none",
            position: "absolute",
            top: "0px",
            height: "100%",
            borderRadius: "20px",
          }}
        >
          <div>
            <h3>{errormessage.msg}</h3>
            <button id="btnerrok" onClick={removeerrorbox}>
              Ok
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {loading.status ? (
        <div
          id="loadmessage"
          style={{
            display: loading.status ? "flex" : "none",
            position: "absolute",
            top: "0px",
            height: "100%",
            borderRadius: "20px",
            width: "100%",
          }}
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
      ) : (
        !username && (
          <div
            id="youhavetologintoaccessthispage"
            style={{
              height: "100%",
              width: "100%",
              // margin: "2.5% 5%",
              background: "white",
              position: "absolute",
              top: "-5%",
            }}
          >
            <h1>You Don't have Privilege to Access this page</h1>
          </div>
        )
      )}
    </div>
  );
}

export default EditingUserDetails
