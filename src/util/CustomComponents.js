import {
  Accordion,
  AccordionDetails,
  Box,
  Button,
  Fab,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const blueColor = "#03314b";
const greenColor = "#1dcc98";
const offWhiteColor = "#F7FFF7";

export const FormBox = styled(Box)({
  borderRadius: 15,
  marginTop: "5rem",
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "50%",
  padding: "0px 15px 15px 15px",
});

export const ButtonStyled = styled(Button)({
  backgroundColor: "#1dcc98",
  color: "white",
  "&:hover": {
    backgroundColor: offWhiteColor,
    color: greenColor,
  },
});

export const ButtonStyled2 = styled(Button)({
  backgroundColor: greenColor,
  color: "white",
  fontSize: "1.5em",
  "&:hover": {
    backgroundColor: blueColor,
    color: "white",
  },
});

export const FabStyled = styled(Fab)({
  backgroundColor: greenColor,
  color: "white",
  "&:hover": {
    backgroundColor: "blueColor",
    color: "green",
  },
});

export const AvatarBox = styled(Stack)({
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
});

export const BlueTextLabel = styled(Typography)({
  color: blueColor,
  fontSize: "1.2em",
});

export const CurrencyText = styled(Typography)({
  color: greenColor,
  fontSize: "1.2em",
  fontWeight: "bold",
});

export const StyledAccordion = styled(Accordion)({
  background: blueColor,
  marginTop: "0.5rem",
  marginBottom: "0.5rem",
  width: "60%",
  borderRadius: 5,
});

export const StyledAccordionMobile = styled(Accordion)({
  background: blueColor,
  marginTop: "0.5rem",
  marginBottom: "0.5rem",
  width: "80%",
  borderRadius: 5,
});

export const StyledDetails = styled(AccordionDetails)({
  background: offWhiteColor,
});
