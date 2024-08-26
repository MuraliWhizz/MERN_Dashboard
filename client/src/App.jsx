import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { themeSettings } from "./theme";
import Layout from "./scenes/Layout";
import Dashboard from "./scenes/Dashboard";
import EnergyInsights from "./scenes/EnergyInsights";
import Geography from "./scenes/Geography";
import Overview from "./components/OverviewChart";
import PestleFactorDistribution from "./scenes/PestleFactorDistribution";
import Breakdown from "./scenes/Breakdown";
import SourceInsight from "./scenes/SourcewiseInsights.jsx";
import LikelihoodHeatmap from "./scenes/LikelihoodHeatmap.jsx";
import InsightCorrelationHeatmap from "./scenes/InsightCorrelationHeatmap.jsx";
import TimeSeriesAnalysis from "./scenes/TimeSeriesAnalysis.jsx";
import RegressionDashboard from "./scenes/RegressionDashboard.jsx";
import  EnergyProductionTrends from "./scenes/EnergyProductionTrends.jsx";
import  IndustryImpact from "./scenes/IndustryImpact.jsx";
import  RegionalFocus from "./scenes/RegionalFocus.jsx";
import  StablePetroleumConsumption from "./scenes/StablePetroleumConsumption.jsx";
import  RecoveryOfCrudeOilProduction from "./scenes/RecoveryOfCrudeOilProduction.jsx";
import  TopicInsights from "./scenes/TopicInsights.jsx";
import NaturalGasConsumption from "./scenes/NaturalGasConsumption.jsx";
import Monthly from "./scenes/Monthly";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/energy" element={<EnergyInsights />} />
      <Route path="/geography" element={<Geography />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/breakdown" element={<Breakdown />} />
      <Route path="/pestle-analysis" element={<PestleFactorDistribution />} />
      <Route path="/source" element={<SourceInsight/>} />
      <Route path="/likelihood" element={<LikelihoodHeatmap/>} />
      <Route path="/correlation" element={<InsightCorrelationHeatmap/>} />
      <Route path="/time-series" element={<TimeSeriesAnalysis/>} />
      <Route path="/regression" element={<RegressionDashboard/>} />
      <Route path="/energy-production" element={<EnergyProductionTrends/>} />
      <Route path="/industry-impact" element={<IndustryImpact/>} />
      <Route path="/regional-focus" element={<RegionalFocus/>} />
      <Route path="/petroleum-consumption" element={<StablePetroleumConsumption/>} />
      <Route path="/crude-oil-production" element={<RecoveryOfCrudeOilProduction/>} />
      <Route path="/topic" element={<TopicInsights/>} />
      <Route path="/monthly" element={<Monthly/>} />
      <Route path="/natural-gas" element={<NaturalGasConsumption />} />
    </Route>
  )
);

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
