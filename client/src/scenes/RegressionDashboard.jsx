import { useTheme } from "@mui/material";
import { useGetEnergyInsightsQuery } from "@/state/api";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Header from "@/components/Header";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useState, useMemo } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function RegressionDashboard() {
  const theme = useTheme();
  const [xAxis, setXAxis] = useState("intensity");
  const [yAxis, setYAxis] = useState("relevance");
  const { data, isLoading } = useGetEnergyInsightsQuery({ page: 1, pageSize: 1000 });

  const lineChartData = useMemo(() => {
    if (!data) return [];

    return data.map((item) => ({
      [xAxis]: item[xAxis],
      [yAxis]: item[yAxis],
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
      <Header title="REGRESSION DASHBOARD" subtitle="Explore relationships between attributes" />
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem", minWidth: 120 }}>
          <InputLabel>X-Axis</InputLabel>
          <Select
            value={xAxis}
            label="X-Axis"
            onChange={(e) => setXAxis(e.target.value)}
          >
            <MenuItem value="intensity">Intensity</MenuItem>
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="likelihood">Likelihood</MenuItem>
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
          <LineChart
            width={1200}
            height={500}
            data={lineChartData}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <XAxis dataKey={xAxis} />
            <YAxis dataKey={yAxis} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={yAxis} stroke="#8884d8" />
          </LineChart>
        </Box>
      </Box>
    </Box>
  );
}

export default RegressionDashboard;
