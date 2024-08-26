import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import Header from "@/components/Header";
import { useGetTopicsQuery, useGetInsightsByFilterQuery } from "@/state/api";
import OverviewChart from "@/components/OverviewChart";
import { DataGrid } from "@mui/x-data-grid";
import StatBox from "@/components/StatBox";
import {
  TrendingUpOutlined,
  LightbulbOutlined,
  AssessmentOutlined,
} from "@mui/icons-material";

const DarkPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.alt,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

const TopicInsights = () => {
  const [selectedTopic, setSelectedTopic] = useState("");

  const { data: topics, isLoading: isLoadingTopics } = useGetTopicsQuery();
  const { data: insights, isLoading: isLoadingInsights } = useGetInsightsByFilterQuery({
    filter: "topic",
    value: selectedTopic,
    page: 1,
    pageSize: 100,
  });

  const columns = useMemo(
    () => [
      { field: "title", headerName: "Title", flex: 2 },
      { field: "sector", headerName: "Sector", flex: 1 },
      { field: "region", headerName: "Region", flex: 1 },
      { field: "intensity", headerName: "Intensity", flex: 0.5 },
      { field: "likelihood", headerName: "Likelihood", flex: 0.5 },
      { field: "relevance", headerName: "Relevance", flex: 0.5 },
    ],
    []
  );

  const calculateStats = useMemo(() => {
    if (!insights) return { avgIntensity: 0, avgLikelihood: 0, avgRelevance: 0 };
    const sum = insights.reduce(
      (acc, curr) => ({
        intensity: acc.intensity + curr.intensity,
        likelihood: acc.likelihood + curr.likelihood,
        relevance: acc.relevance + curr.relevance,
      }),
      { intensity: 0, likelihood: 0, relevance: 0 }
    );
    const count = insights.length;
    return {
      avgIntensity: (sum.intensity / count).toFixed(2),
      avgLikelihood: (sum.likelihood / count).toFixed(2),
      avgRelevance: (sum.relevance / count).toFixed(2),
    };
  }, [insights]);

  if (isLoadingTopics) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TOPIC INSIGHTS" subtitle="Analyze insights by topic" />
      <Box mb="2rem" display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          Select a Topic
        </Typography>
        <Select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          displayEmpty
          sx={{ minWidth: 200, backgroundColor: "background.alt" }}
        >
          <MenuItem value="">
            <em>Select a topic</em>
          </MenuItem>
          {topics?.map((topic) => (
            <MenuItem key={topic} value={topic}>
              {topic}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {selectedTopic && !isLoadingInsights && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StatBox
              title="Average Intensity"
              value={calculateStats.avgIntensity}
              icon={<TrendingUpOutlined sx={{ fontSize: 30, color: "secondary.main" }} />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatBox
              title="Average Likelihood"
              value={calculateStats.avgLikelihood}
              icon={<LightbulbOutlined sx={{ fontSize: 30, color: "secondary.main" }} />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatBox
              title="Average Relevance"
              value={calculateStats.avgRelevance}
              icon={<AssessmentOutlined sx={{ fontSize: 30, color: "secondary.main" }} />}
            />
          </Grid>
          <Grid item xs={12}>
            <DarkPaper>
              <Typography variant="h6" gutterBottom>Topic Overview</Typography>
              <Typography variant="subtitle1" gutterBottom color="text.secondary">
                Comprehensive view of energy insights
              </Typography>
              <Box height="600px">
                <OverviewChart view="topic" isDashboard={false} topic={selectedTopic} />
              </Box>
            </DarkPaper>
          </Grid>
          <Grid item xs={12}>
            <DarkPaper>
              <Typography variant="h6" gutterBottom>Insights Data</Typography>
              <Box height="500px">
                <DataGrid
                  loading={isLoadingInsights}
                  getRowId={(row) => row._id}
                  rows={insights || []}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10, 25, 50]}
                  sx={{
                    "& .MuiDataGrid-root": {
                      border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "background.alt",
                      color: "text.primary",
                      borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: "background.alt",
                    },
                    "& .MuiDataGrid-footerContainer": {
                      backgroundColor: "background.alt",
                      color: "text.primary",
                      borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                      color: "text.primary",
                    },
                  }}
                />
              </Box>
            </DarkPaper>
          </Grid>
        </Grid>
      )}

      {selectedTopic && isLoadingInsights && (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default TopicInsights;