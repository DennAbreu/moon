import { useRef, useState } from "react";
import { AccordionSummary, TextField } from "@mui/material";
import {
  BankAccordionDetails,
  EditBankAccordion,
  EditBankText,
} from "../../util/CustomComponents";
import EditIcon from "@mui/icons-material/Edit";
import { ExpandMore } from "@mui/icons-material";
const EditBank = (props) => {
  const [expanded, setExpanded] = useState(false);
  const bankAmountRef = useRef();

  const expansionHandler = () => {
    setExpanded(!expanded);
  };

  /*
    TODO: Form 
            -Bank Amount: Text Field to update waht bank amount should be.
                --No FAB Buttons. User inputs amount.
            -Submit Button: To submit new bank amount to Database.
                --Updates DB Amounts and Redux store similar to when 
                buying/selling stock
            -Cancel Button: Closes widget (sets expanded to !expanded)
  */

  return (
    <EditBankAccordion expanded={expanded} onChange={expansionHandler}>
      <AccordionSummary>
        <EditBankText>
          EDIT BANK
          <EditIcon sx={{ height: "1rem", color: "white" }} />
        </EditBankText>
      </AccordionSummary>
      <BankAccordionDetails>
        <TextField
          name="bankamount"
          id="bankamount"
          label="Enter New Bank Amount"
          required
          autoFocus
          inputRef={bankAmountRef}
        />
      </BankAccordionDetails>
    </EditBankAccordion>
  );
};

export default EditBank;
