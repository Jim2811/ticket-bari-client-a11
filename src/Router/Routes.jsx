import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AllTickets from "../Pages/AllTickets/AllTickets";
import TicketDetails from "../Pages/TicketDetails/TicketDetails";
import DashBoard from "../Layout/DashBoard";
import MyBookedTickets from "../Pages/TicketDetails/Dashboard/User/MyBookedTickets";
import PaymentSuccess from "../Pages/TicketDetails/Dashboard/User/PaymentSuccess";
import PaymentCancel from "../Pages/TicketDetails/Dashboard/User/PaymentCancel";
import TransactionHistory from "../Pages/TicketDetails/Dashboard/User/TransactionHistory";
import UserProfile from "../Pages/TicketDetails/Dashboard/User/UserProfile";
import DashboardOverview from "../Pages/TicketDetails/Dashboard/DashboardOverview";
import AddTicket from "../Pages/TicketDetails/Dashboard/Vendor/AddTicket";
import MyAddedTickets from "../Pages/TicketDetails/Dashboard/Vendor/MyAddedTickets";
import UpdateTicket from "../Pages/TicketDetails/Dashboard/Vendor/UpdateTicket";
import VendorRequestedBookings from "../Pages/TicketDetails/Dashboard/Vendor/VendorRequestedBooking";
import VendorRevenueOverview from "../Pages/TicketDetails/Dashboard/Vendor/VendorRevenueOverview";
import UserOverview from "../Pages/TicketDetails/Dashboard/User/UserOverview";
import ManageTikcets from "../Pages/TicketDetails/Dashboard/Admin/ManageTikcets";
const route = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        Component: PrivateRoute,
        children: [
          {
            path: "all-tickets",
            Component: AllTickets,
          },
          {
            path: "/ticket-detail/:id",
            Component: TicketDetails,
          },
        ],
      },
    ],
  },
  {
    Component: PrivateRoute,
    children: [
      {
        path: "dashboard",
        Component: DashBoard,
        children: [
          {
            index: true,
            Component: DashboardOverview,
          },
          {
            path: "my-booked-tickets",
            Component: MyBookedTickets,
          },
          {
            path: "payment-success",
            Component: PaymentSuccess,
          },
          {
            path: "transaction-history",
            Component: TransactionHistory,
          },
          {
            path: "payment-cancel",
            Component: PaymentCancel,
          },
          {
            path: "profile",
            Component: UserProfile,
          },
          {
            path: "vendor/add-ticket",
            Component: AddTicket,
          },
          {
            path: "vendor/my-added-tickets",
            Component: MyAddedTickets,
          },
          {
            path: "vendor/update-ticket/:id",
            Component: UpdateTicket,
          },
          {
            path: "vendor/requested-bookings",
            Component: VendorRequestedBookings
          },
          {
            path: "vendor/revenue-overview",
            Component: VendorRevenueOverview
          },
          {
            path: "admin/manage-tickets",
            Component: ManageTikcets
          }
        ],
      },
    ],
  },
]);

export default route;
