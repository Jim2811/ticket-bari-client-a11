import React, { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Spinner from "../../../../Components/Spinner/Spinner";
import Swal from "sweetalert2";

const UserProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [updateData, setUpdateData] = useState({ name: "", photoURL: "" });

  const { data: userData = [], isLoading } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  const userObj = userData[0] || {};

  const updateMutation = useMutation({
    mutationFn: async (updatedInfo) => {
      const res = await axiosSecure.patch(`/users/${userObj._id}`, updatedInfo);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userData", user?.email]);
      setIsEditing(false);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile info and Firebase Auth data are updated successfully.",
      });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, photoURL } = updateData;
    if (!name && !photoURL) {
      Swal.fire({
        icon: "warning",
        title: "No changes made",
      });
      return;
    }
    try {
      await updateUserProfile(
        name || user.displayName,
        photoURL || user.photoURL
      );

      updateMutation.mutate({
        name: name || user.displayName,
        photoURL: photoURL || user.photoURL,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Profile Update Failed",
        text: error.message,
      });
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spinner />
      </div>
    );

  return (
    <section className="min-h-screen bg-base-200 text-base-content p-6 md:p-10">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-primary mb-10">
        User Information
      </h2>

      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl transition-all rounded-xl p-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="avatar">
                <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                  <img
                    src={
                      userObj.photoURL ||
                      user.photoURL ||
                      "https://i.ibb.co/2kR5zq0/user.png"
                    }
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-base-content">
                {userObj.name || user.displayName || "Unknown User"}
              </h2>
              <p className="text-sm text-base-content/70">{user.email}</p>

              {!isEditing ? (
                <>
                  <div className="divider w-1/2 mx-auto"></div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md text-sm text-left">
                    <div className="bg-base-200 p-4 rounded-lg">
                      <span className="block font-semibold text-base-content/80">
                        Account Created
                      </span>
                      <p className="text-base-content/70">
                        {userObj?.createdAt
                          ? new Date(userObj.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>

                    <div className="bg-base-200 p-4 rounded-lg">
                      <span className="block font-semibold text-base-content/80">
                        Role
                      </span>
                      <p className="text-base-content/70 capitalize">
                        {userObj?.role || "user"}
                      </p>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary btn-sm normal-case mt-6"
                    onClick={() => {
                      setIsEditing(true);
                      setUpdateData({
                        name: userObj.name || user.displayName || "",
                        photoURL: userObj.photoURL || user.photoURL || "",
                      });
                    }}
                  >
                    Update Profile
                  </button>
                </>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-sm space-y-4 mt-6 text-left"
                >
                  <div>
                    <span className="block text-sm font-semibold text-base-content/80 mb-1">
                      Name
                    </span>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={updateData.name}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <span className="block text-sm font-semibold text-base-content/80 mb-1">
                      Photo URL
                    </span>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={updateData.photoURL}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          photoURL: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm normal-case"
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? "Updating..." : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm normal-case"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;