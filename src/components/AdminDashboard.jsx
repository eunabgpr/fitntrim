import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AdminDashboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("Monthly");

  const handleAddMember = async () => {
    await addDoc(collection(db, "members"), {
      name,
      email,
      plan,
      paid: false,
      startDate: new Date().toISOString(),
      endDate: "", // Can be auto-calculated
    });
    alert("Member added!");
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <select onChange={e => setPlan(e.target.value)}>
        <option>Monthly</option>
        <option>Quarterly</option>
        <option>Yearly</option>
      </select>
      <button onClick={handleAddMember}>Add Member</button>
    </div>
  );
}
