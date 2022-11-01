import React from "react";

import { Box, Paper, Stack, styled, Typography, useTheme } from "@mui/material";

const SnapShot = (props) => {
  const theme = useTheme();
  const companyName = props.stockData.symbol;
  const currPrice = props.stockData.currPrice.toFixed(2);
  const perChange = props.stockData.perChange.toFixed(2);
  const perChangeColor = perChange < 0 ? "#FF0000" : "#00ff00";

  const SnapShotCard = styled(Paper)({
    width: "auto",
    height: "fit-content",
    padding: "0.5rem 1rem 0.5rem 0.5rem",
    borderRadius: 15,
    background: theme.palette.blueColor.main,
  });

  const colorChangePercent = (
    <Typography color={perChangeColor}>{perChange}%</Typography>
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
  return <SnapShotCard>{snapShotContent}</SnapShotCard>;
};
export default SnapShot;
