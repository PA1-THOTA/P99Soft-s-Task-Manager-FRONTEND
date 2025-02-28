import React, { useEffect,useContext } from 'react'
import "../css/about.css"
import {usercontext} from "../Context"

const About = () => {
  // console.log("about page rendered")
  return (
    <div id="about">
      <h1 id="heading1">This website is a Task Manager of P99Soft Company</h1>
      <h2 id="heading2">About Company</h2>
      <div id="aboutbody">
        <div id="heading">Designer and Developer of this Application:-</div>
        <span id="name" style={{padding:"10px",fontSize:"30px"}}>Pavan Thota</span>
        <br />
        <div id="content">
          <br/>
          Dear Users,
          
  
          This Application is about managing the tasks of employees of p99soft.
    
          This application identifies employees as 3 categories, They are:-
          <br />
          <br />
          1) <b>Manager</b> :- He is able to assign tasks to Team lead and
          Employees by clicking on the <b>ASSIGN A TASK</b> at the top. He can
          see the assigned Tasks and messages to the tasks from the employees in
          side navbar section (Assigned Tasks and Messages). He will also get
          the notifications in Notifications icon at the top.
          <br />
          <br />
          2) <b>Team Lead</b> :- He is able to assign a task to only Employees
          and He has to do the tasks assigned by Manager (He can see the Tasks
          to do In the Tasks To Do section of the side navbar). He is also able
          to see the messages received from assigned tasks (Tasks assigned by
          him) in the Messages section. He can alse send a message to the
          manager about the assigned tasks.
          <br />
          <br />
          3) <b>Employee</b> :- He has to do the tasks assigned by Manager and Team Lead. He can see those tasks in tasks to do section and home section. The Users can also update their task status by clicking on the respective task. He can also send messages to the tasks assigned by Team Lead and Manager
          <br />
          <br />
          You can change your designation and password by clicking on the{" "}
          <b>USER</b>
          icon at the top
        </div>
      </div>
    </div>
  );
}

export default About
