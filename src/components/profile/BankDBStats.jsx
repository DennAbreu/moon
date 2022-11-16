import { Stack } from "@mui/system";
import {
  CenteredBox,
  ProfileCategory,
  TextCentered,
} from "../../util/CustomComponents";

const BankDBStats = () => {
  var totalBank = 2143.16;
  var availableFunds = 2000;
  var initInvestment = 143.16;
  var currInvestmentVal = 225.15;
  var growth = Number((currInvestmentVal - initInvestment).toFixed(2));
  var growthPercent = Number(((growth / initInvestment) * 100).toFixed(2));
  var growthChangeColor = growthPercent < 0 ? "#FF0000" : "#00ff00";

  return (
    <Stack direction={"row"} spacing={5}>
      <ProfileCategory>
        <Stack direction={"column"}>
          <TextCentered color="white" variant="h5">
            Bank
          </TextCentered>
          <TextCentered color={"greenColor.main"} variant="h5">
            ${totalBank}
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
            ${availableFunds}
          </TextCentered>
        </Stack>
      </ProfileCategory>
      <ProfileCategory>
        <Stack direction={"column"}>
          <TextCentered color="white" variant="h5">
            Invested
          </TextCentered>
          <TextCentered color={"greenColor.main"} variant="h5">
            ${initInvestment}
          </TextCentered>
        </Stack>
      </ProfileCategory>
      <ProfileCategory>
        <Stack direction={"column"}>
          <TextCentered color="white" variant="h5">
            Value
          </TextCentered>
          <TextCentered color={"greenColor.main"} variant="h5">
            ${currInvestmentVal}
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
              ${growth}
            </TextCentered>
            <TextCentered color={growthChangeColor}>
              <sub>{growthPercent}%</sub>
            </TextCentered>
          </Stack>
        </Stack>
      </ProfileCategory>
    </Stack>
  );
};

export default BankDBStats;
