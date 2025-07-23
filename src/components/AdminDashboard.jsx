import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

export default function AdminDashboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("Monthly");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch members
  useEffect(() => {
    const fetchMembers = async () => {
      const membersRef = collection(db, "members");
      const q = query(membersRef, orderBy("name"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(data);
      setLoading(false);
    };
    fetchMembers();
  }, []);

  // Add member
  const handleAddMember = async () => {
    const newMember = {
      name,
      email,
      plan,
      paid: false,
      startDate: new Date().toISOString(),
      endDate: "",
    };

    const docRef = await addDoc(collection(db, "members"), newMember);
    setMembers(prev => [...prev, { id: docRef.id, ...newMember }]);
    alert("Member added!");
  };

  // Toggle paid
  const togglePaid = async (id, currentStatus) => {
    const ref = doc(db, "members", id);
    await updateDoc(ref, {
      paid: !currentStatus,
    });
    setMembers(prev =>
      prev.map(m =>
        m.id === id ? { ...m, paid: !currentStatus } : m
      )
    );
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Add Member</h3>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <select onChange={e => setPlan(e.target.value)}>
        <option>Monthly</option>
        <option>Quarterly</option>
        <option>Yearly</option>
      </select>
      <button onClick={handleAddMember}>Add Member</button>

      <h3>Member List</h3>
      {loading ? (
        <p>Loading members...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Plan</th><th>Paid</th><th>Toggle</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.plan}</td>
                <td>{member.paid ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => togglePaid(member.id, member.paid)}>
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
