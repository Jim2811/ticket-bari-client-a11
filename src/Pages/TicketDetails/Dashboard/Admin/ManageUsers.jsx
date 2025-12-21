import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Spinner from "../../../../Components/Spinner/Spinner";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handleRoleChange = (id, action) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${action.replace("-", " ")} this user?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${id}/${action}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire(
                "Success!",
                `User role updated successfully`,
                "success"
              );
              refetch();
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to update role", "error");
          });
      }
    });
  };

  if (isLoading) return <Spinner />;

  if (isError) {
    return (
      <p className="text-center text-error font-semibold py-10">
        Failed to load users.
      </p>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
        Manage Users
      </h2>

      <div className="relative overflow-x-auto bg-base-100 shadow-2xl rounded-2xl border border-base-300">
        <table className="table table-zebra min-w-[640px]">
          <thead className="bg-base-200">
            <tr className="text-xs sm:text-sm md:text-base font-semibold">
              <th className="w-10">#</th>
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Role</th>
              <th className="text-center w-[240px]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, idx) => (
              <tr key={u._id} className="hover:bg-base-200/50 transition">
                <td className="font-bold">{idx + 1}</td>

                <td className="font-medium whitespace-nowrap">
                  {u.isFraud === true ? (
                    <span>
                      {u.name} <span className="badge badge-error">Fraud</span>
                    </span>
                  ) : (
                    <span>{u.name}</span>
                  )}
                </td>

                <td className="text-gray-500 whitespace-nowrap">{u.email}</td>

                <td className="text-center">
                  <span
                    className={`badge badge-sm sm:badge-md font-semibold ${
                      u.role === "admin"
                        ? "badge-success"
                        : u.role === "vendor"
                        ? "badge-info"
                        : "badge-ghost"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>

                <td>
                  <div className="flex flex-col sm:flex-row justify-center gap-1 sm:gap-2">
                    <button
                      onClick={() => handleRoleChange(u._id, "make-admin")}
                      disabled={u.role === "admin" || u.isFraud === true}
                      className="btn btn-xs sm:btn-sm btn-primary w-full sm:w-auto"
                    >
                      Admin
                    </button>

                    <button
                      onClick={() => handleRoleChange(u._id, "make-vendor")}
                      disabled={u.role === "vendor" || u.isFraud === true}
                      className="btn btn-xs sm:btn-sm btn-accent w-full sm:w-auto"
                    >
                      Vendor
                    </button>

                    {u.role === "vendor" && (
                      <button
                        onClick={() => handleRoleChange(u._id, "mark-fraud")}
                        className="btn btn-xs sm:btn-sm btn-error w-full sm:w-auto"
                        disabled={u.isFraud === true}
                      >
                        Fraud
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center py-10 text-gray-500 font-medium">
            No users found.
          </p>
        )}
      </div>

      <p className="text-[11px] text-gray-400 text-center mt-3 sm:hidden">
        Swipe left ↔ to view full table
      </p>
    </div>
  );
};

export default ManageUsers;
