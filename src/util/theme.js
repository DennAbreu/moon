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
      xs: 450,
      sm: 600, //Default: 600.
      md800: 800,
      md: 1000,
      lg1400: 1400,
      lg: 1600,
      xl: 1800,
    },
  },
});
