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

  const TradeStack = styled(Stack)({
    // background: "#f5ad42",
    marginTop: "0.5rem",
    width: "auto",
    height: "200%",
    alignItems: "center",
  });

  const DetailStack = styled(Stack)({
    display: "flex",
    width: "fit-content",
    height: "fit-content",
    // justifyContent: "center",
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

  return (
    <Container>
      <SearchBar onSymbolSearch={stockSymbolHandler} />
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
