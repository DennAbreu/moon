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
  GreenTextLabel,
  ButtonStyled2,
  FabStyled,
  StyledAccordion,
  StyledDetails,
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
  retInvestedAmount,
  retTotalDBStockList,
} from "../../firebase/dbHandler";

const PurchaseWidget = (props) => {
  const [numShares, setNumShares] = useState(1);
  const [pendingTransPrice, setPendingTransPrice] = useState(
    props.stockData.currPrice
  );
  const [expanded, setExpanded] = useState(false);
  const subButtonRef = useRef();
  const addButtonRef = useRef();
  const dispatch = useDispatch();

  const symbol = props.stockData.symbol;
  const stockCurrPrice = props.stockData.currPrice;
  const currUserID = useSelector((state) => state.prof.userID);
  const availableFunds = useSelector((state) => state.prof.availableFunds);
  const currList = useSelector((state) => state.prof.stockList);
  const currListDetails = retCurrStockDetails(symbol, currList);
  const stockListIndex = currListDetails.index;
  const sharesOwned = currListDetails.shares;
  const currSharesValue = props.stockData.currPrice * sharesOwned;
  const amtInvested = currListDetails.initInvestment;
  const netGain = currSharesValue - amtInvested;
  const netGainPer = (netGain / amtInvested) * 100;
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

  const onClickHandler = (e) => {
    e.preventDefault();
    switch (e.currentTarget.id) {
      case "minusButton":
        if (numShares > 1) {
          setNumShares(numShares - 1);
        } else {
          setNumShares(1);
        }
        console.log("numShares", numShares);
        break;
      case "plusButton":
        setNumShares(numShares + 1);
        setPendingTransPrice(numShares * stockCurrPrice);
        console.log("numShares", numShares);
        break;
      default:
        break;
    }
  };

  const submitHandler = async (e) => {
    var profSliceUpdateDetails = {};

    switch (e.currentTarget.id) {
      case "buyButton":
        await purchaseStock(
          currUserID,
          symbol,
          numShares,
          sharesOwned,
          amtInvested,
          availableFunds,
          pendingTransPrice,
          currList,
          stockListIndex
        );
        setNumShares(1);
        break;
      case "sellButton":
        console.log("Data Sent to SellStock", {
          currUserID,
          symbol,
          numShares,
          sharesOwned,
          amtInvested,
          availableFunds,
          pendingTransPrice,
          currList,
          stockListIndex,
        });

        await sellStock(
          currUserID,
          symbol,
          numShares,
          sharesOwned,
          amtInvested,
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
      stockList: await retTotalDBStockList(currUserID),
      amountInvested: await retInvestedAmount(currUserID),
      totalBank: await retBankAmount(currUserID),
      availableFunds:
        profSliceUpdateDetails.totalBank -
        profSliceUpdateDetails.amountInvested,
    };

    dispatch(profSetStockList(profSliceUpdateDetails));
    dispatch(profSetAmountInvested(profSliceUpdateDetails));
    dispatch(profSetBank(profSliceUpdateDetails));
    dispatch(profSetAvailableFunds(profSliceUpdateDetails));
  };

  const expansionHandler = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setPendingTransPrice(numShares * stockCurrPrice);
  }, [numShares, stockCurrPrice]);

  return (
    <StyledAccordion expanded={expanded} onChange={expansionHandler}>
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
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <BlueTextLabel>Available Funds:</BlueTextLabel>
              </Grid>
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <GreenTextLabel>
                  ${Number(availableFunds).toFixed(2)}
                </GreenTextLabel>
              </Grid>
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <BlueTextLabel>Current Price:</BlueTextLabel>
              </Grid>
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <GreenTextLabel>
                  ${Number(stockCurrPrice).toFixed(2)}
                </GreenTextLabel>
              </Grid>
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <BlueTextLabel>Shares Owned:</BlueTextLabel>
              </Grid>
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <GreenTextLabel>{sharesOwned}</GreenTextLabel>
              </Grid>
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <BlueTextLabel>Initial Invested: </BlueTextLabel>
              </Grid>
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <GreenTextLabel>
                  ${Number(amtInvested).toFixed(2)}
                </GreenTextLabel>
              </Grid>
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <BlueTextLabel>Current Shares Value:</BlueTextLabel>
              </Grid>
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <GreenTextLabel>
                  ${Number(currSharesValue).toFixed(2)}
                </GreenTextLabel>
              </Grid>
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <BlueTextLabel>Net Gain:</BlueTextLabel>
              </Grid>
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <Typography sx={{ fontSize: "1.2em" }} color={netGainColor}>
                  ${netGain.toFixed(2)}({netGainPer.toFixed(2)}% )
                </Typography>
              </Grid>
            </Grid>
            <Stack
              sx={{ mt: "1rem", display: "flex", justifyContent: "center" }}
              direction={"row"}
            >
              <Box sx={{ mr: "0.5rem", display: "flex", alignItems: "center" }}>
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
              <TextField
                id="stockReq"
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                value={numShares}
                onChange={onChangeHandler}
                min={0}
              />
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
              </Box>
              <ButtonStyled2
                id="buyButton"
                onClick={submitHandler}
                sx={{ width: "50%", ml: "1rem" }}
              >
                Buy
              </ButtonStyled2>
              <ButtonStyled2
                id="sellButton"
                onClick={submitHandler}
                sx={{ width: "50%", ml: "1rem" }}
              >
                Sell
              </ButtonStyled2>
            </Stack>
            <Box sx={{ mt: "1rem", display: "flex", justifyContent: "center" }}>
              <Typography
                sx={{ fontWeight: "bold" }}
                color="blueColor.main"
                variant="h5"
              >
                ${pendingTransPrice.toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
      </StyledDetails>
    </StyledAccordion>
  );
};

export default PurchaseWidget;
