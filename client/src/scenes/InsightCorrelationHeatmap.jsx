import React, { useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useGetEnergyInsightsQuery } from '@/state/api';
import Header from '@/components/Header';
import FlexBetween from '@/components/FlexBetween';
import CircularProgress from '@mui/material/CircularProgress';
import { ResponsiveHeatMap } from '@nivo/heatmap';

const InsightCorrelationMatrix = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetEnergyInsightsQuery({ page: 1, pageSize: 1000 });

  const correlationData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const attributes = ['intensity', 'relevance', 'likelihood'];
    const correlations = attributes.map(attr1 => ({
      id: attr1,
      data: attributes.map(attr2 => ({
        x: attr2,
        y: calculateCorrelation(data, attr1, attr2)
      }))
    }));

    return correlations;
  }, [data]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="INSIGHT CORRELATION MATRIX" subtitle="Correlation between different insight attributes" />
      </FlexBetween>

      <Box height="75vh" mt="40px">
        <ResponsiveHeatMap
          data={correlationData}
          margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
          valueFormat=">-.2f"
          axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: '',
            legendOffset: 46
          }}
          axisRight={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Attributes',
            legendPosition: 'middle',
            legendOffset: 70
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Attributes',
            legendPosition: 'middle',
            legendOffset: -72
          }}
          colors={{
            type: 'diverging',
            scheme: 'red_yellow_blue',
            divergeAt: 0.5,
            minValue: -1,
            maxValue: 1
          }}
          emptyColor="#555555"
          theme={{
            axis: {
              legend: {
                text: {
                  fill: theme.palette.text.primary,  // Adapt text color for legend
                },
              },
              ticks: {
                text: {
                  fill: theme.palette.text.primary,  // Adapt text color for ticks
                },
              },
            },
            legends: {
              text: {
                fill: theme.palette.text.primary,  // Adapt text color for legends
              },
            },
            tooltip: {
              container: {
                background: theme.palette.background.default,
                color: theme.palette.text.primary,
              },
            },
          }}
          legends={[
            {
              anchor: 'bottom',
              translateX: 0,
              translateY: 30,
              length: 400,
              thickness: 8,
              direction: 'row',
              tickPosition: 'after',
              tickSize: 3,
              tickSpacing: 4,
              tickOverlap: false,
              tickFormat: '>-.2f',
              title: 'Correlation →',
              titleAlign: 'start',
              titleOffset: 4,
              textColor: theme.palette.text.primary,  // Adapt text color for legend text
            }
          ]}
        />
      </Box>
    </Box>
  );
};

// Helper function to calculate correlation between two attributes
const calculateCorrelation = (data, attr1, attr2) => {
  const n = data.length;
  let sum_X = 0, sum_Y = 0, sum_XY = 0;
  let squareSum_X = 0, squareSum_Y = 0;

  for (let i = 0; i < n; i++) {
    const x = data[i][attr1];
    const y = data[i][attr2];

    sum_X += x;
    sum_Y += y;
    sum_XY += x * y;
    squareSum_X += x * x;
    squareSum_Y += y * y;
  }

  const correlation = (n * sum_XY - sum_X * sum_Y) /
    (Math.sqrt((n * squareSum_X - sum_X * sum_X) * (n * squareSum_Y - sum_Y * sum_Y)));

  return correlation;
};

export default InsightCorrelationMatrix;
