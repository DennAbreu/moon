import { useState } from "react";
import { Container, Typography, useTheme } from "@mui/material";
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
  fetchCompanyProfile,
  fetchStockPriceHistory,
  fetchStockSnapShot,
} from "../../util/apiHandler";
import { Stack } from "@mui/system";

/*
TODO: Delete extra variables and clean up file!!!
TODO: Save Time Series in some format to use in profile page.
TODO: Save Company in stock database
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
    //Company Name, News, Etc.
    var retCompanyProfile = await fetchCompanyProfile(entSymbol);

    //Stock Quote --- Current, High, Low, etc...
    var retSnapShotArray = await fetchStockSnapShot(entSymbol);

    //Stock Price history
    var retPriceHistory = await fetchStockPriceHistory(
      entSymbol,
      prevDate,
      currDate
    );

    setStockSymbol(entSymbol);
    setStockQuote(retSnapShotArray);
    setStockGraphStats({
      symbol: entSymbol,
      companyName: retCompanyProfile.name,
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
