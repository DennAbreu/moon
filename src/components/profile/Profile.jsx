import { Container, Stack } from "@mui/material";
import { ButtonStyled2, CenteredBox } from "../../util/CustomComponents";
import { useDispatch, useSelector } from "react-redux";
import { logOutFB, useAuth } from "../../firebase/authHandler";
import { authLogOut } from "../../features/auth/authSlice";
import { profResetStore } from "../../features/profile/profSlice";
import BankDBStats from "./BankDBStats";

const Profile = (props) => {
  const user = useAuth();
  const profName = useSelector((state) => state.prof.name);
  const profID = useSelector((state) => state.prof.userID);
  const profBank = useSelector((state) => state.prof.bankTotal);
  const stockList = useSelector((state) => state.prof.stockList);
  const amtInvested = useSelector((state) => state.prof.amountInvested);
  const dispatch = useDispatch();

  const testLogOut = async () => {
    try {
      await logOutFB();
      dispatch(authLogOut());
      dispatch(profResetStore());
    } catch {
      console.log("Error!");
    }
  };

  const oldInfo = (
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
        onClick={testLogOut}
        sx={{ mt: "1rem", background: "teal", width: "50%", ml: "1rem" }}
      >
        Logout
      </ButtonStyled2>
    </Container>
  );

  return (
    <>
      {/* {oldInfo} */}
      <Container>
        <BankDBStats />
      </Container>
    </>
  );
};

export default Profile;
