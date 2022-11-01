/* eslint-disable no-unused-vars */

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";
import { getUnixDates } from "../../util/helperUtil";
import { apiKey } from "../../util/helperUtil";
import { Box, Paper, styled, useTheme } from "@mui/material";
import { formatResponseData } from "../../util/helperUtil";

const StockChart = (props) => {
  const theme = useTheme();
  const unixDates = getUnixDates();
  const currDate = unixDates.currDate;
  const prevDate = unixDates.prevDate;
  const [stockSymbol, setStockSymbol] = useState(props.symbol);
  const [stockGraph, setStockGraph] = useState([]);
  const graphResolution = "D";

  const GraphContainer = styled(Paper)({
    width: "100%",
    height: "100%",
    marginLeft: "0em",
    marginTop: "0rem",
  });

  useEffect(() => {
    setStockSymbol(props.symbol);

    if (stockSymbol) {
      const fetchCandleChart = async () => {
        const response = await fetch(
          `https://finnhub.io/api/v1/stock/candle?symbol=${stockSymbol}&resolution=${graphResolution}&from=${prevDate}&to=${currDate}&token=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(
            "Something went wrong with the request in StockChart.jsx"
          );
        }

        const responseData = await response.json();
        setStockGraph(formatResponseData(responseData));
      };

      fetchCandleChart().catch((error) => {
        console.log(error);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockSymbol]);

  // console.log("TestData ", testData);
  // console.log("TestData Len", testData.length);
  // console.log("Final StockGraphData", stockGraph);

  var ohlc = [],
    volume = [],
    dataLength = stockGraph.length,
    groupingUnits = [
      [
        "week", // unit name
        [1], // allowed multiples
      ],
      ["month", [1, 2, 3, 4, 6]],
    ],
    i = 0;

  for (i = 0; i < dataLength; i += 1) {
    ohlc.push([
      stockGraph[i][0], // the date
      stockGraph[i][1], // open
      stockGraph[i][2], // high
      stockGraph[i][3], // low
      stockGraph[i][4], // close
    ]);

    volume.push([
      stockGraph[i][0], // the date
      stockGraph[i][5], // the volume
    ]);
  }
  const options = {
    chart: {
      backgroundColor: theme.palette.offWhiteColor.main,
      borderRadius: 15,
    },
    rangeSelector: {
      selected: 1,
    },

    title: {
      text: stockSymbol,
    },

    yAxis: [
      {
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "OHLC",
        },
        height: "60%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "Volume",
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2,
      },
    ],

    tooltip: {
      split: true,
    },

    series: [
      {
        type: "candlestick",
        name: stockSymbol,
        data: ohlc,
        dataGrouping: {
          units: groupingUnits,
        },
      },
      {
        type: "column",
        name: "Volume",
        data: volume,
        yAxis: 1,
        dataGrouping: {
          units: groupingUnits,
        },
      },
    ],
    accessibility: {
      enabled: false,
    },
  };

  return (
    <GraphContainer>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </GraphContainer>
  );
};
export default StockChart;
