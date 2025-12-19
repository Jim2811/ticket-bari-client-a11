import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((r) => {
          setPaymentData(r.data.paymentResult); 
        });
    }
  }, [axiosSecure, sessionId]);

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-base-200 p-4">
      {paymentData ? (
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-2xl font-bold text-primary">Payment Successful 🎉</h1>
            <p><span className="font-bold">Amount:</span> {paymentData.amount} {paymentData.currency?.toUpperCase()}</p>
            <p><span className="font-bold">Customer:</span> {paymentData.customerEmail}</p>
            <p><span className="font-bold">Booking ID:</span> {paymentData.bookingId}</p>
            <p><span className="font-bold">Title:</span> {paymentData.title}</p>
            <p><span className="font-bold">Transaction ID:</span> {paymentData.transactionId}</p>
            <p><span className="font-bold">Status:</span> {paymentData.paymentStatus}</p>
            <p><span className="font-bold">Paid At:</span> {new Date(paymentData.paidAt).toLocaleString()}</p>
            <div className="card-actions justify-end mt-4">
              <Link to={'/dashboard'} className="btn btn-primary">Go to Dashboard</Link>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center font-bold text-3xl text-primary">
          Loading Payment Info...
        </h1>
      )}
    </div>
  );
};

export default PaymentSuccess;
