import { Box, Stack, Typography, useTheme } from "@mui/material";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";
import { PieChartContainer } from "../../../util/CustomComponents";

const dummyStocks = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 250 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 100 },
  { name: "Group F", value: 50 },
  { name: "Group G", value: 330 },
];

const data = [
  { name: "AAPL", value: 10 },
  { name: "GME", value: 25 },
  { name: "NFLX", value: 15 },
  { name: "GOOG", value: 5 },
  { name: "META", value: 2 },
  { name: "TSLA", value: 35 },
];

var pieWidth = 420;
var pieHeight = 300;
var pieCX = pieWidth / 2.2;
var pieCY = pieHeight / 2.2;

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 2}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{` ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 1}
        y={ey}
        dy={15}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const InvPieChart = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <PieChartContainer>
      <Stack direction={"column"}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "2.2rem",
            borderRadius: "65",
            color: "white",
            background: theme.palette.blueColor.main,
          }}
        >
          <Typography ml={"0.5rem"}>Investment Breakdown</Typography>
        </Box>
        <PieChart width={pieWidth} height={pieHeight}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={pieCX}
            cy={pieCY}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </Stack>
    </PieChartContainer>
  );
};

export default InvPieChart;
