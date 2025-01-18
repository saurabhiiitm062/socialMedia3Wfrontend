import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import UserForm from "./components/UserForm";
import Dashboard from "./components/Dashboard";
import AdminLoginForm from "./components/AdminLoginForm";
import AdminRegistration from "./components/AdminRegistration";
import "./App.css";

function App() {
  const userRole = localStorage.getItem("userRole");

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <nav>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route exact path="/" element={<UserForm />} />
            <Route path="/admin-registration" element={<AdminRegistration />} />
            <Route path="/admin-login" element={<AdminLoginForm />} />

            {/* Private route for admin dashboard */}
            <Route
              path="/dashboard"
              element={
                userRole === "admin" ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/admin-login" />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
