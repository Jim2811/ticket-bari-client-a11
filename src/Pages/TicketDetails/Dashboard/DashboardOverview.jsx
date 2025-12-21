import { useQuery } from "@tanstack/react-query";
import VendorRevenueOverview from "./Vendor/VendorRevenueOverview";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import UserOverview from "../Dashboard/User/UserOverview";

const DashboardOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: userDataArr = [],
    isLoading,
  } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  const userData = Array.isArray(userDataArr)
    ? userDataArr[0]
    : userDataArr; 
  if (isLoading) {
    return <p className="text-center py-10 font-semibold">Loading...</p>;
  }

  return (
    <>
      {userData?.role === "user" && <UserOverview />}
      {userData?.role === "vendor" && <VendorRevenueOverview />}
      {!userData && (
        <p className="text-center text-error mt-4">
          User data not found or role undefined.
        </p>
      )}
    </>
  );
};

export default DashboardOverview;