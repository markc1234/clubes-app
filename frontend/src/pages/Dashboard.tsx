import React from "react";
import Container from '@mui/material/Container';
import Drawer from "../components/Drawer";
import { StyledEngineProvider } from "@mui/material/styles";

const Dashboard = () => {
  return (
    <React.Fragment>
      <Container>
        <StyledEngineProvider injectFirst>
          <Drawer />
        </StyledEngineProvider>
      </Container>
    </React.Fragment>
  )
};

export default Dashboard;
