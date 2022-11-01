import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { AvatarBox, StyledBtn, FormBox } from "../../util/CommonComponents";
import { validationSchema } from "../../util/ValidationSchema";
import { signUpFB } from "../../firebase/firebase-config";
import { authLogIn } from "../../features/auth/authSlice";

const SignUp = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const signUpHandler = async (data) => {
    //Firebase authentification
    //Sets auth status  in Redux auth slice.
    //useNavigate hook to go to Profile page upon successful signup.
    try {
      await signUpFB(data.email, data.password);
      dispatch(authLogIn());
      navigate("/profile");
    } catch {
      console.log("Error in the SignupFB Function");
    }
    /*TODO:
      newUserBankSetup(userID/email);
      setup table in other database using auth.id as key
    */
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
            <StyledBtn
              component={Link}
              to={"/profile"}
              sx={{ fontSize: "1.1rem", width: "100%" }}
              variant="contained"
              onClick={handleSubmit(signUpHandler)}
            >
              Sign Up
            </StyledBtn>
          </Grid>
        </Grid>
      </FormBox>
    </Container>
  );
};

export default SignUp;
