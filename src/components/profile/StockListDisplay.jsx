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
  const { row, onClickRef } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRowStyled onClick={onClickRef}>
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

  // const dummyStocks = [
  //   { name: "Apple", symbol: "AAPL", shares: 1, initInvestment: 143.16 },
  //   { name: "Game Stop", symbol: "GME", shares: 1, initInvestment: 143.16 },
  //   {
  //     name: "AMC Entertainment",
  //     symbol: "AMC",
  //     shares: 1,
  //     initInvestment: 143.16,
  //   },
  // ];

  //createRowData(Name, Symbol, Shares, Invested, CurrPrice, CurrVal, Growth)...
  // const rows = [
  //   createRowData("Apple Inc.", "AAPL", 10, 1476.41, 143.16, 1431.6, 300),
  //   createRowData("GameStop", "GME", 25, 143.16, 143.16, 143.16, 300),
  //   createRowData("Netflix Inc", "NFLX", 15, 4205.25, 310.71, 7767.75, 300),
  //   createRowData("Alphabet Inc.", "GOOG", 5, 350.25, 92.57, 462.85, 300),
  //   createRowData("Meta Platforms, Inc.", "META", 2, 180.25, 113.89, 227.7, 300),
  //   createRowData("Tesla, Inc.", "TSLA", 35, 8750.35, 169.42, 5929.7, 300),
  // ];

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
