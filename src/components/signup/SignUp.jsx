import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Avatar,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { AvatarBox, ButtonStyled, FormBox } from "../../util/CustomComponents";
import { validationSchema } from "../../util/ValidationSchema";
import { retUserID, signUpFB } from "../../firebase/authHandler";
import { addNewUserDB, retTotalDBStockList } from "../../firebase/dbHandler";
import { authLogIn } from "../../features/auth/authSlice";
import { profSetNewUser } from "../../features/profile/profSlice";

const SignUp = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  //form error handling with yupResolver and useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const signUpHandler = async (data) => {
    var newUserId;
    var currList;
    //useNavigate hook to go to Profile page upon successful signup.
    try {
      //Firebase authentification
      await signUpFB(data.email, data.password);
      //Sets auth status in Auth redux store
      dispatch(await authLogIn());
      //Creates new user in banking database
      newUserId = retUserID();
      await addNewUserDB(newUserId, data.name, data.email);
      currList = retTotalDBStockList(newUserId);
      //sets data in Profile redux store
      dispatch(
        await profSetNewUser({
          name: data.name,
          id: newUserId,
          stockList: currList,
        })
      );
      //navigates to profile.
      navigate("/profile");
    } catch {
      setErrorMsg("Error Signing Up!");
    }
  };

  const testClickHandler = async (data) => {
    console.log("Test Button Clicked");
    var rNum = Math.floor(Math.random() * 100);
    var tEmail = `test${rNum}@gmail.com`;
    var tPw = 123123;
    var tName = "Testy";
    var payLoadObj = {};

    try {
      await signUpFB(tEmail, tPw);
      var newUserId = retUserID();
      await addNewUserDB(newUserId, tName, tEmail);
      dispatch(await authLogIn());
      payLoadObj = { name: `Test${rNum}`, id: newUserId };
      dispatch(await profSetNewUser(payLoadObj));
      navigate("/profile");
    } catch {
      setErrorMsg("Error Signing Up!");
    }
  };

  const sameUserHandler = async (data) => {
    var tEmail = `test620@gmail.com`;
    var tPw = 123123;
    var tName = "Test User";

    try {
      await signUpFB(tEmail, tPw);
      var newUserId = retUserID();
      await addNewUserDB(newUserId, tName, tEmail);
      var currList = retTotalDBStockList(newUserId);
      dispatch(
        await profSetNewUser({
          name: tName,
          id: newUserId,
          stockList: currList,
        })
      );
      dispatch(await authLogIn());
      navigate("/profile");
    } catch {
      setErrorMsg("Error Signing Up!");
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
            Sign Up
          </Typography>
        </AvatarBox>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="name"
              name="name"
              label="Name"
              required
              fullWidth
              autoFocus
              {...register("name")}
              error={errors.name ? true : false}
            />
            <Typography variant="inherit" color="alert">
              {errors.name?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              name="email"
              label="Email"
              required
              fullWidth
              {...register("email")}
              error={errors.email ? true : false}
            />
            <Typography variant="inherit" color="alert">
              {errors.email?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="confirmEmail"
              name="confirmEmail"
              label="Confirm Email"
              required
              fullWidth
              {...register("confirmEmail")}
              error={errors.confirmEmail ? true : false}
            />
            <Typography variant="inherit" color="alert">
              {errors.confirmEmail?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              required
              fullWidth
              {...register("password")}
              error={errors.password ? true : false}
            />
            <Typography variant="inherit" color="alert">
              {errors.password?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="confirmPassowrd"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              required
              fullWidth
              {...register("confirmPassword")}
              error={errors.confirmPassword ? true : false}
            />
            <Typography variant="inherit" color="alert">
              {errors.confirmPassword?.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ButtonStyled
              component={Link}
              to={"/profile"}
              sx={{ fontSize: "1.1rem", width: "100%" }}
              variant="contained"
              onClick={handleSubmit(signUpHandler)}
            >
              Sign Up
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
              TEST
            </ButtonStyled>
            <ButtonStyled
              sx={{
                mt: "1rem",
                background: "Yellow",
                color: "black",
                fontSize: "1.1rem",
                width: "100%",
              }}
              variant="contained"
              onClick={sameUserHandler}
            >
              SameUser
            </ButtonStyled>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: "0.1rem" }}
            >
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

export default SignUp;
