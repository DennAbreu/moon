import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MoonLogo from "../../assets/MoonLogo.png";
import NavHamburgerMenu from "./NavHamburgerMenu";
import {
  AppBar,
  Box,
  Button,
  Stack,
  styled,
  Toolbar,
  useTheme,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ButtonStyled } from "../../util/CustomComponents";
import { logOutFB } from "../../firebase/authHandler";
import { authLogOut } from "../../features/auth/authSlice";
import { profResetStore } from "../../features/profile/profSlice";

const Navbar = () => {
  const linkFontSize = "1.2rem";
  const userLoginSize = "1.1rem";
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md800"));

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.authStatus);

  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-evenly",
    backgroundColor: theme.palette.blueColor.main,
  });

  const ImageBox = styled(Box)({
    display: { small: "none", lg: "flex" },
    justifyContent: "left",
    width: "5%",
  });

  const PageLinkStack = styled(Stack)({
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    gap: "2rem",
  });

  const PageLinkButtons = styled(Button)({
    color: "white",
    fontSize: linkFontSize,
    "&:hover": {
      color: theme.palette.greenColor.main,
    },
  });

  const UserSignInStack = styled(Stack)({
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    gap: "1.5rem",
  });

  const logOutHandler = async () => {
    try {
      await logOutFB();
      dispatch(authLogOut());
      dispatch(profResetStore());
    } catch {
      console.log("Error!");
    }
  };

  const noUserSignIn = (
    <>
      <ButtonStyled
        component={Link}
        to={"/signup"}
        sx={{ fontSize: userLoginSize }}
        variant="contained"
      >
        Sign Up
      </ButtonStyled>
      <ButtonStyled
        component={Link}
        to={"/login"}
        sx={{ fontSize: userLoginSize }}
        variant="contained"
      >
        Log In
      </ButtonStyled>
    </>
  );

  const logOutBtn = (
    <ButtonStyled
      component={Link}
      to={"/login"}
      sx={{ fontSize: userLoginSize }}
      variant="contained"
      onClick={logOutHandler}
    >
      Log Out
    </ButtonStyled>
  );

  return (
    <nav>
      <AppBar position="static" sx={{ marginBottom: "2rem" }}>
        <StyledToolbar>
          {isMatch ? (
            <>
              <NavHamburgerMenu />
            </>
          ) : (
            <>
              <ImageBox>
                <img src={MoonLogo} width="200%" height="50%" alt="Moon logo" />
              </ImageBox>
              <PageLinkStack>
                <PageLinkButtons component={Link} to={"/"}>
                  Home
                </PageLinkButtons>
                <PageLinkButtons component={Link} to={"/trade"}>
                  Trade
                </PageLinkButtons>
                <PageLinkButtons component={Link} to={"/profile"}>
                  Profile
                </PageLinkButtons>
              </PageLinkStack>
              <UserSignInStack>
                {isLoggedIn ? logOutBtn : noUserSignIn}
              </UserSignInStack>
            </>
          )}
        </StyledToolbar>
      </AppBar>
    </nav>
  );
};

export default Navbar;
