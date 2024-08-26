import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import { useGetEnergyInsightsQuery } from "@/state/api";
import FlexBetween from "@/components/FlexBetween";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FilterListIcon from '@mui/icons-material/FilterList';
import React, { useMemo, useState, useCallback } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";

function LikelihoodHeatmap() {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading, error } = useGetEnergyInsightsQuery({ page: 1, pageSize: 2000 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sectorFilter, setSectorFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  const { heatmapData, uniqueRegions, uniqueSectors } = useMemo(() => {
    if (!data || data.length === 0) {
      return { heatmapData: {}, uniqueRegions: [], uniqueSectors: [] };
    }

    const sectorRegionMap = {};
    const regions = new Set();
    const sectors = new Set();

    data.forEach(insight => {
      if (!insight.sector || !insight.region || insight.likelihood === undefined) return;

      regions.add(insight.region);
      sectors.add(insight.sector);

      if (!sectorRegionMap[insight.sector]) {
        sectorRegionMap[insight.sector] = {};
      }
      if (!sectorRegionMap[insight.sector][insight.region]) {
        sectorRegionMap[insight.sector][insight.region] = [];
      }
      sectorRegionMap[insight.sector][insight.region].push(insight.likelihood);
    });

    Object.keys(sectorRegionMap).forEach(sector => {
      Object.keys(sectorRegionMap[sector]).forEach(region => {
        const likelihoods = sectorRegionMap[sector][region];
        sectorRegionMap[sector][region] = likelihoods.reduce((sum, val) => sum + val, 0) / likelihoods.length;
      });
    });

    return { 
      heatmapData: sectorRegionMap, 
      uniqueRegions: Array.from(regions),
      uniqueSectors: Array.from(sectors)
    };
  }, [data]);

  const filteredHeatmapData = useMemo(() => {
    return Object.entries(heatmapData)
      .filter(([sector]) => sector.toLowerCase().includes(sectorFilter.toLowerCase()))
      .reduce((acc, [sector, regions]) => {
        acc[sector] = Object.entries(regions)
          .filter(([region]) => region.toLowerCase().includes(regionFilter.toLowerCase()))
          .reduce((regionAcc, [region, value]) => {
            regionAcc[region] = value;
            return regionAcc;
          }, {});
        return acc;
      }, {});
  }, [heatmapData, sectorFilter, regionFilter]);

  const handleZoomIn = useCallback(() => setZoomLevel(prev => Math.min(prev + 0.1, 2)), []);
  const handleZoomOut = useCallback(() => setZoomLevel(prev => Math.max(prev - 0.1, 0.5)), []);

  const getColor = useCallback((value) => {
    const hue = ((1 - value) * 250).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }, []);

  if (isLoading) {
    return (
      <Box width="100%" height="100%" minHeight="80vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box width="80%" height="100%" minHeight="80vh" display="flex" justifyContent="center" alignItems="center">
        <Typography color="error">Error loading data. Please try again later.</Typography>
      </Box>
    );
  }

  if (Object.keys(heatmapData).length === 0 || uniqueRegions.length === 0) {
    return (
      <Box width="100%" height="100%" minHeight="80vh" display="flex" justifyContent="center" alignItems="center">
        <Typography>No data available for the heatmap.</Typography>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box m="1.5rem 2.5rem">
        <Box position="sticky" top={0} zIndex={1} backgroundColor={theme.palette.background.default} pb={2}>
          <FlexBetween>
            <Header title="LIKELIHOOD HEATMAP" subtitle="Likelihood of insights across sectors and regions" />
            <Box>
              <IconButton onClick={handleZoomOut}><ZoomOutIcon /></IconButton>
              <IconButton onClick={handleZoomIn}><ZoomInIcon /></IconButton>
              <IconButton onClick={(e) => setFilterAnchorEl(e.currentTarget)}><FilterListIcon /></IconButton>
            </Box>
          </FlexBetween>
        </Box>

        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={() => setFilterAnchorEl(null)}
        >
          <MenuItem>
            <TextField
              label="Filter Sectors"
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              variant="outlined"
              size="small"
            />
          </MenuItem>
          <MenuItem>
            <TextField
              label="Filter Regions"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              variant="outlined"
              size="small"
            />
          </MenuItem>
        </Menu>

        <Box mt="40px" height="calc(100vh - 200px)" overflow="auto">
          <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
            <Table stickyHeader aria-label="likelihood heatmap" style={{ minWidth: '1200px', transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ padding: '8px' }}>Sector / Region</TableCell>
                  {uniqueRegions.map((region) => (
                    <TableCell key={region} style={{ padding: '8px' }}>{region}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(filteredHeatmapData).map(([sector, regions]) => (
                  <TableRow key={sector}>
                    <TableCell component="th" scope="row" style={{ padding: '8px' }}>{sector}</TableCell>
                    {uniqueRegions.map((region) => (
                      <motion.td
                        key={`${sector}-${region}`}
                        style={{
                          backgroundColor: getColor(regions[region] || 0),
                          color: (regions[region] || 0) > 0.5 ? 'white' : 'black',
                          padding: '8px',
                          cursor: 'pointer'
                        }}
                        whileHover={{ scale: 1.1 }}
                        onHoverStart={() => setHoveredCell({ sector, region, value: regions[region] })}
                        onHoverEnd={() => setHoveredCell(null)}
                      >
                        {regions[region] ? regions[region].toFixed(2) : '-'}
                      </motion.td>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <AnimatePresence>
        {hoveredCell && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              backgroundColor: theme.palette.background.paper,
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }}
          >
            <Typography variant="h6">{hoveredCell.sector}</Typography>
            <Typography variant="body1">Region: {hoveredCell.region}</Typography>
            <Typography variant="body1">Likelihood: {hoveredCell.value ? hoveredCell.value.toFixed(2) : 'N/A'}</Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default LikelihoodHeatmap;