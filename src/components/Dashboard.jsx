import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const role = location.state?.role || "member"; // default fallback

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
    </div>
  );
}
