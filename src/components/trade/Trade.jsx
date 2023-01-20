import { useState } from "react";
import { Container, Paper, Typography, useTheme } from "@mui/material";
import SearchBar from "./SearchBar";
import SnapShot from "./SnapShot";
import StockDetails from "./StockDetails";
import StockChart from "./StockChart";
import PurchaseWidget from "./PurchaseWidget";
import PurchaseWidgetMobile from "./PurchaseWidgetMobile";
import { getUnixDates } from "../../util/helperUtil";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  DetailStack,
  ErrorMessage,
  TradeStack,
} from "../../util/CustomComponents";
import {
  fetchStockPriceHistory,
  fetchStockQuote,
  fetchStockSnapShot,
} from "../../util/apiHandler";
import { Stack } from "@mui/system";

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
    companyName: "",
    graph: [],
  });
  const [stockQuote, setStockQuote] = useState({
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
    <ErrorMessage>
      <Typography variant="h6" color="blueColor.main">
        Please enter a symbol in the search bar!
      </Typography>
    </ErrorMessage>
  );

  const searchBarHandler = async (entSymbol) => {
    setStockSymbol(entSymbol);
    //Company Name, News, Etc.

    /*
      When Limit is reached for API change value of miscData..
    */
    // var miscData = await fetchStockQuote(entSymbol);

    var miscData = { name: "Reached API Call Limits" };
    //Stock Quote --- Current, High, Low, etc...
    var retSnapShotArray = await fetchStockSnapShot(entSymbol);
    console.log(
      "🚀 ~ file: Trade.jsx:116 ~ searchBarHandler ~ retSnapShotArray",
      retSnapShotArray
    );
    //Stock Price history
    var retPriceHistory = await fetchStockPriceHistory(
      entSymbol,
      prevDate,
      currDate
    );
    console.log(
      "🚀 ~ file: Trade.jsx:135 ~ searchBarHandler ~ retPriceHistory",
      retPriceHistory
    );
    setStockQuote(retSnapShotArray);
    setStockGraphStats({
      symbol: entSymbol,
      companyName: miscData.name,
      graph: retPriceHistory,
    });
  };

  return (
    <Container maxWidth="100%">
      <SearchBar onSymbolSearch={searchBarHandler} />
      {stockSymbol === undefined ? (
        nullSymbolMessage
      ) : (
        <TradeStack direction={"column"} spacing={2}>
          <DetailStack direction={"row"} spacing={1}>
            <SnapShot stockData={stockQuote} />
            <StockDetails stockData={stockQuote} />
          </DetailStack>
          <Stack maxWidth="60%" direction={"row"} spacing={1}>
            {!isMatch ? (
              <PurchaseWidget stockData={stockQuote} />
            ) : (
              <PurchaseWidgetMobile stockData={stockQuote} />
            )}
            <StockChart stockData={stockGraphStats} />
          </Stack>
        </TradeStack>
      )}
    </Container>
  );
};

export default Trade;
