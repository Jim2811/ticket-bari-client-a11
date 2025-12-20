import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../../Components/Spinner/Spinner";
const TransactionHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-success?email=${user?.email}`
      );
      return res.data;
    },
  });
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Ticket Title</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, index) => (
              <tr key={p._id}>
                <th>{index+1}</th>
                <th>{p.title}</th>
                <td>{p.amount}</td>
                <td>{new Date(p.paidAt).toLocaleString()}</td>
                <td>{p.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionHistory;
