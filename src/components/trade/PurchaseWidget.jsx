import { useEffect, useRef, useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Grid from "@mui/material/Unstable_Grid2";
import {
  AccordionSummary,
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  TextLabel,
  ButtonStyled2,
  FabStyled,
  StyledAccordion,
  StyledDetails,
  CurrencyText,
  PurchaseGrid,
  PurchaseWidgetContainer,
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

const PurchaseWidget = (props) => {
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
  const blueTextXL = 6;
  const blueTextLG = 6;
  const blueTextMD800 = 6;
  const blueTextMD = 12;
  const blueTextSM = 6;
  const blueTextXS = 6;

  const greenTextXL = 5;
  const greenTextLG = 5;
  const greenTextMD800 = 5;
  const greenTextMD = 12;
  const greenTextSM = 5;
  const greenTextXS = 5;

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
        break;
      case "plusButton":
        setNumShares(numShares + 1);
        // setPendingTransPrice(numShares * stockCurrPrice);
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

  // const expansionHandler = () => {
  //   setExpanded(!expanded);
  // };

  useEffect(() => {
    setPendingTransPrice(numShares * currPrice);
  }, [numShares, currPrice]);

  return (
    <PurchaseWidgetContainer>
      <PurchaseGrid container>
        <Grid
          xs={blueTextXS}
          sm={blueTextSM}
          md={blueTextMD}
          md800={blueTextMD800}
          lg={blueTextLG}
          xl={blueTextXL}
        >
          <TextLabel>Available:</TextLabel>
        </Grid>
        <Grid
          xs={greenTextXS}
          sm={greenTextSM}
          md={greenTextMD}
          md800={greenTextMD800}
          lg={greenTextLG}
          xl={greenTextXL}
        >
          <CurrencyText>${availableFunds?.toFixed(2)}</CurrencyText>
        </Grid>
        <Grid
          xs={blueTextXS}
          sm={blueTextSM}
          md={blueTextMD}
          md800={blueTextMD800}
          lg={blueTextLG}
          xl={blueTextXL}
        >
          <TextLabel>Invested: </TextLabel>
        </Grid>
        <Grid
          xs={greenTextXS}
          sm={greenTextSM}
          md={greenTextMD}
          md800={greenTextMD800}
          lg={greenTextLG}
          xl={greenTextXL}
        >
          <CurrencyText>${Number(initInvestment)?.toFixed(2)}</CurrencyText>
        </Grid>
        <Grid
          xs={blueTextXS}
          sm={blueTextSM}
          md={blueTextMD}
          md800={blueTextMD800}
          lg={blueTextLG}
          xl={blueTextXL}
        >
          <TextLabel>Price:</TextLabel>
        </Grid>
        <Grid
          xs={greenTextXS}
          sm={greenTextSM}
          md={greenTextMD}
          md800={greenTextMD800}
          lg={greenTextLG}
          xl={greenTextXL}
        >
          <CurrencyText>${Number(currPrice)?.toFixed(2)}</CurrencyText>
        </Grid>
        <Grid
          xs={blueTextXS}
          sm={blueTextSM}
          md={blueTextMD}
          md800={blueTextMD800}
          lg={blueTextLG}
          xl={blueTextXL}
        >
          <TextLabel>Shares:</TextLabel>
        </Grid>
        <Grid
          xs={greenTextXS}
          sm={greenTextSM}
          md={greenTextMD}
          md800={greenTextMD800}
          lg={greenTextLG}
          xl={greenTextXL}
        >
          <CurrencyText>{sharesOwned}</CurrencyText>
        </Grid>

        <Grid
          xs={blueTextXS}
          sm={blueTextSM}
          md={blueTextMD}
          md800={blueTextMD800}
          lg={blueTextLG}
          xl={blueTextXL}
        >
          <TextLabel>Value:</TextLabel>
        </Grid>
        <Grid
          xs={greenTextXS}
          sm={greenTextSM}
          md={greenTextMD}
          md800={greenTextMD800}
          lg={greenTextLG}
          xl={greenTextXL}
        >
          <CurrencyText>${Number(currSharesValue)?.toFixed(2)}</CurrencyText>
        </Grid>
        <Grid
          xs={blueTextXS}
          sm={blueTextSM}
          md={blueTextMD}
          md800={blueTextMD800}
          lg={blueTextLG}
          xl={blueTextXL}
        >
          <TextLabel>Net Gain:</TextLabel>
        </Grid>
        <Grid
          xs={greenTextXS}
          sm={greenTextSM}
          md={greenTextMD}
          md800={greenTextMD800}
          lg={greenTextLG}
          xl={greenTextXL}
        >
          <Typography
            sx={{ fontSize: "1.2em", fontWeight: "bold" }}
            color={netGainColor}
          >
            ${netGain?.toFixed(2)}
          </Typography>
        </Grid>
      </PurchaseGrid>
      <Stack
        sx={{
          mt: "2.0rem",
          display: "flex",
          justifyContent: "center",
          flexDirection: {
            sm: "column",
            md: "column",
            lg: "column",
            xl: "column",
          },
        }}
      >
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          direction={"row"}
        >
          <Box
            sx={{
              // background: "blue",
              // height: "fit-content",
              mr: "0.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <FabStyled
              id="minusButton"
              size="small"
              aria-label="sub"
              ref={subButtonRef}
              fullWidth={false}
              onClick={onClickHandler}
              sx={{ border: "1px solid green" }}
            >
              <RemoveIcon sx={{ color: "white" }} />
            </FabStyled>
          </Box>
          <TextField
            id="stockReq"
            size="small"
            inputProps={{
              min: 0,
              style: {
                background: "white",
                color: "#03314b",
                textAlign: "center",
              },
            }}
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
              sx={{ border: "1px solid green" }}
            >
              <AddIcon sx={{ color: "white" }} />
            </FabStyled>
          </Box>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          direction={"row"}
        >
          <ButtonStyled2
            id="buyButton"
            onClick={submitHandler}
            sx={{ border: "1px solid green", width: "25%", ml: "1rem" }}
          >
            Buy
          </ButtonStyled2>
          <ButtonStyled2
            id="sellButton"
            onClick={submitHandler}
            sx={{ border: "1px solid green", width: "25%", ml: "1rem" }}
          >
            Sell
          </ButtonStyled2>
        </Stack>
      </Stack>
      <Box sx={{ mt: "1rem", display: "flex", justifyContent: "center" }}>
        <Typography
          sx={{ fontWeight: "bold" }}
          color="offWhiteColor.main"
          variant="h5"
        >
          ${pendingTransPrice?.toFixed(2)}
        </Typography>
      </Box>
    </PurchaseWidgetContainer>
  );
};

export default PurchaseWidget;
