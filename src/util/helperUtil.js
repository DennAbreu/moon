//Constant values.
const graphResolution = "D";
export const apiKey = "cajon1iad3icpj9q6690";
export const testStockArray = [
  { symbol: "AAPL", shares: 10, initInvestment: 1476.41 },
  { symbol: "GME", shares: 25, initInvestment: 1476.41 },
  { symbol: "NFLX", shares: 15, initInvestment: 4205.25 },
  { symbol: "GOOG", shares: 5, initInvestment: 350.25 },
  { symbol: "META", shares: 2, initInvestment: 180.25 },
  { symbol: "TSLA", shares: 35, initInvestment: 8750.35 },
];

//Returns formated UnixDates
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

// Formats data for stock display list

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
  // console.log("ResponseData Length", rDataLen);
  // console.log("ResponseData", responseData);
  // console.log("stockGraphData Length", stockGraphData.length);
  // console.log("stockGraphData ", stockGraphData);

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
        "--",
        enteredList[i].symbol,
        enteredList[i].shares,
        enteredList[i].initInvestment,
        143.16,
        143.16,
        300
      )
    );
  }

  return row;
};
