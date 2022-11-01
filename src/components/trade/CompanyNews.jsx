import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useTheme,
} from "@mui/material";
// import { apiKey } from "../util/helperUtil";
import { styled } from "@mui/system";

const CompanyNews = (props) => {
  const theme = useTheme();

  const StyledAccordion = styled(Accordion)({
    background: theme.palette.offWhiteColor.main,
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    width: "100%",
  });

  return (
    <StyledAccordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography color="black" variant="h7">
          Recent Company News...
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {props.symbol === undefined
          ? "Please enter a stock symbol in the search bar above!"
          : props.symbol}
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default CompanyNews;
