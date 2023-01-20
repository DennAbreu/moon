import { Stack } from "@mui/system";
import {
  CenteredBox,
  FlexStack,
  ProfileCategory,
  TextCentered,
} from "../../util/CustomComponents";

const BankDBStats = (props) => {
  // const profBank = useSelector((state) => state.prof.bankTotal);
  // const initInvestment = useSelector((state) => state.prof.amountInvested);
  // const availableFunds = useSelector((state) => state.prof.availablefunds);

  var totalBank = 2143.16;
  var availableFunds = 2000;
  var initInvestment = 143.16;
  var currInvestmentVal = props.totalStockValue; //Will need func to calc current value
  var growth = Number((currInvestmentVal - initInvestment).toFixed(2));
  var growthPercent = Number(((growth / initInvestment) * 100).toFixed(2));
  var growthChangeColor = growthPercent < 0 ? "#FF0000" : "#00ff00";

  return (
    <FlexStack
      sx={{ display: "flex", justifyContent: "center" }}
      direction={"row"}
      spacing={2}
    >
      <ProfileCategory>
        <Stack direction={"column"}>
          <TextCentered color="white" variant="h5">
            Bank
          </TextCentered>
          <TextCentered color={"greenColor.main"} variant="h5">
            ${totalBank?.toLocaleString("en-US")}
          </TextCentered>
        </Stack>
      </ProfileCategory>
      <ProfileCategory>
        <Stack direction={"column"}>
          <CenteredBox>
            <TextCentered color="white" variant="h5">
              Available
            </TextCentered>
          </CenteredBox>
          <TextCentered color={"greenColor.main"} variant="h5">
            ${availableFunds?.toLocaleString("en-US")}
          </TextCentered>
        </Stack>
      </ProfileCategory>
      <ProfileCategory>
        <Stack direction={"column"}>
          <TextCentered color="white" variant="h5">
            Invested
          </TextCentered>
          <TextCentered color={"greenColor.main"} variant="h5">
            ${initInvestment?.toLocaleString("en-US")}
          </TextCentered>
        </Stack>
      </ProfileCategory>
      <ProfileCategory>
        <Stack direction={"column"}>
          <TextCentered color="white" variant="h5">
            Value
          </TextCentered>
          <TextCentered color={"greenColor.main"} variant="h5">
            ${currInvestmentVal?.toLocaleString("en-US")}
          </TextCentered>
        </Stack>
      </ProfileCategory>
      <ProfileCategory>
        <Stack direction={"column"}>
          <TextCentered color="white" variant="h5">
            Growth
          </TextCentered>
          <Stack
            sx={{ display: "flex", justifyContent: "center" }}
            direction={"row"}
            spacing={1}
          >
            <TextCentered color={growthChangeColor} variant="h5">
              ${growth?.toFixed(2)}
            </TextCentered>
            <TextCentered color={growthChangeColor}>
              <sub>{growthPercent?.toLocaleString("en-US")}%</sub>
            </TextCentered>
          </Stack>
        </Stack>
      </ProfileCategory>
    </FlexStack>
  );
};

export default BankDBStats;
