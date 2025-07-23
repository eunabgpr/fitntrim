import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function TrainerDashboard() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const snapshot = await getDocs(collection(db, "members"));
      const clientList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClients(clientList);
    };

    fetchClients();
  }, []);

  const handleCheckIn = async (client) => {
    try {
      await addDoc(collection(db, "attendance"), {
        userId: client.id,
        name: client.name,
        timestamp: serverTimestamp(),
        role: "client",
      });
      alert(`${client.name} checked in!`);
    } catch (err) {
      console.error("Check-in error:", err);
      alert("Check-in failed.");
    }
  };

  const handleTrainerCheckIn = async () => {
    const trainer = auth.currentUser;
    if (!trainer) return alert("Not logged in");

    await addDoc(collection(db, "attendance"), {
      userId: trainer.uid,
      name: trainer.email,
      timestamp: serverTimestamp(),
      role: "trainer",
    });
    alert("Trainer checked in!");
  };

  return (
    <div>
      <h2>Trainer Dashboard</h2>
      <button onClick={handleTrainerCheckIn}>Check In (Trainer)</button>
      <h3>Client Check-ins</h3>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            {client.name} ({client.plan}){" "}
            <button onClick={() => handleCheckIn(client)}>Check In</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
