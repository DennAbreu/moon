import { Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Sector } from "recharts";
import {
  PieChartContainer,
  PieGraphLabel,
} from "../../../util/CustomComponents";
import { formatSharesData, testStockArray } from "../../../util/helperUtil";

//Test Data
const data = formatSharesData(testStockArray);

const pieWidth = 420;
const pieHeight = 300;
const pieCX = pieWidth / 2.2;
const pieCY = pieHeight / 2.2;

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

const SharesPieChart = () => {
  // const currStockList = useSelector((state) => state.prof.stockList);
  // const data = formatSharesData(currStockList);
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
        <PieGraphLabel>
          <Typography ml={"0.5rem"}>Shares Breakdown</Typography>
        </PieGraphLabel>
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

export default SharesPieChart;
