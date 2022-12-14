import {
  Accordion,
  AccordionDetails,
  Box,
  Button,
  Fab,
  Paper,
  Stack,
  TableRow,
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
  marginTop: "1rem",
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
  marginTop: "0.15rem",
  marginBottom: "0.5rem",
  width: "60%",
  borderRadius: 5,
});

export const StyledAccordionMobile = styled(Accordion)({
  background: blueColor,
  marginTop: "0.15rem",
  marginBottom: "0.5rem",
  width: "80%",
  borderRadius: 5,
});

export const StyledDetails = styled(AccordionDetails)({
  background: offWhiteColor,
});

export const SnapShotBox = styled(Paper)({
  width: "auto",
  height: "fit-content",
  padding: "0.5rem 1rem 0.5rem 0.5rem",
  borderRadius: 15,
  background: blueColor,
});

export const CenteredBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

export const ProfileCategory = styled(Paper)({
  display: "flex",
  justifyContent: "center",
  width: "15rem",
  height: "fit-content",
  padding: "0.5rem 1rem 0.5rem 0.5rem",
  borderRadius: 15,
  background: blueColor,
});

export const TextCentered = styled(Typography)({
  display: "flex",
  justifyContent: "center",
});

export const TableRowStyled = styled(TableRow)({
  cursor: "pointer",
});

export const PieChartContainer = styled(Paper)({
  background: "white",
  height: "100%",
  width: "fit-content",
  display: "flex",
  justifyContent: "center",
});

export const FlexStack = styled(Stack)({
  display: "flex",
  justifyContent: "center",
});

export const PieGraphLabel = styled(Box)({
  background: blueColor,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "2.2rem",
  borderRadius: "65",
  color: "white",
});

export const GraphContainer = styled(Paper)({
  width: "100%",
  height: "100%",
  marginLeft: "0em",
  marginTop: "0rem",
});
