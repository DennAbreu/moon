import { formatResponseData } from "./helperUtil";

const graphResolution = "D";
export const finnHubKey = "cajon1iad3icpj9q6690";

export const populateProfileData = async (entList) => {
  //Create Map with Symbol + Current Data
};

export const fetchAllStockCurrPrice = async (entList) => {
  const retCurrPriceArr = [];

  //API calls for current price for each stock symbol.
  entList.forEach(async (entry) => {
    var stockTemp = await fetchStockSnapShot(entry.symbol);
    var entryCurrPrice = retCurrPrice(stockTemp);
    retCurrPriceArr.push({ symbol: entry.symbol, currPrice: entryCurrPrice });
  });

  return retCurrPriceArr;
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

  return retPriceHistory;
};

export const retCurrPrice = (entPromise) => {
  return entPromise.currPrice;
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
    "🚀 ~ file: apiHandler.js:52 ~ fetchStockSnapShot ~ retCurrPrice",
    retCurrPrice
  );

  return retCurrPrice;
};
