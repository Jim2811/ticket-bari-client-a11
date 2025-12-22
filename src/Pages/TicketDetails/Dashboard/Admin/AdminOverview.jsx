import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";
import {
  FaClock,
  FaCheckCircle,
  FaBullhorn,
  FaTimesCircle,
} from "react-icons/fa";
import Spinner from "../../../../Components/Spinner/Spinner";

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], isLoading, error } = useQuery({
    queryKey: ["dashboardTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <Spinner></Spinner>
    );
  if (error)
    return (
      <p className="text-center py-10 text-red-500 font-semibold">
        Failed to load dashboard data.
      </p>
    );

  const pending = tickets.filter((t) => t.verificationStatus === "pending")
    .length;
  const approved = tickets.filter((t) => t.verificationStatus === "approved")
    .length;
  const rejected = tickets.filter((t) => t.verificationStatus === "rejected")
    .length;
  const advertised = tickets.filter((t) => t.isAdvertised === true).length;

  const data = [
    { name: "Pending", count: pending, color: "#FACC15" },
    { name: "Approved", count: approved, color: "#22C55E" },
    { name: "Advertised", count: advertised, color: "#6366F1" },
    { name: "Rejected", count: rejected, color: "#EF4444" },
  ];

  const cards = [
    {
      title: "Pending Tickets",
      count: pending,
      icon: <FaClock />,
      color: "bg-yellow-500",
    },
    {
      title: "Approved Tickets",
      count: approved,
      icon: <FaCheckCircle />,
      color: "bg-green-500",
    },
    {
      title: "Advertised Tickets",
      count: advertised,
      icon: <FaBullhorn />,
      color: "bg-indigo-500",
    },
    {
      title: "Rejected Tickets",
      count: rejected,
      icon: <FaTimesCircle />,
      color: "bg-red-500",
    },
  ];

  return (
    <section className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-base-100 shadow-xl rounded-xl p-5 hover:shadow-2xl transition-all duration-300"
          >
            <div
              className={`text-white text-3xl p-3 rounded-lg ${c.color} shrink-0`}
            >
              {c.icon}
            </div>
            <div className="text-right">
              <h3 className="text-gray-500 text-sm">{c.title}</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {c.count}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-base-100 shadow-xl rounded-xl p-4 md:p-6 h-[400px]">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-700 dark:text-gray-100">
          Ticket Status Overview
        </h2>

        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F5AFAF" />
            <XAxis dataKey="name" tick={{ fill: "" }} />
            <YAxis allowDecimals={false} tick={{ fill: "#6B7280" }} />
            <Tooltip
              formatter={(value) => [`${value} Tickets`, "Count"]}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
            <Legend />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={60}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default AdminOverview;