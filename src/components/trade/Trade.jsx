import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import SearchBar from "./SearchBar";
import SnapShot from "./SnapShot";
import StockDetails from "./StockDetails";
import StockChart from "./StockChart";
import PurchaseWidget from "./PurchaseWidget";
import PurchaseWidgetMobile from "./PurchaseWidgetMobile";
import { getUnixDates, testStockArray } from "../../util/helperUtil";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  ButtonStyled,
  DetailStack,
  TradeStack,
} from "../../util/CustomComponents";
import {
  fetchAllStockCurrPrice,
  fetchStockPriceHistory,
  fetchStockSnapShot,
} from "../../util/apiHandler";

/*
TODO: Delete extra variables and clean up file!!!

*/

const Trade = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md800"));
  const unixDates = getUnixDates();
  const currDate = unixDates.currDate;
  const prevDate = unixDates.prevDate;
  const [stockSymbol, setStockSymbol] = useState(undefined);
  const [stockGraphStats, setStockGraphStats] = useState({
    symbol: stockSymbol,
    graph: [],
  });
  const [stockStats, setStockStats] = useState({
    symbol: stockSymbol,
    companyName: "",
    currPrice: 0,
    changeAmt: 0,
    perChange: 0,
    openPrice: 0,
    closePrice: 0,
    highPrice: 0,
    lowPrice: 0,
  });

  const nullSymbolMessage = (
    <Paper
      sx={{
        marginTop: "1rem",
        display: "flex",
        width: "auto",
        justifyContent: "space-evenly",
        background: theme.palette.offWhiteColor.main,
      }}
    >
      <Typography variant="h5" color="blueColor.main">
        Please enter a symbol in the search bar!
      </Typography>
    </Paper>
  );

  const searchBarHandler = async (entSymbol) => {
    setStockSymbol(entSymbol);

    var retSnapShotArray = await fetchStockSnapShot(entSymbol);
    console.log(
      "🚀 ~ file: Trade.jsx:116 ~ searchBarHandler ~ retSnapShotArray",
      retSnapShotArray
    );

    var retPriceHistory = await fetchStockPriceHistory(
      entSymbol,
      prevDate,
      currDate
    );
    console.log(
      "🚀 ~ file: Trade.jsx:135 ~ searchBarHandler ~ retPriceHistory",
      retPriceHistory
    );

    setStockStats(retSnapShotArray);
    setStockGraphStats({
      symbol: entSymbol,
      graph: retPriceHistory,
    });
  };

  // const printCheck = () => {
  //   console.log("🚀 ~ file: Trade.jsx:68 ~ Trade ~ stockStats", stockStats);

  //   console.log(
  //     "🚀 ~ file: Trade.jsx:45 ~ Trade ~ stockGraphStats",
  //     stockGraphStats
  //   );
  // };

  // const apiTest = async () => {
  //   // var applHist = fetchStockPriceHistory("AAPL", prevDate, currDate);
  //   // console.log("🚀 ~ file: Trade.jsx:109 ~ apiTest ~ applHist", applHist);
  //   var apiTestArray = await fetchAllStockCurrPrice(testStockArray);
  //   console.log(
  //     "🚀 ~ file: Trade.jsx:112 ~ apiTest ~ apiTestArray",
  //     apiTestArray
  //   );
  // };

  return (
    <Container>
      {/* <ButtonStyled onClick={printCheck}>Print</ButtonStyled>
      <br />
      <br />
      <ButtonStyled onClick={apiTest}>API--Test</ButtonStyled> */}
      <SearchBar onSymbolSearch={searchBarHandler} />
      {stockSymbol === undefined ? (
        nullSymbolMessage
      ) : (
        <TradeStack direction={"column"} spacing={2}>
          <DetailStack direction={{ md: "column", lg: "row" }} spacing={1}>
            <SnapShot stockData={stockStats} />
            <StockDetails stockData={stockStats} />
          </DetailStack>

          {!isMatch ? (
            <PurchaseWidget stockData={stockStats} />
          ) : (
            <PurchaseWidgetMobile stockData={stockStats} />
          )}
          <StockChart stockData={stockGraphStats} />
        </TradeStack>
      )}
    </Container>
  );
};

export default Trade;
