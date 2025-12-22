import React from "react";
import { Link, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Spinner from "../../../../Components/Spinner/Spinner";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");

  const {
    data: paymentData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["payment-success", sessionId],
    queryFn: async () => {
      const response = await axiosSecure.patch(`/payment-success?session_id=${sessionId}`);
      return response.data.paymentResult;
    },
    enabled: !!sessionId, // only runs if sessionId exists
  });

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div className="min-h-[80vh] flex justify-center items-center text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl font-bold text-primary">
            Payment Successful 🎉
          </h1>
          <p>
            <span className="font-bold">Amount:</span> {paymentData.amount}{" "}
            {paymentData.currency?.toUpperCase()}
          </p>
          <p>
            <span className="font-bold">Customer:</span>{" "}
            {paymentData.customerEmail}
          </p>
          <p>
            <span className="font-bold">Booking ID:</span>{" "}
            {paymentData.bookingId}
          </p>
          <p>
            <span className="font-bold">Title:</span> {paymentData.title}</p>
          <p>
            <span className="font-bold">Transaction ID:</span>{" "}
            {paymentData.transactionId}
          </p>
          <p>
            <span className="font-bold">Status:</span>{" "}
            {paymentData.paymentStatus}
          </p>
          <p>
            <span className="font-bold">Paid At:</span>{" "}
            {new Date(paymentData.paidAt).toLocaleString()}
          </p>
          <div className="card-actions justify-end mt-4">
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;