import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface SpendingPieChartProps {
  spendingData: Record<string, number>;
}

const SpendingPieChart = (props: SpendingPieChartProps) => {
  const data = Object.entries(props.spendingData).map(([category, value]) => ({
    category,
    value,
  }));

  const COLORS = [
    "#FF6384", // Mājoklis
    "#36A2EB", // Pārtika
    "#607D8B", // Transports
    "#4BC0C0", // Veselība
    "#9966FF", // Bērni
    "#FF9F40", // Iepirkšanās
    "#1E88E5", // Izklaide
    "#FF7043", // Izglītība
    "#922B21", // Atpūta
    "#5C6BC0", // Apdrošināšana
    "#154360", // Ieguldījumi
    "#81C784", // Mājdzīvnieki
    "#B7950B", // Cits
    "#7986CB", // Atlikums
  ];

  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart>
        <Pie className="outline-none" data={data} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={200} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell className="outline-none" key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SpendingPieChart;
