import { Suspense, useEffect, useMemo, useState } from "react";
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
  updateStockList,
  testStockArray,
} from "../../util/helperUtil";
import { RealStonks_Options } from "../../util/apiHandler";
import LoaderDiv from "../../util/LoaderDiv";

const Profile = (props) => {
  const profName = useSelector((state) => state.prof.name);
  const profID = useSelector((state) => state.prof.userID);

  // const stockList = useSelector((state) => state.prof.stockList);
  const stockList = testStockArray;

  // const [stockList, setStockList] = useState(testStockArray);
  const [isLoading, setIsLoading] = useState(true);
  // const [currPriceMap, setCurrPriceMap] = useState(undefined);
  const [updatedList, setUpdatedList] = useState(undefined);
  const [totalValue, setTotalValue] = useState(null);
  const totalStockListValue = retTotalValue(stockList);

  useEffect(() => {
    const getAllCurrentPrices = async () => {
      const symbolMap = retSymbolMap(stockList);
      const priceMap = new Map();
      const promiseArray = [];

      stockList.forEach((entry) => {
        promiseArray.push(
          fetch(
            `https://realstonks.p.rapidapi.com/${entry.symbol}`,
            RealStonks_Options
          )
        );
      });
      Promise.all(promiseArray)
        .then((responses) => {
          return Promise.all(responses.map((res) => res.json()));
        })
        .then((responses) => {
          responses.forEach((val, index) => {
            priceMap.set(symbolMap.get(index), val.price);
          });
          console.log(
            "🚀 ~ file: Profile.jsx:57 ~ responses.forEach ~ priceMap:",
            priceMap
          );
        })
        .then(() => {
          setUpdatedList(updateStockList(stockList, priceMap));
        })
        .then(() => {
          setTotalValue(retTotalValue(updatedList));
        })

        .catch((e) => {
          console.log("caught!");
          console.log(e);
        });
    };

    getAllCurrentPrices();
    setIsLoading(false);
    console.log(
      "🚀 ~ file: Profile.jsx:69 ~ .then ~ updatedList:",
      updatedList
    );
  }, [stockList]);

  return (
    <>
      <Container maxWidth="100%">
        <BankDBStats loadingState={isLoading} totalStockValue={totalValue} />
        <FlexStack sx={{ mt: "1rem" }} direction={"row"} spacing={2}>
          <StockListDisplay stockList={updatedList} />

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
