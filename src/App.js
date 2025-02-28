import Header from "./fixed content/Header"
import Sidebar from "./fixed content/Sidebar"
import Fixed from "./fixed content/Fixed"
import Box from "./routes/Box"
import AssignedTasks from "./routes/AssignedTasks"
import Messages from "./routes/Messages";
import About from "./routes/About";
import TaskDetails from "./routes/TaskDetails";
import SelfTaskDetails from "./routes/SelfTaskDetails";
import AssignedTaskDetails from "./routes/AssignedTaskDetails";
import AssigningTasks from "./routes/AssigningTasks";
import AssigningMyTasks from "./routes/AssigningMyTasks";
import Taskstodo from "./routes/Taskstodo";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Signin from "./routes/Signin";
import Professionaltodo from "./routes/Professionaltodo";
import Personaltodo from "./routes/Personaltodo";
import Notifications from "./routes/Notifications";
import Pagenotfound from "./routes/Pagenotfound";
import EditingUserDetails from "./routes/EditingUserDetails"
import { Routes,Route } from 'react-router-dom'

function App(){
  return(
    <>
      <Header/>
      <Sidebar/>
      <Fixed/>
      <Routes>'
          <Route index element={<Box/>}/>'
          <Route path="/home" element={<Box/>}/>
          <Route path="/assingedtasks" element={<AssignedTasks/>}/>
          <Route path="/messages" element={<Messages/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/taskdetails/:taskid" element={<TaskDetails/>}/>
          <Route path="/selftaskdetails/professional/:taskid" element={<SelfTaskDetails/>}/>
          <Route path="/selftaskdetails/personal/:taskid" element={<SelfTaskDetails/>}/>
          <Route path="/assignedtaskdetails/:taskid" element={<AssignedTaskDetails/>}/>
          <Route path="/assigningtasks" element={<AssigningTasks/>}/>
          <Route path="/assigningmytasks" element={<AssigningMyTasks/>}/>
          <Route path="/taskstodo" element={<Taskstodo/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/personaltodo" element={<Personaltodo/>}/>
          <Route path="/professionaltodo" element={<Professionaltodo/>}/>
          <Route path="/notifications" element={<Notifications/>}/>
          <Route path="/editinguserdetails" element={<EditingUserDetails/>}/>
          <Route path="*" element={<Pagenotfound/>}/>
      </Routes>
    </>
  )
}

export default App