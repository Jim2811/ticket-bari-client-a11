import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Spinner from "../../../../Components/Spinner/Spinner";

const VendorRevenueOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["vendorRevenue", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/vendor/revenue?vendorEmail=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spinner />
      </div>
    );

  const chartData = [
    {
      name: "Performance",
      Revenue: stats.totalRevenue || 0,
      Sold: stats.totalTicketsSold || 0,
      Added: stats.totalTicketsAdded || 0,
    },
  ];

  return (
    <section className="p-6 md:p-10 space-y-10">
      <h2 className="text-3xl font-bold text-primary text-center md:text-left">
        Revenue Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-base-100 border border-base-300 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
          <h3 className="text-sm font-medium text-base-content/70 mb-1">
            Total Revenue
          </h3>
          <p className="text-3xl font-extrabold text-success">
            ৳ {stats.totalRevenue?.toLocaleString() || 0}
          </p>
        </div>
        <div className="bg-base-100 border border-base-300 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
          <h3 className="text-sm font-medium text-base-content/70 mb-1">
            Tickets Sold
          </h3>
          <p className="text-3xl font-extrabold text-info">
            {stats.totalTicketsSold || 0}
          </p>
        </div>
        <div className="bg-base-100 border border-base-300 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
          <h3 className="text-sm font-medium text-base-content/70 mb-1">
            Tickets Added
          </h3>
          <p className="text-3xl font-extrabold text-violet-500">
            {stats.totalTicketsAdded || 0}
          </p>
        </div>
      </div>

      <div className="bg-base-100 border border-base-300 rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-6 text-center text-base-content/90">
          Chart Summary
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
            <XAxis dataKey="name" tick={{ fill: "#6B7280" }} />
            <YAxis tick={{ fill: "#6B7280" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend />
            <Bar dataKey="Revenue" fill="#16A34A" barSize={50} radius={[6, 6, 0, 0]} />
            <Bar dataKey="Sold" fill="#3B82F6" barSize={50} radius={[6, 6, 0, 0]} />
            <Bar dataKey="Added" fill="#8B5CF6" barSize={50} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default VendorRevenueOverview;