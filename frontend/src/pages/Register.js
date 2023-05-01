import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Stack, Link, Container, Typography } from "@mui/material";
import { RegisterForm } from "../sections/authentication/RegisterForm";
import Logo from "src/components/Logo";

export default function Register() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Logo />
        <Box>
        Already have an account? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/login"
        >
          Login
        </Link>
        </Box>
      </Box>

      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to STUDI
            </Typography>
          </Stack>

          <RegisterForm />

        </Box>
      </Container>
    </Box>
  );
}
