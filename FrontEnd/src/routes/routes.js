import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";

export const rutas = createBrowserRouter([

    {
        path: "/",
        element: <Dashboard />
    }

]);
