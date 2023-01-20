import { formatResponseData } from "./helperUtil";

//Finnhub API Keys
const graphResolution = "D";
const finnHubKey = "cajon1iad3icpj9q6690";

//Headers for Real-Time Finance Data API
const RTFD_Options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "91f01e34a5mshe7b3ff972fd2800p1acd6ajsn5e85e17ebeea",
    "X-RapidAPI-Host": "real-time-finance-data.p.rapidapi.com",
  },
};

//Headers for Real Stonks API
const RealStonks_Options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "91f01e34a5mshe7b3ff972fd2800p1acd6ajsn5e85e17ebeea",
    "X-RapidAPI-Host": "realstonks.p.rapidapi.com",
  },
};

export const populateProfileData = async (entList) => {
  //Create Map with Symbol + Current Data
};

/*
  ----------------------FinnHub API ----------------------
  https://finnhub.io/docs/api/introduction

  --60 calls/minute


  
  ---------------------------------------------------------
*/

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

  return retCurrPrice;
};

export const fetchSingleCurrPrice = async (entSymbol) => {
  var retObj = await fetchStockSnapShot(entSymbol);
  console.log(
    "🚀 ~ file: apiHandler.js:83 ~ fetchSingleCurrPrice ~ retObj.currPrice",
    retObj.currPrice
  );
  return retObj.currPrice;
};

/*
  -------------------Real-Time Finance Data -------------------
  https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-finance-data
  --Limited to 100 Calls Per Day on 'Freemium Plan'.


  -------------------------------------------------------------
*/

export const fetchStockQuote = async (entSymbol) => {
  var retObj = "empty";
  const response = await fetch(
    `https://real-time-finance-data.p.rapidapi.com/stock-overview?symbol=${entSymbol}`,
    RTFD_Options
  );
  if (!response.ok) {
    throw new Error(
      `Something went wrong with the request for Fetch Request...`
    );
  }
  const responseData = await response.json();
  console.log(
    "🚀 ~ file: apiHandler.js:118 ~ fetchStockQuote ~ responseData",
    responseData.data
  );
  return (retObj = responseData.data);
};

/*
  -------------------RealStonks API-------------------

  https://rapidapi.com/amansharma2910/api/realstonks/details
  --100K Free API Calls Per Month.
  --Used for singular current price checks. 

  ----------------------------------------------------
*/

export const fetchCurrentPrice = async (entSymbol) => {
  const response = await fetch(
    `https://realstonks.p.rapidapi.com/${entSymbol}`,
    RealStonks_Options
  );

  if (!response.ok) {
    throw new Error(`Something went wrong with the request`);
  }
  const responseData = await response.json();
  return responseData.price;
};

export const fetchAllCurrentPrices = async (entList) => {
  const retCurrPriceArr = [];
  //API calls for current price for each stock symbol.
  entList.forEach(async (entry) => {
    var tempPrice = await fetchCurrentPrice(entry.symbol);
    retCurrPriceArr.push({ symbol: entry.symbol, currPrice: tempPrice });
  });

  return retCurrPriceArr;
};

//uses this free API to verify stock symbol.
export const symbolVerify = async (entSymbol) => {
  var retValue = true;
  const response = await fetch(
    `https://realstonks.p.rapidapi.com/${entSymbol}`,
    RealStonks_Options
  );

  if (!response.ok) {
    retValue = false;
    throw new Error(`Something went wrong with the request`);
  }

  return retValue;
};
