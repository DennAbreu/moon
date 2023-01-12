const graphResolution = "D";
export const finnHubKey = "cajon1iad3icpj9q6690";

export const fetchStockCurrPrice = async (symbol) => {
  var retCurrPrice;

  /*
        TODO: Single API call that returns current Stock Price for entered
        symbol.

        TODO: Can make it so that it returns price history for past year
        incluing current price
    */
};

export const fetchStockPriceHistory = async (symbol) => {
  var retPriceHistory = [];
  /*
        TODO: fetch price history of a stock symbol.
        

    */
};
export const retCurrPrices = (entList) => {
  /*
        Todo: Takes entered array from Redux and returns current stock price
        for every synbol using fetchStockCurrPrice function.
        
    */
};

export const fetchStockSnapShot = async (entSymbol) => {
  const retCurrPrice = [];
  const fetchStockStats = async (entSymbol) => {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${entSymbol}&token=${finnHubKey}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong with the request");
    }
    const responseData = await response.json();
    retCurrPrice.push({
      symbol: entSymbol,
      currPrice: responseData.c,
      changeAmt: responseData.d,
      perChange: responseData.dp,
      openPrice: responseData.o,
      closePrice: responseData.pc,
      highPrice: responseData.h,
      lowPrice: responseData.l,
    });
  };

  fetchStockStats().catch((error) => {
    console.log(error);
  });

  /*
          TODO: Single API call that returns current Stock Price for entered
          symbol.
  
          TODO: Can make it so that it returns price history for past year
          incluing current price
      */

  console.log(
    "🚀 ~ file: apiHandler.js:52 ~ fetchStockStats ~ retCurrPrice",
    retCurrPrice
  );
  return retCurrPrice;
};
