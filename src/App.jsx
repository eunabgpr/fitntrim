// src/App.jsx
import { useState } from "react";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import { Link } from "react-router-dom";

function App() {
  const [userRole, setUserRole] = useState(null);

  if (!userRole) {
    return (
      <>
        <Signup />
        <Login setUserRole={setUserRole} />
      </>
    );
  }

  return (
    <div>
      <h1>Welcome, {userRole}!</h1>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Welcome to FitnTrim</h1>
      <Link to="/signin">Sign In</Link>
      <br />
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}
export default App;
