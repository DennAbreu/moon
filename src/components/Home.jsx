import React from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HomePageImage from "../assets/homepage_stock.jpg";

const Home = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const SignInBtn = styled(Button)({
    backgroundColor: theme.palette.greenColor.main,
    width: "100%",
    color: "white",
    fontSize: "1.2rem",
    "&:hover": {
      backgroundColor: "white",
      color: theme.palette.blueColor.main,
    },
  });

  const LeftSideBox = styled(Box)({
    display: "flex",
    width: "250%",
    justifyContent: "center",
    marginRight: "5rem",
  });

  const LeftSideContent = (
    <div>
      <Typography
        sx={{ display: "flex", justifyContent: "center" }}
        variant="h3"
      >
        TO THE MOON!!
      </Typography>
      <Typography sx={{ marginBottom: "1rem" }}>
        Moon. is a paper-trading app designed to allow beginner investors to
        learn about the stock market without the risk of investing real money.{" "}
        <br />
        You can use real-time market data to build a mock portfolio to see how
        your investments grow over time.
      </Typography>
      <SignInBtn variant="contained" color="greenColor" size="large">
        <Typography variant="h6">Let's Begin!</Typography>
      </SignInBtn>
    </div>
  );

  const RightSideContent = () => {
    return (
      <div>
        <Box sx={{ width: "80%", background: "black" }}>
          <img
            src={HomePageImage}
            width="100%"
            height="auto"
            alt="Stock Graph"
          ></img>
        </Box>
      </div>
    );
  };

  return (
    <Container>
      <Stack sx={{ marginTop: "5rem" }} flexDirection={"row"} flexGrow={2}>
        <LeftSideBox>{LeftSideContent}</LeftSideBox>
        {isMatch ? "" : <RightSideContent />}
      </Stack>
    </Container>
  );
};

export default Home;
