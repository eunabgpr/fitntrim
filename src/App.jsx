// src/App.jsx
import { useState } from "react";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";

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

export default App;
