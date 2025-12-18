import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ allPaymentData }) => {
  const fee = allPaymentData.map((p) => ({
    amount: Number(p.amount),
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={fee}
        margin={{
          top: 20,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="" />
        <XAxis dataKey="amount" />
        <YAxis />
        <Tooltip active />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#FFC067"
          fill="#FFC067"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
