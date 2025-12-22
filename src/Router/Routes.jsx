import { createBrowserRouter, Navigate } from "react-router-dom";
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
import ManageTikcets from "../Pages/TicketDetails/Dashboard/Admin/ManageTikcets";
import ManageUsers from "../Pages/TicketDetails/Dashboard/Admin/ManageUsers";
import AdvertisedTickets from "../Pages/TicketDetails/Dashboard/Admin/AdvertisedTickets";
import Error from "../Pages/Error";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "all-tickets",
        element: (
          <PrivateRoute>
            <AllTickets />
          </PrivateRoute>
        ),
      },
      {
        path: "/ticket-detail/:id",
        element: (
          <PrivateRoute>
            <TicketDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardOverview />
          </PrivateRoute>
        ),
      },
      {
        path: "my-booked-tickets",
        element: (
          <PrivateRoute>
            <MyBookedTickets />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-cancel",
        element: (
          <PrivateRoute>
            <PaymentCancel />
          </PrivateRoute>
        ),
      },
      {
        path: "transaction-history",
        element: (
          <PrivateRoute>
            <TransactionHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "vendor/add-ticket",
        element: (
          <PrivateRoute>
            <AddTicket />
          </PrivateRoute>
        ),
      },
      {
        path: "vendor/my-added-tickets",
        element: (
          <PrivateRoute>
            <MyAddedTickets />
          </PrivateRoute>
        ),
      },
      {
        path: "vendor/update-ticket/:id",
        element: (
          <PrivateRoute>
            <UpdateTicket />
          </PrivateRoute>
        ),
      },
      {
        path: "vendor/requested-bookings",
        element: (
          <PrivateRoute>
            <VendorRequestedBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "vendor/revenue-overview",
        element: (
          <PrivateRoute>
            <VendorRevenueOverview />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/manage-tickets",
        element: (
          <PrivateRoute>
            <ManageTikcets />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/advertise-tickets",
        element: (
          <PrivateRoute>
            <AdvertisedTickets/>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);

export default route;
