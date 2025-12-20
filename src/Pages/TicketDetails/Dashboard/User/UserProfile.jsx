import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Spinner from "../../../../Components/Spinner/Spinner";

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userData, isLoading } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data
    },
  });
  const userOb = userData;
  const userObj = userOb[0]
  if(isLoading){
    return <Spinner></Spinner>
  }
  return (
    <div className="min-h-screen bg-base-200 p-4">
      <h1 className="text-center text-3xl font-bold text-primary pt-3 pb-5 mb-7">
        User Information
      </h1>
      <div className="flex justify-center items-center">
        <div className="max-w-6xl md:max-w-6/12 mx-auto ">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/2kR5zq0/user.png"}
                    alt="Profile"
                  />
                </div>
              </div>

              <h2 className="text-xl font-bold mt-4">
                {user?.displayName || "Unknown User"}
              </h2>

              <p className="text-sm opacity-70">{user?.email}</p>
              <p className="text-sm opacity-70">
                <span className="font-bold">Creation Date: </span>
                <span>{userObj?.createdAt}</span>
              </p>

              <div className="mt-3 flex gap-2">
                <span className="badge badge-primary">{userObj?.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
