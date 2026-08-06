import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
} from "recharts";

interface Props {
  data: any[];
}

function IncidentBarChart({ data }: Props) {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <BarChart data={data}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="day" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="count"
        />

      </BarChart>
    </ResponsiveContainer>
  );
}

export default IncidentBarChart;