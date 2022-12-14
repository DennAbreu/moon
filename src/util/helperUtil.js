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

// export function returnStockDetails(sym) {
//   var retStockDetails = {};
//   const fetchStockStats = async () => {
//     const response = await fetch(
//       `https://finnhub.io/api/v1/quote?symbol=${sym}&token=${apiKey}`
//     );
//     if (!response.ok) {
//       throw new Error(
//         "Something went wrong with the request for stock details."
//       );
//     }
//     const responseData = await response.json();
//     retStockDetails = {
//       symbol: sym,
//       currPrice: responseData.c,
//       changeAmt: responseData.d,
//       perChange: responseData.dp,
//       openPrice: responseData.o,
//       closePrice: responseData.pc,
//       highPrice: responseData.h,
//       lowPrice: responseData.l,
//     };
//     console.log("ResponseData", responseData);
//     console.log("ReturnStockDetails", retStockDetails);
//   };
//   fetchStockStats().catch((error) => {
//     console.log(error);
//   });

//   return retStockDetails;
// }

// export function returnStockGraphData(sym) {
//   let todayDate = getUnixDates();
//   let lastYear = todayDate.prevDate;
//   let currYear = todayDate.currDate;

//   var retGraphData = [];
//   const fetchCandleChart = async () => {
//     const response = await fetch(
//       `https://finnhub.io/api/v1/stock/candle?symbol=${sym}&resolution=${graphResolution}&from=${lastYear}&to=${currYear}&token=${apiKey}`
//     );

//     if (!response.ok) {
//       throw new Error(
//         "Something went wrong with the request in StockChart.jsx"
//       );
//     }

//     const responseData = await response.json();

//     for (let i = 0; i < responseData.length; i++) {
//       retGraphData.push([
//         responseData.t[i] * 1000, //date: Convert UNIX timestop from seconds to milliseconds.
//         Number(responseData.o[i].toFixed(2)), //open -- convert string back to number
//         Number(responseData.h[i].toFixed(2)), //high -- convert string back to number
//         Number(responseData.l[i].toFixed(2)), //low -- convert string back to number
//         Number(responseData.c[i].toFixed(2)), //close -- convert string back to number
//         responseData.v[i], //volume
//       ]);
//     }

//     console.log("ResponseData Length", responseData.length);
//     console.log("ResponseData", responseData);
//     console.log("retGraphData Length", retGraphData.length);
//     console.log("retGraphData", retGraphData);
//   };

//   fetchCandleChart().catch((error) => {
//     console.log(error);
//   });

//   return retGraphData;
// }

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

const createRowData = (
  name,
  symbol,
  shares,
  inv,
  currPrice,
  currVal,
  growth
) => {
  return { name, symbol, shares, inv, currPrice, currVal, growth };
};

// export const formatRowData = (entArray)=>{
//   var retArray = [];

//   entArray.map((entry)=>{
//     retArray.push({entry.name, entry.symbol})
//   })
// }

/*****ProfilePage: PieChart Component Functions*****/

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
