import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import DrawerSpacer from "./components/Navigation/DrawerSpacer";
import MortgageCalculator from "./pages/MortgageCalculator/View";
import BudgetAnalyser from "./pages/BudgetAnalyser/View";
// import Item from "./pages/Item";

import { Box, Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from "./themes";

export default function MiniDrawer() {
  return (
    <ThemeProvider theme={baseTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navigation />
        <Container maxWidth="md" sx={{ paddingTop: 4 }}>
          <DrawerSpacer />
          <Routes>
            <Route path="/" element={<MortgageCalculator />} />
            <Route path="/budget" element={<BudgetAnalyser />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
