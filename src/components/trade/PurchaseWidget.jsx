import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
// import { apiKey } from "../util/helperUtil";
import { styled } from "@mui/system";
import { FormBox } from "../../util/CommonComponents";

const PurchaseWidget = (props) => {
  const theme = useTheme();

  const StyledAccordion = styled(Accordion)({
    background: theme.palette.greenColor.main,
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    width: "70%",
    borderRadius: 5,
  });

  const StyledDetails = styled(AccordionDetails)({
    background: theme.palette.offWhiteColor.main,
  });

  return (
    <StyledAccordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography color="blueColor.main" variant="h7">
          Click For Bank Stats
        </Typography>
      </AccordionSummary>
      <StyledDetails>Owned: 10</StyledDetails>
    </StyledAccordion>
  );
};

export default PurchaseWidget;
