// src/components/Signup.js
import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");

  const handleSignup = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        uid: userCred.user.uid,
        email,
        role
      });
      alert("Signup successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <select onChange={e => setRole(e.target.value)} value={role}>
        <option value="member">Member</option>
        <option value="trainer">Trainer</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
