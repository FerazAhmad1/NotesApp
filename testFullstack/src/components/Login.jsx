/* eslint-disable no-unused-vars */
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRef, useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import SlideTransition from "./SlideTransition";
import useApiHook from "./UseApiHook";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const loginApistate = useApiHook();
  const [snackBar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  // const makeApiRequest = (
  //   url,
  //   method,
  //   headers = {},
  //   data = {},
  //   params = {}
  // ) => {
  //   const response = axios({ url, method, data, headers, params });
  //   return response;
  // };

  const loginHandler = async () => {
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      if (!email || !email.trim()) {
        setSnackbar({
          isOpen: true,
          message: "Email is required!",
          type: "error",
        });
        return;
      }
      if (!password || !password.trim()) {
        setSnackbar({
          isOpen: true,
          message: "Password is required!",
          type: "error",
        });
        return;
      }
      const body = { email, password };

      await loginApistate.fetchData({
        url: "http://localhost:8000/api/v1/auth/login",
        method: "POST",
        data: body,
        params: {},
        headers: {},
      });
      console.log(loginApistate.data, "yyyyyyyyy");
    } catch (error) {
      console;
    }

    // Handle login logic here
  };

  useEffect(() => {
    const { data, error } = loginApistate;

    console.log(data, error);

    if (error) {
      console.log(error);
      setSnackbar({
        isOpen: true,
        message: error.data?.message || error.message || "login Failed",
        type: "error",
      });
      return;
    }

    if (data) {
      const token = JSON.stringify(data.data.token);
      localStorage.setItem("token", token);
      setSnackbar({
        isOpen: true,
        message: "login successFully",
        type: "success",
      });
      navigate("/notes");

      return;
    }
  }, [loginApistate]);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
        p={3}
        sx={{
          maxWidth: 400,
          mx: "auto",
          my: "auto",
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
          paddingTop: 2,
          height: "auto",
          padding: "40px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          size="small"
          inputRef={emailRef}
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          size="small"
          type="password"
          inputRef={passwordRef}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={loginHandler}
        >
          Login
        </Button>
      </Box>
      <Snackbar
        open={snackBar.isOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, isOpen: false }))}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, isOpen: false }))}
          severity={snackBar.type}
          variant="filled"
          sx={{ boxShadow: 3, borderRadius: 1 }}
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
