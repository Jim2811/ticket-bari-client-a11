import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from './PrivateRoute/PrivateRoute';
import AllTickets from "../Pages/AllTickets/AllTickets";
import TicketDetails from "../Pages/TicketDetails/TicketDetails";
import DashBoard from "../Layout/DashBoard";
import MyBookedTickets from "../Pages/TicketDetails/Dashboard/User/MyBookedTickets";
import PaymentSuccess from "../Pages/TicketDetails/Dashboard/User/PaymentSuccess";
import PaymentCancel from "../Pages/TicketDetails/Dashboard/User/PaymentCancel";

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
    },
    {
        Component: PrivateRoute,
        children: [
            {
                path: 'dashboard',
                Component: DashBoard,
                children: [
                    {
                        path: 'my-booked-tickets',
                        Component: MyBookedTickets
                    },
                    {
                        path: 'payment-success',
                        Component: PaymentSuccess
                    },
                    {
                        path: 'payment-cancel',
                        Component: PaymentCancel
                    }
                ]
            }
        ]
    }
])

export default route;