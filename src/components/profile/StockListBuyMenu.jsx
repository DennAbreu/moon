import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Box, Paper, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  ButtonStyled2,
  BuyMenuStack,
  FabStyled,
  SharesTextField,
  TextCentered,
  TransPriceContaner,
} from "../../util/CustomComponents";
import {
  retBankAmount,
  retDBAvailable,
  retDBInvested,
  retTotalDBStocks,
} from "../../firebase/dbHandler";
import {
  profSetAmountInvested,
  profSetAvailableFunds,
  profSetBank,
  profSetStockList,
} from "../../features/profile/profSlice";
import {
  purchaseStock,
  retCurrStockDetails,
  sellStock,
} from "../../util/transactionsHandler";

const StockListBuyMenu = (props) => {
  const dispatch = useDispatch();
  const [numShares, setNumShares] = useState(1);
  const [currPrice, setCurrPrice] = useState(143.16);
  const [pendingTransPrice, setPendingTransPrice] = useState(143.16);
  const subButtonRef = useRef();
  const addButtonRef = useRef();

  const currUserID = useSelector((state) => state.prof.userID);
  const availableFunds = useSelector((state) => state.prof.availableFunds);
  const currList = useSelector((state) => state.prof.stockList);

  //TODO: Fill these out
  const onChangeHandler = (e) => {
    setNumShares(Number(e.target.value));
  };

  const onClickHandler = (e) => {
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
        // setPendingTransPrice(numShares * stockCurrPrice);
        console.log("numShares", numShares);
        break;
      default:
        break;
    }
  };

  const submitHandler = async (e) => {};

  useEffect(() => {
    setPendingTransPrice(numShares * currPrice);
  }, [numShares, currPrice]);

  return (
    <BuyMenuStack direction={"row"}>
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
      <SharesTextField
        id="stockReq"
        inputProps={{ min: 0, style: { textAlign: "center" } }}
        value={numShares}
        onChange={onChangeHandler}
        min={0}
      />

      <Box
        sx={{
          ml: "0.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
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
        sx={{ width: "10%", mb: "0.5rem", ml: "1rem" }}
      >
        Buy
      </ButtonStyled2>
      <ButtonStyled2
        id="sellButton"
        onClick={submitHandler}
        sx={{ height: "10", width: "10%", mb: "0.5rem", ml: "1rem" }}
      >
        Sell
      </ButtonStyled2>
      {/* <CurrentTransPriceField
        id="stockReq"
        inputProps={{ min: 0, style: { textAlign: "center" } }}
        value={pendingTransPrice}
        onChange={onChangeHandler}
        min={0}
      /> */}
      <TransPriceContaner>
        ${pendingTransPrice.toFixed(2).toLocaleString("en-US")}
      </TransPriceContaner>
    </BuyMenuStack>
  );
};

export default StockListBuyMenu;
