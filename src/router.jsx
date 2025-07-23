import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/", element: <App /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
  path: "/dashboard",
  element: userRole === "admin" ? <AdminDashboard /> :
           userRole === "trainer" ? <TrainerDashboard /> :
           userRole === "client" ? <ClientDashboard /> : <Login />
}

]);

export default function RouterApp() {
  return <RouterProvider router={router} />;
}
