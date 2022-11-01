import { useRef } from "react";
import { Box, styled, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = (props) => {
  const searchBarRef = useRef();

  const SearchBarContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
  });

  const clickHandler = (e) => {
    e.preventDefault();
    var returnedRef = searchBarRef.current.value.toUpperCase();
    props.onSymbolSearch(returnedRef);
  };

  return (
    <SearchBarContainer>
      <TextField
        sx={{ borderRadius: "0px", background: "white" }}
        key="textField_one"
        id="outlined-controlled"
        label="Enter Stock Symbol"
        variant="outlined"
        size="medium"
        inputRef={searchBarRef}
        InputProps={{
          endAdornment: (
            <Button
              sx={{ borderRadius: "0px" }}
              variant="contained"
              color="greenColor"
              size="large"
              onClick={clickHandler}
            >
              <SearchIcon />
            </Button>
          ),
        }}
      />
      {/* <Button
          sx={{ borderRadius: "0px" }}
          variant="contained"
          color="greenColor"
          size="small"
          onClick={clickHandler}
        >
          <SearchIcon />
        </Button> */}
    </SearchBarContainer>
  );
};

export default SearchBar;
