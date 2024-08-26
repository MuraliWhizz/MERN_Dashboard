import React from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import {
  DownloadOutlined,
  BoltOutlined,
  TrendingUpOutlined,
  PublicOutlined,
  LightbulbOutlined,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import FlexBetween from "@/components/FlexBetween";
import Header from "@/components/Header";
import OverviewChart from "@/components/OverviewChart";
import BreakdownChart from "@/components/BreakdownChart";
import { useGetEnergyInsightsQuery } from "@/state/api";

const StatBox = ({ title, value, increase, description, icon }) => {
  const theme = useTheme();
  return (
    <Box
      gridColumn="span 3"
      backgroundColor={theme.palette.background.alt}
      p="1.25rem 1rem"
      borderRadius="0.55rem"
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>
      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ color: theme.palette.secondary[200] }}
      >
        {value}
      </Typography>
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

function Dashboard() {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetEnergyInsightsQuery({ page: 1, pageSize: 1000 });

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "sector",
      headerName: "Sector",
      flex: 1,
    },
    {
      field: "topic",
      headerName: "Topic",
      flex: 1,
    },
    {
      field: "insight",
      headerName: "Insight",
      flex: 2,
    },
    {
      field: "intensity",
      headerName: "Intensity",
      flex: 0.5,
      renderCell: (params) => Number(params.value).toFixed(2),
    },
  ];

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

  const totalInsights = data.length;
  const averageIntensity = data.reduce((sum, item) => sum + item.intensity, 0) / totalInsights;
  const averageRelevance = data.reduce((sum, item) => sum + item.relevance, 0) / totalInsights;
  const averageLikelihood = data.reduce((sum, item) => sum + item.likelihood, 0) / totalInsights;

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your energy insights dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary[300],
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: theme.palette.secondary[100],
              },
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
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
          title="Total Insights"
          value={totalInsights}
          increase="+14%"
          description="Since last month"
          icon={
            <LightbulbOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Average Intensity"
          value={averageIntensity.toFixed(2)}
          increase="+21%"
          description="Since last month"
          icon={
            <BoltOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Average Relevance"
          value={averageRelevance.toFixed(2)}
          increase="+5%"
          description="Since last month"
          icon={
            <TrendingUpOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Average Likelihood"
          value={averageLikelihood.toFixed(2)}
          increase="+43%"
          description="Since last month"
          icon={
            <PublicOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <Box
          gridColumn="span 8"
          gridRow="span 4"
          backgroundColor={theme.palette.background.alt}
        >
          <OverviewChart view="sector" isDashboard={true} />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }}>
           <h2>Insights By Sector</h2> 
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.9rem"
            fontSize="1.2rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of energy insights by sector, showing the distribution of insights across different areas of the energy industry.
          </Typography>
        </Box>

        <Box
          gridColumn="span 12"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={data || []}
            columns={columns}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
