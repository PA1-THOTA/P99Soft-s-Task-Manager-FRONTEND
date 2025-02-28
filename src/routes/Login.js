import React, { useContext, useState } from "react";
import axios from "axios";
import "../css/login.css";
import { Link } from "react-router-dom";
import { usercontext } from "../Context";
import { useNavigate } from "react-router-dom";

const Login = () => {
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

  const [loading, setLoading] = useState({
    status: false,
    msg: "",
    messagedisplayerbtn: "",
  });

  const [errormessage, setErrormessage] = useState({
    msg: "",
  });

  const enteringloginuserdetails = (e, changingdetail) => {
    // console.log(userdetails);
    setUserdetails({
      ...userdetails,
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
    if (loading.messagedisplayerbtn == "Login") {
      navigate("/login");
    }
  };

  const loginaccountfunction = () => {
    if (!userdetails.gmail.includes("@") || !userdetails.gmail.includes("."))
      setErrormessage({
        msg: "Please enter a valid email",
      });
    else if (userdetails.password == "" || userdetails.password.length < 8)
      setErrormessage({
        msg: "Password is required and it has to be 8 characters long",
      });
    else {
      setLoading({
        status: true,
        msg: "Fetching Details. Please wait",
        messagedisplayerbtn: "",
      });
      axios
        .post(`${url}/finduser`, userdetails)
        .then((resdata) => {
          // console.log(resdata.data);
          if (resdata.data == "no user found") {
            setLoading({
              status: true,
              msg: "No User Found",
              messagedisplayerbtn: "Try Again?",
            });
          } else {
            setLoading({
              status: false,
              msg: "",
              messagedisplayerbtn: "",
            });
              setUserdetails({
                ...userdetails,
                username: resdata.data[0].username,
                designation: resdata.data[0].designation,
              });
            navigate("/");
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
    <div id="login">
      <div id="logindetailscont">
        <div id="logindetails">
          <div>
            <span id="welcome">Welcome Back</span>
            <img
              src="https://symbl-world.akamaized.net/i/webp/40/04aa0ab6fb0768634cfbdae78668b4.webp"
              alt="handwavingsymbol"
            />
          </div>
          <div id="loginmatter">
            Today is a new day. It's your day. You shape it. Sign in to start
            managing your projects.
          </div>
          <div>
            <span className="loginlabel">Email</span>
            <br />
            <input
              type="text"
              placeholder="Example@email.com"
              value={userdetails.gmail}
              onChange={(e) => enteringloginuserdetails(e, "gmail")}
            />
          </div>
          <div>
            <span className="loginlabel">Password</span>
            <br />
            <input
              type="password"
              placeholder="At least 8 characters"
              value={userdetails.password}
              onChange={(e) => enteringloginuserdetails(e, "password")}
            />
          </div>
          <button id="btnl" onClick={loginaccountfunction}>
            Log in
          </button>
          <div id="signupcont">
            Don't you have an account?{" "}
            <span>
              <Link to="/signin">Sign up</Link>
            </span>
          </div>
          <div id="logincopyright">&copy; 2023 ALL RIGHTS RESERVED</div>
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
      {loading ? (
        <div
          id="loadmessage"
          style={{ display: loading.status ? "flex" : "none" }}
        >
          <div>
            <h3>{loading.msg}</h3>
            {loading.messagedisplayerbtn?
              <button button id="btnloadok" onClick={removeloadingbox}>
                {loading.messagedisplayerbtn}
              </button>:<></>
            }
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Login;
