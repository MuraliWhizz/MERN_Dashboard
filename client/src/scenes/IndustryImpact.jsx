import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetEnergyInsightsQuery, useGetSectorsQuery } from '@/state/api';

const IndustryImpact = () => {
  const { data: sectorData, isLoading: isSectorLoading } = useGetSectorsQuery();
  const { data: insightData, isLoading: isInsightLoading } = useGetEnergyInsightsQuery({ page: 1, pageSize: 1000 });

  if (isSectorLoading || isInsightLoading) {
    return <div>Loading...</div>;
  }

  const sectorInsightCounts = sectorData.reduce((acc, sector) => {
    const sectorInsights = insightData.filter(item => item.sector === sector);
    acc[sector] = sectorInsights.length;
    return acc;
  }, {});

  const chartData = Object.entries(sectorInsightCounts).map(([sector, count]) => ({
    sector,
    count,
  }));

  return (
    <div>
      <h2>Industry Impact</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="sector" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IndustryImpact;