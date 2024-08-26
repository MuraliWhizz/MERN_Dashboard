import { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "@/components/Header";
import { useGetPestleFactorsQuery, useGetInsightsByFilterQuery } from "@/state/api";
import { ResponsivePie } from "@nivo/pie";
import CircularProgress from "@mui/material/CircularProgress";

function PestleFactorDistribution() {
  const theme = useTheme();
  const [selectedPestle, setSelectedPestle] = useState(null);

  const { data: pestleFactors, isLoading: isPestleLoading } = useGetPestleFactorsQuery();
  const { data: insights, isLoading: isInsightsLoading } = useGetInsightsByFilterQuery({
    filter: "pestle",
    value: "",
    page: 1,
    pageSize: 1000,
  });

  if (isPestleLoading || isInsightsLoading) {
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

  const pestleData = pestleFactors.map(pestle => ({
    id: pestle,
    label: pestle,
    value: insights.filter(insight => insight.pestle === pestle).length
  }));

  const PestleChart = ({ data }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#fff"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor="#333"
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      fill={[
        { match: { id: "Industries" }, id: "dots" },
        { match: { id: "Economic" }, id: "lines" },
      ]}
      onClick={(node) => setSelectedPestle(node.id)}
      onMouseEnter={(node, event) => {
        console.log(node, event);
      }}
      tooltip={({ datum }) => (
        <strong>
          {datum.id}: {datum.value} ({(datum.value / data.reduce((acc, curr) => acc + curr.value, 0)) * 100}%)
        </strong>
      )}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000"
              }
            }
          ]
        }
      ]}
    />
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PESTLE FACTOR DISTRIBUTION" subtitle="Distribution of insights across PESTLE factors" />
      <Box height="75vh">
        <PestleChart data={pestleData} />
      </Box>
      {selectedPestle && (
        <Box mt="2rem">
          <Typography variant="h6" color={theme.palette.secondary[100]}>
            Selected PESTLE Factor: {selectedPestle}
          </Typography>
          <Typography variant="body1" color={theme.palette.secondary[200]}>
            Number of Insights: {insights.filter(insight => insight.pestle === selectedPestle).length}
          </Typography>
        </Box>
      )}
    </Box>
      );
    }
    
    export default PestleFactorDistribution;