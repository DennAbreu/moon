import {
  Accordion,
  AccordionDetails,
  Box,
  Button,
  Container,
  Fab,
  Paper,
  Stack,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { styled } from "@mui/system";

const blueColor = "#03314b";
const greenColor = "#1dcc98";
const offWhiteColor = "#F7FFF7";

//---------------------Trade---------------------
//----------------------------------------------
export const TradeStack = styled(Stack)({
  marginTop: "0.5rem",
  width: "auto",
  height: "100%",
});

export const DetailStack = styled(Stack)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const BuyMenuStack = styled(Stack)({
  mt: "0.5rem",
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid black",
});

export const PurchaseWidgetContainer = styled(Paper)({
  background: blueColor,
  border: "0.25px solid black",
  width: "24rem",
  minWidth: "20rem",
  borderRadius: 5,
});

export const PurchaseGrid = styled(Grid)({
  // background: "yellow",
  display: "flex",
  paddingTop: "0.5rem",
  paddingLeft: "0.5rem",
  justifyContent: "flex-start",
  maxWidth: "100%",
});

export const FabStyled = styled(Fab)({
  backgroundColor: greenColor,
  color: "white",
  "&:hover": {
    backgroundColor: blueColor,
    color: "green",
  },
});

export const TradeGrid = styled(Grid)({
  display: "flex",
  justifyContent: "center",
  justifyItems: "center",
  alignContent: "center",
  alignItems: "center",
  width: "auto",
});

export const TradeGridItem = styled(Grid)({
  display: "flex",
  justifyContent: "center",
});

//---------------------Stack---------------------
//----------------------------------------------

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
  // height: "10%",
  // width: "100%",
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
  maxWidth: "20rem",
  height: "auto",
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
  maxWidth: "fit-content",
  minWidth: "50%",
  width: "auto",
  display: "flex",
  justifyContent: "center",
});

export const HighChartsContainer = styled(Paper)({
  display: "flex",
  justifyContent: "center",
  width: "auto",
  maxWidth: "50rem",
  height: "fit-content",
  border: "0.25px solid black",
});
export const GraphContainer = styled(Paper)({
  maxWidth: "auto",
  width: "auto",
  height: "fit-content",
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

export const ErrorMessage = styled(Container)({
  marginTop: "1.5rem",
  display: "flex",
  width: "fit-content",
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

export const TextLabel = styled(Typography)({
  color: "White",
  fontSize: "1.1em",
});

export const CurrencyText = styled(Typography)({
  color: greenColor,
  fontSize: "1.1em",
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
