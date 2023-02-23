import { Suspense, useEffect, useState } from "react";
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
import {
  retPromiseArray,
  retSymbolMap,
  updateStockList,
  testStockArray,
} from "../../util/helperUtil";
import { app } from "../../firebase/firebase-config";
import { fetchCurrentPrice } from "../../util/apiHandler";
import LoaderDiv from "../../util/LoaderDiv";

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
          {row.symbol} ({row.companyName})
        </TableCell>
        <TableCell align="right">{row.shares}</TableCell>
        <TableCell align="right">
          ${row.initInvestment?.toLocaleString("en-US")}
        </TableCell>
        <TableCell align="right">
          ${row.currVal?.toLocaleString("en-US")}
        </TableCell>
        <TableCell align="right">
          ${row.currPrice?.toLocaleString("en-US")}
        </TableCell>
      </TableRowStyled>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
        }}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <StockListBuyMenu stockData={row} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const StockListDisplay = (props) => {
  // const stockList = useSelector((state) => state.prof.stockList);
  const { stockList } = props;
  const theme = useTheme();
  const [selSymbol, setSelSymbol] = useState();

  const rows = stockList;

  const onClickHandler = (e) => {
    setSelSymbol(e.target.getAttribute("data-item"));
    console.log(
      "🚀 ~ file: StockListDisplay.jsx:82 ~ StockListDisplay ~ selSymbol",
      selSymbol
    );
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
              Current Value
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Current Price
            </TableCell>
            {/* <TableCell sx={{ color: "white" }} align="right">
              Growth
            </TableCell> */}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows?.map((row) => (
            <Row onClickRef={onClickHandler} key={row.symbol} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockListDisplay;
