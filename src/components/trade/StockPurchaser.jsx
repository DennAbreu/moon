import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StockPurchaser = (props) => {
  const PurchaserContainer = styled(Paper)({
    background: "blue",
  });
  return (
    <>
      <PurchaserContainer>Test!</PurchaserContainer>
    </>
  );
};

export default StockPurchaser;
