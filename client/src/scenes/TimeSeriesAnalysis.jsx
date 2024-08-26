import { useState, useMemo } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import Header from "@/components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetEnergyInsightsQuery } from "@/state/api";
import CircularProgress from "@mui/material/CircularProgress";

function TimeSeriesAnalysis() {
  const theme = useTheme();
  const [view, setView] = useState("intensity");
  const { data, isLoading } = useGetEnergyInsightsQuery({ page: 1, pageSize: 1000 });

  const chartData = useMemo(() => {
    if (!data) return [];

    const timelineData = data.reduce((acc, item) => {
      const year = new Date(item.published).getFullYear();
      if (!acc[year]) {
        acc[year] = { intensity: 0, relevance: 0, likelihood: 0, count: 0 };
      }
      acc[year].intensity += item.intensity;
      acc[year].relevance += item.relevance;
      acc[year].likelihood += item.likelihood;
      acc[year].count += 1;
      return acc;
    }, {});

    return Object.entries(timelineData).map(([year, values]) => ({
      x: year,
      intensity: values.intensity / values.count,
      relevance: values.relevance / values.count,
      likelihood: values.likelihood / values.count,
    }));
  }, [data]);

  if (!data || isLoading)
    return (
      <Box
        width="100%"
        height="100%"
        minHeight="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color="secondary" />
      </Box>
    );

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TIME SERIES ANALYSIS" subtitle="Analyze trends over time" />
      <Box height="70vh">
        <FormControl sx={{ mt: "1rem", minWidth: 120 }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="intensity">Intensity</MenuItem>
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="likelihood">Likelihood</MenuItem>
          </Select>
        </FormControl>
        <ResponsiveLine
          data={[
            {
              id: view.charAt(0).toUpperCase() + view.slice(1),
              color: theme.palette.secondary.main,
              data: chartData.map((d) => ({
                x: d.x,
                y: d[view],
              })),
            },
          ]}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary[200],
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            },
            legends: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            tooltip: {
              container: {
                color: theme.palette.primary.main,
              },
            },
          }}
          margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="catmullRom"
          enableArea={true}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: (v) => v,
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Year",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: view.charAt(0).toUpperCase() + view.slice(1),
            legendOffset: -60,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
        />
      </Box>
    </Box>
  );
}

export default TimeSeriesAnalysis;