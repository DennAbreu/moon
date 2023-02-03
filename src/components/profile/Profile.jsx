import { useSelector } from "react-redux";
import { AccordionSummary, Container, Stack, Typography } from "@mui/material";
import {
  BankAccordionDetails,
  BankEditCategory,
  CurrencyText,
  EditBankAccordion,
  FlexStack,
  StyledAccordion,
  StyledAccordionMobile,
  TextCentered,
} from "../../util/CustomComponents";
import BankDBStats from "./BankDBStats";
import StockListDisplay from "./StockListDisplay";
import SharesPieChart from "./charts/SharesPieChart";
import InvPieChart from "./charts/InvPieChart";
import ComparisonChart from "./charts/ComparisonChart";
import SharesLineGraph from "./charts/SharesLineGraph";
import { useEffect, useState } from "react";
import {
  modifyStockList,
  retTotalValue,
  testStockArray,
} from "../../util/helperUtil";
import EditBank from "./EditBank";

const Profile = (props) => {
  const profName = useSelector((state) => state.prof.name);
  const profID = useSelector((state) => state.prof.userID);
  const stockList = useSelector((state) => state.prof.stockList);
  var modifiedList = modifyStockList(testStockArray);

  const totalStockListValue = retTotalValue(modifiedList);

  console.log(
    "🚀 ~ file: Profile.jsx:19 ~ totalStockListValue",
    totalStockListValue
  );

  return (
    <>
      <Container maxWidth="100%">
        <BankDBStats totalStockValue={totalStockListValue} />
        <FlexStack sx={{ mt: "1rem" }} direction={"row"} spacing={2}>
          <StockListDisplay stockList={modifiedList} />
          <FlexStack direction={"column"} spacing={1}>
            <FlexStack direction={"row"} spacing={2}>
              <SharesPieChart />
              <InvPieChart />
            </FlexStack>
            <ComparisonChart />
          </FlexStack>
          {/* <SharesLineGraph /> */}
        </FlexStack>
      </Container>
    </>
  );
};

export default Profile;
