import { useTheme } from "@mui/material";
import { useGetEnergyInsightsQuery } from "@/state/api";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Header from "@/components/Header";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useMemo } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function EnergyProductionTrends() {
  const theme = useTheme();
  const [xAxis, setXAxis] = useState("start_year");
  const [yAxis, setYAxis] = useState("intensity");
  const { data, isLoading } = useGetEnergyInsightsQuery({ page: 1, pageSize: 1000 });

  const lineChartData = useMemo(() => {
    if (!data) return [];

    const groupedData = data.reduce((acc, item) => {
      const year = item[xAxis];
      if (!acc[year]) {
        acc[year] = {
          [xAxis]: year,
          [yAxis]: 0,
          count: 0,
        };
      }
      acc[year][yAxis] += item[yAxis];
      acc[year].count += 1;
      return acc;
    }, {});

    return Object.values(groupedData).map((item) => ({
      [xAxis]: item[xAxis],
      [yAxis]: item[yAxis] / item.count,
    }));
  }, [data, xAxis, yAxis]);

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
      <Header
        title="ENERGY PRODUCTION TRENDS"
        subtitle="Explore trends in energy production over time"
      />
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem", minWidth: 120 }}>
          <InputLabel>X-Axis</InputLabel>
          <Select
            value={xAxis}
            label="X-Axis"
            onChange={(e) => setXAxis(e.target.value)}
          >
            <MenuItem value="start_year">Year</MenuItem>
            <MenuItem value="topic">Topic</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ mt: "1rem", minWidth: 120 }}>
          <InputLabel>Y-Axis</InputLabel>
          <Select
            value={yAxis}
            label="Y-Axis"
            onChange={(e) => setYAxis(e.target.value)}
          >
            <MenuItem value="intensity">Intensity</MenuItem>
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="likelihood">Likelihood</MenuItem>
          </Select>
        </FormControl>
        <Box height={400} mt={4}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lineChartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey={xAxis} />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={yAxis} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default EnergyProductionTrends;