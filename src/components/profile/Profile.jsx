import { Container } from "@mui/material";
import { useAuth } from "../../firebase/firebase-config";
import { useDispatch, useSelector } from "react-redux";
const Profile = (props) => {
  const user = useAuth();
  const profID = useSelector((state) => state.prof.userID);
  const profBank = useSelector((state) => state.prof.bankTotal);
  return (
    <Container>
      Email:{user?.email}
      <br />
      UID: {user?.uid}
      <br />
      Test: {profID}
      <br />
      Bank: {profBank}
      <br />
    </Container>
  );
};

export default Profile;
