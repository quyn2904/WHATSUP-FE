import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import {
  GoogleIcon,
  FacebookIcon,
  TextFieldControl,
  Card
} from "../../components";
import { authApi, RegisterRequestType } from "../../apis";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  isAxiosBadRequestError,
  isAxiosUnprocessableEntityError
} from "../../utils/error";
import ERROR_CONSTANTS from "../../constants/error";

const RegisterContainer = styled(Stack)(({ theme }) => ({
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

const Register = () => {
  const nav = useNavigate();
  const { register, formState, getValues, clearErrors, setError } =
    useForm<RegisterRequestType>({
      criteriaMode: "all"
    });

  const handleRegister = useMutation({
    mutationFn: (data: RegisterRequestType) => authApi.register(data)
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
    handleRegister.mutate(
      { ...getValues() },
      {
        onSuccess: () => {
          toast.success("Register successfully, please login");
          nav("/login");
        },
        onError: (error) => {
          if (isAxiosUnprocessableEntityError<RegisterRequestType>(error)) {
            const formError = error.response?.data.details;
            formError?.forEach((err) => {
              setError(err.property, { message: err.message });
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
      <RegisterContainer
        direction="column"
        height={{
          xs: "100vh",
          sm: "calc((1 - var(--template-frame-height, 0)) * 100dvh)"
        }}
        justifyContent="space-between"
      >
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1, sm: 2 }
            }}
          >
            <Grid container size={12} spacing={{ xs: 1, sm: 3 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="first_name">First Name</FormLabel>
                  <TextFieldControl<RegisterRequestType>
                    register={register}
                    size={"small"}
                    id="first_name"
                    name="first_name"
                    placeholder="Joe"
                    autoComplete="firt_name"
                    required
                    fullWidth
                    variant="outlined"
                    error={formState.errors.first_name}
                  />
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="last_name">Last Name</FormLabel>
                  <TextFieldControl<RegisterRequestType>
                    register={register}
                    required
                    size={"small"}
                    fullWidth
                    id="last_name"
                    placeholder="Biden"
                    name="last_name"
                    autoComplete="last_name"
                    variant="outlined"
                    error={formState.errors.last_name}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextFieldControl<RegisterRequestType>
                register={register}
                required
                fullWidth
                id="email"
                size={"small"}
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={formState.errors.email}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextFieldControl<RegisterRequestType>
                register={register}
                required
                fullWidth
                name="password"
                size={"small"}
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={formState.errors.password}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />
            <Button type="submit" fullWidth variant="contained">
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link href="/login" variant="body2" sx={{ alignSelf: "center" }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </RegisterContainer>
    </>
  );
};

export default Register;
