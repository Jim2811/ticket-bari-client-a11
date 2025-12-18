import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from './PrivateRoute/PrivateRoute';
import AllTickets from "../Pages/AllTickets/AllTickets";
import TicketDetails from "../Pages/TicketDetails/TicketDetails";

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
                        Component: AllTickets,
                    },
                    {
                        path: '/ticket-detail/:id',
                        Component: TicketDetails
                    }
                ]
            }
        ]
    }
])

export default route;