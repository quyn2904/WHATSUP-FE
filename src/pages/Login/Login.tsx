import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { ForgotPassword } from "./components";
import { GoogleIcon, FacebookIcon, TextFieldControl } from "../../components";
import { useForm } from "react-hook-form";
import { authApi, LoginRequestType } from "../../apis";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  isAxiosUnprocessableEntityError,
  isAxiosBadRequestError
} from "../../utils/error";
import ERROR_CONSTANTS from "../../constants/error";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px"
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px"
  })
}));

const LoginContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4)
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))"
    })
  }
}));

const Login = () => {
  const { register, formState, getValues, setError, clearErrors } =
    useForm<LoginRequestType>({
      criteriaMode: "all"
    });
  const [open, setOpen] = React.useState(false);

  const handleClickOpenForgotPassword = () => {
    setOpen(true);
  };

  const handleCloseForgotPassword = () => {
    setOpen(false);
  };

  const handleLogin = useMutation({
    mutationFn: (data: LoginRequestType) => authApi.login(data)
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
    handleLogin.mutate(
      { ...getValues() },
      {
        onSuccess: () => {
          toast.success("Login successfully");
        },
        onError: (error) => {
          if (isAxiosUnprocessableEntityError<LoginRequestType>(error)) {
            const formError = error.response?.data.details;
            formError?.forEach((err) => {
              setError(err.property, {
                message: err.message
              });
            });
          } else if (isAxiosBadRequestError(error)) {
            const errorCode = error.response?.data.errorCode;
            if (errorCode && ERROR_CONSTANTS[errorCode]) {
              toast.error(ERROR_CONSTANTS[errorCode]["en"]);
            } else {
              toast.error("Unknown error code");
            }
          } else {
            toast.error("Something went wrong, please try again later");
          }
        }
      }
    );
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <LoginContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextFieldControl<LoginRequestType>
                register={register}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                error={formState.errors.email}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextFieldControl
                register={register}
                error={formState.errors.password}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword
              open={open}
              handleClose={handleCloseForgotPassword}
            />
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpenForgotPassword}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </LoginContainer>
    </>
  );
};

export default Login;
