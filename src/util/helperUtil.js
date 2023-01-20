import { fetchSingleCurrPrice } from "./apiHandler";

//Constant values.
export const apiKey = "cajon1iad3icpj9q6690";

/*
Test Info To Delte..
*/

export const testStockArray = [
  {
    symbol: "AAPL",
    companyName: "Apple Inc",
    shares: 10,
    initInvestment: 1476.41,
    currPrice: 0,
    currVal: 0,
  },
  {
    symbol: "GME",
    companyName: "GameStop Corp.",
    shares: 25,
    initInvestment: 1476.41,
    currPrice: 0,
    currVal: 0,
  },
  {
    symbol: "NFLX",
    companyName: "Netflix Inc",
    shares: 15,
    initInvestment: 4205.25,
    currPrice: 0,
    currVal: 0,
  },
  {
    symbol: "GOOG",
    companyName: "Alphabet Inc Class C ",
    shares: 25,
    initInvestment: 350.25,
    currPrice: 0,
    currVal: 0,
  },
  {
    symbol: "META",
    companyName: "Meta Platforms Inc",
    shares: 2,
    initInvestment: 180.25,
    currPrice: 0,
    currVal: 0,
  },
  {
    symbol: "TSLA",
    companyName: "Tesla Inc",
    shares: 35,
    initInvestment: 8750.35,
    currPrice: 0,
    currVal: 0,
  },
];

//Formated UnixDates to return currDate and prevDate from a year ago.

export function getUnixDates() {
  const today = new Date();

  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let currFullDate = `${year}-${month}-${day}`;
  let prevFullDate = `${year - 1}-${month}-${day}`;
  let currDateConv = new Date(currFullDate);
  let currDateUnix = Math.floor(currDateConv.getTime() / 1000);
  let prevDateConv = new Date(prevFullDate);
  let prevDateUnix = Math.floor(prevDateConv.getTime() / 1000);

  const retUnixDates = { currDate: currDateUnix, prevDate: prevDateUnix };
  return retUnixDates;
}

// Formats data for stock display list component that uses High Charts

export const formatResponseData = (responseData) => {
  var resDataFormated = [];
  var rDataLen = responseData.t.length;
  // [Date, Open, High, Low, Close, Volume ]
  if (resDataFormated.length > 0) resDataFormated = [];
  for (let i = 0; i < rDataLen; i++) {
    resDataFormated.push([
      responseData.t[i] * 1000, //date: Convert UNIX timestop from seconds to milliseconds.
      Number(responseData.o[i].toFixed(2)), //open -- convert string back to number
      Number(responseData.h[i].toFixed(2)), //high -- convert string back to number
      Number(responseData.l[i].toFixed(2)), //low -- convert string back to number
      Number(responseData.c[i].toFixed(2)), //close -- convert string back to number
      responseData.v[i], //volume
    ]);
  }

  console.log(
    "🚀 ~ file: helperUtil.js:55 ~ formatResponseData ~ resDataFormated",
    resDataFormated
  );
  return resDataFormated;
};

export function formatSharesData(entArr) {
  var retarray = [];
  entArr.forEach((entry) => {
    retarray.push({ name: entry.symbol, value: entry.shares });
  });
  return retarray;
}

export function formatInvData(entArr) {
  var retarray = [];
  entArr.forEach((entry) => {
    retarray.push({ name: entry.symbol, value: entry.initInvestment });
  });
  return retarray;
}

/*
---StockListDisplay Functions---

*/

//createRowData(Name, Symbol, Shares, Invested, CurrPrice, CurrVal, Growth)...
const createRowData = (
  name,
  symbol,
  shares,
  initInvestment,
  currPrice,
  currVal,
  growth
) => {
  return { name, symbol, shares, initInvestment, currPrice, currVal, growth };
};

export const retFormatedRowData = (enteredList) => {
  const row = [];
  for (let i = 0; i < enteredList.length; i++) {
    row.push(
      createRowData(
        enteredList[i].companyName,
        enteredList[i].symbol,
        enteredList[i].shares,
        enteredList[i].initInvestment,
        enteredList[i].currPrice,
        enteredList[i].currVal,
        300
      )
    );
  }

  return row;
};

export const modifyStockList = (enteredList) => {
  const retList = [];
  enteredList.forEach(async (entry) => {
    var tempCurrPrice = await fetchSingleCurrPrice(entry.symbol);
    retList.push({
      symbol: entry.symbol,
      shares: entry.shares,
      initInvestment: entry.initInvestment,
      currPrice: tempCurrPrice,
      currVal: entry.shares * tempCurrPrice,
    });
  });

  return retList;
};

export const retTotalValue = (enteredList) => {
  let retTotal = 0;
  enteredList.forEach((entry) => {
    retTotal += entry.currVal;
  });

  return retTotal;
};
