import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { GraphContainer } from "../../../util/CustomComponents";
import { useTheme } from "@mui/material";

const ComparisonChart = () => {
  const theme = useTheme();

  const options = {
    series: [
      {
        data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9, 11],
      },
      {
        data: [3, 2, 4, 8, 9, 6, 7, 3, 15, 6, 9, 11],
        color: "green",
      },
    ],
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

export default ComparisonChart;
