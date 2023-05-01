import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
// api
import { sendLogin } from "../../api/user";

// ----------------------------------------------------------------------

export const LoginForm = () => {
  const routerNavigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      // login api call, should return a user if valid, a string if false
      console.log("tee hee");
      sendLogin(email, password).then((res) => {
        if (res !== "invalid login attempt") {
          console.log("logged in: " + res);
          sessionStorage.setItem("userId", res.user_id);
          routerNavigate("/dashboard", { replace: true });
        } else {
          alert("invalid login credential please try again");
        }
      });
      setIsSubmitting(false);
      setEmail("");
      setPassword("");
    }
  }, [errors, isSubmitting, routerNavigate, email, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    setIsSubmitting(true);
  };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          autoComplete="username"
          type="email"
          label="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? "text" : "password"}
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <Icon
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
      </Stack>

      <LoadingButton
        sx={{ mt: 3 }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </form>
  );
};
