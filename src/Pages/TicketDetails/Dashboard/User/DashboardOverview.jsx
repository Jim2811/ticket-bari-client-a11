import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxios from "../../../../Hooks/useAxios";

const DashboardOverview = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () =>
      (await axiosInstance.get(`/payment-success?email=${user.email}`)).data,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-error mt-4">
        Failed to load payment data
      </div>
    );
  }

  // মাস অনুযায়ী টোটাল amount বের করা
  const monthlyTotals = payments.reduce((acc, payment) => {
    const date = new Date(payment.paidAt);
    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    acc[month] = (acc[month] || 0) + payment.amount;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <>
      <h1 className="text-3xl text-primary font-bold pt-4 text-center mb-4">Payment Overview</h1>
      <div className="card bg-base-100 shadow mt-8 p-4">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickFormatter={(val) => `৳${val.toLocaleString()}`}
              domain={[0, "dataMax + 1000"]}
            />
            <YAxis dataKey="month" type="category" width={90} />
            <Tooltip formatter={(val) => `৳ ${val}`} />
            <Legend />
            <Bar
              dataKey="total"
              fill="#10b981"
              name="Amount (৳)"
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default DashboardOverview;
