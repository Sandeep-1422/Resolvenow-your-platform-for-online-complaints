import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./components/user/HomePage";
import Login from "./components/common/Login";
import SignUp from "./components/common/SignUp";
import Complaint from "./components/user/Complaint";
import Status from "./components/user/Status";
import AdminHome from "./components/admin/AdminHome";
import AgentHome from "./components/agent/AgentHome";
import UserInfo from "./components/admin/UserInfo";
import Home from "./components/common/Home";
import AgentInfo from "./components/admin/AgentInfo";

function App() {
  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />

          {/* Protected Routes */}
          {isLoggedIn ? (
            <>
              <Route path="/Homepage" element={<HomePage />} />
              <Route path="/Complaint" element={<Complaint />} />
              <Route path="/Status" element={<Status />} />
              <Route path="/AdminHome" element={<AdminHome />} />
              <Route path="/AgentHome" element={<AgentHome />} />
              <Route path="/UserInfo" element={<UserInfo />} />
              <Route path="/AgentInfo" element={<AgentInfo />} />
            </>
          ) : (
            // Redirect any protected route access to login
            <Route path="*" element={<Navigate to="/Login" replace />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
