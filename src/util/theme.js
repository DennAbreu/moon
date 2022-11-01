import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    blueColor: {
      main: "#03314b",
    },
    greenColor: {
      main: "#1dcc98",
    },
    salmonColor: {
      main: "#f6bcae",
    },
    greyColor: {
      main: "#D9D9D9",
    },
    darkGreyColor: {
      main: "#bdced4",
    },
    culturedColor: {
      main: "#EFF1F3",
    },
    tealColor: {
      main: "#4E878C",
    },
    offWhiteColor: {
      main: "#F7FFF7",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 700, //Default: 600.
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
