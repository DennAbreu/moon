import { useState } from "react";
import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import SnapShot from "./SnapShot";
import StockDetails from "./StockDetails";
import StockChart from "./StockChart";
import PurchaseWidget from "./PurchaseWidget";
import { getUnixDates } from "../../util/helperUtil";
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
      <Typography variant="h5" color="blueColor.main">
        Enter a symbol for lookup.
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
    setStockQuote({
      symbol: entSymbol,
      companyName: retCompanyProfile.name,
      currPrice: retSnapShotArray.currPrice,
      changeAmt: retSnapShotArray.changeAmt,
      perChange: retSnapShotArray.perChange,
      openPrice: retSnapShotArray.openPrice,
      closePrice: retSnapShotArray.closePrice,
      highPrice: retSnapShotArray.highPrice,
      lowPrice: retSnapShotArray.lowPrice,
    });
    setStockGraphStats({
      symbol: entSymbol,
      companyName: retCompanyProfile.name,
      graph: retPriceHistory,
    });
  };
  //direction={"row"}
  return (
    <Box>
      <SearchBar onSymbolSearch={searchBarHandler} />
      {stockSymbol === undefined ? (
        nullSymbolMessage
      ) : (
        <TradeStack maxWidth={true} direction={"column"} spacing={1}>
          <DetailStack
            sx={{
              flexDirection: {
                sm: "column",
                md800: "row",
                lg: "row",
                xl: "row",
              },
              gap: 1,
            }}
          >
            <SnapShot stockData={stockQuote} />
            <StockDetails stockData={stockQuote} />
          </DetailStack>
          <Stack
            sx={{
              justifyContent: "center",
              flexwrap: "wrap",
              flexDirection: {
                sm: "column",
                md: "row",
                lg: "row",
                xl: "row",
              },
              gap: 2,
            }}
          >
            <PurchaseWidget stockData={stockQuote} />
            <StockChart stockData={stockGraphStats} />
          </Stack>
        </TradeStack>
      )}
    </Box>
  );
};

export default Trade;
