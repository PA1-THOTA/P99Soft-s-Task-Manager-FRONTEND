import React, { useContext, useState } from "react";
import axios from "axios";
import "../css/signin.css";
import { Link } from "react-router-dom";
import sideimg from "../assets/Screenshot 2025-02-17 172647 (1).png";
import { usercontext } from "../Context";
import { useNavigate } from "react-router-dom";

const Signin = () => {
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
  // console.log(signinuserdetails,setSigninuserdetails)
  const [loading, setLoading] = useState({
    status: false,
    msg: "",
    messagedisplayerbtn: "",
  });
  const [errormessage, setErrormessage] = useState({
    msg: "",
  });
  const navigate = useNavigate();

  const enteringsiginuserdetails = (e, changingdetail) => {
    // console.log(signinuserdetails);
    setSigninuserdetails({
      ...signinuserdetails,
      [changingdetail]: e.target.value,
    });
    // switch (changingdetail) {
    //   case "username":
    //     setSigninuserdetails({
    //       ...signinuserdetails,
    //       username: e.target.value,
    //     });
    //     break;
    //   case "gmail":
    //     setSigninuserdetails({
    //       ...signinuserdetails,
    //       gmail: e.target.value,
    //     });
    //     break;
    //   case "password":
    //     setSigninuserdetails({
    //       ...signinuserdetails,
    //       password: e.target.value,
    //     });
    //     break;
    //   case "confirmpassword":
    //     setSigninuserdetails({
    //       ...signinuserdetails,
    //       confirmpassword: e.target.value,
    //     });
    //     break;
    //   case "designation":
    //     setSigninuserdetails({
    //       ...signinuserdetails,
    //       designation: e.target.value,
    //     });
    //     break;
    // }
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

  const createaccountfunction = () => {
    if (
      signinuserdetails.username == "" ||
      signinuserdetails.username.trim().length < 3
    )
      setErrormessage({
        msg: "Full Name is required and it has to be minimum 3 characters long",
      });
    else if (
      !signinuserdetails.gmail.includes("@") ||
      !signinuserdetails.gmail.includes(".") ||
      signinuserdetails.gmail.includes(" ")
    )
      setErrormessage({
        msg: "Please enter a valid email",
      });
    else if (
      signinuserdetails.password == "" ||
      signinuserdetails.password.length < 8 ||
      signinuserdetails.password.includes(" ")
    )
      setErrormessage({
        msg: "Password is required and it has to be 8 characters long and shouldnot contain spaces",
      });
    else if (signinuserdetails.confirmpassword !== signinuserdetails.password)
      setErrormessage({
        msg: "Password and confirm password must match",
      });
    else if (
      signinuserdetails.designation === "Select Designation Below" ||
      signinuserdetails.designation === ""
    )
      setErrormessage({
        msg: "Please select a Designation",
      });
    else {
      setLoading({
        status: true,
        msg: "Creating Account. Please wait",
        messagedisplayerbtn: "",
      });
      // console.log(url)
      axios
        .post(`${url}/postuser`, signinuserdetails)
        .then((resdata) => {
          // console.log(resdata.data);
          if (resdata.data == "error") {
            setLoading({
              status: true,
              msg: "Please enter valid details",
              messagedisplayerbtn: "Try Again",
            });
          } else if (resdata.data == "user Exists") {
            setLoading({
              status: true,
              msg: "User Exists",
              messagedisplayerbtn: "Try Login?",
            });
          } else if (
            resdata.data == "username Exists,Please try another name"
          ) {
            setLoading({
              status: true,
              msg: "username Exists,Please try another name",
              messagedisplayerbtn: "Try Again",
            });
          } else {
            setLoading({
              status: true,
              msg: "Account Created Succesfully",
              messagedisplayerbtn: "Login",
            });
          }
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

  return (
    <div id="signin">
      <div id="forbg">
        <img id="sideimg" src={sideimg} alt="sidei image" />
      </div>
      <div id="signindetailscont">
        <div id="signindetails">
          <div>
            <span id="welcome">Create Account</span>
          </div>
          <div>
            <span className="signinlabel">Full Name</span>
            <br />
            <input
              onChange={(e) => enteringsiginuserdetails(e, "username")}
              type="text"
              value={signinuserdetails.username}
              placeholder="Ex :- Leanne Graham"
            />
          </div>
          <div>
            <span className="signinlabel">E-mail Address</span>
            <br />
            <input
              onChange={(e) => enteringsiginuserdetails(e, "gmail")}
              type="email"
              value={signinuserdetails.gmail}
              placeholder="Sincere@april.biz"
            />
          </div>
          <div>
            <span className="signinlabel">Password</span>
            <br />
            <input
              onChange={(e) => enteringsiginuserdetails(e, "password")}
              type="password"
              value={signinuserdetails.password}
              placeholder="At least 8 characters"
              autoComplete="off"
            />
          </div>
          <div>
            <span className="signinlabel">Confirm Password</span>
            <br />
            <input
              onChange={(e) => enteringsiginuserdetails(e, "confirmpassword")}
              type="password"
              value={signinuserdetails.confirmpassword}
              placeholder="At least 8 characters"
            />
          </div>
          <div>
            <span className="signinlabel">Designation</span>
            <br />
            <select
              value={signinuserdetails.designation}
              // onChange={(e) =>
              //   setSigninuserdetails({
              //     ...signinuserdetails,
              //     designation: e.target.value,
              //   })
              // }
              onChange={(e) => enteringsiginuserdetails(e, "designation")}
            >
              <option>Select Designation Below</option>
              <option>Manager</option>
              <option>Team Lead</option>
              <option>Employee</option>
            </select>
          </div>
          <button id="btnl" onClick={createaccountfunction}>
            Create Account
          </button>
          <div id="logincont">
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </div>
      </div>
      {errormessage.msg ? (
        <div
          id="errormessage"
          style={{ display: errormessage.msg ? "flex" : "none" }}
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
      ) : (
        <></>
      )}
    </div>
  );
};

export default Signin;
