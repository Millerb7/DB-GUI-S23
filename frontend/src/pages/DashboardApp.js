// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { Home } from './Home';

// ----------------------------------------------------------------------

export default function DashboardApp() {

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <br/>
          <Home />
        </Box>
      </Container>
    </Page>
  );
}
