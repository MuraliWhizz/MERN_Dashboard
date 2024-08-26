import { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, useTheme, Grid } from "@mui/material";
import Header from "@/components/Header";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { useGetEnergyInsightsQuery } from "@/state/api";
import CircularProgress from "@mui/material/CircularProgress";

function Overview() {
  const theme = useTheme();
  const [view, setView] = useState("sector");
  const { data, isLoading } = useGetEnergyInsightsQuery({ page: 1, pageSize: 1000 });

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

  const getChartData = () => {
    const chartData = data.reduce((acc, item) => {
      const key = item[view];
      if (!acc[key]) {
        acc[key] = { id: key, label: key, value: 0, intensity: 0, relevance: 0, likelihood: 0 };
      }
      acc[key].value += 1;
      acc[key].intensity += item.intensity;
      acc[key].relevance += item.relevance;
      acc[key].likelihood += item.likelihood;
      return acc;
    }, {});

    return Object.values(chartData).map(item => ({
      ...item,
      intensity: item.intensity / item.value,
      relevance: item.relevance / item.value,
      likelihood: item.likelihood / item.value,
    }));
  };

  const chartData = getChartData();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="OVERVIEW" subtitle="Comprehensive view of energy insights" />
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem", minWidth: 120 }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sector">Sector</MenuItem>
            <MenuItem value="topic">Topic</MenuItem>
            <MenuItem value="region">Region</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" align="center">Distribution of Insights</Typography>
            <Box height={400}>
              <ResponsivePie
                data={chartData}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1 ] ] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor={theme.palette.secondary[200]}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
                theme={{
                  tooltip: {
                    container: {
                      color: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" align="center">Average Metrics</Typography>
            <Box height={400}>
              <ResponsiveBar
                data={chartData}
                keys={['intensity', 'relevance', 'likelihood']}
                indexBy="id"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -45,
                  legend: view.charAt(0).toUpperCase() + view.slice(1),
                  legendPosition: 'middle',
                  legendOffset: 40
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Average Value',
                  legendPosition: 'middle',
                  legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                legends={[
                  {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemOpacity: 1
                        }
                      }
                    ]
                  }
                ]}
                theme={{
                  axis: {
                    ticks: {
                      text: {
                        fill: theme.palette.secondary[200],
                      },
                    },
                    legend: {
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
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default Overview;


