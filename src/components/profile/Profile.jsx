import { Suspense, useEffect, useState } from "react";
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
  retPromiseArray,
  retSymbolMap,
  retTotalValue,
  testStockArray as stockList,
  testStockArray,
} from "../../util/helperUtil";
import { fetchCurrentPrice, RealStonks_Options } from "../../util/apiHandler";
import { PriceChange } from "@mui/icons-material";

const Profile = (props) => {
  const profName = useSelector((state) => state.prof.name);
  const profID = useSelector((state) => state.prof.userID);
  // const stockList = useSelector((state) => state.prof.stockList);
  const stockList = testStockArray;

  const [isLoading, setIsLoading] = useState(false);
  const [currPriceMap, setCurrPriceMap] = useState(undefined);

  const totalStockListValue = retTotalValue(stockList);

  useEffect(() => {
    const priceMap = new Map();
    const promiseArray = retPromiseArray(stockList);
    const symbolMap = retSymbolMap(stockList);
    console.log("🚀 ~ file: Profile.jsx:35 ~ useEffect ~ symbolMap", symbolMap);
    setIsLoading(true);

    Promise.all(promiseArray)
      .then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then(function (data) {
        // Log the data to the console
        // You would do something with both sets of data here
        for (let i = 0; i <= data.length - 1; i++) {
          var price = data[i].price;
          priceMap.set(symbolMap.get(i), price);
        }

        console.log(data);
      })
      .catch(function (error) {
        // if there's an error, log it
        console.log(error);
      });

    setCurrPriceMap(priceMap);
    setIsLoading(false);

    console.log("🚀 ~ file: Profile.jsx:62 ~ Profile ~ priceMap", priceMap);
  }, [stockList]);

  return (
    <>
      <Container maxWidth="100%">
        <BankDBStats totalStockValue={totalStockListValue} />
        <FlexStack sx={{ mt: "1rem" }} direction={"row"} spacing={2}>
          {!isLoading && (
            <StockListDisplay stockList={stockList} priceMap={currPriceMap} />
          )}
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
