import { formatResponseData } from "./helperUtil";

const graphResolution = "D";
export const finnHubKey = "cajon1iad3icpj9q6690";

export const populateProfileData = async (entList) => {};

export const fetchStockCurrPrice = async (symbol) => {
  var retCurrPrice;

  /*
        TODO: Single API call that returns current Stock Price for entered
        symbol.

        TODO: Can make it so that it returns price history for past year
        incluing current price
    */
};

export const fetchStockPriceHistory = async (entSymbol, prevDate, currDate) => {
  var retPriceHistory = [];

  const response = await fetch(
    `https://finnhub.io/api/v1/stock/candle?symbol=${entSymbol}&resolution=${graphResolution}&from=${prevDate}&to=${currDate}&token=${finnHubKey}`
  );

  if (!response.ok) {
    throw new Error("Something went wrong with the request in StockChart.jsx");
  }

  const responseData = await response.json();
  console.log(
    "🚀 ~ file: apiHandler.js:30 ~ fetchStockPriceHistory ~ responseData",
    responseData
  );

  retPriceHistory = formatResponseData(responseData);
  console.log(
    "🚀 ~ file: apiHandler.js:34 ~ fetchStockPriceHistory ~ retPriceHistory",
    retPriceHistory
  );

  return retPriceHistory;
};

export const retCurrPrices = (entList) => {
  /*
        Todo: Takes entered array from Redux and returns current stock price
        for every synbol using fetchStockCurrPrice function.
        
    */
};

export const fetchStockSnapShot = async (entSymbol) => {
  var retCurrPrice = {};
  const response = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${entSymbol}&token=${finnHubKey}`
  );
  if (!response.ok) {
    throw new Error("Something went wrong with the request");
  }
  const responseData = await response.json();

  retCurrPrice = {
    symbol: entSymbol,
    companyName: "---",
    currPrice: responseData.c,
    changeAmt: responseData.d,
    perChange: responseData.dp,
    openPrice: responseData.o,
    closePrice: responseData.pc,
    highPrice: responseData.h,
    lowPrice: responseData.l,
  };

  console.log(
    "🚀 ~ file: apiHandler.js:52 ~ fetchStockStats ~ retCurrPrice",
    retCurrPrice
  );

  return retCurrPrice;
};
