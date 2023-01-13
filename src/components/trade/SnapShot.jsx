import React from "react";

import { Box, Paper, Stack, styled, Typography, useTheme } from "@mui/material";
import { CenteredBox, SnapShotBox } from "../../util/CustomComponents";

const SnapShot = (props) => {
  const theme = useTheme();
  const companyName = props.stockData.symbol;
  const currPrice = props.stockData.currPrice;
  const perChange = props.stockData.perChange;
  const perChangeColor = perChange < 0 ? "#FF0000" : "#00ff00";

  const colorChangePercent = (
    <Typography color={perChangeColor}>{perChange?.toFixed(2)}%</Typography>
  );

  const snapShotContent = (
    <Stack direction={"column"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography color={"greenColor.main"} variant="h5">
          {companyName}
        </Typography>
      </Box>
      {companyName && (
        <Stack
          sx={{ display: "flex", justifyContent: "center" }}
          direction={"row"}
          spacing={1}
        >
          <Typography variant="h4" color="white">
            ${currPrice}
          </Typography>
          <sub>{colorChangePercent}</sub>
        </Stack>
      )}
    </Stack>
  );
  return (
    <SnapShotBox>
      <Stack direction={"column"}>
        <CenteredBox>
          <Typography color={"greenColor.main"} variant="h5">
            {companyName}
          </Typography>
        </CenteredBox>
        {companyName && (
          <Stack
            sx={{ display: "flex", justifyContent: "center" }}
            direction={"row"}
            spacing={1}
          >
            <Typography variant="h4" color="white">
              ${currPrice?.toFixed(2)}
            </Typography>
            <sub>{colorChangePercent}</sub>
          </Stack>
        )}
      </Stack>
    </SnapShotBox>
  );
};
export default SnapShot;
