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
      <p className="text-center py-20 font-semibold">
        Loading revenue summary...
      </p>
    );
  const chartData = [
    {
      name: "Revenue (৳)",
      Revenue: stats.totalRevenue,
      Sold: stats.totalTicketsSold,
      Added: stats.totalTicketsAdded,
    },
  ];

  return (
    <section className="p-6 md:p-10 space-y-10">
      <h2 className="text-3xl font-bold text-primary text-center md:text-left">
        Revenue Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-6">
        <div className="bg-base-200 p-5 rounded-xl shadow">
          <h3 className="font-semibold text-lg text-gray-600">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600">৳{stats.totalRevenue}</p>
        </div>
        <div className="bg-base-200 p-5 rounded-xl shadow">
          <h3 className="font-semibold text-lg text-gray-600">Tickets Sold</h3>
          <p className="text-2xl font-bold text-blue-600">{stats.totalTicketsSold}</p>
        </div>
        <div className="bg-base-200 p-5 rounded-xl shadow">
          <h3 className="font-semibold text-lg text-gray-600">Tickets Added</h3>
          <p className="text-2xl font-bold text-purple-600">{stats.totalTicketsAdded}</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Revenue"
            fill="#22c55e"
            barSize={50}
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="Sold"
            fill="#3b82f6"
            barSize={50}
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="Added"
            fill="#a855f7"
            barSize={50}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default VendorRevenueOverview;