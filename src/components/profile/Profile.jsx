import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import { FlexStack } from "../../util/CustomComponents";
import StockListDisplay from "./StockListDisplay";
import SharesPieChart from "./charts/SharesPieChart";
import InvPieChart from "./charts/InvPieChart";
import ComparisonChart from "./charts/ComparisonChart";
import SharesLineGraph from "./charts/SharesLineGraph";
import BankDBStats from "./BankDBStats";
import EditBank from "./EditBank";
import {
  appendCurrPrice,
  retTotalValue,
  testStockArray,
} from "../../util/helperUtil";
import { fetchCurrentPrice, RealStonks_Options } from "../../util/apiHandler";

const Profile = (props) => {
  const profName = useSelector((state) => state.prof.name);
  const profID = useSelector((state) => state.prof.userID);
  const stockList = useSelector((state) => state.prof.stockList);
  const [isLoading, setIsLoading] = useState(false);
  const [modifiedList, setModifiedList] = useState(
    appendCurrPrice(testStockArray)
  );

  const totalStockListValue = retTotalValue(modifiedList);

  useEffect(() => {
    const retList = [];
    const updateCurrPrice = async () => {
      testStockArray.forEach(async (entry) => {
        const response = await fetch(
          `https://realstonks.p.rapidapi.com/${entry.symbol}`,
          RealStonks_Options
        );

        if (!response.ok) {
          throw new Error("Error with fetchCurrentPrice -- apiHandler.js");
        }
        const responseData = await response.json();
        var currPrice = responseData.price;
        retList.push({
          symbol: entry.symbol,
          shares: entry.shares,
          companyName: entry.companyName,
          initInvestment: entry.initInvestment,
          currPrice: currPrice,
          currVal: entry.shares * currPrice,
        });
      });
    };

    updateCurrPrice().catch((error) => {
      return;
    });

    setModifiedList(retList);
  }, []);
  console.log(
    "🚀 ~ file: Profile.jsx:27 ~ Profile ~ modifiedList",
    modifiedList
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
