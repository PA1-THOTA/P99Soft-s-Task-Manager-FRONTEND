import React, { useState } from "react";
export const usercontext = React.createContext();

const UsercontextProvider = ({ children }) => {
  const [userdetails, setUserdetails] = useState({
    username: "",
    gmail: "",
    designation: "",
    password: "",
  });
  const [signinuserdetails, setSigninuserdetails] = useState({
    username: "",
    gmail: "",
    password: "",
    confirmpassword: "",
    designation: "",
  });
  const [taskstodo, setTaskstodo] = useState([]);
  const [assignedtasks, setassignedTasks] = useState([]);
  const [selftasks, setSelftasks] = useState([]);
  const [editingselftasks, setEditingselftasks] = useState({
    status: false,
    selftask: {},
  });
  const [editingtasks, setEditingtasks] = useState({
    status: false,
    task: {},
  });
  const [notificationstasks, setNotificationstasks] = useState([]);
  const [messagestasks, setMessagestasks] = useState([]);
  const url = "https://p99-soft-s-task-manager-backend.vercel.app";
  const m = [
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
    messagestasks,
    setMessagestasks,
    notificationstasks,
    setNotificationstasks,
  ];
  return <usercontext.Provider value={m}>{children}</usercontext.Provider>;
};
export default UsercontextProvider;

//     selfgmail: gmail,
//     header: "",
//     category: "",
//     taskcontent: "",
//     deadline: "",
//     priority: "",
//     status: "Not Started Yet",
