import { useState } from "react";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
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
  TradeGridItem,
  TradeGrid,
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
  const isMatch = useMediaQuery(theme.breakpoints.down("xs"));
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
        <TradeStack direction={"column"} spacing={1}>
          <DetailStack
            sx={{
              alignItems: "center",
              flexDirection: {
                sm: "column",
                md: "row",
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
              maxWidth: {
                xl: "100%",
              },
              alignItems: "center",
              flexDirection: {
                sm: "column",
                md: "column",
                lg1400: "column",
                lg: "column",
                xl: "row",
              },
              gap: { sm: 1, md: 1, lg: 2, xl: 3 },
            }}
          >
            <StockChart stockData={stockGraphStats} />
            {!isMatch ? (
              <PurchaseWidget stockData={stockQuote} />
            ) : (
              <PurchaseWidgetMobile stockData={stockQuote} />
            )}
          </Stack>
        </TradeStack>
      )}
    </Box>
  );
};

export default Trade;

// <>
//   <SearchBar onSymbolSearch={searchBarHandler} />
//   <p />
//   <TradeGrid container>
//     <TradeGridItem item xs={12} sm={12} md={2} lg={3} xl={2}>
//       <SnapShot stockData={stockQuote} />
//     </TradeGridItem>
//     <TradeGridItem item xs={12} sm={12} md={4} lg={4} xl={4}>
//       <StockDetails stockData={stockQuote} />
//     </TradeGridItem>
//   </TradeGrid>
//   <TradeGrid container spacing={5}>
//     <TradeGridItem item xs={12} sm={12} md={4} lg={4} xl={6}>
//       <StockChart stockData={stockGraphStats} />
//     </TradeGridItem>
//     <TradeGridItem item xs={12} sm={12} md={6} lg={6} xl={4}>
//       <PurchaseWidget stockData={stockQuote} />
//     </TradeGridItem>
//   </TradeGrid>
// </>
