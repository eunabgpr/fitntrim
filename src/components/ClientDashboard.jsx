import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

export default function ClientDashboard() {
  const [profile, setProfile] = useState(null);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      // Get client profile
      const profileRef = doc(db, "members", user.uid);
      const profileSnap = await getDoc(profileRef);
      setProfile(profileSnap.data());

      // Get attendance logs
      const attendQuery = query(
        collection(db, "attendance"),
        where("userId", "==", user.uid),
        orderBy("timestamp", "desc")
      );
      const attendSnap = await getDocs(attendQuery);
      const records = attendSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAttendance(records);
    };

    fetchData();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {profile.name}</h2>
      <p><strong>Plan:</strong> {profile.plan}</p>
      <p><strong>Payment Status:</strong> {profile.paid ? "Paid" : "Unpaid"}</p>

      <h3>Attendance History</h3>
      <ul>
        {attendance.map(entry => (
          <li key={entry.id}>
            {entry.timestamp?.toDate().toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
