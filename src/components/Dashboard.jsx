import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = location.state?.role || "member"; // fallback role

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/signin"); // 👈 redirect to SignIn
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <div>
      <h1>Welcome to FitNTrim Dashboard</h1>
      <p>Logged in as: {role.toUpperCase()}</p>

      {role === "admin" && (
        <>
          <h2>Admin Tools</h2>
          <ul>
            <li>View All Users</li>
            <li>Attendance Reports</li>
            <li>Manage Membership Plans</li>
          </ul>
        </>
      )}

      {role === "trainer" && (
        <>
          <h2>Trainer Tools</h2>
          <ul>
            <li>Log Client Attendance</li>
            <li>View Assigned Clients</li>
          </ul>
        </>
      )}

      {role === "member" && (
        <>
          <h2>Member Info</h2>
          <ul>
            <li>View Your Attendance</li>
            <li>Check Your Membership Plan</li>
          </ul>
        </>
      )}

      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
