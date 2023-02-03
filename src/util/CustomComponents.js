import {
  Accordion,
  AccordionDetails,
  Box,
  Button,
  Fab,
  Grid,
  Paper,
  Stack,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { Pointer } from "highcharts";

const blueColor = "#03314b";
const greenColor = "#1dcc98";
const offWhiteColor = "#F7FFF7";

//---------------------Stack---------------------
//----------------------------------------------

export const TradeStack = styled(Stack)({
  // background: "#f5ad42",
  marginTop: "0.5rem",
  width: "auto",
  height: "200%",
  alignItems: "center",
});

export const DetailStack = styled(Stack)({
  display: "flex",
  width: "fit-content",
  height: "fit-content",
});

export const BuyMenuStack = styled(Stack)({
  mt: "0.5rem",
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid black",
});
export const FlexStack = styled(Stack)({
  display: "flex",
  justifyContent: "center",
});

export const AvatarBox = styled(Stack)({
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
});

//---------------------Box---------------------
//---------------------------------------------

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

export const CenteredBox = styled(Box)({
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

//---------------------Button ---------------------
//------------------------------------------------

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
    backgroundColor: blueColor,
    color: "green",
  },
});

//---------------------Accordion---------------------
//---------------------------------------------------

export const StyledAccordion = styled(Accordion)({
  background: blueColor,
  width: "40%",
  height: "fit-content",
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

export const EditBankAccordion = styled(Accordion)({
  marginTop: "0.5rem",
  background: blueColor,
  width: "10%",
  height: "fit-content",
  borderRadius: 5,
});

export const BankAccordionDetails = styled(AccordionDetails)({
  background: offWhiteColor,
});

//---------------------Paper---------------------
//-----------------------------------------------

export const SnapShotContainer = styled(Paper)({
  width: "auto",
  height: "fit-content",
  padding: "0.5rem 1rem 0.5rem 0.5rem",
  borderRadius: 15,
  background: blueColor,
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

export const BankEditCategory = styled(Paper)({
  display: "flex",
  justifyContent: "center",
  width: "10rem",
  height: "fit-content",
  padding: "0.5rem 1rem 0.5rem 0.5rem",
  borderRadius: 10,
  background: blueColor,
  color: "white",
  cursor: "pointer",
  "&:hover": {
    background: greenColor,
    color: blueColor,
  },
});

export const PieChartContainer = styled(Paper)({
  background: "white",
  height: "100%",
  width: "fit-content",
  display: "flex",
  justifyContent: "center",
});

export const GraphContainer = styled(Paper)({
  maxWidth: "100%",
  height: "100%",
  marginLeft: "0em",
  marginTop: "0rem",
  border: "0.25px solid black",
});

export const TransPriceContaner = styled(Paper)({
  display: "flex",
  fontSize: "1.5em",
  color: "white",
  justifyContent: "center",
  justifyItems: "center",
  alignItems: "center",
  width: "fit-content",
  height: "2rem",
  padding: "0.5rem 1rem 0.5rem 1rem",
  marginTop: "0.5rem",
  marginLeft: "1rem",
  borderRadius: 10,
  background: blueColor,
});

export const ErrorMessage = styled(Paper)({
  marginTop: "0.5rem",
  display: "flex",
  width: "auto",
  justifyContent: "center",
  background: offWhiteColor,
});

//---------------------Text---------------------
//----------------------------------------------

export const TextCentered = styled(Typography)({
  display: "flex",
  justifyContent: "center",
});

export const SharesTextField = styled(TextField)({
  width: "15%",
  borderRadius: "0",
});
export const CurrentTransPriceField = styled(TextField)({
  width: "10%",
  marginLeft: "1rem",
  borderRadius: "0",
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

export const EditBankText = styled(Typography)({
  color: greenColor,
  fontSize: "1em",
  fontWeight: "bold",
});

//---------------------Table---------------------
//-----------------------------------------------

export const TableRowStyled = styled(TableRow)({
  cursor: "pointer",
  background: offWhiteColor,
  "&:hover": {
    background: greenColor,
  },
});

//---------------------Grid---------------------
//----------------------------------------------

export const PurchaseGrid = styled(Grid)({
  display: "flex",
  justifyContent: "center",
});
