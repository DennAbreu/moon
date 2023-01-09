import { Container, Stack } from "@mui/material";
import {
  ButtonStyled2,
  CenteredBox,
  FlexStack,
} from "../../util/CustomComponents";
import { useDispatch, useSelector } from "react-redux";
import { logOutFB, useAuth } from "../../firebase/authHandler";
import { authLogOut } from "../../features/auth/authSlice";
import { profResetStore } from "../../features/profile/profSlice";
import BankDBStats from "./BankDBStats";
import StockListDisplay from "./StockListDisplay";
import SharesPieChart from "./charts/SharesPieChart";
import SharesLineGraph from "./charts/SharesLineGraph";
import ComparisonChart from "./charts/ComparisonChart";
import InvPieChart from "./charts/InvPieChart";

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
      <Container maxWidth="90%">
        <BankDBStats />
        {/* <ButtonStyled2>Update Bank</ButtonStyled2> */}
        <FlexStack sx={{ mt: "1rem" }} direction={"row"} spacing={2}>
          <StockListDisplay />
          <FlexStack direction={"column"} spacing={1}>
            <FlexStack direction={"row"} spacing={2}>
              <SharesPieChart />
              <InvPieChart />
            </FlexStack>
            <ComparisonChart />
          </FlexStack>
          {/* <SharesLineGraph /> */}
        </FlexStack>
      </Container>
    </>
  );
};

export default Profile;
