import styled from "@emotion/styled";
import React from "react";

import { Box, Paper, Typography, useTheme } from "@mui/material";
import { CurrencyText } from "../../util/CustomComponents";

const StockDetails = (props) => {
  const theme = useTheme();
  const currPrice = 0 || props.stockData.currPrice.toFixed(2);
  const changePrice = 0 || props.stockData.changeAmt.toFixed(2);
  const highPrice = 0 || props.stockData.highPrice.toFixed(2);
  const lowPrice = 0 || props.stockData.lowPrice.toFixed(2);
  const openPrice = 0 || props.stockData.openPrice.toFixed(2);
  const closePrice = 0 || props.stockData.closePrice.toFixed(2);
  var colorChangeHandler = changePrice < 0 ? "#FF0000" : "#1dcc98";

  const StockDetailsCard = styled(Paper)({
    background: theme.palette.offWhiteColor.main,
    borderRadius: 15,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    height: "max-height",
    width: "fit-content",
    padding: "0.5rem 1rem 0.5rem 1.5rem",
  });

  const CategoryBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: "2rem",
  });

  const changePriceHandler = (
    <CurrencyText color={colorChangeHandler} variant="h6">
      ${changePrice}
    </CurrencyText>
  );

  const currentPriceBox = (
    <CategoryBox>
      <Typography color="blueColor.main" variant="h6">
        Current
      </Typography>
      <CurrencyText color="greenColor.main" variant="h6">
        ${currPrice}
      </CurrencyText>
    </CategoryBox>
  );

  const amountChangeBox = (
    <CategoryBox>
      <Typography color="blueColor.main" variant="h6">
        Change
      </Typography>
      {changePriceHandler}
    </CategoryBox>
  );

  const openBox = (
    <CategoryBox>
      <Typography color="blueColor.main" variant="h6">
        Open
      </Typography>
      <CurrencyText color="greenColor.main" variant="h6">
        ${openPrice}
      </CurrencyText>
    </CategoryBox>
  );

  const closeBox = (
    <CategoryBox>
      <Typography color="blueColor.main" variant="h6">
        Close
      </Typography>
      <CurrencyText color="greenColor.main" variant="h6">
        ${closePrice}
      </CurrencyText>
    </CategoryBox>
  );

  const highBox = (
    <CategoryBox>
      <Typography color="blueColor.main" variant="h6">
        High
      </Typography>
      <CurrencyText color="greenColor.main" variant="h6">
        ${highPrice}
      </CurrencyText>
    </CategoryBox>
  );

  const lowBox = (
    <CategoryBox>
      <Typography color="blueColor.main" variant="h6">
        Low
      </Typography>
      <CurrencyText color="greenColor.main" variant="h6">
        ${lowPrice}
      </CurrencyText>
    </CategoryBox>
  );

  return (
    <StockDetailsCard>
      {currentPriceBox}
      {amountChangeBox}
      {openBox}
      {closeBox}
      {highBox}
      {lowBox}
    </StockDetailsCard>
  );
};

export default StockDetails;
