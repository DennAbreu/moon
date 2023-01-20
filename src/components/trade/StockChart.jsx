/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useTheme } from "@mui/material";

import { GraphContainer } from "../../util/CustomComponents";

const StockChart = (props) => {
  const theme = useTheme();
  const [stockSymbol, setStockSymbol] = useState(props.stockData.symbol);
  const [compName, setCompName] = useState(props.stockData.companyName);
  const [stockGraph, setStockGraph] = useState(props.stockData.graph);

  useEffect(() => {
    setStockSymbol(props.stockData.symbol);
    setStockGraph(props.stockData.graph);
    setCompName(props.stockData.companyName);
  }, [props]);

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
      text: compName,
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
        name: compName,
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
      enabled: true,
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
