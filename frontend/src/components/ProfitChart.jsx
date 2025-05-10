import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', profit: 3000 },
  { month: 'Feb', profit: 4000 },
  { month: 'Mar', profit: 3200 },
  { month: 'Apr', profit: 4500 },
  { month: 'May', profit: 5000 },
];

const ProfitChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="profit" fill="#000000" />
    </BarChart>
  </ResponsiveContainer>
);

export default ProfitChart;
