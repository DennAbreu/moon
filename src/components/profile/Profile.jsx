import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import { FlexStack } from "../../util/CustomComponents";
import BankDBStats from "./BankDBStats";
import StockListDisplay from "./StockListDisplay";
import SharesPieChart from "./charts/SharesPieChart";
import InvPieChart from "./charts/InvPieChart";
import ComparisonChart from "./charts/ComparisonChart";
import SharesLineGraph from "./charts/SharesLineGraph";

const Profile = (props) => {
  // const profName = useSelector((state) => state.prof.name);
  // const profID = useSelector((state) => state.prof.userID);
  // const profBank = useSelector((state) => state.prof.bankTotal);
  // const stockList = useSelector((state) => state.prof.stockList);
  // const amtInvested = useSelector((state) => state.prof.amountInvested);

  return (
    <>
      <Container maxWidth="100%">
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
