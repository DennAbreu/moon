import { Container } from "@mui/material";
import { useAuth } from "../../firebase/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { logOutFB } from "../../firebase/firebase-config";

import { retTotalDBStockList } from "../../firebase/databaseHandler";
import { ButtonStyled2 } from "../../util/CustomComponents";
import { Stack } from "@mui/system";
import { authLogOut } from "../../features/auth/authSlice";
import { profResetStore } from "../../features/profile/profSlice";
const Profile = (props) => {
  const user = useAuth();
  const profName = useSelector((state) => state.prof.name);
  const profID = useSelector((state) => state.prof.userID);
  const profBank = useSelector((state) => state.prof.bankTotal);
  const stockList = useSelector((state) => state.prof.stockList);
  const amtInvested = useSelector((state) => state.prof.amountInvested);
  const dispatch = useDispatch();

  const testClickHandler = (e) => {
    console.log("StockList--ProfilePage:", stockList);
    console.log("Name--ProfilePage:", profName);
  };

  const testLogOut = async () => {
    try {
      await logOutFB();
      dispatch(authLogOut());
      dispatch(profResetStore());
    } catch {
      console.log("Error!");
    }
  };

  return (
    <Container>
      <Stack>
        Name: {profName}
        <br />
        Email:{user?.email}
        <br />
        UID: {user?.uid}
        <br />
        ProfID: {profID}
        <br />
        Bank: {profBank}
        <br />
        Amt Invested: {amtInvested}
      </Stack>
      <ButtonStyled2
        onClick={testClickHandler}
        sx={{ width: "50%", ml: "1rem" }}
      >
        PRINT
      </ButtonStyled2>
      <ButtonStyled2
        onClick={testLogOut}
        sx={{ mt: "1rem", background: "teal", width: "50%", ml: "1rem" }}
      >
        Logout
      </ButtonStyled2>
    </Container>
  );
};

export default Profile;
