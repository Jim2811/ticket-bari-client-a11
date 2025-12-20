import UserDashboard from "../Pages/TicketDetails/Dashboard/User/UserDashboard";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Components/Spinner/Spinner";
import VendorDashboard from "../Pages/TicketDetails/Dashboard/Vendor/VendorDashboard";
import AdminDashboard from "../Pages/TicketDetails/Dashboard/Admin/AdminDashboard";

const DashBoard = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  const { data: userData = [], isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () =>
      (await axiosSecure.get(`/users?email=${user.email}`)).data,
  });
  const userObj = userData.length > 0 ? userData[0] : {};
  const role = userObj.role
  if(isLoading) return <Spinner></Spinner>
  if (role === "vendor") return <VendorDashboard />;
  if (role === "admin") return <AdminDashboard />;
  return <UserDashboard></UserDashboard>
};

export default DashBoard;
