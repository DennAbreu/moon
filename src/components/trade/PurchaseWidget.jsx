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
  useTheme,
} from "@mui/material";
import {
  BlueTextLabel,
  GreenTextLabel,
  ButtonStyled2,
  FabStyled,
  StyledAccordion,
  StyledDetails,
} from "../../util/CustomComponents";
import { useAuth } from "../../firebase/firebase-config";
import {
  purchaseStock,
  retCurrStockDetails,
  sellStock,
} from "../../util/stockPurchaseHandler";
import { useDispatch, useSelector } from "react-redux";
import {
  profSetAmtInvested,
  profSetAvailableFunds,
  profSetBank,
  profSetStockList,
} from "../../features/profile/profSlice";
// import { apiKey } from "../util/helperUtil";

const PurchaseWidget = (props) => {
  const theme = useTheme();
  const [sharesAmt, setSharesAmt] = useState(1);
  const [priceUpdate, setPriceUpdate] = useState(props.stockData.currPrice);
  const [expanded, setExpanded] = useState(false);
  const subButtonRef = useRef();
  const addButtonRef = useRef();
  const dispatch = useDispatch();
  //TODO: Change back to useAuth after testing.
  // const currUser = useAuth();
  const currUser = true;
  const gridSpacingLG = 5;
  const gridSpacingXS = 12;
  const perChange = -1;
  const perChangeColor = perChange < 0 ? "#FF0000" : "#00ff00";

  const stockCurrPrice = props.stockData.currPrice;
  const symbol = props.stockData.symbol;
  const currUserID = useSelector((state) => state.prof.userID);
  const availableFunds = useSelector((state) => state.prof.availableFunds);
  const currList = useSelector((state) => state.prof.stockList);
  const currListDetails = retCurrStockDetails(symbol, currList);
  const stockListIndex = currListDetails.index;
  const sharesOwned = currListDetails.shares;
  const currSharesValue = props.stockData.currPrice * sharesOwned;
  const amtInvested = currListDetails.amtInvested;
  const netGain = currSharesValue - amtInvested;
  const netGainPer = (netGain / amtInvested) * 100;

  //DELETE
  //DELETE
  console.log("CurrList", currList);

  console.log("currListDetails", currListDetails);

  const onChangeHandler = (e) => {
    setSharesAmt(Number(e.target.value));
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    switch (e.currentTarget.id) {
      case "fabSub":
        if (sharesAmt > 1) {
          setSharesAmt(sharesAmt - 1);
        } else {
          setSharesAmt(1);
        }
        console.log("sharesAmt", sharesAmt);
        break;
      case "fabAdd":
        setSharesAmt(sharesAmt + 1);
        setPriceUpdate(sharesAmt * stockCurrPrice);

        console.log("sharesAmt", sharesAmt);
        break;
      default:
        break;
    }
  };

  const testClick = (e) => {
    console.log("TestBtnClicked");
    switch (e.currentTarget.id) {
      case "buyBtn":
        purchaseStock(
          currUserID,
          symbol,
          sharesAmt,
          sharesOwned,
          amtInvested,
          availableFunds,
          priceUpdate,
          currList,
          stockListIndex
        );

        break;
      case "sellBtn":
        sellStock(
          currUserID,
          symbol,
          sharesAmt,
          sharesOwned,
          amtInvested,
          availableFunds,
          priceUpdate,
          currList,
          stockListIndex
        );
        break;
      default:
        break;
    }

    dispatch(profSetBank());
    dispatch(profSetStockList());
    dispatch(profSetAmtInvested());
    dispatch(profSetAvailableFunds());

    //PurchaseStock
    // purchaseStock(
    //   currUserID,
    //   symbol,
    //   sharesAmt,
    //   sharesOwned,
    //   amtInvested,
    //   availableFunds,
    //   priceUpdate,
    //   currList,
    //   stockListIndex
    // );

    // sellStock(
    //   currUserID,
    //   symbol,
    //   sharesAmt,
    //   sharesOwned,
    //   amtInvested,
    //   availableFunds,
    //   priceUpdate,
    //   currList,
    //   stockListIndex
    // );

    // dispatch(profSetStockList());
  };

  const expansionHandler = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setPriceUpdate(sharesAmt * stockCurrPrice);
  }, [sharesAmt, stockCurrPrice]);

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
                  {/* {availableFunds} */}
                  {availableFunds.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </GreenTextLabel>
              </Grid>
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <BlueTextLabel>Current Price:</BlueTextLabel>
              </Grid>
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <GreenTextLabel>
                  {stockCurrPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
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
                  {/* {amtInvested} */}
                  {amtInvested.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </GreenTextLabel>
              </Grid>
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <BlueTextLabel>Current Shares Value:</BlueTextLabel>
              </Grid>
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <GreenTextLabel>
                  {currSharesValue.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </GreenTextLabel>
              </Grid>
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <BlueTextLabel>Net Gain:</BlueTextLabel>
              </Grid>
              <Grid item xs={gridSpacingXS} lg={gridSpacingLG}>
                <Typography sx={{ fontSize: "1.2em" }} color={perChangeColor}>
                  {netGain.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                  ({netGainPer.toFixed(2)}% )
                </Typography>
              </Grid>
            </Grid>
            <Stack
              sx={{ mt: "1rem", display: "flex", justifyContent: "center" }}
              direction={"row"}
            >
              <Box sx={{ mr: "0.5rem", display: "flex", alignItems: "center" }}>
                <FabStyled
                  id="fabSub"
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
                value={sharesAmt}
                onChange={onChangeHandler}
                min={0}
              />
              <Box sx={{ ml: "0.5rem", display: "flex", alignItems: "center" }}>
                <FabStyled
                  id="fabAdd"
                  size="small"
                  aria-label="add"
                  ref={addButtonRef}
                  onClick={onClickHandler}
                >
                  <AddIcon sx={{ color: "white" }} />
                </FabStyled>
              </Box>
              <ButtonStyled2
                id="buyBtn"
                onClick={testClick}
                sx={{ width: "50%", ml: "1rem" }}
              >
                Buy
              </ButtonStyled2>
              <ButtonStyled2
                id="sellBtn"
                onClick={testClick}
                sx={{ width: "50%", ml: "1rem" }}
              >
                Sell
              </ButtonStyled2>
              <ButtonStyled2
                onClick={testClick}
                sx={{ background: "red", width: "50%", ml: "1rem" }}
              >
                TEST
              </ButtonStyled2>
            </Stack>
            <Box sx={{ mt: "1rem", display: "flex", justifyContent: "center" }}>
              <Typography
                sx={{ fontWeight: "bold" }}
                color="blueColor.main"
                variant="h5"
              >
                ${priceUpdate.toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
      </StyledDetails>
    </StyledAccordion>
  );
};

export default PurchaseWidget;
