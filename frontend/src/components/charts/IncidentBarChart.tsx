import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface IncidentBarChartProps {
  data: {
    day: string;
    count: number;
  }[];
}

function IncidentBarChart({
  data,
}: IncidentBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="rgba(148,163,184,0.15)"
        />

        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "#94a3b8",
            fontSize: 12,
          }}
        />

        <YAxis
          allowDecimals={false}
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "#94a3b8",
            fontSize: 12,
          }}
        />

        <Tooltip
          cursor={{
            fill: "rgba(0,188,212,0.06)",
          }}
          contentStyle={{
            background: "#1e293b",
            border: "1px solid rgba(148,163,184,0.2)",
            borderRadius: "10px",
            color: "#fff",
          }}
        />

        <Bar
          dataKey="count"
          name="Incidents"
          fill="#00bcd4"
          radius={[6, 6, 0, 0]}
          maxBarSize={42}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default IncidentBarChart;