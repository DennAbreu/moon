import { Box, Button, Stack } from "@mui/material";
import { styled } from "@mui/system";

export const FormBox = styled(Box)({
  borderRadius: 15,
  marginTop: "5rem",
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "50%",
  padding: "0px 15px 15px 15px",
});

export const StyledBtn = styled(Button)({
  backgroundColor: "#1dcc98",
  "&:hover": {
    backgroundColor: "white",
    color: "#03314b",
  },
});

export const AvatarBox = styled(Stack)({
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
});
