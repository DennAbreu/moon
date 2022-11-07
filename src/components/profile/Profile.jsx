import { Container } from "@mui/material";
import { useAuth } from "../../firebase/firebase-config";
import { useSelector } from "react-redux";

import { retTotalDBStockList } from "../../firebase/databaseHandler";
import { ButtonStyled2 } from "../../util/CustomComponents";
const Profile = (props) => {
  const user = useAuth();
  const profID = useSelector((state) => state.prof.userID);
  const profBank = useSelector((state) => state.prof.bankTotal);
  const stockList = useSelector((state) => state.prof.stockList);
  const amtInvested = useSelector((state) => state.prof.amountInvested);

  const testClickHandler = (e) => {
    console.log("StockList--ProfilePage:", stockList);
  };

  return (
    <Container>
      Email:{user?.email}
      <br />
      UID: {user?.uid}
      <br />
      ProfID: {profID}
      <br />
      Bank: {profBank}
      <br />
      Amt Invested: {amtInvested}
      <ButtonStyled2
        onClick={testClickHandler}
        sx={{ width: "50%", ml: "1rem" }}
      >
        TEST
      </ButtonStyled2>
    </Container>
  );
};

export default Profile;
