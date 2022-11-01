import { Container } from "@mui/material";
import { useAuth } from "../../firebase/firebase-config";
const Profile = (props) => {
  const user = useAuth();
  return <Container>{user?.email}</Container>;
};

export default Profile;
