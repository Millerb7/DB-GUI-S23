import { Link as RouterLink } from "react-router-dom";
import { Card, Stack, Link, Container, Typography, Box } from "@mui/material";
import { LoginForm } from "../sections/authentication/LoginForm";
import Logo from "src/components/Logo";

export default function Login() {
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
          Don’t have an account? &nbsp;
          <Link
            underline="none"
            variant="subtitle2"
            component={RouterLink}
            to="/register"
          >
            Get started
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

          <LoginForm />

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
              display: { sm: "none" },
            }}
          >
            Don’t have an account?&nbsp;
            <Link
              variant="subtitle2"
              component={RouterLink}
              to="register"
              underline="hover"
            >
              Get started
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
