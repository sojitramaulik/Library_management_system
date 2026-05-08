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
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import axios,{ AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { styled } from "@mui/material/styles";

import AppTheme from "../../material/customization/AppTheme.tsx";
import ColorModeSelect from "../../material/customization/ColorModeSelect.tsx";


const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",

  width: "100%",
  maxWidth: "500px",

  padding: theme.spacing(4),

  gap: theme.spacing(2),

  margin: "auto",

  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",

  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",

  overflowY: "auto",

  padding: theme.spacing(2),

  justifyContent: "center",
  alignItems: "center",

  position: "relative",

  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },

  "&::before": {
    content: '""',

    position: "absolute",

    inset: 0,

    zIndex: -1,

    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",

    backgroundRepeat: "no-repeat",

    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

interface SignUpProps {
  disableCustomTheme?: boolean;
}

export default function SignUp(props: SignUpProps) {

  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = React.useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    password: "",
    image: "",
  });

  const validateInputs = () => {
    const firstName = document.getElementById("firstName") as HTMLInputElement;

    const lastName = document.getElementById("lastName") as HTMLInputElement;

    const phoneNo = document.getElementById("phoneNo") as HTMLInputElement;

    const email = document.getElementById("email") as HTMLInputElement;

    const password = document.getElementById("password") as HTMLInputElement;

    const image = document.getElementById("image") as HTMLInputElement;

    interface FormErrors {
      firstName: string;
      lastName: string;
      phoneNo: string;
      email: string;
      password: string;
      image: string;
    }

    const newErrors: FormErrors = {
      firstName: "",
      lastName: "",
      phoneNo: "",
      email: "",
      password: "",
      image: "",
    };

    let isValid = true;

    // First Name
    if (!firstName.value.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    // Last Name
    if (!lastName.value.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    // Phone Number
    if (!phoneNo.value || !/^[0-9]{10}$/.test(phoneNo.value)) {
      newErrors.phoneNo = "Enter valid 10 digit phone number";
      isValid = false;
    }

    // Email
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password
    if (!password.value || password.value.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Image
    if (!image.files || image.files.length === 0) {
      newErrors.image = "Please upload an image";
      isValid = false;
    } else {
      
      const file = image.files[0];
      
      const maxSize = 500 * 1024; // 500KB

      if (file.size > maxSize) {
        newErrors.image = "Image size must be less than 500KB";
        isValid = false;
      }
 
    }

    setErrors(newErrors);

    return isValid;
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    
    const isValid = validateInputs();
    if (!isValid) return;
    
    setLoading(true);


    try {

      
      const data = new FormData(event.currentTarget);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log( response.data);

      alert("Signup Successful");

      formRef.current?.reset();

      setErrors({
        firstName: "",
        lastName: "",
        phoneNo: "",
        email: "",
        password: "",
        image: "",
      });

      navigate("/auth/signin");
      

    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      alert(err.response?.data?.message || "Something went wrong");

      //formRef.current?.reset();


    } finally {
      setLoading(false);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <ColorModeSelect
        sx={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
        }}
      />

      <SignUpContainer direction="column">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              textAlign: "center",
              mb: 2,
            }}
          >
            Sign Up
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            ref={formRef}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* First Name */}
            <FormControl>
              <FormLabel htmlFor="firstName">First Name</FormLabel>

              <TextField
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                fullWidth
                required
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </FormControl>

            {/* Last Name */}
            <FormControl>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>

              <TextField
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                fullWidth
                required
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </FormControl>

            {/* Phone Number */}
            <FormControl>
              <FormLabel htmlFor="phoneNo">Phone Number</FormLabel>

              <TextField
                id="phoneNo"
                name="phoneNo"
                placeholder="Enter phone number"
                fullWidth
                required
                error={!!errors.phoneNo}
                helperText={errors.phoneNo}
              />
            </FormControl>

            {/* Email */}
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>

              <TextField
                id="email"
                name="email"
                placeholder="your@email.com"
                fullWidth
                required
                error={!!errors.email}
                helperText={errors.email}
              />
            </FormControl>

            {/* Password */}
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>

              <TextField
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                autoComplete="newPassword"
                fullWidth
                required
                error={!!errors.password}
                helperText={errors.password}
              />
            </FormControl>

            {/* Image Upload */}
            <FormControl>
              <FormLabel htmlFor="image">Upload Image</FormLabel>

              <TextField
                id="image"
                name="image"
                type="file"
                fullWidth
                required
                error={!!errors.image}
                helperText={errors.image}
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I agree to receive updates"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              size="large"
            >
              {loading ? "Submitting..." : "Sign up"}
            </Button>
          </Box>

          <Divider sx={{ my: 2 }}>
            <Typography
              sx={{
                color: "text.secondary",
              }}
            >
              OR
            </Typography>
          </Divider>

          <Typography
            sx={{
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <Link href="/auth/signin" variant="body2">
              Sign In
            </Link>
          </Typography>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
