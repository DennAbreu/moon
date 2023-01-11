import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { Box, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ButtonStyled2, FabStyled } from "../../util/CustomComponents";

const StockListBuyMenu = (props) => {
  const dispatch = useDispatch();
  const [numShares, setNumShares] = useState(1);
  const [currPrice, setCurrPrice] = useState(143.16);
  const subButtonRef = useRef();
  const addButtonRef = useRef();

  //TODO: Fill these out
  const onChangeHandler = (e) => {};

  const onClickHandler = (e) => {};

  const submitHandler = async (e) => {};

  return (
    <Stack
      sx={{
        mt: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
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
        sx={{ width: "15%", ml: "1rem" }}
      >
        Buy
      </ButtonStyled2>
      <ButtonStyled2
        id="sellButton"
        onClick={submitHandler}
        sx={{ height: "10", width: "15%", ml: "1rem" }}
      >
        Sell
      </ButtonStyled2>
    </Stack>
  );
};

export default StockListBuyMenu;
