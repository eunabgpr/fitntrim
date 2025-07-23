import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("client");

  const handleSignup = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        email,
         role: role,
        plan: "Basic",
        planStart: Timestamp.now(),
        planEnd: Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
        isPaid: false,
      });

      alert("User created and saved!");
    } catch (err) {
      alert("Signup error: " + err.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <select onChange={e => setRole(e.target.value)}>
        <option value="client">Client</option>
        <option value="trainer">Trainer</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
