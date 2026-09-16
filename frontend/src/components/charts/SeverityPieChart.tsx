import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = [
  "#ef4444",
  "#f97316",
  "#facc15",
  "#22c55e",
];

function SeverityPieChart({ data }: Props) {
  const hasData = data.some((item) => item.value > 0);

  if (!hasData) {
    return (
      <div
        style={{
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#94a3b8",
          fontSize: "14px",
        }}
      >
        No incident severity data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="45%"
          outerRadius={90}
          innerRadius={55}
          paddingAngle={3}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{
            background: "#1e293b",
            border: "1px solid rgba(148,163,184,0.2)",
            borderRadius: "10px",
            color: "#fff",
          }}
        />

        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{
            fontSize: "12px",
            color: "#94a3b8",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default SeverityPieChart;