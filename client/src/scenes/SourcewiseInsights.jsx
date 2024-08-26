import { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery, CircularProgress } from "@mui/material";
import Header from "@/components/Header";
import { useGetEnergyInsightsQuery, useGetSourcesQuery } from "@/state/api";
import FlexBetween from "@/components/FlexBetween";
import StatBox from "@/components/StatBox";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PublicOutlined } from "@mui/icons-material";

function SourceDistribution() {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [page] = useState(1);
  const [pageSize] = useState(1000);
  const { data: insightsData, isLoading: insightsLoading } = useGetEnergyInsightsQuery({
    page,
    pageSize,
  });
  const { data: sourcesData, isLoading: sourcesLoading } = useGetSourcesQuery();

  if (insightsLoading || sourcesLoading) {
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
  }

  if (!insightsData || !sourcesData) {
    return <Typography>No data available</Typography>;
  }

  const sourceDistribution = sourcesData.reduce((acc, source) => {
    const count = insightsData.filter((insight) => insight.source === source).length;
    if (count > 0) {
      acc.push({ source, count });
    }
    return acc;
  }, []);

  sourceDistribution.sort((a, b) => b.count - a.count);

  const totalSources = sourceDistribution.length;
  const topSource = sourceDistribution[0]?.source || "N/A";
  const averageInsightsPerSource = (insightsData.length / totalSources).toFixed(2);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="SOURCE DISTRIBUTION"
          subtitle="Distribution of insights across different sources"
        />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="Total Sources"
          value={totalSources}
          increase="+14%"
          description="Since last month"
          icon={
            <PublicOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Top Source"
          value={topSource}
          increase="+5%"
          description="Most frequent source"
          icon={
            <PublicOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Avg Insights/Source"
          value={averageInsightsPerSource}
          increase="+8%"
          description="Average insights per source"
          icon={
            <PublicOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Source-wise Insight Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={sourceDistribution}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="source"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={80}
                tick={{
                    fontSize: 8, 
                    fill: theme.palette.secondary[100],
                  }}

              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill={theme.palette.secondary[300]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default SourceDistribution;