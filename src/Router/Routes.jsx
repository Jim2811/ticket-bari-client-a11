import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from './Private Route/PrivateRoute';
import AllTickets from "../Pages/AllTickets/AllTickets";

const route = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            },
            {
                Component: PrivateRoute,
                children: [
                    {
                        path: 'all-tickets',
                        Component: AllTickets
                    }
                ]
            }
        ]
    }
])

export default route;