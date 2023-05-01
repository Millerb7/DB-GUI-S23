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
import { createUser, sendLogin } from "../../api/user";

// ----------------------------------------------------------------------

export const RegisterForm = () => {
  const routerNavigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      // registration api call
      createUser({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      });
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
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  }, [
    errors,
    isSubmitting,
    routerNavigate,
    firstName,
    lastName,
    email,
    password,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrors = {};
    const schema = Yup.object().shape({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    });
    schema
      .validate(
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
        { abortEarly: false }
      )
      .then(() => {
        setErrors({});
        setIsSubmitting(true);
      })
      .catch((err) => {
        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      });
  };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          autoComplete="given-name"
          type="text"
          label="First Name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
        />

        <TextField
          fullWidth
          autoComplete="family-name"
          type="text"
          label="Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
        />

        <TextField
          fullWidth
          autoComplete="email"
          type="email"
          label="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />

        <TextField
          fullWidth
          autoComplete="new-password"
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
        Register
      </LoadingButton>
    </form>
  );
};
