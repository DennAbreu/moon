import { useState } from "react";
import { useSelector } from "react-redux";
import StockListBuyMenu from "./StockListBuyMenu";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  Collapse,
  IconButton,
} from "@mui/material";
import { TableRowStyled } from "../../util/CustomComponents";
import { retFormatedRowData, testStockArray } from "../../util/helperUtil";
import { fetchAllStockCurrPrice } from "../../util/apiHandler";

// const createRowData = (
//   name,
//   symbol,
//   shares,
//   initInvestment,
//   currPrice,
//   currVal,
//   growth
// ) => {
//   return { name, symbol, shares, initInvestment, currPrice, currVal, growth };
// };

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const onClickHandler = () => {
    setOpen(!open);
  };

  return (
    <>
      <TableRowStyled onClick={onClickHandler}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell data-item={row.symbol} component="th" scope="row">
          {row.symbol} ({row.name})
        </TableCell>
        <TableCell align="right">{row.shares}</TableCell>
        <TableCell align="right">{row.initInvestment}</TableCell>
        <TableCell align="right">{row.currPrice}</TableCell>
        <TableCell align="right">{row.currVal}</TableCell>
        {/* <TableCell colSpan={1} align="right">
          {row.growth}
        </TableCell> */}
      </TableRowStyled>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
        }}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <StockListBuyMenu />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const StockListDisplay = (props) => {
  const theme = useTheme();
  // const stockList = useSelector((state) => state.prof.stockList);
  const [selSymbol, setSelSymbol] = useState();

  /*
    TODO: Get Stock List with Symbol, Shares, Amount Invested, API Current Price,
    And Current Value (API Curr Price * Shares);
    
    --modifiedStockListArray
  */

  const rows = retFormatedRowData(testStockArray);

  const onClickHandler = (e) => {
    setSelSymbol(e.target.getAttribute("data-item"));
    console.log("Click!", selSymbol);
  };

  return (
    <TableContainer
      sx={{ height: "100%", maxWidth: "50rem" }}
      component={Paper}
    >
      <Table size="small">
        <TableHead>
          <TableRow
            sx={{
              "& > *": { borderBottom: "unset" },
              background: theme.palette.blueColor.main,
            }}
          >
            <TableCell />
            <TableCell sx={{ color: "white" }}>Company</TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Shares
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Invested
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Current Price
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Current Value
            </TableCell>
            {/* <TableCell sx={{ color: "white" }} align="right">
              Growth
            </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/*
              <TableCell colSpan={1} align="left">
                300
              </TableCell>
             */}
          {rows.map((row) => (
            <Row onClickRef={onClickHandler} key={row.symbol} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockListDisplay;
