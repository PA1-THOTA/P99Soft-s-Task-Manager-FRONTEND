import React,{useContext} from "react";
import "../css/logout.css";
import { Link } from "react-router-dom";
import { usercontext } from "../Context";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [
    userdetails,
    setUserdetails,
    signinuserdetails,
    setSigninuserdetails,
    selftaskstodo,
    setSelftaskstodo,
    taskstodo,
    setTaskstodo,
  ] = useContext(usercontext);

  const logoutfunction = () => {
    setUserdetails({
      username: "",
      gmail: "",
      designation: "",
      password: "",
    });
  };

  return (
    <div id="logout">
      <h1>Are you sure you want to logout ??</h1>
      <div id="logoutbtn">
        <button id="lobtnh" onClick={logoutfunction}>
          <Link to="/">Yes</Link>
        </button>
        <button id="lobtnd">
          <Link to="/">No</Link>
        </button>
      </div>
    </div>
  );
};

export default Logout;
