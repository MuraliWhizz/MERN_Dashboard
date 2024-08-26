import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetEnergyInsightsQuery } from '@/state/api';
import { formatDate } from '@/utils/date';

const IncreasingNaturalGasConsumption = () => {
  const { data, isLoading } = useGetEnergyInsightsQuery({ page: 1, pageSize: 1000, sector: 'Energy', topic: 'gas' });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredData = data.filter(item => item.title.includes('U.S. natural gas consumption is expected to increase'));

  const chartData = filteredData.map(item => ({
    name: formatDate(item.published),
    value: item.intensity,
  }));

  const width = window.innerWidth;
  const height = width < 768 ? 300 : 450;

  return (
    <div style={{ margin: '40px' }}>
      <h2>Increasing Natural Gas Consumption</h2><br></br>
      <ResponsiveContainer width="100%" height={height} padding={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <LineChart data={chartData}>
          <XAxis
            dataKey="name"
            tickFormatter={formatDate}
            type="category"
            interval={0}
            tick={{ fontSize: 14, fontWeight: 600, color: '#333' }}
          />
          <YAxis
            type="number"
            domain={['dataMin', 'dataMax']}
            tick={{ fontSize: 14, fontWeight: 600, color: '#333' }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <Tooltip wrapperStyle={{ fontSize: 14, fontWeight: 600, color: '#333' }} />
          <Legend wrapperStyle={{ fontSize: 14, fontWeight: 600, color: '#333' }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2f4f7f"
            strokeWidth={3}
            dot={{ fill: '#2f4f7f', stroke: '#333', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncreasingNaturalGasConsumption;