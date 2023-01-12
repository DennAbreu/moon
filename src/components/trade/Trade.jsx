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
import { apiKey } from "../../util/helperUtil";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  ButtonStyled,
  DetailStack,
  TradeStack,
} from "../../util/CustomComponents";
import { fetchStockSnapShot } from "../../util/apiHandler";

// import CompanyNews from "./CompanyNews";

const Trade = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md800"));
  const [stockSymbol, setStockSymbol] = useState(undefined);
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

  const [stockStats2, setStockStats2] = useState({
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

  const stockSymbolHandler = (symbol) => {
    setStockSymbol(symbol);
  };

  useEffect(() => {
    if (stockSymbol !== undefined) {
      const fetchStockStats = async () => {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong with the request in Trade.jsx");
        }
        const responseData = await response.json();
        setStockStats({
          symbol: stockSymbol,
          currPrice: responseData.c,
          changeAmt: responseData.d,
          perChange: responseData.dp,
          openPrice: responseData.o,
          closePrice: responseData.pc,
          highPrice: responseData.h,
          lowPrice: responseData.l,
        });
        // console.log(responseData);
      };
      fetchStockStats().catch((error) => {
        console.log(error);
      });
    }

    //Fetch company name....
    // const fetchCompanyName = async () => {};
  }, [stockSymbol]);

  // const testOnClick = () => {
  //   var retTestArray = fetchStockSnapShot("AAPL");
  //   console.log(
  //     "🚀 ~ file: Trade.jsx:107 ~ testOnClick ~ retTestArray",
  //     retTestArray
  //   );
  // };

  const searchBarHandler = (entSymbol) => {
    var retTestArray = fetchStockSnapShot(entSymbol);
    console.log(
      "🚀 ~ file: Trade.jsx:107 ~ testOnClick ~ retTestArray",
      retTestArray
    );

    setStockStats2({
      symbol: entSymbol,
      currPrice: retTestArray.currPrice,
      changeAmt: retTestArray.changeAmt,
      perChange: retTestArray.perChange,
      openPrice: retTestArray.openPrice,
      closePrice: retTestArray.closePrice,
      highPrice: retTestArray.highPrice,
      lowPrice: retTestArray.lowPrice,
    });

    console.log(stockStats2);
  };

  const printStockStats2 = () => {
    console.log(stockStats2);
  };

  return (
    <Container>
      <ButtonStyled onClick={printStockStats2}>Test</ButtonStyled>
      <SearchBar onSymbolSearch={searchBarHandler} />
      {stockSymbol === undefined ? (
        nullSymbolMessage
      ) : (
        <TradeStack direction={"column"} spacing={2}>
          <DetailStack direction={{ md: "column", lg: "row" }} spacing={1}>
            <SnapShot stockData={stockStats} />
            <StockDetails stockData={stockStats} />
          </DetailStack>
          {/* <Stack direction={"row"}>
            <PurchaseWidget stockData={stockStats} />
            <StockChart symbol={stockSymbol} />
          </Stack> */}

          <StockChart symbol={stockSymbol} />
          {!isMatch ? (
            <PurchaseWidget stockData={stockStats} />
          ) : (
            <PurchaseWidgetMobile stockData={stockStats} />
          )}
        </TradeStack>
      )}
    </Container>
  );
};

export default Trade;
