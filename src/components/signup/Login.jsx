import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import Checkbox from "@mui/material/Checkbox";
import { AvatarBox, ButtonStyled, FormBox } from "../../util/CustomComponents";
import { logInFB, retUserID } from "../../firebase/authHandler";
import { authLogIn } from "../../features/auth/authSlice";
import { profUpdateUser } from "../../features/profile/profSlice";
import { retUserInfo, retName } from "../../firebase/dbHandler";

const Login = () => {
  const theme = useTheme();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const label = { inputProps: { "aria-label": "controlled" } };
  const checkHandler = (event) => {
    setChecked(event.target.checked);
  };

  const ForgotPassword = (
    <Box
      sx={{
        marginBottom: "-1.5rem",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Typography variant="h7">Forgot Password?</Typography>
    </Box>
  );

  const checkBox = (
    <Checkbox
      {...label}
      checked={checked}
      onChange={checkHandler}
      color="greenColor"
      text="test"
    />
  );

  const loginHandler = async () => {
    var currUserId;
    try {
      //Firebase Authentication
      await logInFB(emailRef.current.value, passwordRef.current.value);
      //Redux Auth Store Set.
      dispatch(authLogIn());
      //Uses userID to populate Redux Profile Store
      dispatch(profUpdateUser(retUserID()));
      //Navigates to profile
      navigate("/profile");
    } catch {
      setErrorMsg("Error Logging In!");
    }
  };

  const testClickHandler = async () => {
    const tEmail = "test620@gmail.com";
    const tPw = 123123;
    var currUserId, currUserDetails;
    try {
      //Firebase Authentication
      await logInFB(tEmail, tPw);
      //Redux Auth Store Set.
      dispatch(await authLogIn());
      //Uses userID to populate Redux Profile Store
      currUserId = await retUserID();
      console.log("CurrUserID", currUserId);
      currUserDetails = await retUserInfo(currUserId);
      console.log("currUserDetails", currUserDetails);
      dispatch(profUpdateUser(currUserDetails));
      //Navigates to profile

      navigate("/profile");
    } catch {
      setErrorMsg("Error Logging In!");
    }
  };
  return (
    <Container maxWidth="lg">
      <FormBox
        sx={{ background: theme.palette.offWhiteColor.main, boxShadow: 3 }}
      >
        <AvatarBox>
          <Avatar
            sx={{
              m: 1,
              color: "offWhiteColor.main",
              bgcolor: "greenColor.main",
            }}
          >
            <LockIcon />
          </Avatar>
          <Typography variant="h5" color="blueColor.main">
            Login
          </Typography>
        </AvatarBox>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="email"
              id="email"
              label="Email"
              required
              fullWidth
              autoFocus
              inputRef={emailRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              type="password"
              id="password"
              label="Password"
              required
              fullWidth
              inputRef={passwordRef}
            />
          </Grid>
          <Grid item xs={12}>
            {ForgotPassword}
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel label="Remember me.." control={checkBox} />
          </Grid>

          <Grid item xs={12}>
            <ButtonStyled
              sx={{ fontSize: "1.1rem", width: "100%" }}
              variant="contained"
              onClick={loginHandler}
            >
              Login
              <LoginIcon sx={{ marginLeft: "0.5rem" }} />
            </ButtonStyled>
            <ButtonStyled
              sx={{
                mt: "1rem",
                background: "red",
                fontSize: "1.1rem",
                width: "100%",
              }}
              variant="contained"
              onClick={testClickHandler}
            >
              Test
              <LoginIcon sx={{ marginLeft: "0.5rem" }} />
            </ButtonStyled>
            <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
              <Typography variant="h6" color="red">
                {errorMsg}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </FormBox>
    </Container>
  );
};

export default Login;
