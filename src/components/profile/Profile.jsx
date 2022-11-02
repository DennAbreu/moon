import { Container } from "@mui/material";
import { useAuth } from "../../firebase/firebase-config";
const Profile = (props) => {
  const user = useAuth();
  return (
    <Container>
      Email:{user?.email}
      <br />
      UID: {user?.uid}
    </Container>
  );
};

export default Profile;
