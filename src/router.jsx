// App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import SignIn from "./components/SignIn";
import AdminDashboard from "./components/AdminDashboard";
import TrainerDashboard from "./components/TrainerDashboard";
import ClientDashboard from "./components/ClientDashboard";
import Dashboard from "./components/Dashboard";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function App() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setUserRole(docSnap.exists() ? docSnap.data().role : null);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={
            userRole === "admin" ? (
              <AdminDashboard />
            ) : userRole === "trainer" ? (
              <TrainerDashboard />
            ) : userRole === "client" ? (
              <ClientDashboard />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
