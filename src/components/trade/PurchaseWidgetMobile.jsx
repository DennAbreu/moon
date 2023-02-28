import { useEffect, useRef, useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  AccordionSummary,
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  BlueTextLabel,
  ButtonStyled2,
  FabStyled,
  StyledAccordion,
  StyledDetails,
  CurrencyText,
  StyledAccordionMobile,
} from "../../util/CustomComponents";
import {
  purchaseStock,
  retCurrStockDetails,
  sellStock,
} from "../../util/transactionsHandler";
import { useDispatch, useSelector } from "react-redux";
import {
  profSetAmountInvested,
  profSetAvailableFunds,
  profSetBank,
  profSetStockList,
} from "../../features/profile/profSlice";
import {
  retBankAmount,
  retDBAvailable,
  retDBInvested,
  retTotalDBStocks,
} from "../../firebase/dbHandler";

const PurchaseWidgetMobile = (props) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [numShares, setNumShares] = useState(1);
  const [pendingTransPrice, setPendingTransPrice] = useState(
    props.stockData.currPrice
  );
  const subButtonRef = useRef();
  const addButtonRef = useRef();

  const { symbol, companyName, currPrice } = props.stockData;

  const currUserID = useSelector((state) => state.prof.userID);
  const availableFunds = useSelector((state) => state.prof.availableFunds);
  const currList = useSelector((state) => state.prof.stockList);
  const currListDetails = retCurrStockDetails(symbol, currList);
  const stockListIndex = currListDetails.index;
  const sharesOwned = currListDetails.shares;
  const initInvestment = currListDetails.initInvestment;
  const currSharesValue = currPrice * sharesOwned;
  const netGain = currSharesValue - initInvestment;
  const netGainPer = (netGain / initInvestment) * 100;
  const netGainColor = netGain < 0 ? "#FF0000" : "#00ff00";

  //TODO: Change back to useAuth after testing.
  // const currUser = useAuth();
  const currUser = true;
  //
  //
  const gridSpacingLG = 5;
  const gridSpacingXS = 12;

  const onChangeHandler = (e) => {
    setNumShares(Number(e.target.value));
  };

  const submitHandler = async (e) => {
    var profSliceUpdateDetails = {};
    switch (e.currentTarget.id) {
      case "buyButton":
        await purchaseStock(
          currUserID,
          symbol,
          companyName,
          numShares,
          sharesOwned,
          initInvestment,
          availableFunds,
          pendingTransPrice,
          currList,
          stockListIndex
        );

        setNumShares(1);
        break;
      case "sellButton":
        await sellStock(
          currUserID,
          symbol,
          companyName,
          numShares,
          sharesOwned,
          initInvestment,
          availableFunds,
          pendingTransPrice,
          currList,
          stockListIndex
        );
        setNumShares(1);

        break;
      default:
        break;
    }

    profSliceUpdateDetails = {
      totalBank: await retBankAmount(currUserID),
      amountInvested: await retDBInvested(currUserID),
      availableFunds: await retDBAvailable(currUserID),
      stockList: await retTotalDBStocks(currUserID),
    };

    dispatch(profSetBank(profSliceUpdateDetails));
    dispatch(profSetAmountInvested(profSliceUpdateDetails));
    dispatch(profSetAvailableFunds(profSliceUpdateDetails));
    dispatch(profSetStockList(profSliceUpdateDetails));
  };

  const expansionHandler = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setPendingTransPrice(numShares * currPrice);
  }, [numShares, currPrice]);

  return (
    <StyledAccordionMobile expanded={expanded} onChange={expansionHandler}>
      <AccordionSummary expandIcon={<ExpandMore sx={{ color: "white" }} />}>
        <Typography color="white" variant="h7">
          CLICK TO TRADE
        </Typography>
      </AccordionSummary>
      <StyledDetails>
        {!currUser ? (
          "No User Is Signed In."
        ) : (
          <>
            <Grid
              sx={{ display: "flex", justifyContent: "center" }}
              container
              spacing={0}
            >
              <Grid item md={gridSpacingXS} xl={gridSpacingLG}>
                <BlueTextLabel>Available Funds:</BlueTextLabel>
              </Grid>
              <Grid item md={gridSpacingXS} xl={gridSpacingLG}>
                <CurrencyText>${availableFunds?.toFixed(2)}</CurrencyText>
              </Grid>
              <Grid item md={gridSpacingXS} xl={gridSpacingLG}>
                <BlueTextLabel>Current Price:</BlueTextLabel>
              </Grid>
              <Grid item md={gridSpacingXS} xl={gridSpacingLG}>
                <CurrencyText>${Number(currPrice)?.toFixed(2)}</CurrencyText>
              </Grid>
              <Grid item md={gridSpacingXS} xl={gridSpacingLG}>
                <BlueTextLabel>Shares Owned:</BlueTextLabel>
              </Grid>
              <Grid item md={gridSpacingXS} xl={gridSpacingLG}>
                <CurrencyText>{sharesOwned}</CurrencyText>
              </Grid>
              <Grid item md={gridSpacingXS} xl={gridSpacingLG}>
                <BlueTextLabel>Initial Invested: </BlueTextLabel>
              </Grid>
              <Grid item md={gridSpacingXS} xl={gridSpacingLG}>
                <CurrencyText>
                  ${Number(initInvestment)?.toFixed(2)}
                </CurrencyText>
              </Grid>
              <Grid item md={gridSpacingXS} xl={gridSpacingLG}>
                <BlueTextLabel>Current Shares Value:</BlueTextLabel>
              </Grid>
              <Grid item md={gridSpacingXS} xl={gridSpacingLG}>
                <CurrencyText>
                  ${Number(currSharesValue)?.toFixed(2)}
                </CurrencyText>
              </Grid>
              <Grid item md={gridSpacingXS} xl={gridSpacingLG}>
                <BlueTextLabel>Net Gain:</BlueTextLabel>
              </Grid>
              <Grid item md={gridSpacingXS} xl={gridSpacingLG}>
                <Typography
                  sx={{ fontSize: "1.2em", fontWeight: "bold" }}
                  color={netGainColor}
                >
                  ${netGain?.toFixed(2)}({netGainPer?.toFixed(2)}% )
                </Typography>
              </Grid>
            </Grid>
            <Stack
              sx={{ mt: "1rem", display: "flex", justifyContent: "center" }}
              direction={"column"}
            >
              <TextField
                id="stockReq"
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                value={numShares}
                onChange={onChangeHandler}
                min={0}
              />
              {/* <Box sx={{ mr: "0.5rem", display: "flex", alignItems: "center" }}>
                <FabStyled
                  id="minusButton"
                  size="small"
                  aria-label="sub"
                  ref={subButtonRef}
                  onClick={onClickHandler}
                >
                  <RemoveIcon sx={{ color: "white" }} />
                </FabStyled>
              </Box>
              <Box sx={{ ml: "0.5rem", display: "flex", alignItems: "center" }}>
                <FabStyled
                  id="plusButton"
                  size="small"
                  aria-label="add"
                  ref={addButtonRef}
                  onClick={onClickHandler}
                >
                  <AddIcon sx={{ color: "white" }} />
                </FabStyled>
              </Box> */}
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginTop: "0.5rem",
                }}
              >
                <ButtonStyled2
                  id="buyButton"
                  onClick={submitHandler}
                  sx={{ width: "100%", marginBottom: "0.5rem" }}
                >
                  Buy
                </ButtonStyled2>
                <ButtonStyled2
                  id="sellButton"
                  onClick={submitHandler}
                  sx={{ width: "100%" }}
                >
                  Sell
                </ButtonStyled2>
              </Stack>
            </Stack>
            <Box sx={{ mt: "1rem", display: "flex", justifyContent: "center" }}>
              <Typography
                sx={{ fontWeight: "bold" }}
                color="blueColor.main"
                variant="h5"
              >
                ${pendingTransPrice?.toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
      </StyledDetails>
    </StyledAccordionMobile>
  );
};

export default PurchaseWidgetMobile;
