import { useEffect, useState } from "react";
import { Container, Stack, styled, Typography, useTheme } from "@mui/material";
import { apiKey } from "../../util/helperUtil";

import SearchBar from "./SearchBar";
import SnapShot from "./SnapShot";
import StockDetails from "./StockDetails";
import StockChart from "./StockChart";
import CompanyNews from "./CompanyNews";
// import StockPurchaser from "./StockPurchaser";

const Trade = () => {
  const theme = useTheme();
  const [stockSymbol, setStockSymbol] = useState(undefined);
  const [stockStats, setStockStats] = useState({
    symbol: stockSymbol,
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
    marginTop: "1rem",
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

  const emptyStockSymbolMssg = (
    <Container
      sx={{
        marginTop: "1rem",
        width: "fit-content",
        borderRadius: 15,
        background: theme.palette.blueColor.main,
      }}
    >
      <Typography variant="h6" color={"white"}>
        Please enter a symbol.
      </Typography>
    </Container>
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
  }, [stockSymbol]);

  return (
    <Container>
      <SearchBar onSymbolSearch={stockSymbolHandler} />
      {stockSymbol === undefined ? (
        emptyStockSymbolMssg
      ) : (
        <TradeStack direction={"column"} spacing={2}>
          <DetailStack direction={{ md: "column", lg: "row" }} spacing={1}>
            <SnapShot stockData={stockStats} />
            <StockDetails stockData={stockStats} />
          </DetailStack>
          <StockChart symbol={stockSymbol} />
          <CompanyNews symbol={stockSymbol} />
        </TradeStack>
      )}
    </Container>
  );
};

export default Trade;
